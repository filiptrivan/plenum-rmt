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
    public class UserExtendedVotingThemeItemController : UserExtendedVotingThemeItemBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMTBusinessService _plenumRMTBusinessService;

        public UserExtendedVotingThemeItemController(IApplicationDbContext context, PlenumRMTBusinessService plenumRMTBusinessService, BlobContainerClient blobContainerClient)
            : base(context, plenumRMTBusinessService, blobContainerClient)
        {
            _context = context;
            _plenumRMTBusinessService = plenumRMTBusinessService;
        }

    }
}
