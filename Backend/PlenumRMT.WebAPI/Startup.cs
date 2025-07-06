using LightInject;
using Spiderly.Shared.Helpers;
using Spiderly.Shared.Extensions;
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
        Spiderly.Infrastructure.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spiderly.Infrastructure.Settings>(_jsonConfigurationFile);
        Spiderly.Security.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spiderly.Security.Settings>(_jsonConfigurationFile);
        Spiderly.Shared.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spiderly.Shared.Settings>(_jsonConfigurationFile);
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.SpiderlyConfigureServices<PlenumRMTApplicationDbContext>();

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
        app.UseCors(builder =>
        {
            builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins(new[] { PlenumRMT.WebAPI.SettingsProvider.Current.FrontendUrl })
                .WithExposedHeaders("Content-Disposition"); // Allows frontend to access the 'Content-Disposition' header to retrieve the Excel file name
        });

        app.SpiderlyConfigure(env);

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<ChatHub>("api/hubs/messages");
            endpoints.MapControllers();
        });
    }
}
