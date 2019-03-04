using Abp.Application.Services;
using Abp.Application.Services.Dto;
using CVD.MultiTenancy.Dto;

namespace CVD.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

