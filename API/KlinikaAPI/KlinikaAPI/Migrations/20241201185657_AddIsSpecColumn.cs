using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KlinikaAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddIsSpecColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSpec",
                table: "Doctors",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSpec",
                table: "Doctors");
        }
    }
}
