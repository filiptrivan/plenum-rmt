using LightInject;
using Spider.Shared.Helpers;
using Spider.Shared.Extensions;
using PlenumRMT.WebAPI.DI;
using PlenumRMT.Infrastructure;
using PlenumRMT.Business.SignalRHubs;

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
        Spider.Infrastructure.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spider.Infrastructure.Settings>(_jsonConfigurationFile);
        Spider.Security.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spider.Security.Settings>(_jsonConfigurationFile);
        Spider.Shared.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spider.Shared.Settings>(_jsonConfigurationFile);
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.SpiderConfigureServices<PlenumRMTApplicationDbContext>();

        services.AddSignalR(options =>
        {
            options.EnableDetailedErrors = true;
        });
    }

    public void ConfigureContainer(IServiceContainer container)
    {
        container.RegisterInstance(container);

        container.RegisterFrom<CompositionRoot>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.SpiderConfigure(env);

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<ChatHub>("api/hubs/messages");
            endpoints.MapControllers();
        });
    }
}
