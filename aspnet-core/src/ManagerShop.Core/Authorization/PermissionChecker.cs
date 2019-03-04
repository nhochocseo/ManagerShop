using Abp.Authorization;
using CVD.Authorization.Roles;
using CVD.Authorization.Users;

namespace CVD.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
