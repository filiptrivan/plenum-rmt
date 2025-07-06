using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlenumRMT.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class M2MUserToRecipientNameChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMessage_User_UserId",
                table: "UserMessage");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserMessage",
                newName: "RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessage_User_RecipientId",
                table: "UserMessage",
                column: "RecipientId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMessage_User_RecipientId",
                table: "UserMessage");

            migrationBuilder.RenameColumn(
                name: "RecipientId",
                table: "UserMessage",
                newName: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessage_User_UserId",
                table: "UserMessage",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
