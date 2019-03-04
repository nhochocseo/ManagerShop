using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using CVD.Configuration.Dto;

namespace CVD.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : AppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
