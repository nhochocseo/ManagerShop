using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace CVD.EntityFrameworkCore
{
    public static class ManagerShopDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ManagerShopDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ManagerShopDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
