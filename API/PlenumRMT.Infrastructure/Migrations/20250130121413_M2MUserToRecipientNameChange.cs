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
                name: "FK_UserExtendedMessage_User_UserId",
                table: "UserExtendedMessage");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserExtendedMessage",
                newName: "RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserExtendedMessage_User_RecipientId",
                table: "UserExtendedMessage",
                column: "RecipientId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserExtendedMessage_User_RecipientId",
                table: "UserExtendedMessage");

            migrationBuilder.RenameColumn(
                name: "RecipientId",
                table: "UserExtendedMessage",
                newName: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserExtendedMessage_User_UserId",
                table: "UserExtendedMessage",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
