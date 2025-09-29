using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Thor.Provider.SqlServer.Thor
{
    /// <inheritdoc />
    public partial class AddGroups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("00783b40-b430-4f9a-994d-be350e217899"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0111f86b-8c0a-4740-9e5a-de35f2ee6a20"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("013f6162-1c89-4beb-89fb-4a43600cab82"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("018257d4-7c09-4842-8e94-cbcbf88a8812"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("021cdfc8-29b3-4f97-b087-7de5c4bd6867"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("02fcb631-61e7-4da8-b826-33365f011800"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("03ebf27f-c76d-43d2-a0ad-b0f66513083a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0720c3db-c019-4c51-b243-38384f0fd85f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("08233514-51b0-4a5b-9070-2eb519ace8a3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0a53a86f-b609-42b3-b059-d675c86cd2e5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("10ca6500-6b11-45ec-87f0-7d89744926ba"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("145d7654-36d8-4fc4-a4fa-ade0cd60110c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("18083687-818f-40e9-9f11-b193427f588b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("189f510d-2e4b-41bc-a58f-3920f77f720a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1ead0714-ac95-4738-a55f-6f65ff8af5d2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1ec8fdad-8910-463c-b264-c995832b2cff"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("21b8389b-87d4-4006-b9c4-a0766efa027c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2988105f-7631-45c7-af59-ad69229709a0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2e4a350a-8e20-4a84-8327-ad3af9ba8ffa"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("309d4c54-273c-4c41-9915-c4a6f2672a43"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("374175de-0c90-465d-8fc8-5cf6ed316730"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("37b70c3e-41f7-4d27-a7c0-f083b585b03f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("38ab681f-ee22-469a-bb63-ace783117575"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("39ff5084-d223-412d-8996-970a77c79265"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3ce72f59-a265-473f-b7dc-bc43c1dfe206"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3e2dfbea-ba66-46bd-8bc5-efcdc45ff399"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5117e494-a82f-4b18-99c8-7b1be5dc61d8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("51f3f226-9fbd-4f6c-8c88-63d0bc343723"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5ab8b0fd-16b0-4f64-ab53-56d24f92a9d7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5af09e03-4dfb-4d5c-bb68-4e7630dd0ddc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5dd8478f-a1ca-42c0-9933-dd9abba766bf"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5f36fbca-1350-4d3d-ba73-2552c3dd3527"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("60017ac7-30c1-4b4b-893e-e43592839cf3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("642c39af-97f4-435a-add7-f19ac1e5f97d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("674d201f-0da8-42df-9800-4b66214a6959"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("68a479ef-95fa-4fcd-8992-217eacfe18b0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("70ab6134-165e-47a0-ac75-e32239e893c3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("734a5dc8-a15b-4a58-b592-673879c8b5a9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7380427a-7824-464a-86a7-23cc901db462"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("78d2d7bd-eccc-41db-a48d-e09136723c89"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8091bca9-3c43-41f3-a67a-36439aa9ea48"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("87d0fe3a-e7c2-4c93-8a12-c5c03b006af8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8cb2898a-c1a3-4f6c-bfee-43d0700788d1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("921cc0c5-0ddb-4810-a2fc-d388078473f1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("93982bbf-b0a8-48de-88b6-b689ece1dee2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("96d45efc-15eb-4ded-af87-b754d0bc792f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9a6ac19a-e8c6-4316-b51a-f7298bfe2d69"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9ca94fd6-5e78-4a5b-984a-069a2ebecd08"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9d85fae2-4748-4a82-a965-ee97652c3dc7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a1735e6d-c390-46be-9b36-e39880e8db08"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a187d918-8177-42cd-add0-00da53fdf3d6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a879019d-bc67-4086-8cf2-e1def25433aa"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a98c7a38-b4b6-4b7b-ae3d-c644c878acb7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ab1601ea-0870-424a-9d20-359eb1205446"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("abb716eb-181d-41ae-9823-f9e18c4ddc7a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("adaf90ca-b1ff-418d-b4c4-8c6ea88480cc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("af5d2010-074c-43e3-9123-719a6de4bf49"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b37d3bdc-5f69-49f9-a78b-f4a9b116bfc8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b446fefe-3406-43d1-9253-066110a5ab4b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b577a7f8-c3b7-424d-8e17-fb49e8668ad8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b5c31ce0-fad0-4349-93e3-2054dd6f5697"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b6522e8b-2032-4fb7-8b22-452b165cb045"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b73f685a-d13d-4b65-82c6-038678c44464"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("baf5b350-9b3e-4470-92dd-1a8b48af4573"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c5df81da-2a0f-43d8-8569-ea972a9aa31b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c9848674-8567-4eaf-a5e4-9aa6c832fecb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ce7487f1-b003-4189-8851-0b84750e856c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d2405f5c-a116-4ec8-9582-c9cf2b7952a3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d8882ff2-7f3f-460e-936d-5743c5216282"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d9145432-6df7-41de-9e7a-076d099c4cff"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("dcc6ba6b-b677-4dd4-9f5a-f6e283b794f8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e2a6363c-9976-4d6c-9c89-3547c614c5f8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e5c666cb-6c2b-4619-9ad3-6c14b3cf6c0d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f3fbba79-6afb-480a-8dce-5740bc5ed236"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f4214dc4-b52d-434a-bbd1-3eac55b1ffea"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fc66da27-f2ca-42e9-84e2-91a8bda35812"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fe6e6704-d2f0-4394-85d7-9fe94feeeb65"));

            migrationBuilder.AddColumn<string>(
                name: "Groups",
                table: "SubscriptionPlans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("0051ab77-ef64-4af6-a7d7-f14855a00bd9"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4338), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("011bdc65-a7ee-4a3b-95ef-8becf3fb60ef"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4331), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("04c157a7-06f9-44a0-9bb0-944307e79c39"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4295), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("06433a66-74b2-4c89-a4f5-430497d67704"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4322), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0c424fcb-8e46-4838-b238-d4bdb3b5d380"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4349), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0d00ad7f-ecf8-49b5-a558-dbfee08decfb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4267), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0f6b20e7-eba3-4d36-9d97-0d701b354793"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4356), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1790fa76-d791-4379-9bc4-aac888a11878"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4357), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1bb461be-587a-47e7-abd0-48bd46570e74"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4285), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("21267b09-1cf2-4192-a002-2d7ae941bb52"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4340), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("225584b1-7c5d-4b19-85c3-38f68d479a16"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4269), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("232fc740-2da1-42eb-9d0b-d8241c2a2d6d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4246), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("24b2cd69-540f-4024-b9cc-ff00909abdff"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4251), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2677f8aa-239f-4b0f-accc-0028e1e8c874"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4343), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2a3610b7-bd9f-41a3-ba37-2bf9edb8c66d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4318), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2b10a2f6-23a1-4c8d-8bc0-ae56a9c68002"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4320), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2da66ac3-64db-428a-b106-d8600a5c1774"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4355), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("30cba678-b402-48c3-9feb-bed016ca333d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4334), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("314c08b3-d0fd-4257-8ae1-668c49d50973"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4293), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3338935b-136c-453f-a081-6f0497444af3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4278), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3730a13b-791e-4d49-8204-0431f0065eb8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4290), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("3c66a916-6499-4ba9-bf13-fc66b9d0b633"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4245), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("444eb7ad-6fbf-4777-bf7c-14151de5d0bc"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4329), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("4790756c-d24f-4765-949c-4eab3bc71c8b"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4305), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("47b80fe5-fc5d-4390-973b-d3951c6e7692"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4280), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4cd27981-a980-4d81-90a6-797479fc9fa5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4346), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4da161d7-e42a-45d8-b50c-f9aa3f6a3968"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4350), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4deb9bc4-0cc5-4261-854d-13a1ed38b774"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4360), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("50e3af9b-4e21-4576-8f0f-5d2f86425503"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4325), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("55801b5e-0940-471d-a9b0-286c93506904"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4351), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("57aadbf8-1b25-499c-86ad-411426864432"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4328), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("57f02ccf-91f4-4b5a-940e-01cbd559cb9c"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4313), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("631b2005-c008-417d-a14c-4135a346bdf4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4328), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("64e75d0c-09e7-4741-905e-dee6b84f7c3f"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4352), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("65c97f77-3811-415b-b0ba-138991868a1b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4332), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("694a72ae-743e-49f9-a70b-8d099e7934e9"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4309), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("6a525838-a855-423d-9125-803c2c4029e9"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4252), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6b5da6ec-1752-44d1-b84b-373225c5302c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4365), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6ea14701-9c02-4a93-8687-355c562118ae"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4304), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("73aa9598-afc6-4231-bef7-bcd544ce3644"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4362), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("7530c639-209e-4f52-9895-2faa8f758ce1"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4296), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("791bb270-7c8b-48f0-8725-fedba8aec69a"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4354), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("79fad9e5-d28b-4cd0-bb40-5c4650fa9335"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4341), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7c2e8edd-7b21-49e0-a472-6e64fb31e04f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4359), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("7cec0a68-ac60-4d3a-a063-a910e3459e29"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4307), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("8048de01-fd8b-485f-b03b-da14f50de4a2"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4358), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("80eb2ad1-66ba-4934-aca5-e88150faff77"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4287), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("83bb433e-a158-41bc-8ad5-96ea6fa40014"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4292), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("85a87309-fbb0-4373-ad68-8e00bebcb3cf"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4317), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("8b26936c-db14-4994-847f-1230799c9509"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4335), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("8f3afd7e-e286-41be-a2a8-4783c6240a69"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4348), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("94098a33-0d68-44d9-9906-81a5d596fd33"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4263), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("97617d6e-c10e-4cb1-a941-0d741b0e3a12"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4365), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9a8cc048-93c6-4456-a7da-f068b76099e4"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4297), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a2a76349-521b-4085-81dd-2454e1e2c765"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4358), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("a3f93fe8-53b1-4384-85c4-e9c71f6c99d6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4303), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("a4eb6b55-60d0-4790-9ae5-1bbf3f13e900"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4324), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a6d92436-f357-457f-bc2b-c409ca8776ae"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4322), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a980603c-d917-43c7-b4a1-391ea606de7b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4319), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a9b0cc44-dc85-40d2-a096-e28ce75d3fc3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4364), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b03cff30-046e-4b56-a735-f80455bb8dfe"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4333), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("b0843b35-c00b-441f-ad7a-ea5cfb13f752"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4281), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b64de0ee-aa6a-4269-a09a-f24be70f7ab8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4249), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b757e495-475b-4605-867e-8db7a27f2a80"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(3955), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("bcba820a-9bc0-46cb-ab49-f44cde50dd90"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4301), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("bd27155a-e06f-4149-ad11-23c372a66ba1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4342), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c4438cbc-0556-4f17-90ac-fac2f829a9a8"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4340), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c9b54f07-70a0-4741-a260-625bb63cdd0a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4348), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d35879ae-c24b-47ed-8d07-39aa446f736c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4266), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d35f8543-e290-40e4-b707-247dcdeab776"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4270), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d3622156-9944-4247-a15a-68c9e97c079c"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4314), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("d5cec9ea-6859-4645-8839-517077887cd9"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4339), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("de823b21-6b60-4963-a006-21bdbd5033df"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4366), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e6953e8c-3d02-4bff-9d0c-8be0c7eab10e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4337), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("e70a6012-7427-47c9-be83-856f7aad787b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4241), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f0f37c84-d41a-47df-bbae-02df88b6c811"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4363), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("f8d3c72e-b583-4dd7-9ecb-ca670f372816"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 4, 14, 879, DateTimeKind.Local).AddTicks(4345), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null }
                });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-basic-monthly",
                columns: new[] { "CreatedAt", "Groups" },
                values: new object[] { new DateTime(2025, 9, 28, 19, 4, 14, 829, DateTimeKind.Utc).AddTicks(7228), null });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-enterprise-monthly",
                columns: new[] { "CreatedAt", "Groups" },
                values: new object[] { new DateTime(2025, 9, 28, 19, 4, 14, 829, DateTimeKind.Utc).AddTicks(7369), null });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-monthly",
                columns: new[] { "CreatedAt", "Groups" },
                values: new object[] { new DateTime(2025, 9, 28, 19, 4, 14, 829, DateTimeKind.Utc).AddTicks(7363), null });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-yearly",
                columns: new[] { "CreatedAt", "Groups" },
                values: new object[] { new DateTime(2025, 9, 28, 19, 4, 14, 829, DateTimeKind.Utc).AddTicks(7373), null });

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 9, 29, 3, 4, 14, 803, DateTimeKind.Local).AddTicks(3227), "sk-XZx4zCPFgWHBVtLadj9wZg3CcYlRj6yGEjCbtu" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 29, 3, 4, 14, 804, DateTimeKind.Local).AddTicks(3582));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 29, 3, 4, 14, 804, DateTimeKind.Local).AddTicks(3139));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 9, 29, 3, 4, 14, 801, DateTimeKind.Local).AddTicks(3346), "dcf40fb3cd7a7ce43e5e3152c2e11b33", "591f5e3ac3d84d7bbcfa4715d19cc387" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0051ab77-ef64-4af6-a7d7-f14855a00bd9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("011bdc65-a7ee-4a3b-95ef-8becf3fb60ef"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("04c157a7-06f9-44a0-9bb0-944307e79c39"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("06433a66-74b2-4c89-a4f5-430497d67704"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0c424fcb-8e46-4838-b238-d4bdb3b5d380"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0d00ad7f-ecf8-49b5-a558-dbfee08decfb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0f6b20e7-eba3-4d36-9d97-0d701b354793"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1790fa76-d791-4379-9bc4-aac888a11878"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1bb461be-587a-47e7-abd0-48bd46570e74"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("21267b09-1cf2-4192-a002-2d7ae941bb52"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("225584b1-7c5d-4b19-85c3-38f68d479a16"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("232fc740-2da1-42eb-9d0b-d8241c2a2d6d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("24b2cd69-540f-4024-b9cc-ff00909abdff"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2677f8aa-239f-4b0f-accc-0028e1e8c874"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2a3610b7-bd9f-41a3-ba37-2bf9edb8c66d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2b10a2f6-23a1-4c8d-8bc0-ae56a9c68002"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2da66ac3-64db-428a-b106-d8600a5c1774"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("30cba678-b402-48c3-9feb-bed016ca333d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("314c08b3-d0fd-4257-8ae1-668c49d50973"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3338935b-136c-453f-a081-6f0497444af3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3730a13b-791e-4d49-8204-0431f0065eb8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3c66a916-6499-4ba9-bf13-fc66b9d0b633"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("444eb7ad-6fbf-4777-bf7c-14151de5d0bc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4790756c-d24f-4765-949c-4eab3bc71c8b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("47b80fe5-fc5d-4390-973b-d3951c6e7692"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4cd27981-a980-4d81-90a6-797479fc9fa5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4da161d7-e42a-45d8-b50c-f9aa3f6a3968"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4deb9bc4-0cc5-4261-854d-13a1ed38b774"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("50e3af9b-4e21-4576-8f0f-5d2f86425503"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("55801b5e-0940-471d-a9b0-286c93506904"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("57aadbf8-1b25-499c-86ad-411426864432"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("57f02ccf-91f4-4b5a-940e-01cbd559cb9c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("631b2005-c008-417d-a14c-4135a346bdf4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("64e75d0c-09e7-4741-905e-dee6b84f7c3f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("65c97f77-3811-415b-b0ba-138991868a1b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("694a72ae-743e-49f9-a70b-8d099e7934e9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6a525838-a855-423d-9125-803c2c4029e9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6b5da6ec-1752-44d1-b84b-373225c5302c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6ea14701-9c02-4a93-8687-355c562118ae"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("73aa9598-afc6-4231-bef7-bcd544ce3644"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7530c639-209e-4f52-9895-2faa8f758ce1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("791bb270-7c8b-48f0-8725-fedba8aec69a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("79fad9e5-d28b-4cd0-bb40-5c4650fa9335"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7c2e8edd-7b21-49e0-a472-6e64fb31e04f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7cec0a68-ac60-4d3a-a063-a910e3459e29"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8048de01-fd8b-485f-b03b-da14f50de4a2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("80eb2ad1-66ba-4934-aca5-e88150faff77"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("83bb433e-a158-41bc-8ad5-96ea6fa40014"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("85a87309-fbb0-4373-ad68-8e00bebcb3cf"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8b26936c-db14-4994-847f-1230799c9509"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8f3afd7e-e286-41be-a2a8-4783c6240a69"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("94098a33-0d68-44d9-9906-81a5d596fd33"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("97617d6e-c10e-4cb1-a941-0d741b0e3a12"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9a8cc048-93c6-4456-a7da-f068b76099e4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a2a76349-521b-4085-81dd-2454e1e2c765"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a3f93fe8-53b1-4384-85c4-e9c71f6c99d6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a4eb6b55-60d0-4790-9ae5-1bbf3f13e900"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a6d92436-f357-457f-bc2b-c409ca8776ae"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a980603c-d917-43c7-b4a1-391ea606de7b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a9b0cc44-dc85-40d2-a096-e28ce75d3fc3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b03cff30-046e-4b56-a735-f80455bb8dfe"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b0843b35-c00b-441f-ad7a-ea5cfb13f752"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b64de0ee-aa6a-4269-a09a-f24be70f7ab8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b757e495-475b-4605-867e-8db7a27f2a80"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bcba820a-9bc0-46cb-ab49-f44cde50dd90"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bd27155a-e06f-4149-ad11-23c372a66ba1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c4438cbc-0556-4f17-90ac-fac2f829a9a8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c9b54f07-70a0-4741-a260-625bb63cdd0a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d35879ae-c24b-47ed-8d07-39aa446f736c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d35f8543-e290-40e4-b707-247dcdeab776"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d3622156-9944-4247-a15a-68c9e97c079c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d5cec9ea-6859-4645-8839-517077887cd9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("de823b21-6b60-4963-a006-21bdbd5033df"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e6953e8c-3d02-4bff-9d0c-8be0c7eab10e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e70a6012-7427-47c9-be83-856f7aad787b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f0f37c84-d41a-47df-bbae-02df88b6c811"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f8d3c72e-b583-4dd7-9ecb-ca670f372816"));

            migrationBuilder.DropColumn(
                name: "Groups",
                table: "SubscriptionPlans");

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("00783b40-b430-4f9a-994d-be350e217899"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9570), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0111f86b-8c0a-4740-9e5a-de35f2ee6a20"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9574), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("013f6162-1c89-4beb-89fb-4a43600cab82"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9550), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("018257d4-7c09-4842-8e94-cbcbf88a8812"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9572), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("021cdfc8-29b3-4f97-b087-7de5c4bd6867"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9542), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("02fcb631-61e7-4da8-b826-33365f011800"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9504), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("03ebf27f-c76d-43d2-a0ad-b0f66513083a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9470), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0720c3db-c019-4c51-b243-38384f0fd85f"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9520), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("08233514-51b0-4a5b-9070-2eb519ace8a3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9562), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("0a53a86f-b609-42b3-b059-d675c86cd2e5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9527), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("10ca6500-6b11-45ec-87f0-7d89744926ba"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9558), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("145d7654-36d8-4fc4-a4fa-ade0cd60110c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9559), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("18083687-818f-40e9-9f11-b193427f588b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9553), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("189f510d-2e4b-41bc-a58f-3920f77f720a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9579), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1ead0714-ac95-4738-a55f-6f65ff8af5d2"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9546), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1ec8fdad-8910-463c-b264-c995832b2cff"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9570), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("21b8389b-87d4-4006-b9c4-a0766efa027c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9547), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2988105f-7631-45c7-af59-ad69229709a0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9514), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2e4a350a-8e20-4a84-8327-ad3af9ba8ffa"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9542), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("309d4c54-273c-4c41-9915-c4a6f2672a43"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9526), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("374175de-0c90-465d-8fc8-5cf6ed316730"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9533), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("37b70c3e-41f7-4d27-a7c0-f083b585b03f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9485), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("38ab681f-ee22-469a-bb63-ace783117575"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9515), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("39ff5084-d223-412d-8996-970a77c79265"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9528), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("3ce72f59-a265-473f-b7dc-bc43c1dfe206"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9583), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("3e2dfbea-ba66-46bd-8bc5-efcdc45ff399"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9550), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5117e494-a82f-4b18-99c8-7b1be5dc61d8"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9578), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("51f3f226-9fbd-4f6c-8c88-63d0bc343723"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9508), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5ab8b0fd-16b0-4f64-ab53-56d24f92a9d7"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9589), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5af09e03-4dfb-4d5c-bb68-4e7630dd0ddc"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9471), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5dd8478f-a1ca-42c0-9933-dd9abba766bf"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9580), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("5f36fbca-1350-4d3d-ba73-2552c3dd3527"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9488), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("60017ac7-30c1-4b4b-893e-e43592839cf3"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9565), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("642c39af-97f4-435a-add7-f19ac1e5f97d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9571), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("674d201f-0da8-42df-9800-4b66214a6959"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9588), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("68a479ef-95fa-4fcd-8992-217eacfe18b0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9500), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("70ab6134-165e-47a0-ac75-e32239e893c3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9563), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("734a5dc8-a15b-4a58-b592-673879c8b5a9"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9539), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("7380427a-7824-464a-86a7-23cc901db462"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9588), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("78d2d7bd-eccc-41db-a48d-e09136723c89"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9468), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8091bca9-3c43-41f3-a67a-36439aa9ea48"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9544), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("87d0fe3a-e7c2-4c93-8a12-c5c03b006af8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9562), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("8cb2898a-c1a3-4f6c-bfee-43d0700788d1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9587), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("921cc0c5-0ddb-4810-a2fc-d388078473f1"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9577), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("93982bbf-b0a8-48de-88b6-b689ece1dee2"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9581), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("96d45efc-15eb-4ded-af87-b754d0bc792f"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9540), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("9a6ac19a-e8c6-4316-b51a-f7298bfe2d69"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9576), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9ca94fd6-5e78-4a5b-984a-069a2ebecd08"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9553), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("9d85fae2-4748-4a82-a965-ee97652c3dc7"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9519), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a1735e6d-c390-46be-9b36-e39880e8db08"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9586), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("a187d918-8177-42cd-add0-00da53fdf3d6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9509), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a879019d-bc67-4086-8cf2-e1def25433aa"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9567), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a98c7a38-b4b6-4b7b-ae3d-c644c878acb7"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9513), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ab1601ea-0870-424a-9d20-359eb1205446"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9551), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("abb716eb-181d-41ae-9823-f9e18c4ddc7a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9552), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("adaf90ca-b1ff-418d-b4c4-8c6ea88480cc"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9545), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("af5d2010-074c-43e3-9123-719a6de4bf49"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9577), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b37d3bdc-5f69-49f9-a78b-f4a9b116bfc8"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9566), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b446fefe-3406-43d1-9253-066110a5ab4b"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9523), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("b577a7f8-c3b7-424d-8e17-fb49e8668ad8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9199), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b5c31ce0-fad0-4349-93e3-2054dd6f5697"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9569), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b6522e8b-2032-4fb7-8b22-452b165cb045"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9490), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b73f685a-d13d-4b65-82c6-038678c44464"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9586), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("baf5b350-9b3e-4470-92dd-1a8b48af4573"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9473), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c5df81da-2a0f-43d8-8569-ea972a9aa31b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9528), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("c9848674-8567-4eaf-a5e4-9aa6c832fecb"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9521), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ce7487f1-b003-4189-8851-0b84750e856c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9572), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d2405f5c-a116-4ec8-9582-c9cf2b7952a3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9499), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d8882ff2-7f3f-460e-936d-5743c5216282"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9525), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d9145432-6df7-41de-9e7a-076d099c4cff"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9565), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("dcc6ba6b-b677-4dd4-9f5a-f6e283b794f8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9564), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e2a6363c-9976-4d6c-9c89-3547c614c5f8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9501), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e5c666cb-6c2b-4619-9ad3-6c14b3cf6c0d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9585), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("f3fbba79-6afb-480a-8dce-5740bc5ed236"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9532), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("f4214dc4-b52d-434a-bbd1-3eac55b1ffea"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9498), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fc66da27-f2ca-42e9-84e2-91a8bda35812"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9573), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fe6e6704-d2f0-4394-85d7-9fe94feeeb65"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 47, 380, DateTimeKind.Local).AddTicks(9579), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null }
                });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-basic-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 10, 30, 47, 346, DateTimeKind.Utc).AddTicks(8674));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-enterprise-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 10, 30, 47, 346, DateTimeKind.Utc).AddTicks(8792));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 10, 30, 47, 346, DateTimeKind.Utc).AddTicks(8786));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-yearly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 10, 30, 47, 346, DateTimeKind.Utc).AddTicks(8795));

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 9, 28, 18, 30, 47, 329, DateTimeKind.Local).AddTicks(4772), "sk-e9SaIp6uzKH8pabE9i92A7PUwvd5t8k98ensLn" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 18, 30, 47, 330, DateTimeKind.Local).AddTicks(3801));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 18, 30, 47, 330, DateTimeKind.Local).AddTicks(3402));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 9, 28, 18, 30, 47, 327, DateTimeKind.Local).AddTicks(7753), "fc30e0e3a89f21503bd2d839993461bd", "9d1986ea1db4485793181b83f58acde5" });
        }
    }
}
