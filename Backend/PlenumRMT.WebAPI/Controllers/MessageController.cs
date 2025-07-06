using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Helpers;
using Spiderly.Shared.Interfaces;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using PlenumRMT.Business.Services;
using PlenumRMT.Shared.Resources;

namespace PlenumRMT.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class MessageController : MessageBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMTBusinessService _plenumRMTBusinessService;

        public MessageController(IApplicationDbContext context, PlenumRMTBusinessService plenumRMTBusinessService)
            : base(context, plenumRMTBusinessService)
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
        public async Task<List<UserMessageDTO>> GetMessages(long correspondentId)
        {
            return await _plenumRMTBusinessService.GetMessages(correspondentId);
        }
    }
}
