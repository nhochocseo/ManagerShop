using Microsoft.AspNetCore.Antiforgery;
using CVD.Controllers;

namespace CVD.Web.Host.Controllers
{
    public class AntiForgeryController : ManagerShopControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
