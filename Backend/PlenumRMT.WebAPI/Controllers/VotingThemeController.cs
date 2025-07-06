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
    public class VotingThemeController : VotingThemeBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMTBusinessService _plenumRMTBusinessService;

        public VotingThemeController(IApplicationDbContext context, PlenumRMTBusinessService plenumRMTBusinessService)
            : base(context, plenumRMTBusinessService)
        {
            _context = context;
            _plenumRMTBusinessService = plenumRMTBusinessService;
        }

        [HttpGet]
        [AuthGuard]
        public async Task<List<VotingThemeItemDTO>> GetVotingThemeItemListForDisplay(long votingThemeId)
        {
            return await _plenumRMTBusinessService.GetVotingThemeItemListForDisplay(votingThemeId);
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task Vote(long votingThemeId, int voteTypeId)
        {
            await _plenumRMTBusinessService.Vote(votingThemeId, voteTypeId);
        }
    }
}
