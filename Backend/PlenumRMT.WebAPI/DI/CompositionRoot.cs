using LightInject;
using Spiderly.Security.Interfaces;
using Spiderly.Shared.Excel;
using Spiderly.Security.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using Spiderly.Shared.FluentValidation;
using Spiderly.Shared.Emailing;
using PlenumRMT.Business.Services;
using PlenumRMT.Business.Entities;
using PlenumRMT.Shared.FluentValidation;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.Services;

namespace PlenumRMT.WebAPI.DI
{
    public class CompositionRoot : ICompositionRoot
    {
        public virtual void Compose(IServiceRegistry registry)
        {
            #region Spiderly

            registry.Register<AuthenticationService>();
            registry.Register<AuthorizationService>();
            registry.Register<SecurityBusinessService<User>>();
            registry.Register<Spiderly.Security.Services.BusinessServiceGenerated<User>>();
            registry.Register<Spiderly.Security.Services.AuthorizationBusinessService<User>>();
            registry.Register<Spiderly.Security.Services.AuthorizationBusinessServiceGenerated<User>>();
            registry.Register<ExcelService>();
            registry.Register<EmailingService>();
            registry.Register<IFileManager, DiskStorageService>();
            registry.RegisterSingleton<IConfigureOptions<MvcOptions>, TranslatePropertiesConfiguration>();
            registry.RegisterSingleton<IJwtAuthManager, JwtAuthManagerService>();

            #endregion

            #region Business

            registry.Register<PlenumRMT.Business.Services.PlenumRMTBusinessService>();
            registry.Register<PlenumRMT.Business.Services.BusinessServiceGenerated>();
            registry.Register<PlenumRMT.Business.Services.AuthorizationBusinessService>();
            registry.Register<PlenumRMT.Business.Services.AuthorizationBusinessServiceGenerated>();

            #endregion
        }
    }
}
