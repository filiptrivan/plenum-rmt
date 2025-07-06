using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Attributes.Entity.UI;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.DTO;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Services;

namespace PlenumRMT.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class NotificationController : NotificationBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMTBusinessService _plenumRMT2BusinessService;

        public NotificationController(
            IApplicationDbContext context,
            PlenumRMTBusinessService plenumRMT2BusinessService
        )
            : base(context, plenumRMT2BusinessService)
        {
            _context = context;
            _plenumRMT2BusinessService = plenumRMT2BusinessService;
        }

        [HttpGet]
        [AuthGuard]
        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _plenumRMT2BusinessService.SendNotificationEmail(notificationId, notificationVersion);
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _plenumRMT2BusinessService.DeleteNotificationForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _plenumRMT2BusinessService.MarkNotificationAsReadForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _plenumRMT2BusinessService.MarkNotificationAsUnreadForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        [UIDoNotGenerate]
        public async Task<int> GetUnreadNotificationsCountForCurrentUser()
        {
            return await _plenumRMT2BusinessService.GetUnreadNotificationsCountForCurrentUser();
        }

        [HttpPost]
        [AuthGuard]
        public async Task<PaginatedResultDTO<NotificationDTO>> GetNotificationsForCurrentUser(FilterDTO tableFilterDTO)
        {
            return await _plenumRMT2BusinessService.GetNotificationsForCurrentUser(tableFilterDTO);
        }

    }
}

