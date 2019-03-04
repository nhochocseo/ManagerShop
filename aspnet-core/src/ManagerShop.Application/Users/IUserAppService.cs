using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using CVD.Roles.Dto;
using CVD.Users.Dto;

namespace CVD.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
