using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace CVD.Controllers
{
    public abstract class ManagerShopControllerBase: AbpController
    {
        protected ManagerShopControllerBase()
        {
            LocalizationSourceName = ManagerShopConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
