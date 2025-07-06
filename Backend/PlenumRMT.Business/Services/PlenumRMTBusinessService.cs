using PlenumRMT.Business.Entities;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Enums;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Excel;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.Extensions;
using Spiderly.Security.Services;
using Spiderly.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Spiderly.Shared.Emailing;
using Azure.Storage.Blobs;
using Mapster;
using Spiderly.Security.DTO;
using PlenumRMT.Business.DataMappers;
using System.Net.Sockets;
using PlenumRMT.Business.SignalRHubs;

namespace PlenumRMT.Business.Services
{
    public class PlenumRMTBusinessService : PlenumRMT.Business.Services.BusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMT.Business.Services.AuthorizationBusinessService _authorizationService;
        private readonly AuthenticationService _authenticationService;
        private readonly SecurityBusinessService<User> _securityBusinessService;
        private readonly EmailingService _emailingService;
        private readonly IFileManager _fileManager;

        public PlenumRMTBusinessService(
            IApplicationDbContext context, 
            ExcelService excelService, 
            PlenumRMT.Business.Services.AuthorizationBusinessService authorizationService, 
            SecurityBusinessService<User> securityBusinessService, 
            AuthenticationService authenticationService, 
            EmailingService emailingService,
            IFileManager fileManager
        )
            : base(context, excelService, authorizationService, fileManager)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
            _authenticationService = authenticationService;
            _emailingService = emailingService;
            _fileManager = fileManager;
        }

        #region User

        protected override async Task OnBeforeSaveUserAndReturnSaveBodyDTO(UserSaveBodyDTO userSaveBodyDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (userSaveBodyDTO.UserDTO.Id == 0)
                    throw new HackerException("You can't add new user.");
                
                User user = await GetInstanceAsync<User, long>(userSaveBodyDTO.UserDTO.Id, userSaveBodyDTO.UserDTO.Version);

                if (userSaveBodyDTO.UserDTO.Email != user.Email)
                    throw new HackerException("You can't change email from here.");

                await _securityBusinessService.UpdateRoleListForUser(userSaveBodyDTO.UserDTO.Id, userSaveBodyDTO.SelectedRolesIds);
            });
        }

        public async Task<List<string>> GetCurrentUserPermissionCodes()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                User currentUser = await _authenticationService.GetCurrentUser<User>();

                if (currentUser == null)
                    return new List<string>();

                return currentUser.Roles
                    .SelectMany(x => x.Permissions)
                    .Select(x => x.Code)
                    .Distinct()
                    .ToList();
            });
        }

        #endregion

        #region Notification

        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeAndThrowAsync<User>(BusinessPermissionCodes.UpdateNotification);

                // FT: Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users
                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                List<string> recipients = notification.Recipients.Select(x => x.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, notification.Title, notification.EmailBody);
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteDeleteAsync();
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, true));
            });
        }

        /// <summary>
        /// FT: Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, false));
            });
        }

        public async Task<int> GetUnreadNotificationsCountForCurrentUser()
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.IsMarkedAsRead == false);

                int count = await notificationUsersQuery.CountAsync();

                return count;
            });
        }

        public async Task<PaginatedResultDTO<NotificationDTO>> GetNotificationsForCurrentUser(FilterDTO tableFilterDTO)
        {
            PaginatedResultDTO<NotificationDTO> result = new();
            long currentUserId = _authenticationService.GetCurrentUserId(); // FT: Not doing user.Notifications, because he could have a lot of them.

            await _context.WithTransactionAsync(async () =>
            {
                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId)
                    .Select(x => new
                    {
                        UserId = x.User.Id,
                        NotificationId = x.Notification.Id,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                    });

                int count = await notificationUsersQuery.CountAsync();

                var notificationUsers = await notificationUsersQuery
                    .Skip(tableFilterDTO.First)
                    .Take(tableFilterDTO.Rows)
                    .ToListAsync();

                List<NotificationDTO> notificationsDTO = new();

                foreach (var item in notificationUsers)
                {
                    NotificationDTO notificationDTO = new();

                    Notification notification = await GetInstanceAsync<Notification, long>(item.NotificationId, null);
                    notificationDTO.Id = notification.Id;
                    notificationDTO.Version = notification.Version;
                    notificationDTO.Title = notification.Title;
                    notificationDTO.Description = notification.Description;
                    notificationDTO.CreatedAt = notification.CreatedAt;

                    notificationDTO.IsMarkedAsRead = item.IsMarkedAsRead;

                    notificationsDTO.Add(notificationDTO);
                }

                notificationsDTO = notificationsDTO.OrderByDescending(x => x.CreatedAt).ToList();

                result.Data = notificationsDTO;
                result.TotalRecords = count;
            });

            return result;
        }

        #endregion

        #region Voting Theme

        public async Task<List<VotingThemeItemDTO>> GetVotingThemeItemListForDisplay(long votingThemeId)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                List<VotingThemeItemDTO> votingThemeItemDTOList = new();

                List<VotingThemeItem> votingThemeItemList = await GetVotingThemeItemList(_context.DbSet<VotingThemeItem>()
                    .AsNoTracking()
                    .Where(x => x.VotingTheme.Id == votingThemeId)
                    .Include(x => x.VotingTheme)
                    .Include(x => x.UsersVoted)
                        .ThenInclude(x => x.VoteType)
                    .Include(x => x.UsersVoted)
                        .ThenInclude(x => x.User)
                    .OrderBy(x => x.OrderNumber)
                    , false);

                foreach (VotingThemeItem votingThemeItem in votingThemeItemList)
                {
                    VotingThemeItemDTO votingThemeItemDTO = votingThemeItem.Adapt<VotingThemeItemDTO>(Mapper.VotingThemeItemToDTOConfig());
                    votingThemeItemDTO.UsersVotedDTOList = new List<UserVotingThemeItemDTO>();

                    foreach (UserVotingThemeItem userVoted in votingThemeItem.UsersVoted)
                    {
                        UserVotingThemeItemDTO userVotedDTO = userVoted.Adapt<UserVotingThemeItemDTO>(Mapper.UserVotingThemeItemToDTOConfig());
                        votingThemeItemDTO.UsersVotedDTOList.Add(userVotedDTO);
                    }

                    votingThemeItemDTOList.Add(votingThemeItemDTO);
                }

                return votingThemeItemDTOList;
            });
        }

        public async Task Vote(long votingThemeItemId, int voteTypeId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                VotingThemeItem votingThemeItem = await GetInstanceAsync<VotingThemeItem, long>(votingThemeItemId, null);
                VoteType voteType = await GetInstanceAsync<VoteType, int>(voteTypeId, null);

                User currentUser = await _authenticationService.GetCurrentUser<User>();

                bool hasAlreadyVoted = votingThemeItem.UsersVoted
                    .Where(x => x.User.Id == currentUser.Id && x.VoteType.Id == voteType.Id)
                    .Any();

                if (hasAlreadyVoted)
                {
                    await _context.DbSet<UserVotingThemeItem>()
                        .Where(x =>
                            x.User.Id == currentUser.Id &&
                            x.VotingThemeItem.Id == votingThemeItem.Id &&
                            x.VoteType.Id == voteType.Id
                        )
                        .ExecuteDeleteAsync();
                }
                else
                {
                    await _context.DbSet<UserVotingThemeItem>().AddAsync(new UserVotingThemeItem
                    {
                        VotingThemeItem = votingThemeItem,
                        User = currentUser,
                        VoteType = voteType,
                    });

                    await _context.SaveChangesAsync();
                }
            });
        }

        #endregion

        #region Message

        /// <summary>
        /// This will get group chat messages between users also, but because we will not implement in on the in this test project UI, we don't care
        /// </summary>
        public async Task<List<UserMessageDTO>> GetMessages(long correspondentId)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                var r = await _context.DbSet<UserMessage>()
                    .AsNoTracking()
                    .Where(x => 
                        (x.Recipient.Id == currentUserId && x.Message.Sender.Id == correspondentId) || 
                        (x.Recipient.Id == correspondentId && x.Message.Sender.Id == currentUserId)
                    )
                    .OrderByDescending(x => x.Message.ModifiedAt) // FT: Descending because on the UI we are using 'flex-direction: column-reverse;'
                    .ProjectToType<UserMessageDTO>(Mapper.UserMessageToDTOConfig())
                    .ToListAsync();

                return r;
            });
        }

        public async Task SendMessage(SendMessageSaveBodyDTO saveBodyDTO)
        {
            long senderId = _authenticationService.GetCurrentUserId();

            await _context.WithTransactionAsync(async () =>
            {
                User sender = await GetInstanceAsync<User, long>(senderId, null);
                User recipient = await GetInstanceAsync<User, long>(saveBodyDTO.RecipientId, null);

                Message message = new Message
                {
                    Sender = sender,
                    Text = saveBodyDTO.MessageText
                };

                message.Recipients.Add(recipient);

                await _context.DbSet<Message>().AddAsync(message);

                await _context.SaveChangesAsync();
            });
        }

        #endregion
    }
}
