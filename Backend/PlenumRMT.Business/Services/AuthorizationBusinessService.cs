using Azure.Storage.Blobs;
using Spiderly.Security.Services;
using Spiderly.Shared.Interfaces;

namespace PlenumRMT.Business.Services
{
    public class AuthorizationBusinessService : AuthorizationBusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly AuthenticationService _authenticationService;

        public AuthorizationBusinessService(IApplicationDbContext context, AuthenticationService authenticationService)
            : base(context, authenticationService)
        {
            _context = context;
            _authenticationService = authenticationService;
        }

    }
}
