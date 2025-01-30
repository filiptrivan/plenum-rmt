using Microsoft.AspNetCore.Mvc;
using PlenumRMT.Business.Services;
using Spider.Shared.Attributes;
using Spider.Shared.Interfaces;
using Azure.Storage.Blobs;
using Spider.Shared.DTO;
using PlenumRMT.Business.DTO;

namespace PlenumRMT.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class NotificationController : NotificationBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMTBusinessService _plenumRMTBusinessService;

        public NotificationController(IApplicationDbContext context, PlenumRMTBusinessService plenumRMTBusinessService, BlobContainerClient blobContainerClient)
            : base(context, plenumRMTBusinessService, blobContainerClient)
        {
            _context = context;
            _plenumRMTBusinessService = plenumRMTBusinessService;
        }

        [HttpGet]
        [AuthGuard]
        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _plenumRMTBusinessService.SendNotificationEmail(notificationId, notificationVersion);
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _plenumRMTBusinessService.DeleteNotificationForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _plenumRMTBusinessService.MarkNotificationAsReadForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _plenumRMTBusinessService.MarkNotificationAsUnreadForCurrentUser(notificationId, notificationVersion);
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<NotificationDTO>> GetNotificationsForCurrentUser(TableFilterDTO tableFilterDTO)
        {
            return await _plenumRMTBusinessService.GetNotificationsForCurrentUser(tableFilterDTO);
        }

        [HttpGet]
        [AuthGuard]
        public async Task<int> GetUnreadNotificationCountForCurrentUser()
        {
            return await _plenumRMTBusinessService.GetUnreadNotificationCountForCurrentUser();
        }

    }
}
