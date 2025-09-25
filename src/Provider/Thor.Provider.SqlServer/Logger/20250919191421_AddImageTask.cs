using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Thor.Provider.SqlServer.Logger
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
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TaskId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TaskType = table.Column<int>(type: "int", nullable: false),
                    TaskStatus = table.Column<int>(type: "int", nullable: false),
                    Prompt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrls = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quota = table.Column<long>(type: "bigint", nullable: false),
                    ModelName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TokenName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ChannelId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ChannelName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TotalTime = table.Column<int>(type: "int", nullable: false),
                    IP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserAgent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrganizationId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSuccess = table.Column<bool>(type: "bit", nullable: false),
                    ErrorMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaskParameters = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Progress = table.Column<int>(type: "int", nullable: false),
                    TaskCreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TaskCompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Metadata = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Modifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Creator = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
