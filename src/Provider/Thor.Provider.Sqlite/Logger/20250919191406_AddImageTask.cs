using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Thor.Provider.Logger
{
    /// <inheritdoc />
    public partial class AddImageTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ImageTaskLoggers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    TaskId = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TaskType = table.Column<int>(type: "INTEGER", nullable: false),
                    TaskStatus = table.Column<int>(type: "INTEGER", nullable: false),
                    Prompt = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrls = table.Column<string>(type: "TEXT", nullable: true),
                    Quota = table.Column<long>(type: "INTEGER", nullable: false),
                    ModelName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TokenName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    ChannelId = table.Column<string>(type: "TEXT", nullable: true),
                    ChannelName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    TotalTime = table.Column<int>(type: "INTEGER", nullable: false),
                    IP = table.Column<string>(type: "TEXT", nullable: true),
                    UserAgent = table.Column<string>(type: "TEXT", nullable: true),
                    OrganizationId = table.Column<string>(type: "TEXT", nullable: true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    IsSuccess = table.Column<bool>(type: "INTEGER", nullable: false),
                    ErrorMessage = table.Column<string>(type: "TEXT", nullable: true),
                    TaskParameters = table.Column<string>(type: "TEXT", nullable: true),
                    Progress = table.Column<int>(type: "INTEGER", nullable: false),
                    TaskCreatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    TaskCompletedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Metadata = table.Column<string>(type: "TEXT", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Modifier = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Creator = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageTaskLoggers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_ChannelId",
                table: "ImageTaskLoggers",
                column: "ChannelId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_CreatedAt",
                table: "ImageTaskLoggers",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_Creator",
                table: "ImageTaskLoggers",
                column: "Creator");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_ModelName",
                table: "ImageTaskLoggers",
                column: "ModelName");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_OrganizationId",
                table: "ImageTaskLoggers",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_TaskId",
                table: "ImageTaskLoggers",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_TaskStatus",
                table: "ImageTaskLoggers",
                column: "TaskStatus");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_TaskType",
                table: "ImageTaskLoggers",
                column: "TaskType");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_UserId",
                table: "ImageTaskLoggers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageTaskLoggers_UserName",
                table: "ImageTaskLoggers",
                column: "UserName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImageTaskLoggers");
        }
    }
}
