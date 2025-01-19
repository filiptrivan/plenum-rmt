using Microsoft.AspNetCore.Mvc;
using PlenumRMT.Business.Services;
using Soft.Generator.Shared.Attributes;
using Soft.Generator.Shared.Interfaces;
using Azure.Storage.Blobs;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using Soft.Generator.Shared.DTO;
using Soft.Generator.Shared.Terms;
using Soft.Generator.Security.Services;

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
        public async Task<UserExtendedDTO> GetCurrentUser()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _loyalsBusinessService.GetUserExtendedDTOAsync(userId);
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<List<string>> GetCurrentUserPermissionCodes()
        {
            return await _loyalsBusinessService.GetCurrentUserPermissionCodes(); // FT: Not authorizing because we are reading this from the jwt token
        }

    }
}
