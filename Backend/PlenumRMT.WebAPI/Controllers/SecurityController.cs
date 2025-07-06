using Microsoft.AspNetCore.Mvc;
using Spiderly.Security.Interfaces;
using Spiderly.Security.Services;
using Spiderly.Security.SecurityControllers;
using Spiderly.Shared.Interfaces;
using PlenumRMT.Business.Entities;
using Spiderly.Shared.Attributes;
using PlenumRMT.Business.Services;
using PlenumRMT.Business.DTO;
using Spiderly.Shared.DTO;
using Microsoft.EntityFrameworkCore;
using Spiderly.Shared.Resources;
using Spiderly.Security.DTO;
using Spiderly.Shared.Extensions;

namespace PlenumRMT.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class SecurityController : SecurityBaseController<User>
    {
        private readonly ILogger<SecurityController> _logger;
        private readonly SecurityBusinessService<User> _securityBusinessService;
        private readonly IJwtAuthManager _jwtAuthManagerService;
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;
        private readonly PlenumRMTBusinessService _plenumRMTBusinessService;


        public SecurityController(
            ILogger<SecurityController> logger, 
            SecurityBusinessService<User> securityBusinessService, 
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
