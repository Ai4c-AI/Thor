using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Thor.Provider.PostgreSql.Thor
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
                keyValue: new Guid("146dc3ec-7783-4218-986e-8cd8198b66b3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("158d9b7c-cd19-41e5-b23d-dfc5f0df53aa"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1c5bf64a-008b-4ecb-8474-8cbe450c97f3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("200bfbf7-3ca3-45c9-8f78-fe396610e650"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("204b61ca-d4f0-407d-b20d-ea3157cabe58"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("23ab8a9f-be29-4f02-a67b-a8e76912fd71"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2a5b6bc9-ed77-460b-b066-2ede081b97ce"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2b97f85b-fec4-4920-a154-5cd60c76c62f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2c8c4c18-e925-4d50-90f3-683a6edf1624"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2cd76fa2-0979-48e1-a6a9-7faed240c958"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("31be5a5b-b282-43c6-a43f-b083c3d0ab9d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("370446cf-92d1-4ad6-8c7b-06e61bfffc98"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3ec3a288-7838-4866-92f6-4a9da9ae655e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4115033e-aab3-43a2-b41d-b2910cf8c32e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("42b0ce12-119f-4551-b024-db48df2b79f0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4a819f09-af16-45fb-a789-7297e02ad75c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4c0964a9-86c0-4a13-9b50-c974beda9d5c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4d5e83fb-c76a-4103-85ec-30c9a850253b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4d7311b6-8e43-4cc0-b923-a463d0c12812"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4fd92377-70c1-493a-b5e0-47cc5ced8237"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("580c0563-f6a3-43e4-947c-0acf5bca30a1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5a70efab-ab5a-4610-812c-4551ba408330"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5ac106cc-bfbe-4865-b28e-d82b5bd7e0a6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("60bcd31d-f8e8-4d39-ba13-8385f52cc4fb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("61d3cfc8-0229-45db-b6e9-58b61273f45e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("64394954-0cac-455a-a968-37323f4e141f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6cdc68cc-bdf1-45b8-bf06-c97409ff48e1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6ec2d304-07b7-4f6b-a641-be6d80d4ab1f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("748834ef-91fb-40a0-8023-a8415247ede8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7ace8f5c-a783-4d05-b571-79ce430ba6a9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7aec04f8-af5f-4866-9302-ca7840b09cc1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7d7b522d-f215-4a19-af44-6bf0a420e75e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("84f574a8-c058-4cca-be1c-0228936fb703"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8801d416-0f26-4291-8d6d-56cca26482ff"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("89577e5d-717b-407e-8eff-b86057dcbcda"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8a717879-0c6c-4d89-bd01-238e31ca9fd3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8ccefa20-5e71-4e6a-a9e9-70ee5f96d277"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8d02ef12-f63d-49bc-8139-8c6ac91d8e30"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8e6f2be6-92b6-4320-9d3d-5b343354ef78"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("90e27304-2c75-4338-89ca-358780fbdd7e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("918ab058-8ebb-42b4-810d-6c2e84db2e98"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9200b998-e251-4199-95b4-d76a14acf861"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9528441f-f13e-4b1e-9b1c-5f630de551e5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("95729d55-a1d4-43d7-9ac4-dd479452334c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("993e9130-12a9-453b-ab40-e56bedcc9bad"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a0322c5b-aa72-4e97-89e8-05a07b1bdb9e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a77fff10-b221-41f6-822c-34204c70c29d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ac443fa6-fbed-4d7e-b8b3-fa8ffa3ec7ad"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ae0b2977-0648-4809-9104-958add12d148"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ae9f76ea-ac3e-46d1-8600-a84d172ecc1c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("aef9dde7-8905-464b-90c1-e9f81adf9e38"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("af2dcc43-b92a-4286-bc07-ea1be1b11d65"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bb96e585-9f79-4f58-92f3-5383ef535d4e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bea532e7-914b-49c8-93a9-1803ce440320"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("beec9504-232f-488f-98d3-a49a7c85ae56"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c047963d-edfa-49e9-bfb8-397e574e7375"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c5947c00-2286-4c3c-8e59-badea8a137a7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c85fdc28-4982-4579-895f-fae9bdc4813c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("caf74175-ffbb-40db-a0b0-d13ab6aa632c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("cb30eba3-1d4f-428e-9461-48ac8ce668cb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ce2a1a28-97fc-48f7-82bc-bc808f74ee1d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d3132d13-5aef-44a4-a4bd-2d8ed3bad51a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d52a6ee0-bb47-40df-9b50-9f83afeb0cb0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d67b8b13-faa1-4f73-a149-0d400c03e925"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d6fdf1b7-3d0b-4aa0-8020-5a32319a4aa5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ddedf06e-a7cf-48d4-a46a-45866fdb1785"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e3820566-86a0-49d7-9b70-1d64c80f559f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e4084fc5-1369-46d4-90b8-d9c55258a09a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e694fd22-3b2a-4bf9-8471-a121b31156ee"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ebc9adc5-1957-41c7-a866-2f196f13d2bf"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ee9f61a8-2e14-4174-addc-a3b87125c772"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f2572fc6-40e5-4b12-9952-de729b5e9cd4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f3e3d77c-a01f-4cd0-8a6e-e1a7b079e165"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fbe3e765-d038-4622-baa0-919fa21a2114"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fcdc8d72-1829-456c-afd7-01cc050d70f1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fdf9cc66-8558-4b2c-ad55-8f69700a74d8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fef6abb5-73e3-4d76-acc7-08e82dc5680a"));

            migrationBuilder.CreateTable(
                name: "SubscriptionPlans",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    AllowedModels = table.Column<string>(type: "text", nullable: false),
                    DailyQuotaLimit = table.Column<long>(type: "bigint", nullable: false),
                    WeeklyQuotaLimit = table.Column<long>(type: "bigint", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    Tag = table.Column<string>(type: "text", nullable: true),
                    Sort = table.Column<int>(type: "integer", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Creator = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionPurchaseRecords",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    PlanId = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PurchaseTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PaymentStatus = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    TransactionId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ValidFrom = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    ValidTo = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Remarks = table.Column<string>(type: "text", nullable: true),
                    RefundTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    RefundAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    PaymentMethod = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Creator = table.Column<string>(type: "text", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "UserSubscriptions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    PlanId = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    DailyUsedQuota = table.Column<long>(type: "bigint", nullable: false),
                    WeeklyUsedQuota = table.Column<long>(type: "bigint", nullable: false),
                    LastDailyResetDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastWeeklyResetDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AutoRenew = table.Column<bool>(type: "boolean", nullable: false),
                    PurchaseRecordId = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Creator = table.Column<string>(type: "text", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionQuotaUsages",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    SubscriptionId = table.Column<string>(type: "text", nullable: false),
                    ModelName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    QuotaUsed = table.Column<long>(type: "bigint", nullable: false),
                    RequestTokens = table.Column<int>(type: "integer", nullable: false),
                    ResponseTokens = table.Column<int>(type: "integer", nullable: false),
                    TotalTokens = table.Column<int>(type: "integer", nullable: false),
                    UsageTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    RequestIp = table.Column<string>(type: "character varying(45)", maxLength: 45, nullable: true),
                    UserAgent = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    RequestId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsSuccess = table.Column<bool>(type: "boolean", nullable: false),
                    ErrorMessage = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Creator = table.Column<string>(type: "text", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionUpgrades",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    FromSubscriptionId = table.Column<string>(type: "text", nullable: false),
                    FromPlanId = table.Column<string>(type: "text", nullable: false),
                    ToPlanId = table.Column<string>(type: "text", nullable: false),
                    RemainingDays = table.Column<int>(type: "integer", nullable: false),
                    RemainingValue = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    TargetPrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ActualPayAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    UpgradeTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    NewStartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NewEndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NewSubscriptionId = table.Column<string>(type: "text", nullable: true),
                    PaymentRecordId = table.Column<string>(type: "text", nullable: true),
                    Remarks = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Creator = table.Column<string>(type: "text", nullable: true)
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
                        name: "FK_SubscriptionUpgrades_SubscriptionPurchaseRecords_PaymentRec~",
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
                });

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("00d2ae44-95b1-4508-81e6-efb954f7ae70"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3036), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("01685267-0f42-47ab-b948-a5095f67f0c4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2998), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("03633520-f0e4-442b-8474-d9c9461bed0e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2964), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1b628ea1-d28a-404b-9eb8-f0e2cc7b51d5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3020), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1d475e77-1c5d-47bd-ab65-160c4a8b2291"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3022), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1dde2251-4221-4103-a8e4-a9795dd38f6c"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2993), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("206297d6-6a11-45ca-932d-9fe4502143ba"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3020), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2222864a-3503-4a7b-ae19-55659f433423"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2950), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2475b52d-d0b7-4ddf-b60c-6395b5d3c0fb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2973), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("25fe535c-e5e3-4840-b55a-0edbd7ee4683"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3008), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("278ae415-af50-46a9-9394-906321ab06ce"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3009), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("27a4176a-fade-466a-a1b2-46e0559dc216"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2971), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2d35a800-3139-4bd2-bbe5-8c0d98e044a7"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2980), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("33c81e52-7b27-4244-98e9-869442d1deec"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2968), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("349e7d9a-619b-4246-b7ef-38eade74e234"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3032), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("34f746c2-f951-4cb9-a884-4329ebc585e9"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3034), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("3865c5f3-4c30-44ca-8baa-a1a55e67b406"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2953), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("390bf3f7-b862-4ee9-be78-fa8e2c93f28f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2987), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("3978fc04-23fa-4cf2-892f-741ec4f8823e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3000), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3dcffdba-3d62-436f-8fc3-8fb44021d530"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2970), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3f23c9f4-fb01-4235-b320-7fb8f0883541"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2992), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("4087dca7-e617-48a0-a5e4-159e368958c7"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2701), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("426d7379-9137-446c-95ea-477bfcec4aa4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3029), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("46b8af67-e06e-4b56-87e2-364c8404350b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3005), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("4d7d4e18-d47c-42dd-b308-02e4090e27ee"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3000), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4d94478f-8de8-4ea9-bc90-857544f75231"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2988), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("4ea21332-accb-40df-9a49-93f761a5ec19"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3001), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5214e157-bad1-4c23-a957-59842d747264"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2995), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("52e78d31-69d2-49d0-8f77-c0af7efb36a9"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3037), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5873e79d-2f3f-4113-8ce9-5db99895f486"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3035), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("597a22f0-08a2-47ed-b776-4c81824cbca5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2999), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5ffba569-e6fc-4d4e-8c8a-751591330310"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3017), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("619518d4-4aab-438f-a0a8-3ee3f99fbee3"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3027), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("63026992-c427-4874-a9fc-629a011f1e7f"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2979), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("63b47a17-523b-4850-a1bc-d28ee11fbfec"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3012), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6ae9313b-be10-44c6-973d-131cc47d0c93"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3036), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6cb76bd6-d4aa-437e-9761-e614e862fc63"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2967), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("74198007-8402-4af3-b8a7-51bb31af24fb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2954), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("77151cbe-b1fb-4f21-81d4-186628a412e3"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3024), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7a5f9805-bdfa-4d7f-a542-87aa30da0855"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3015), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("80122932-7965-4a61-bb82-36156333ab44"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3023), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("85907d16-9f6e-434d-9ad5-f7c1f494af14"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3023), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("88ccd2a2-ef02-4bca-8983-d7188fbc381a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3007), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("8a8c63b6-4479-4136-abcf-9cb0551fe970"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3027), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("90182f83-fff9-4b7a-b6d2-c722da10901a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2966), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("904b5bc8-db09-49a2-9c35-f4598c65602b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2998), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9bdd6fcf-6430-4e43-8806-5c6c0278ee26"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3002), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a06314b1-33df-4aba-9d0d-deb515c5ecff"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3015), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a7864037-aa04-49ca-9a81-f3800be73773"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3007), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("a8c16aa4-ccd6-46e1-bb50-b7dc2f6d0860"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3002), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a9c08c31-f282-4bde-97ea-5de94a199ab0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3010), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("aadaf61b-259a-4c90-a834-10e6f56e1c83"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2994), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("acd63f4a-0cb5-4030-877e-0311702d3c63"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3031), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("ae042ce9-2a5a-4b52-8920-6a8610d2557f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2984), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b291c75b-5789-4f4f-b0a8-2876f9642364"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2972), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b2d753ec-af00-4ff5-a3ad-3a308fb3354b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2957), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b56138b4-1b0b-4944-9ebe-904c499ef224"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3010), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("bd37add2-b256-4e5c-8e01-368aa6a637f6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3018), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c3ee7e1e-eef7-43cd-a3bc-c2b2bb8226a2"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2980), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c6279b88-7bdd-4e91-a20a-6b0ad5be1aad"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2976), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c8611616-009b-48ca-86c8-6ca4244746ae"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2988), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("ceb7bb39-cd9e-4691-9358-2045d3edbf63"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3029), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("d144000f-2804-4876-a31e-ba894e74d0c2"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3025), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d3b79040-e6a4-411f-af98-01277bee3987"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3030), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("d89bfd2e-8761-4b0f-87af-f6fa5a7c8b35"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2978), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("db36600d-59f8-427d-8e2c-dbe3f0602c84"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3021), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("dfcf5a89-4bea-485a-80fa-90ed171dae70"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2977), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("e030d0b6-529d-4500-b716-e459a6f8dbbc"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2996), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("e1ff9a77-42ae-45ec-bc55-d78ffc7d1ec9"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3013), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e5ddec72-a5b7-4a77-8216-c87ba85f4bb4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2958), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e7418622-752f-46a4-9354-1f5025c4437a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2956), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("eb20cfa7-b0f3-4313-a66c-97479232e9c6"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2981), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ef1ec240-1888-410e-9ef7-44b3c4fe99c4"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3014), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f52ca7de-2d77-40de-b542-e3763b22edf1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3032), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("f7aa459b-d45a-4bce-a684-dd5501f8374a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3016), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f83471cd-b843-47b9-b399-373701b9981c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(3006), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("fc136a37-a7c4-4635-8ada-51865657ad8e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 54, 900, DateTimeKind.Local).AddTicks(2959), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null }
                });

            migrationBuilder.InsertData(
                table: "SubscriptionPlans",
                columns: new[] { "Id", "AllowedModels", "CreatedAt", "Creator", "DailyQuotaLimit", "Description", "Icon", "IsActive", "Level", "Modifier", "Name", "Price", "Sort", "Tag", "Type", "UpdatedAt", "WeeklyQuotaLimit" },
                values: new object[,]
                {
                    { "plan-basic-monthly", "[\"gpt-3.5-turbo\",\"claude-3-haiku\"]", new DateTime(2025, 9, 28, 10, 30, 54, 868, DateTimeKind.Utc).AddTicks(1690), null, 500L, "适合轻度使用者，包含基础AI模型访问权限", null, true, 1, null, "基础套餐", 9.99m, 1, null, 1, null, 2500L },
                    { "plan-enterprise-monthly", "[\"gpt-3.5-turbo\",\"gpt-4\",\"gpt-4-turbo\",\"gpt-5-codex\",\"claude-3-opus\",\"claude-3-sonnet\",\"claude-3-haiku\"]", new DateTime(2025, 9, 28, 10, 30, 54, 868, DateTimeKind.Utc).AddTicks(1844), null, 5000L, "包含最新GPT-5-Codex等顶级模型，无限制使用", null, true, 3, null, "企业套餐", 99.99m, 3, "热门", 1, null, 25000L },
                    { "plan-premium-monthly", "[\"gpt-3.5-turbo\",\"gpt-4\",\"gpt-4-turbo\",\"claude-3-sonnet\",\"claude-3-haiku\"]", new DateTime(2025, 9, 28, 10, 30, 54, 868, DateTimeKind.Utc).AddTicks(1838), null, 2000L, "包含GPT-4和Claude等高级模型，适合专业用户", null, true, 2, null, "高级套餐", 49.99m, 2, "推荐", 1, null, 10000L },
                    { "plan-premium-yearly", "[\"gpt-3.5-turbo\",\"gpt-4\",\"gpt-4-turbo\",\"claude-3-sonnet\",\"claude-3-haiku\"]", new DateTime(2025, 9, 28, 10, 30, 54, 868, DateTimeKind.Utc).AddTicks(1848), null, 2000L, "年付享受8折优惠，包含GPT-4和Claude等高级模型", null, true, 2, null, "高级套餐（年付）", 479.99m, 4, null, 2, null, 10000L }
                });

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 9, 28, 18, 30, 54, 854, DateTimeKind.Local).AddTicks(1373), "sk-Cahewod1wslM4Bg10wQNba9P8JhdThZ7PZMvHE" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 18, 30, 54, 854, DateTimeKind.Local).AddTicks(9707));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 18, 30, 54, 854, DateTimeKind.Local).AddTicks(9331));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 9, 28, 18, 30, 54, 852, DateTimeKind.Local).AddTicks(4957), "1147cfcbb29fb6e81fd3009dae2de3b9", "88f89dba231a40e9a576f35cf6d6d1e0" });

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
                keyValue: new Guid("00d2ae44-95b1-4508-81e6-efb954f7ae70"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("01685267-0f42-47ab-b948-a5095f67f0c4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("03633520-f0e4-442b-8474-d9c9461bed0e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1b628ea1-d28a-404b-9eb8-f0e2cc7b51d5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1d475e77-1c5d-47bd-ab65-160c4a8b2291"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1dde2251-4221-4103-a8e4-a9795dd38f6c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("206297d6-6a11-45ca-932d-9fe4502143ba"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2222864a-3503-4a7b-ae19-55659f433423"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2475b52d-d0b7-4ddf-b60c-6395b5d3c0fb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("25fe535c-e5e3-4840-b55a-0edbd7ee4683"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("278ae415-af50-46a9-9394-906321ab06ce"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("27a4176a-fade-466a-a1b2-46e0559dc216"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2d35a800-3139-4bd2-bbe5-8c0d98e044a7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("33c81e52-7b27-4244-98e9-869442d1deec"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("349e7d9a-619b-4246-b7ef-38eade74e234"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("34f746c2-f951-4cb9-a884-4329ebc585e9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3865c5f3-4c30-44ca-8baa-a1a55e67b406"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("390bf3f7-b862-4ee9-be78-fa8e2c93f28f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3978fc04-23fa-4cf2-892f-741ec4f8823e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3dcffdba-3d62-436f-8fc3-8fb44021d530"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3f23c9f4-fb01-4235-b320-7fb8f0883541"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4087dca7-e617-48a0-a5e4-159e368958c7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("426d7379-9137-446c-95ea-477bfcec4aa4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("46b8af67-e06e-4b56-87e2-364c8404350b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4d7d4e18-d47c-42dd-b308-02e4090e27ee"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4d94478f-8de8-4ea9-bc90-857544f75231"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4ea21332-accb-40df-9a49-93f761a5ec19"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5214e157-bad1-4c23-a957-59842d747264"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("52e78d31-69d2-49d0-8f77-c0af7efb36a9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5873e79d-2f3f-4113-8ce9-5db99895f486"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("597a22f0-08a2-47ed-b776-4c81824cbca5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5ffba569-e6fc-4d4e-8c8a-751591330310"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("619518d4-4aab-438f-a0a8-3ee3f99fbee3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("63026992-c427-4874-a9fc-629a011f1e7f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("63b47a17-523b-4850-a1bc-d28ee11fbfec"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6ae9313b-be10-44c6-973d-131cc47d0c93"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6cb76bd6-d4aa-437e-9761-e614e862fc63"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("74198007-8402-4af3-b8a7-51bb31af24fb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("77151cbe-b1fb-4f21-81d4-186628a412e3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7a5f9805-bdfa-4d7f-a542-87aa30da0855"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("80122932-7965-4a61-bb82-36156333ab44"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("85907d16-9f6e-434d-9ad5-f7c1f494af14"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("88ccd2a2-ef02-4bca-8983-d7188fbc381a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8a8c63b6-4479-4136-abcf-9cb0551fe970"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("90182f83-fff9-4b7a-b6d2-c722da10901a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("904b5bc8-db09-49a2-9c35-f4598c65602b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9bdd6fcf-6430-4e43-8806-5c6c0278ee26"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a06314b1-33df-4aba-9d0d-deb515c5ecff"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a7864037-aa04-49ca-9a81-f3800be73773"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a8c16aa4-ccd6-46e1-bb50-b7dc2f6d0860"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a9c08c31-f282-4bde-97ea-5de94a199ab0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("aadaf61b-259a-4c90-a834-10e6f56e1c83"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("acd63f4a-0cb5-4030-877e-0311702d3c63"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ae042ce9-2a5a-4b52-8920-6a8610d2557f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b291c75b-5789-4f4f-b0a8-2876f9642364"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b2d753ec-af00-4ff5-a3ad-3a308fb3354b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b56138b4-1b0b-4944-9ebe-904c499ef224"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bd37add2-b256-4e5c-8e01-368aa6a637f6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c3ee7e1e-eef7-43cd-a3bc-c2b2bb8226a2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c6279b88-7bdd-4e91-a20a-6b0ad5be1aad"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c8611616-009b-48ca-86c8-6ca4244746ae"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ceb7bb39-cd9e-4691-9358-2045d3edbf63"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d144000f-2804-4876-a31e-ba894e74d0c2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d3b79040-e6a4-411f-af98-01277bee3987"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d89bfd2e-8761-4b0f-87af-f6fa5a7c8b35"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("db36600d-59f8-427d-8e2c-dbe3f0602c84"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("dfcf5a89-4bea-485a-80fa-90ed171dae70"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e030d0b6-529d-4500-b716-e459a6f8dbbc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e1ff9a77-42ae-45ec-bc55-d78ffc7d1ec9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e5ddec72-a5b7-4a77-8216-c87ba85f4bb4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e7418622-752f-46a4-9354-1f5025c4437a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("eb20cfa7-b0f3-4313-a66c-97479232e9c6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ef1ec240-1888-410e-9ef7-44b3c4fe99c4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f52ca7de-2d77-40de-b542-e3763b22edf1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f7aa459b-d45a-4bce-a684-dd5501f8374a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f83471cd-b843-47b9-b399-373701b9981c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fc136a37-a7c4-4635-8ada-51865657ad8e"));

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("146dc3ec-7783-4218-986e-8cd8198b66b3"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1620), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("158d9b7c-cd19-41e5-b23d-dfc5f0df53aa"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1569), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1c5bf64a-008b-4ecb-8474-8cbe450c97f3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1624), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("200bfbf7-3ca3-45c9-8f78-fe396610e650"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1558), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("204b61ca-d4f0-407d-b20d-ea3157cabe58"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1536), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("23ab8a9f-be29-4f02-a67b-a8e76912fd71"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1542), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2a5b6bc9-ed77-460b-b066-2ede081b97ce"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1587), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2b97f85b-fec4-4920-a154-5cd60c76c62f"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1617), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2c8c4c18-e925-4d50-90f3-683a6edf1624"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1622), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2cd76fa2-0979-48e1-a6a9-7faed240c958"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1585), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("31be5a5b-b282-43c6-a43f-b083c3d0ab9d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1566), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("370446cf-92d1-4ad6-8c7b-06e61bfffc98"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1540), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3ec3a288-7838-4866-92f6-4a9da9ae655e"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1604), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4115033e-aab3-43a2-b41d-b2910cf8c32e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1559), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("42b0ce12-119f-4551-b024-db48df2b79f0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1566), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4a819f09-af16-45fb-a789-7297e02ad75c"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1582), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("4c0964a9-86c0-4a13-9b50-c974beda9d5c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1632), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4d5e83fb-c76a-4103-85ec-30c9a850253b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1586), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4d7311b6-8e43-4cc0-b923-a463d0c12812"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1578), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("4fd92377-70c1-493a-b5e0-47cc5ced8237"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1585), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("580c0563-f6a3-43e4-947c-0acf5bca30a1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1557), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5a70efab-ab5a-4610-812c-4551ba408330"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1600), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("5ac106cc-bfbe-4865-b28e-d82b5bd7e0a6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1625), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("60bcd31d-f8e8-4d39-ba13-8385f52cc4fb"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1604), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("61d3cfc8-0229-45db-b6e9-58b61273f45e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1630), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("64394954-0cac-455a-a968-37323f4e141f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1608), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6cdc68cc-bdf1-45b8-bf06-c97409ff48e1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1556), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6ec2d304-07b7-4f6b-a641-be6d80d4ab1f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1588), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("748834ef-91fb-40a0-8023-a8415247ede8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1596), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("7ace8f5c-a783-4d05-b571-79ce430ba6a9"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1593), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7aec04f8-af5f-4866-9302-ca7840b09cc1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1575), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("7d7b522d-f215-4a19-af44-6bf0a420e75e"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1616), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("84f574a8-c058-4cca-be1c-0228936fb703"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1626), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("8801d416-0f26-4291-8d6d-56cca26482ff"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1584), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("89577e5d-717b-407e-8eff-b86057dcbcda"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1631), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8a717879-0c6c-4d89-bd01-238e31ca9fd3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1609), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8ccefa20-5e71-4e6a-a9e9-70ee5f96d277"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1543), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8d02ef12-f63d-49bc-8139-8c6ac91d8e30"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1629), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("8e6f2be6-92b6-4320-9d3d-5b343354ef78"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1554), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("90e27304-2c75-4338-89ca-358780fbdd7e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1628), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("918ab058-8ebb-42b4-810d-6c2e84db2e98"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1263), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9200b998-e251-4199-95b4-d76a14acf861"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1562), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9528441f-f13e-4b1e-9b1c-5f630de551e5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1598), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("95729d55-a1d4-43d7-9ac4-dd479452334c"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1621), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("993e9130-12a9-453b-ab40-e56bedcc9bad"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1564), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a0322c5b-aa72-4e97-89e8-05a07b1bdb9e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1601), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a77fff10-b221-41f6-822c-34204c70c29d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1591), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ac443fa6-fbed-4d7e-b8b3-fa8ffa3ec7ad"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1538), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ae0b2977-0648-4809-9104-958add12d148"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1597), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("ae9f76ea-ac3e-46d1-8600-a84d172ecc1c"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1603), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("aef9dde7-8905-464b-90c1-e9f81adf9e38"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1577), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("af2dcc43-b92a-4286-bc07-ea1be1b11d65"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1602), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("bb96e585-9f79-4f58-92f3-5383ef535d4e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1605), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("bea532e7-914b-49c8-93a9-1803ce440320"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1594), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("beec9504-232f-488f-98d3-a49a7c85ae56"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1576), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("c047963d-edfa-49e9-bfb8-397e574e7375"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1632), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c5947c00-2286-4c3c-8e59-badea8a137a7"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1565), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c85fdc28-4982-4579-895f-fae9bdc4813c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1589), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("caf74175-ffbb-40db-a0b0-d13ab6aa632c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1614), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("cb30eba3-1d4f-428e-9461-48ac8ce668cb"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1572), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ce2a1a28-97fc-48f7-82bc-bc808f74ee1d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1629), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("d3132d13-5aef-44a4-a4bd-2d8ed3bad51a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1567), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d52a6ee0-bb47-40df-9b50-9f83afeb0cb0"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1619), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d67b8b13-faa1-4f73-a149-0d400c03e925"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1600), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("d6fdf1b7-3d0b-4aa0-8020-5a32319a4aa5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1625), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("ddedf06e-a7cf-48d4-a46a-45866fdb1785"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1569), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e3820566-86a0-49d7-9b70-1d64c80f559f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1561), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e4084fc5-1369-46d4-90b8-d9c55258a09a"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1579), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("e694fd22-3b2a-4bf9-8471-a121b31156ee"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1609), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ebc9adc5-1957-41c7-a866-2f196f13d2bf"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1580), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("ee9f61a8-2e14-4174-addc-a3b87125c772"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1596), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("f2572fc6-40e5-4b12-9952-de729b5e9cd4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1573), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f3e3d77c-a01f-4cd0-8a6e-e1a7b079e165"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1595), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("fbe3e765-d038-4622-baa0-919fa21a2114"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1570), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("fcdc8d72-1829-456c-afd7-01cc050d70f1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1607), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fdf9cc66-8558-4b2c-ad55-8f69700a74d8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1615), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fef6abb5-73e3-4d76-acc7-08e82dc5680a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 7, 15, 13, 15, 43, 404, DateTimeKind.Local).AddTicks(1553), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null }
                });

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 7, 15, 13, 15, 43, 363, DateTimeKind.Local).AddTicks(5687), "sk-nIHglI8DQMo8AeVuozU7ICTHKvRnR9WDTrM1qX" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 7, 15, 13, 15, 43, 364, DateTimeKind.Local).AddTicks(6228));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 7, 15, 13, 15, 43, 364, DateTimeKind.Local).AddTicks(5772));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 7, 15, 13, 15, 43, 361, DateTimeKind.Local).AddTicks(5538), "a10d520d2dc7a790927be699cd1a9578", "98ea48f158c849cfa9242eca0b82f289" });
        }
    }
}
