using Microsoft.AspNetCore.Mvc;
using PlenumRMT.Business.Services;
using Spider.Shared.Attributes;
using Spider.Shared.Interfaces;
using Azure.Storage.Blobs;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using Spider.Shared.DTO;
using Spider.Shared.Resources;
using Spider.Security.Services;

namespace PlenumRMT.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserExtendedController : UserExtendedBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMTBusinessService _loyalsBusinessService;
        private readonly AuthenticationService _authenticationService;

        public UserExtendedController(IApplicationDbContext context, PlenumRMTBusinessService loyalsBusinessService, BlobContainerClient blobContainerClient, AuthenticationService authenticationService)
            : base(context, loyalsBusinessService, blobContainerClient)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<UserExtendedDTO> GetCurrentUserExtended()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _loyalsBusinessService.GetUserExtendedDTO(userId, false);
        }

    }
}
