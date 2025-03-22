using Microsoft.AspNetCore.Mvc;
using Spider.Security.Interfaces;
using Spider.Security.Services;
using Spider.Security.SecurityControllers;
using Spider.Shared.Interfaces;
using PlenumRMT.Business.Entities;
using Spider.Shared.Attributes;
using PlenumRMT.Business.Services;
using PlenumRMT.Business.DTO;
using Spider.Shared.DTO;
using Microsoft.EntityFrameworkCore;
using Spider.Shared.Resources;
using Spider.Security.DTO;
using Spider.Shared.Extensions;

namespace PlenumRMT.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class SecurityController : SecurityBaseController<UserExtended>
    {
        private readonly ILogger<SecurityController> _logger;
        private readonly SecurityBusinessService<UserExtended> _securityBusinessService;
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly PlenumRMTBusinessService _plenumRMTBusinessService;


        public SecurityController(
            ILogger<SecurityController> logger, 
            SecurityBusinessService<UserExtended> securityBusinessService, 
            IJwtAuthManager jwtAuthManagerService, 
            IApplicationDbContext context, 
            AuthenticationService authenticationService,
            AuthorizationService authorizationService,
            PlenumRMTBusinessService plenumRMTBusinessService
        )
            : base(securityBusinessService, jwtAuthManagerService, context, authenticationService, authorizationService)
        {
            _logger = logger;
            _securityBusinessService = securityBusinessService;
            _jwtAuthManagerService = jwtAuthManagerService;
            _context = context;
            _authenticationService = authenticationService;
            _plenumRMTBusinessService = plenumRMTBusinessService;
        }

    }
}
