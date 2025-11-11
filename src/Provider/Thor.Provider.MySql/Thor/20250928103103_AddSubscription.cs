using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Thor.Provider.MySql.Thor
{
    /// <inheritdoc />
    public partial class AddSubscription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0039c3d0-7764-411c-b160-fb3dd4154265"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0e3b18fa-8775-4343-b767-ee98ca965d1e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1aa9341e-6516-40e6-a824-f0afb0554085"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1c65bb8b-9d97-49d6-b5a0-eaa6e4061027"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1eb56aec-f03c-4b9e-a587-f96adc5a0943"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("23f7229f-a3e0-469f-8b47-7c6d634a919d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("245abedd-25b6-4d00-b7bc-eefe9e39c099"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("290a1043-3063-4086-a7f8-a44309baba17"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2aa7910e-bc59-41e8-8833-6d6591dc4516"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2e0b6dd4-b797-4e5a-86a2-7678a1b24bbe"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("329d6727-ee42-44d1-bab7-f7ce60f2f498"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3418d67b-a30c-4cc8-bc8e-81c743f370eb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3b86af6f-fcf8-4ae9-9c73-54c018d5111c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3cebb604-ff17-47e4-93d1-a25d3a549daa"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4108d94e-29a7-4a04-aaf4-83f33143a588"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4a7da073-f05e-4505-9157-e4070d39f33e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4b0608ef-e4c2-42c5-9e45-dfe91253c664"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4cd7185e-cce3-4a95-8283-a5489da952e5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("56b449f9-895e-4f53-9b58-e67fdf2e6335"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("573d0038-2a76-4f78-8484-e7e632fb54b4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("59eb6371-8f9f-4eb9-bc92-2e0a9b458cd6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5d308a2d-e1ea-4fb9-892e-7c2c7e52bcd8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5f5b842b-694f-493e-805d-f9cf1b3b2ce1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("61baf3c3-6e52-4164-ac94-8d570c81e38f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("67fa9561-77e2-4edb-bdca-0b96a2a33e68"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("68dc046e-4e9f-499f-8df7-873c6b3136e1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("69269abf-795a-46cf-b4cf-806c55d67467"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6cb1b062-8ecd-4950-a4e9-53c21f18a7c5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("73940df6-8b81-48fd-ac47-a1b2a5e70efa"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7bfff9f6-66e6-476d-9574-016e8077b149"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7db8b72a-b39d-49aa-b2eb-a8b20223373d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7e2e0557-1579-4195-a383-5c7fa567f1e4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8384fee9-3ef1-410c-b8e1-32a43879534f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("838af773-4b99-4477-9b55-26cf62af82b4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("84fb7beb-1811-4749-bd44-c4449cd77ef4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("852128d3-af24-46ee-b5cc-691bd86a0a7c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8c61a1b5-12c6-43e8-9700-350a98490391"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("91713774-1d68-4b46-b95c-ba2bc5a940a0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("91b730c6-fcad-46d4-b9f3-b6fe84517e41"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9546d345-77a4-4f2c-acd7-b2ee3da73964"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9a008f32-5d8d-44c1-b09b-4805ecc02882"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9bda30fa-98a0-4d0c-bc29-5dbb5871b5c7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9f277c35-932c-409d-acbb-d3371b86e3e4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9f86b920-606b-4b76-9b3c-66455f58ba88"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a2422698-8487-4414-88c7-1aa43ad504c8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a52764b0-d6d1-46c8-9d9c-50e3366dd6b5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a778f553-e1fc-4463-96be-1d4495a41339"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a8db260a-b8c1-4f49-94ac-c422453340e3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("aa2a4f30-44d3-4a46-89bf-f17e4da95af4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b58fc508-144e-423a-b075-ec479512a6f6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bb7a697d-88ba-45f2-a8d8-2466f66bd2db"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bda20f11-dc72-4936-9182-2db1d6c470e3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c220c969-05ad-4f46-a5e8-5ade10b4ba63"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c3285922-4d1d-4028-b6bf-daead4396249"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c4092067-3903-4c1c-b180-0e31c1efd2d8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c492d74e-771d-4cf9-b704-3b0b1102f2b8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c65717ca-1b79-4537-a37a-30628fa85cc7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("cacea79b-2075-4f79-9f52-91d2019dc1ab"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d248e7c2-1c49-4c90-9f6b-7df7e9cf8fa1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d5078114-03ca-4f2d-9c33-b2cba046495b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d5a6a103-352d-4119-abf9-e7ade83fcd83"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d9900260-007d-444c-a053-7a8b881ca0a5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d9901507-1fb1-4f41-b93c-7c9aa1a1c65e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("dd0a7917-cc48-470e-a24e-ed9b3f3b0f90"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e15e0171-378b-49bd-8975-3613fae1c9cc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e222a8a5-b9d8-4257-9fe2-681285410c83"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e670e8c7-2c82-44fb-96d0-f1d6941c140a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ea3082ed-2554-4f7c-befd-6a180c89b590"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ede4795c-115f-41e7-bba7-81a3567e3ed4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("eeb1a2db-c215-4ff2-801c-4f60466962d7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f37cea7e-64c4-4637-aa50-9f653c4a135e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f638208e-9d9d-4fc4-9e23-cfeecd010bc3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f63ad9f9-eaa8-4f29-90a3-4b677887b095"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f6becd86-6c61-4ca6-8204-f14fea60360e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f85acf6d-6f6c-401e-9a93-cea34d6903f2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fac8f4b0-c097-4b07-ae40-a280274e1f2d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fc39995b-c95d-439f-9c25-c0bf3dbf5624"));

            migrationBuilder.CreateTable(
                name: "SubscriptionPlans",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    AllowedModels = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DailyQuotaLimit = table.Column<long>(type: "bigint", nullable: false),
                    WeeklyQuotaLimit = table.Column<long>(type: "bigint", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Icon = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Tag = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Sort = table.Column<int>(type: "int", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Modifier = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Creator = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionPlans", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SubscriptionPurchaseRecords",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PlanId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PurchaseTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PaymentStatus = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TransactionId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ValidFrom = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ValidTo = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Remarks = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RefundTime = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    RefundAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Modifier = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Creator = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionPurchaseRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubscriptionPurchaseRecords_SubscriptionPlans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubscriptionPurchaseRecords_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserSubscriptions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PlanId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    DailyUsedQuota = table.Column<long>(type: "bigint", nullable: false),
                    WeeklyUsedQuota = table.Column<long>(type: "bigint", nullable: false),
                    LastDailyResetDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastWeeklyResetDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    AutoRenew = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PurchaseRecordId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Modifier = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Creator = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSubscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSubscriptions_SubscriptionPlans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSubscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SubscriptionQuotaUsages",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SubscriptionId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModelName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    QuotaUsed = table.Column<long>(type: "bigint", nullable: false),
                    RequestTokens = table.Column<int>(type: "int", nullable: false),
                    ResponseTokens = table.Column<int>(type: "int", nullable: false),
                    TotalTokens = table.Column<int>(type: "int", nullable: false),
                    UsageTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    RequestIp = table.Column<string>(type: "varchar(45)", maxLength: 45, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserAgent = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequestId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsSuccess = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ErrorMessage = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Modifier = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Creator = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionQuotaUsages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubscriptionQuotaUsages_UserSubscriptions_SubscriptionId",
                        column: x => x.SubscriptionId,
                        principalTable: "UserSubscriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubscriptionQuotaUsages_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SubscriptionUpgrades",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FromSubscriptionId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FromPlanId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ToPlanId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RemainingDays = table.Column<int>(type: "int", nullable: false),
                    RemainingValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TargetPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ActualPayAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UpgradeTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    NewStartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    NewEndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    NewSubscriptionId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PaymentRecordId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Remarks = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Modifier = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Creator = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionUpgrades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubscriptionUpgrades_SubscriptionPlans_FromPlanId",
                        column: x => x.FromPlanId,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubscriptionUpgrades_SubscriptionPlans_ToPlanId",
                        column: x => x.ToPlanId,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubscriptionUpgrades_SubscriptionPurchaseRecords_PaymentReco~",
                        column: x => x.PaymentRecordId,
                        principalTable: "SubscriptionPurchaseRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SubscriptionUpgrades_UserSubscriptions_FromSubscriptionId",
                        column: x => x.FromSubscriptionId,
                        principalTable: "UserSubscriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubscriptionUpgrades_UserSubscriptions_NewSubscriptionId",
                        column: x => x.NewSubscriptionId,
                        principalTable: "UserSubscriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SubscriptionUpgrades_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("035635ab-7be3-446a-823f-5dd571c2615f"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4645), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0420f593-88bb-4271-b817-f257f6a15076"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4676), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("0481abfb-c796-4453-b38e-c7af51d41129"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4596), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("065d1ad4-0024-4806-8f14-285f32bfdeff"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4616), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("0844380e-9d0e-498a-b611-aaa059eb957b"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4600), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("090da47f-60b4-4402-a9c3-995037d0facb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4585), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0c88d5df-1db6-4dff-ac50-9848278419b9"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4664), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0dcb5cf6-388c-4aaa-a545-9192ea0fdc3c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4644), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0e191015-da47-4f9d-aa38-33d037d85c24"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4688), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("12d992da-4624-4b5e-81ed-3e2f2c82bfc3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4655), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("137be7be-590d-4816-a89a-26ff181eb293"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4647), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("16d8f636-e9dc-4d4c-8254-eb39fc3691df"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4620), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1720bf84-11e2-4fce-985b-a01d036aa8cb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4661), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("19bb4f1f-b596-42b0-b5f2-c83651795163"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4570), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1b3603e5-799c-4603-9b09-30a53df05d34"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4588), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("211b8a0c-fc7b-4922-bfc5-5a830ec4afb7"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4594), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("221b1b1f-806f-4cc7-9142-3a29f20173c8"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4615), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("2966cfa6-0371-41c8-81c6-f9788738e4f1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4684), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("2ea9d3a9-c378-49b4-82f3-13f86d11d1f1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4675), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("39bd3443-c0d7-4881-b50f-7d59cbd59542"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4685), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3e7a2a1e-5c6d-4476-82f0-e5bf3ab2d077"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4622), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("48f9eba4-758b-4b4d-8a02-7a23f161e020"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4650), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4a822fed-5ff0-4bc4-8a4f-db1217bf9ca4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4678), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("4ab2c661-644f-451a-b820-d0339d379f41"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4657), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4c9aad05-dac8-494e-aa70-4e2141257a3e"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4609), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("50da2396-2add-4c7a-b9c0-c12f73a46cee"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4671), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("51b9a517-e70e-46fa-a425-7be4f65b2cea"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4619), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("531aa8d5-0396-4130-acb1-089df0b8c63e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4636), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("532c9798-e9ec-4393-81a0-c05c08fb21b2"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4637), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("5aa4135d-4b61-4fb5-b09f-a369d428c0ae"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4633), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("6c0c536d-b2b2-427a-b081-18b780b0f89f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4625), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6c56e913-c445-4378-8791-c57b8e9cd5ab"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4602), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("704472f5-462d-46a4-8a5f-53e2f69f6c4d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4580), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("74c54b43-5629-4e67-bc12-d5d4c687c79e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4681), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("7d8b0cbc-ea6b-4ab7-9e63-8c254caebc4e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4683), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("82282d32-3c74-4d49-b4be-c37e4f9b15ba"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4607), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("833a47b7-139e-4554-b7e1-750bc59c9c45"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4631), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("86f3dea3-14a3-4f81-bf22-6c677ec18c35"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4659), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("88a493fd-5e2b-4101-aa27-afa184905621"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4549), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8deda2d7-376c-4475-aa83-3459e4e76055"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4651), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("911d1bc9-db8f-4bce-8b90-33f5a35e7ced"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4573), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9156ec60-780a-4554-90f0-2e91ca88e643"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4032), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("92dd1f1c-814d-40fe-8e42-fbea8e883dab"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4548), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("987f894a-3427-442a-90cc-12fb04c5d1d0"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4611), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("9b658dcd-2515-43e2-8d2e-88c4251ac136"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4578), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9c83bff4-54aa-46d1-a3c1-d6d154ecd64f"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4670), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a0606845-d022-467b-94c3-67fdef21c22e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4618), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a1f3bd5f-5344-493e-a37b-aa6a7fdeddc4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4541), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a3bde04e-5e0d-4ccc-8a9b-6c0fb6f650ed"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4690), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a942d725-7f19-40a6-ab22-4c6e156e3748"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4593), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ae99c9b1-2475-4c6b-a751-cd5b0887d1e9"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4577), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("aed51794-ecba-4349-806b-add1e0248f3d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4638), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("af39324e-647c-4bb7-82c1-6f5cfdfacc4d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4643), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("b082e979-ec50-4821-8d33-c50203cc66f7"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4665), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b13ff3e8-ace4-4de3-a9f6-2c80b786d9d8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4601), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b3a3f657-b4dc-4b94-a00c-463967a0247e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4686), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b77f9301-187d-4899-a17b-5367e27f8691"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4674), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b7a5a7ab-5b6a-4406-afe5-40cdbd38a866"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4634), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("b94fb736-7a0b-4650-a4ec-a9fa2b701e08"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4649), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("bb73648a-2d67-42bc-aee7-baed48599103"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4673), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c2e60285-2b4f-4a09-a839-157bb67d4c7d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4629), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c2ee8958-0932-4bcc-a5b1-d2ecc6fa27c0"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4606), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("c59deddc-b01c-4cf7-a389-1ea3ac9e3479"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4546), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c8367fef-86f3-48ec-9acb-a60d93264b6e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4572), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c8479f5d-29d4-4198-81b7-c5271eb6e0f0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4576), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("cf3c4011-e72f-44c4-ba28-c461149bd381"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4669), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d52f9147-ede6-489b-a5f5-ede15e0b9b3d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4642), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("d644c766-fad0-4c29-bb31-20ed76c6726a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4632), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("d91ff329-05d2-457c-a067-5d8aeba7aee0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4660), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("dcd42ef3-85e2-441e-9082-5544bf42c086"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4574), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e25473cb-0c86-4a38-9d9a-06954a68a83b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4662), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e9e323c7-2559-414d-ac89-f0f46017f3be"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4589), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("ed5b2762-eb74-4754-b733-d5a375f4776f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4624), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f013c140-fa13-4b65-bca6-e7a9f1fd4768"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4604), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("f10418b5-e424-4878-a598-36b379626815"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4584), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("faeb79bd-fb76-42d3-a165-5093e82102f3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4551), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fbe6c315-f837-4fe4-aeb9-66fa3cb76055"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 31, 2, 719, DateTimeKind.Local).AddTicks(4590), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null }
                });

            migrationBuilder.InsertData(
                table: "SubscriptionPlans",
                columns: new[] { "Id", "AllowedModels", "CreatedAt", "Creator", "DailyQuotaLimit", "Description", "Icon", "IsActive", "Level", "Modifier", "Name", "Price", "Sort", "Tag", "Type", "UpdatedAt", "WeeklyQuotaLimit" },
                values: new object[,]
                {
                    { "plan-basic-monthly", "[\"gpt-3.5-turbo\",\"claude-3-haiku\"]", new DateTime(2025, 9, 28, 10, 31, 2, 657, DateTimeKind.Utc).AddTicks(9338), null, 500L, "适合轻度使用者，包含基础AI模型访问权限", null, true, 1, null, "基础套餐", 9.99m, 1, null, 1, null, 2500L },
                    { "plan-enterprise-monthly", "[\"gpt-3.5-turbo\",\"gpt-4\",\"gpt-4-turbo\",\"gpt-5-codex\",\"claude-3-opus\",\"claude-3-sonnet\",\"claude-3-haiku\"]", new DateTime(2025, 9, 28, 10, 31, 2, 657, DateTimeKind.Utc).AddTicks(9591), null, 5000L, "包含最新GPT-5-Codex等顶级模型，无限制使用", null, true, 3, null, "企业套餐", 99.99m, 3, "热门", 1, null, 25000L },
                    { "plan-premium-monthly", "[\"gpt-3.5-turbo\",\"gpt-4\",\"gpt-4-turbo\",\"claude-3-sonnet\",\"claude-3-haiku\"]", new DateTime(2025, 9, 28, 10, 31, 2, 657, DateTimeKind.Utc).AddTicks(9583), null, 2000L, "包含GPT-4和Claude等高级模型，适合专业用户", null, true, 2, null, "高级套餐", 49.99m, 2, "推荐", 1, null, 10000L },
                    { "plan-premium-yearly", "[\"gpt-3.5-turbo\",\"gpt-4\",\"gpt-4-turbo\",\"claude-3-sonnet\",\"claude-3-haiku\"]", new DateTime(2025, 9, 28, 10, 31, 2, 657, DateTimeKind.Utc).AddTicks(9596), null, 2000L, "年付享受8折优惠，包含GPT-4和Claude等高级模型", null, true, 2, null, "高级套餐（年付）", 479.99m, 4, null, 2, null, 10000L }
                });

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 9, 28, 18, 31, 2, 631, DateTimeKind.Local).AddTicks(1274), "sk-n1d9d0jojFq8vH46rj5iuu67knJ2Fd6qyOKLww" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 18, 31, 2, 632, DateTimeKind.Local).AddTicks(8244));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 18, 31, 2, 632, DateTimeKind.Local).AddTicks(7592));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 9, 28, 18, 31, 2, 628, DateTimeKind.Local).AddTicks(875), "37b7753d4a58993b9f4051d5aa54d025", "170e80596bba497eb4cfc19f3cb5269b" });

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPlans_IsActive",
                table: "SubscriptionPlans",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPlans_Sort",
                table: "SubscriptionPlans",
                column: "Sort");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPlans_Type",
                table: "SubscriptionPlans",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPurchaseRecords_OrderId",
                table: "SubscriptionPurchaseRecords",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPurchaseRecords_PlanId",
                table: "SubscriptionPurchaseRecords",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPurchaseRecords_PurchaseTime",
                table: "SubscriptionPurchaseRecords",
                column: "PurchaseTime");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPurchaseRecords_TransactionId",
                table: "SubscriptionPurchaseRecords",
                column: "TransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPurchaseRecords_UserId_PaymentStatus",
                table: "SubscriptionPurchaseRecords",
                columns: new[] { "UserId", "PaymentStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionQuotaUsages_ModelName",
                table: "SubscriptionQuotaUsages",
                column: "ModelName");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionQuotaUsages_RequestId",
                table: "SubscriptionQuotaUsages",
                column: "RequestId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionQuotaUsages_SubscriptionId_UsageTime",
                table: "SubscriptionQuotaUsages",
                columns: new[] { "SubscriptionId", "UsageTime" });

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionQuotaUsages_UserId_UsageTime",
                table: "SubscriptionQuotaUsages",
                columns: new[] { "UserId", "UsageTime" });

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionUpgrades_FromPlanId",
                table: "SubscriptionUpgrades",
                column: "FromPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionUpgrades_FromSubscriptionId",
                table: "SubscriptionUpgrades",
                column: "FromSubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionUpgrades_NewSubscriptionId",
                table: "SubscriptionUpgrades",
                column: "NewSubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionUpgrades_PaymentRecordId",
                table: "SubscriptionUpgrades",
                column: "PaymentRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionUpgrades_ToPlanId",
                table: "SubscriptionUpgrades",
                column: "ToPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionUpgrades_UpgradeTime",
                table: "SubscriptionUpgrades",
                column: "UpgradeTime");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionUpgrades_UserId_Status",
                table: "SubscriptionUpgrades",
                columns: new[] { "UserId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptions_EndDate",
                table: "UserSubscriptions",
                column: "EndDate");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptions_PlanId",
                table: "UserSubscriptions",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptions_StartDate",
                table: "UserSubscriptions",
                column: "StartDate");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptions_UserId_Status",
                table: "UserSubscriptions",
                columns: new[] { "UserId", "Status" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubscriptionQuotaUsages");

            migrationBuilder.DropTable(
                name: "SubscriptionUpgrades");

            migrationBuilder.DropTable(
                name: "SubscriptionPurchaseRecords");

            migrationBuilder.DropTable(
                name: "UserSubscriptions");

            migrationBuilder.DropTable(
                name: "SubscriptionPlans");

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("035635ab-7be3-446a-823f-5dd571c2615f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0420f593-88bb-4271-b817-f257f6a15076"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0481abfb-c796-4453-b38e-c7af51d41129"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("065d1ad4-0024-4806-8f14-285f32bfdeff"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0844380e-9d0e-498a-b611-aaa059eb957b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("090da47f-60b4-4402-a9c3-995037d0facb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0c88d5df-1db6-4dff-ac50-9848278419b9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0dcb5cf6-388c-4aaa-a545-9192ea0fdc3c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0e191015-da47-4f9d-aa38-33d037d85c24"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("12d992da-4624-4b5e-81ed-3e2f2c82bfc3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("137be7be-590d-4816-a89a-26ff181eb293"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("16d8f636-e9dc-4d4c-8254-eb39fc3691df"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1720bf84-11e2-4fce-985b-a01d036aa8cb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("19bb4f1f-b596-42b0-b5f2-c83651795163"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1b3603e5-799c-4603-9b09-30a53df05d34"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("211b8a0c-fc7b-4922-bfc5-5a830ec4afb7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("221b1b1f-806f-4cc7-9142-3a29f20173c8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2966cfa6-0371-41c8-81c6-f9788738e4f1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2ea9d3a9-c378-49b4-82f3-13f86d11d1f1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("39bd3443-c0d7-4881-b50f-7d59cbd59542"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3e7a2a1e-5c6d-4476-82f0-e5bf3ab2d077"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("48f9eba4-758b-4b4d-8a02-7a23f161e020"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4a822fed-5ff0-4bc4-8a4f-db1217bf9ca4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4ab2c661-644f-451a-b820-d0339d379f41"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4c9aad05-dac8-494e-aa70-4e2141257a3e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("50da2396-2add-4c7a-b9c0-c12f73a46cee"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("51b9a517-e70e-46fa-a425-7be4f65b2cea"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("531aa8d5-0396-4130-acb1-089df0b8c63e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("532c9798-e9ec-4393-81a0-c05c08fb21b2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5aa4135d-4b61-4fb5-b09f-a369d428c0ae"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6c0c536d-b2b2-427a-b081-18b780b0f89f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6c56e913-c445-4378-8791-c57b8e9cd5ab"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("704472f5-462d-46a4-8a5f-53e2f69f6c4d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("74c54b43-5629-4e67-bc12-d5d4c687c79e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7d8b0cbc-ea6b-4ab7-9e63-8c254caebc4e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("82282d32-3c74-4d49-b4be-c37e4f9b15ba"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("833a47b7-139e-4554-b7e1-750bc59c9c45"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("86f3dea3-14a3-4f81-bf22-6c677ec18c35"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("88a493fd-5e2b-4101-aa27-afa184905621"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8deda2d7-376c-4475-aa83-3459e4e76055"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("911d1bc9-db8f-4bce-8b90-33f5a35e7ced"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9156ec60-780a-4554-90f0-2e91ca88e643"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("92dd1f1c-814d-40fe-8e42-fbea8e883dab"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("987f894a-3427-442a-90cc-12fb04c5d1d0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9b658dcd-2515-43e2-8d2e-88c4251ac136"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9c83bff4-54aa-46d1-a3c1-d6d154ecd64f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a0606845-d022-467b-94c3-67fdef21c22e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a1f3bd5f-5344-493e-a37b-aa6a7fdeddc4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a3bde04e-5e0d-4ccc-8a9b-6c0fb6f650ed"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a942d725-7f19-40a6-ab22-4c6e156e3748"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ae99c9b1-2475-4c6b-a751-cd5b0887d1e9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("aed51794-ecba-4349-806b-add1e0248f3d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("af39324e-647c-4bb7-82c1-6f5cfdfacc4d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b082e979-ec50-4821-8d33-c50203cc66f7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b13ff3e8-ace4-4de3-a9f6-2c80b786d9d8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b3a3f657-b4dc-4b94-a00c-463967a0247e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b77f9301-187d-4899-a17b-5367e27f8691"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b7a5a7ab-5b6a-4406-afe5-40cdbd38a866"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b94fb736-7a0b-4650-a4ec-a9fa2b701e08"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bb73648a-2d67-42bc-aee7-baed48599103"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c2e60285-2b4f-4a09-a839-157bb67d4c7d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c2ee8958-0932-4bcc-a5b1-d2ecc6fa27c0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c59deddc-b01c-4cf7-a389-1ea3ac9e3479"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c8367fef-86f3-48ec-9acb-a60d93264b6e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c8479f5d-29d4-4198-81b7-c5271eb6e0f0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("cf3c4011-e72f-44c4-ba28-c461149bd381"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d52f9147-ede6-489b-a5f5-ede15e0b9b3d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d644c766-fad0-4c29-bb31-20ed76c6726a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d91ff329-05d2-457c-a067-5d8aeba7aee0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("dcd42ef3-85e2-441e-9082-5544bf42c086"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e25473cb-0c86-4a38-9d9a-06954a68a83b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e9e323c7-2559-414d-ac89-f0f46017f3be"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ed5b2762-eb74-4754-b733-d5a375f4776f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f013c140-fa13-4b65-bca6-e7a9f1fd4768"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f10418b5-e424-4878-a598-36b379626815"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("faeb79bd-fb76-42d3-a165-5093e82102f3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fbe6c315-f837-4fe4-aeb9-66fa3cb76055"));

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("0039c3d0-7764-411c-b160-fb3dd4154265"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3017), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0e3b18fa-8775-4343-b767-ee98ca965d1e"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3061), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("1aa9341e-6516-40e6-a824-f0afb0554085"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3071), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1c65bb8b-9d97-49d6-b5a0-eaa6e4061027"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3053), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1eb56aec-f03c-4b9e-a587-f96adc5a0943"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3084), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("23f7229f-a3e0-469f-8b47-7c6d634a919d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(2765), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("245abedd-25b6-4d00-b7bc-eefe9e39c099"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3075), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("290a1043-3063-4086-a7f8-a44309baba17"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3037), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2aa7910e-bc59-41e8-8833-6d6591dc4516"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3105), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2e0b6dd4-b797-4e5a-86a2-7678a1b24bbe"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3076), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("329d6727-ee42-44d1-bab7-f7ce60f2f498"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3064), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3418d67b-a30c-4cc8-bc8e-81c743f370eb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3037), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3b86af6f-fcf8-4ae9-9c73-54c018d5111c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3079), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("3cebb604-ff17-47e4-93d1-a25d3a549daa"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3087), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4108d94e-29a7-4a04-aaf4-83f33143a588"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3068), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4a7da073-f05e-4505-9157-e4070d39f33e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3099), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4b0608ef-e4c2-42c5-9e45-dfe91253c664"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3030), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4cd7185e-cce3-4a95-8283-a5489da952e5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3100), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("56b449f9-895e-4f53-9b58-e67fdf2e6335"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3070), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("573d0038-2a76-4f78-8484-e7e632fb54b4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3073), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("59eb6371-8f9f-4eb9-bc92-2e0a9b458cd6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3078), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("5d308a2d-e1ea-4fb9-892e-7c2c7e52bcd8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3069), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5f5b842b-694f-493e-805d-f9cf1b3b2ce1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3042), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("61baf3c3-6e52-4164-ac94-8d570c81e38f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3103), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("67fa9561-77e2-4edb-bdca-0b96a2a33e68"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3081), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("68dc046e-4e9f-499f-8df7-873c6b3136e1"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3052), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("69269abf-795a-46cf-b4cf-806c55d67467"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3101), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("6cb1b062-8ecd-4950-a4e9-53c21f18a7c5"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3050), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("73940df6-8b81-48fd-ac47-a1b2a5e70efa"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3086), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7bfff9f6-66e6-476d-9574-016e8077b149"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3046), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("7db8b72a-b39d-49aa-b2eb-a8b20223373d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3042), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7e2e0557-1579-4195-a383-5c7fa567f1e4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3045), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8384fee9-3ef1-410c-b8e1-32a43879534f"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3093), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("838af773-4b99-4477-9b55-26cf62af82b4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3041), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("84fb7beb-1811-4749-bd44-c4449cd77ef4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3044), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("852128d3-af24-46ee-b5cc-691bd86a0a7c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3110), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8c61a1b5-12c6-43e8-9700-350a98490391"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3058), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("91713774-1d68-4b46-b95c-ba2bc5a940a0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3032), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("91b730c6-fcad-46d4-b9f3-b6fe84517e41"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3063), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("9546d345-77a4-4f2c-acd7-b2ee3da73964"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3065), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9a008f32-5d8d-44c1-b09b-4805ecc02882"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3060), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("9bda30fa-98a0-4d0c-bc29-5dbb5871b5c7"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3075), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("9f277c35-932c-409d-acbb-d3371b86e3e4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3067), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9f86b920-606b-4b76-9b3c-66455f58ba88"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3038), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a2422698-8487-4414-88c7-1aa43ad504c8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3090), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a52764b0-d6d1-46c8-9d9c-50e3366dd6b5"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3094), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a778f553-e1fc-4463-96be-1d4495a41339"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3054), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("a8db260a-b8c1-4f49-94ac-c422453340e3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3043), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("aa2a4f30-44d3-4a46-89bf-f17e4da95af4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3030), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b58fc508-144e-423a-b075-ec479512a6f6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3092), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("bb7a697d-88ba-45f2-a8d8-2466f66bd2db"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3104), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("bda20f11-dc72-4936-9182-2db1d6c470e3"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3051), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c220c969-05ad-4f46-a5e8-5ade10b4ba63"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3045), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c3285922-4d1d-4028-b6bf-daead4396249"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3109), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c4092067-3903-4c1c-b180-0e31c1efd2d8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3072), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("c492d74e-771d-4cf9-b704-3b0b1102f2b8"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3095), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c65717ca-1b79-4537-a37a-30628fa85cc7"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3096), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("cacea79b-2075-4f79-9f52-91d2019dc1ab"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3089), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d248e7c2-1c49-4c90-9f6b-7df7e9cf8fa1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3069), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d5078114-03ca-4f2d-9c33-b2cba046495b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3092), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d5a6a103-352d-4119-abf9-e7ade83fcd83"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3096), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d9900260-007d-444c-a053-7a8b881ca0a5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3080), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("d9901507-1fb1-4f41-b93c-7c9aa1a1c65e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3102), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("dd0a7917-cc48-470e-a24e-ed9b3f3b0f90"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3031), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e15e0171-378b-49bd-8975-3613fae1c9cc"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3055), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("e222a8a5-b9d8-4257-9fe2-681285410c83"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3108), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e670e8c7-2c82-44fb-96d0-f1d6941c140a"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3082), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ea3082ed-2554-4f7c-befd-6a180c89b590"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3049), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ede4795c-115f-41e7-bba7-81a3567e3ed4"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3060), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("eeb1a2db-c215-4ff2-801c-4f60466962d7"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3088), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f37cea7e-64c4-4637-aa50-9f653c4a135e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3088), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f638208e-9d9d-4fc4-9e23-cfeecd010bc3"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3086), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f63ad9f9-eaa8-4f29-90a3-4b677887b095"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3054), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f6becd86-6c61-4ca6-8204-f14fea60360e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3102), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("f85acf6d-6f6c-401e-9a93-cea34d6903f2"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3027), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fac8f4b0-c097-4b07-ae40-a280274e1f2d"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3059), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("fc39995b-c95d-439f-9c25-c0bf3dbf5624"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 50, 733, DateTimeKind.Local).AddTicks(3097), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null }
                });

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 7, 15, 13, 15, 50, 687, DateTimeKind.Local).AddTicks(1478), "sk-U37b8D19fmjReFcRbhjV4DLNFPNwzpuOJmOW3B" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 7, 15, 13, 15, 50, 688, DateTimeKind.Local).AddTicks(6413));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 7, 15, 13, 15, 50, 688, DateTimeKind.Local).AddTicks(5730));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 7, 15, 13, 15, 50, 684, DateTimeKind.Local).AddTicks(7105), "bc06c1e1640d914f1ec3a40f2bdd278c", "990b8a11d7a94a96a4957ca827b7452a" });
        }
    }
}
