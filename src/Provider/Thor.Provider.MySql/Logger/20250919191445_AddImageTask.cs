using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Thor.Provider.MySql.Logger
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
                    Id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TaskId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TaskType = table.Column<int>(type: "int", nullable: false),
                    TaskStatus = table.Column<int>(type: "int", nullable: false),
                    Prompt = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ImageUrls = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quota = table.Column<long>(type: "bigint", nullable: false),
                    ModelName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TokenName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ChannelId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ChannelName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalTime = table.Column<int>(type: "int", nullable: false),
                    IP = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserAgent = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrganizationId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Url = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsSuccess = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ErrorMessage = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TaskParameters = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Progress = table.Column<int>(type: "int", nullable: false),
                    TaskCreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    TaskCompletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Metadata = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Modifier = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Creator = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageTaskLoggers", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

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
