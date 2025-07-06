using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlenumRMT.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class M2MAdditionalKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserVotingThemeItem",
                table: "UserVotingThemeItem");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserVotingThemeItem",
                table: "UserVotingThemeItem",
                columns: new[] { "UserId", "VotingThemeItemId", "VoteTypeId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserVotingThemeItem",
                table: "UserVotingThemeItem");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserVotingThemeItem",
                table: "UserVotingThemeItem",
                columns: new[] { "UserId", "VotingThemeItemId" });
        }
    }
}
