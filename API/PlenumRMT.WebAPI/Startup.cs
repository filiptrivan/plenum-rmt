using LightInject;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Extensions;
using PlenumRMT.WebAPI.DI;
using PlenumRMT.Infrastructure;
using Quartz;

public class Startup
{
    public static string _jsonConfigurationFile = "appsettings.json";
    private readonly IHostEnvironment _hostEnvironment;

    public Startup(IConfiguration configuration, IHostEnvironment hostEnvironment)
    {
        Configuration = configuration;
        _hostEnvironment = hostEnvironment;

        if (_hostEnvironment.IsStaging())
            _jsonConfigurationFile = "appsettings.Staging.json";
        else if (_hostEnvironment.IsProduction())
            _jsonConfigurationFile = "appsettings.Production.json";

        PlenumRMT.WebAPI.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<PlenumRMT.WebAPI.Settings>(_jsonConfigurationFile);
        PlenumRMT.Business.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<PlenumRMT.Business.Settings>(_jsonConfigurationFile);
        Soft.Generator.Infrastructure.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Soft.Generator.Infrastructure.Settings>(_jsonConfigurationFile);
        Soft.Generator.Security.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Soft.Generator.Security.Settings>(_jsonConfigurationFile);
        Soft.Generator.Shared.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Soft.Generator.Shared.Settings>(_jsonConfigurationFile);
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.SoftConfigureServices<PlenumRMTApplicationDbContext>();
    }

    public void ConfigureContainer(IServiceContainer container)
    {
        // Register container (AntiPattern)
        container.RegisterInstance(typeof(IServiceContainer), container);

        // Init WebAPI
        container.RegisterFrom<CompositionRoot>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.SoftConfigure(env);
    }
}
