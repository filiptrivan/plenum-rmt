using Microsoft.AspNetCore.Mvc;
using PlenumRMT.Business.Services;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Interfaces;
using Azure.Storage.Blobs;
using PlenumRMT.Business.DTO;
using PlenumRMT.Business.Entities;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Resources;
using Spiderly.Security.Services;

namespace PlenumRMT.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserController : UserBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly PlenumRMTBusinessService _loyalsBusinessService;
        private readonly AuthenticationService _authenticationService;

        public UserController(IApplicationDbContext context, PlenumRMTBusinessService loyalsBusinessService, AuthenticationService authenticationService)
            : base(context, loyalsBusinessService)
        {
            _context = context;
            _loyalsBusinessService = loyalsBusinessService;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<UserDTO> GetCurrentUser()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _loyalsBusinessService.GetUserDTO(userId, false);
        }

    }
}
