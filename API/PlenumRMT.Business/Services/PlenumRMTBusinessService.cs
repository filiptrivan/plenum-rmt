using PlenumRMT.Business.Entities;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Enums;
using Spider.Shared.DTO;
using Spider.Shared.Excel;
using Spider.Shared.Interfaces;
using Spider.Shared.Extensions;
using Spider.Security.Services;
using Spider.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Spider.Shared.Emailing;
using Azure.Storage.Blobs;
using Mapster;
using Spider.Security.DTO;
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
        private readonly SecurityBusinessService<UserExtended> _securityBusinessService;
        private readonly EmailingService _emailingService;
        private readonly BlobContainerClient _blobContainerClient;

        public PlenumRMTBusinessService(IApplicationDbContext context, ExcelService excelService, PlenumRMT.Business.Services.AuthorizationBusinessService authorizationService, SecurityBusinessService<UserExtended> securityBusinessService, 
            AuthenticationService authenticationService, EmailingService emailingService, BlobContainerClient blobContainerClient)
            : base(context, excelService, authorizationService, blobContainerClient)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
            _authenticationService = authenticationService;
            _emailingService = emailingService;
            _blobContainerClient = blobContainerClient;
        }

        #region User

        protected override async Task OnBeforeSaveUserExtendedAndReturnSaveBodyDTO(UserExtendedSaveBodyDTO userExtendedSaveBodyDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (userExtendedSaveBodyDTO.UserExtendedDTO.Id == 0)
                    throw new HackerException("You can't add new user.");
                
                UserExtended user = await GetInstanceAsync<UserExtended, long>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.UserExtendedDTO.Version);

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Email != user.Email)
                    throw new HackerException("You can't change email from here.");

                await _securityBusinessService.UpdateRoleListForUser(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.SelectedRolesIds);
            });
        }

        public async Task<List<string>> GetCurrentUserPermissionCodes()
        {
            return await _context.WithTransactionAsync(async () =>
            {
                UserExtended currentUser = await _authenticationService.GetCurrentUser<UserExtended>();

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
                await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.EditNotification);

                // FT: Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users
                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                List<string> recipients = notification.Recipients.Select(x => x.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, notification.Title, notification.EmailBody);
            });
        }

        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                //await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.EditNotification);

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteDeleteAsync();
            });
        }

        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                //await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.EditNotification);

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, true));
            });
        }

        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                //await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(PermissionCodes.EditNotification);

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, false));
            });
        }

        public async Task<TableResponseDTO<NotificationDTO>> GetNotificationsForCurrentUser(TableFilterDTO tableFilterDTO)
        {
            TableResponseDTO<NotificationDTO> result = new TableResponseDTO<NotificationDTO>();
            long currentUserId = _authenticationService.GetCurrentUserId(); // FT: Not doing user.Notifications, because he could have a lot of them.

            await _context.WithTransactionAsync(async () =>
            {
                IQueryable<UserNotification> userNotificationsQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId);

                int count = await userNotificationsQuery.CountAsync();

                List<NotificationDTO> notificationDTOList = await userNotificationsQuery
                    .Skip(tableFilterDTO.First)
                    .Take(tableFilterDTO.Rows)
                    .Select(x => new NotificationDTO
                    {
                        Id = x.Notification.Id,
                        Version = x.Notification.Version,
                        Title = x.Notification.Title,
                        Description = x.Notification.Description,
                        CreatedAt = x.Notification.CreatedAt,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                    })
                    .OrderByDescending(x => x.CreatedAt)
                    .ToListAsync();

                result.Data = notificationDTOList;
                result.TotalRecords = count;
            });

            return result;
        }

        public async Task<int> GetUnreadNotificationCountForCurrentUser()
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                IQueryable<UserNotification> notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.IsMarkedAsRead == false);

                int count = await notificationUsersQuery.CountAsync();

                return count;
            });
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
                    votingThemeItemDTO.UsersVotedDTOList = new List<UserExtendedVotingThemeItemDTO>();

                    foreach (UserExtendedVotingThemeItem userVoted in votingThemeItem.UsersVoted)
                    {
                        UserExtendedVotingThemeItemDTO userVotedDTO = userVoted.Adapt<UserExtendedVotingThemeItemDTO>(Mapper.UserExtendedVotingThemeItemToDTOConfig());
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

                UserExtended currentUser = await _authenticationService.GetCurrentUser<UserExtended>();

                bool hasAlreadyVoted = votingThemeItem.UsersVoted
                    .Where(x => x.User.Id == currentUser.Id && x.VoteType.Id == voteType.Id)
                    .Any();

                if (hasAlreadyVoted)
                {
                    await _context.DbSet<UserExtendedVotingThemeItem>()
                        .Where(x =>
                            x.User.Id == currentUser.Id &&
                            x.VotingThemeItem.Id == votingThemeItem.Id &&
                            x.VoteType.Id == voteType.Id
                        )
                        .ExecuteDeleteAsync();
                }
                else
                {
                    await _context.DbSet<UserExtendedVotingThemeItem>().AddAsync(new UserExtendedVotingThemeItem
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
        public async Task<List<UserExtendedMessageDTO>> GetMessages(long correspondentId)
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                var r = await _context.DbSet<UserExtendedMessage>()
                    .AsNoTracking()
                    .Where(x => 
                        (x.Recipient.Id == currentUserId && x.Message.Sender.Id == correspondentId) || 
                        (x.Recipient.Id == correspondentId && x.Message.Sender.Id == currentUserId)
                    )
                    .OrderByDescending(x => x.Message.ModifiedAt) // FT: Descending because on the UI we are using 'flex-direction: column-reverse;'
                    .ProjectToType<UserExtendedMessageDTO>(Mapper.UserExtendedMessageToDTOConfig())
                    .ToListAsync();

                return r;
            });
        }

        public async Task SendMessage(SendMessageSaveBodyDTO saveBodyDTO)
        {
            long senderId = _authenticationService.GetCurrentUserId();

            await _context.WithTransactionAsync(async () =>
            {
                UserExtended sender = await GetInstanceAsync<UserExtended, long>(senderId, null);
                UserExtended recipient = await GetInstanceAsync<UserExtended, long>(saveBodyDTO.RecipientId, null);

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
