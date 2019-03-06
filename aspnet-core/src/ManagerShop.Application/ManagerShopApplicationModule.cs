using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CVD.Authorization;
using CVD.ManagerShops.Projects;

namespace CVD
{
    [DependsOn(
        typeof(ManagerShopCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ManagerShopApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ManagerShopAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ManagerShopApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            //Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            //    cfg => cfg.AddProfiles(thisAssembly)
            //);

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(ProjectMapper.CreateMappings);
        }
    }
}
