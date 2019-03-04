using System.Threading.Tasks;
using Abp.Application.Services;
using CVD.Sessions.Dto;

namespace CVD.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
