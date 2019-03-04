using System.Threading.Tasks;
using Abp.Application.Services;
using CVD.Authorization.Accounts.Dto;

namespace CVD.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
