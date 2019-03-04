using System.Threading.Tasks;
using CVD.Configuration.Dto;

namespace CVD.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
