using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using Spider.Shared.Attributes;
using Spider.Shared.DTO;
using Spider.Shared.Helpers;
using Spider.Shared.Interfaces;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using PlenumRMT.Business.Services;
using PlenumRMT.Shared.Terms;

namespace PlenumRMT.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class MessageController : MessageBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMTBusinessService _plenumRMTBusinessService;

        public MessageController(IApplicationDbContext context, PlenumRMTBusinessService plenumRMTBusinessService, BlobContainerClient blobContainerClient)
            : base(context, plenumRMTBusinessService, blobContainerClient)
        {
            _context = context;
            _plenumRMTBusinessService = plenumRMTBusinessService;
        }

        [HttpPut]
        [AuthGuard]
        [SkipSpinner]
        public async Task SendMessage(SendMessageSaveBodyDTO saveBodyDTO)
        {
            await _plenumRMTBusinessService.SendMessage(saveBodyDTO);
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<List<UserExtendedMessageDTO>> GetMessages(long correspondentId)
        {
            return await _plenumRMTBusinessService.GetMessages(correspondentId);
        }
    }
}
