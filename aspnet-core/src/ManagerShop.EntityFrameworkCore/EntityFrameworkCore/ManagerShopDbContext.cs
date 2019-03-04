using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using CVD.Authorization.Roles;
using CVD.Authorization.Users;
using CVD.MultiTenancy;
using CVD.Entities;

namespace CVD.EntityFrameworkCore
{
    public class ManagerShopDbContext : AbpZeroDbContext<Tenant, Role, User, ManagerShopDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectCustomer> ProjectCustomers { get; set; }
        public DbSet<ProjectMember> ProjectMembers { get; set; }
        public DbSet<ProjectRole> ProjectRoles { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<ProjectTask> TaskProjects { get; set; }
        public DbSet<ManagerShop> ManagerShops { get; set; }
        public DbSet<ManagerShopItem> ManagerShopItems { get; set; }

        public ManagerShopDbContext(DbContextOptions<ManagerShopDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // project
            modelBuilder.Entity<Project>().HasMany<ProjectCustomer>(g => g.ProjectCustomers);
            modelBuilder.Entity<Project>().HasMany<ProjectMember>(g => g.ProjectMembers);
            modelBuilder.Entity<Project>().HasMany<ProjectTask>(g => g.ProjectTasks);
            // Customer
            modelBuilder.Entity<Customer>().HasMany<ProjectCustomer>(g => g.ProjectCustomers);

            // Member
            modelBuilder.Entity<Member>().HasMany<ProjectMember>(g => g.ProjectMembers);
            modelBuilder.Entity<Member>().HasMany<ManagerShop>(g => g.ManagerShops);

            // ManagerShop
            modelBuilder.Entity<ManagerShop>().HasMany<ManagerShopItem>(g => g.ManagerShopItems);

            //ManagerShop Item
            //modelBuilder.Entity<ManagerShopItem>()
            //.HasOne<ManagerShop>(s => s.ManagerShop);
        }
    }
}
