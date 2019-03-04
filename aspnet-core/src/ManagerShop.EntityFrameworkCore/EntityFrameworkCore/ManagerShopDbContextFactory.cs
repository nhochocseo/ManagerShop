using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using CVD.Configuration;
using CVD.Web;

namespace CVD.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class ManagerShopDbContextFactory : IDesignTimeDbContextFactory<ManagerShopDbContext>
    {
        public ManagerShopDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ManagerShopDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            ManagerShopDbContextConfigurer.Configure(builder, configuration.GetConnectionString(ManagerShopConsts.ConnectionStringName));

            return new ManagerShopDbContext(builder.Options);
        }
    }
}
