using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerShop.Migrations
{
    public partial class UpdateData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ManagerShopItems_ManagerShops_ManagerShopId",
                table: "ManagerShopItems");

            migrationBuilder.DropTable(
                name: "ManagerShops");

            migrationBuilder.DropIndex(
                name: "IX_ManagerShopItems_ManagerShopId",
                table: "ManagerShopItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ManagerShops",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApprovedDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    MemberId = table.Column<long>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManagerShops", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ManagerShops_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ManagerShopItems_ManagerShopId",
                table: "ManagerShopItems",
                column: "ManagerShopId");

            migrationBuilder.CreateIndex(
                name: "IX_ManagerShops_MemberId",
                table: "ManagerShops",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_ManagerShopItems_ManagerShops_ManagerShopId",
                table: "ManagerShopItems",
                column: "ManagerShopId",
                principalTable: "ManagerShops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
