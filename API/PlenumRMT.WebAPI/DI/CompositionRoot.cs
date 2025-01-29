using LightInject;
using Spider.Security.Interface;
using Spider.Shared.Excel;
using Spider.Security.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using Spider.Shared.FluentValidation;
using Spider.Shared.Emailing;
using PlenumRMT.Business.Services;
using PlenumRMT.Business.Entities;

namespace PlenumRMT.WebAPI.DI
{
    public class CompositionRoot : ICompositionRoot
    {
        public virtual void Compose(IServiceRegistry registry)
        {
            // Framework
            registry.Register<AuthenticationService>();
            registry.Register<AuthorizationService>();
            registry.Register<Spider.Security.Services.SecurityBusinessService<UserExtended>>();
            registry.Register<Spider.Security.Services.BusinessServiceGenerated<UserExtended>>();
            registry.Register<Spider.Security.Services.AuthorizationBusinessService<UserExtended>>();
            registry.Register<Spider.Security.Services.AuthorizationBusinessServiceGenerated>();
            registry.Register<ExcelService>();
            registry.Register<EmailingService>();
            registry.RegisterSingleton<IConfigureOptions<MvcOptions>, TranslatePropertiesConfiguration>();
            registry.RegisterSingleton<IJwtAuthManager, JwtAuthManagerService>();

            // Business
            registry.Register<PlenumRMT.Business.Services.PlenumRMTBusinessService>();
            registry.Register<PlenumRMT.Business.Services.BusinessServiceGenerated>();
            registry.Register<PlenumRMT.Business.Services.AuthorizationBusinessService>();
            registry.Register<PlenumRMT.Business.Services.AuthorizationBusinessServiceGenerated>();
        }
    }
}
