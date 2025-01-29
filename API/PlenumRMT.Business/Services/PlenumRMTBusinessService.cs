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

        #endregion

        #region Voting Theme

        public async Task<TableResponseDTO<VotingThemeDTO>> GetVotingThemeListForDisplay(TableFilterDTO tableFilterDTO)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                List<VotingThemeDTO> votingThemeDTOList = new List<VotingThemeDTO>();

                IQueryable<VotingTheme> votingThemeQuery = _context.DbSet<VotingTheme>();

                int count = await votingThemeQuery.CountAsync();

                List<VotingTheme> votingThemeList = await GetVotingThemeList(votingThemeQuery
                    .AsNoTracking()
                    .Include(x => x.VotingThemeItems)
                        .ThenInclude(x => x.UsersVoted)
                            .ThenInclude(x => x.VoteType)
                    .OrderByDescending(x => x.CreatedAt)
                    .Skip(tableFilterDTO.First)
                    .Take(tableFilterDTO.Rows)
                    , false);

                foreach (VotingTheme votingTheme in votingThemeList)
                {
                    VotingThemeDTO votingThemeDTO = votingTheme.Adapt<VotingThemeDTO>(Mapper.VotingThemeToDTOConfig());
                    votingThemeDTO.VotingThemeItemsDTOList = new List<VotingThemeItemDTO>();

                    foreach (VotingThemeItem votingThemeItem in votingTheme.VotingThemeItems.OrderBy(x => x.OrderNumber))
                    {
                        VotingThemeItemDTO votingThemeItemDTO = votingThemeItem.Adapt<VotingThemeItemDTO>(Mapper.VotingThemeItemToDTOConfig());
                        votingThemeItemDTO.UsersVotedDTOList = new List<UserExtendedVotingThemeItemDTO>();

                        foreach (UserExtendedVotingThemeItem userVoted in votingThemeItem.UsersVoted)
                        {
                            UserExtendedVotingThemeItemDTO userVotedDTO = userVoted.Adapt<UserExtendedVotingThemeItemDTO>(Mapper.UserExtendedVotingThemeItemToDTOConfig());
                            votingThemeItemDTO.UsersVotedDTOList.Add(userVotedDTO);
                        }

                        votingThemeDTO.VotingThemeItemsDTOList.Add(votingThemeItemDTO);
                    }

                    votingThemeDTOList.Add(votingThemeDTO);
                }

                TableResponseDTO<VotingThemeDTO> votingThemeTableResponse = new TableResponseDTO<VotingThemeDTO>
                {
                    Data = votingThemeDTOList,
                    TotalRecords = count,
                };

                return votingThemeTableResponse;
            });
        }

        #endregion
    }
}
