using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CVD.Configuration;

namespace CVD.Web.Host.Startup
{
    [DependsOn(
       typeof(ManagerShopWebCoreModule))]
    public class ManagerShopWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ManagerShopWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ManagerShopWebHostModule).GetAssembly());
        }
    }
}
