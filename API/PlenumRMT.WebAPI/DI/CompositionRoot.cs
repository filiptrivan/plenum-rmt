using LightInject;
using Soft.Generator.Security.Interface;
using Soft.Generator.Shared.Excel;
using Soft.Generator.Security.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using Soft.Generator.Shared.SoftFluentValidation;
using Soft.Generator.Shared.Emailing;
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
            registry.Register<Soft.Generator.Security.Services.SecurityBusinessService<UserExtended>>();
            registry.Register<Soft.Generator.Security.Services.BusinessServiceGenerated<UserExtended>>();
            registry.Register<Soft.Generator.Security.Services.AuthorizationBusinessService<UserExtended>>();
            registry.Register<Soft.Generator.Security.Services.AuthorizationBusinessServiceGenerated>();
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
