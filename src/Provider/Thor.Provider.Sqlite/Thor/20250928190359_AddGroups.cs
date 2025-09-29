using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Thor.Provider.Thor
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
                keyValue: new Guid("02d4672d-0b07-457f-82c5-2a0eb3bf3e5b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("061bc111-d4bb-4366-b5c9-a64a518fd3d2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0972d79b-b1ba-4e9c-9b92-94cee210a487"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("09771f55-2389-4a7f-92ce-32d6875966c8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0a031eda-d0bf-4331-983f-ab5b4ecb3d51"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("16d5b74f-ed8d-4c8a-95d5-60dc3b208c63"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("171ecd5a-5113-407f-9428-1c8a6cc9ba79"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("18082677-466b-4c27-b4ba-46cab17a0ea1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1c86029f-e078-4592-8a04-1627c1df04df"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2438b48e-1b75-4b0f-8d82-5f740e51dcbb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("255e7afe-840c-4fff-b86f-ef667250ff49"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("28a1313b-bdcd-4d57-acd9-0cc49929146c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2a587324-fb77-4e01-9d9a-c655caf9a53f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2aefa488-ae59-4115-a4cd-39ac2b5a03ea"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("31ab0159-59b0-4419-9acb-efad149346c7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("327b33d0-f9dd-47c1-86df-0ca2b3c414c0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("38ed7375-9456-4027-86f8-9f9f23713e79"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3cc862a9-48aa-4c6e-b48b-7b5f0cb817cc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4f23747c-db49-427e-8ec6-fe7b5f655fef"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("501de647-40f3-4e63-9f6c-a2e87720ab53"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5067d7e6-3abe-418c-b291-cfabfa9e8e42"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("516b4a57-1cea-406e-a9ac-e7c82208a57f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5239cc33-3ea8-4689-9a2f-6a2a39b12b51"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5c2a9b6e-553a-4c67-81b2-c41b6f3ba727"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5c32e57f-c7fb-4fcc-a5c6-31c3c109a178"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5df957a4-2aad-4fa0-b003-9cee5e6b9bcb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5f008e9f-bf0e-4912-afc7-158a4a1d6854"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("602f123d-03cf-4f80-a18d-1ecce3e5d4e0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("626b8c4f-fbb9-46dc-9c00-cc576a05bd33"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("62d8973b-3da6-4b5f-bb37-7ff72febeb61"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6949246d-bbbc-4030-9206-eb1523c4719f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6ad94cc1-9762-40a7-a04c-0a40037e2a67"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6d517915-f556-494e-8aa8-32b7b5a04897"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6dcf297f-a902-4e0f-9d48-7fb68b0094d0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6f58fb72-1da2-40b5-900d-819faf95bb44"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6f659d5a-8c39-4293-bb16-951c0e662a32"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("704d9e2a-3eca-4aa1-9f93-c06b55ffd6bb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("75e1c13f-a4af-423d-911d-f2b8864311a8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("762c6fb0-d8d6-46fa-95b1-0bf991895f58"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("79bad3b6-c0d2-4034-a44d-53749248546d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7a15ca67-88f0-45c3-aec7-3bc6b03a94f8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7d1ad6ed-7cf9-4367-a80c-d4a49fc96520"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7d979ae6-93a7-4a9b-95de-9f9abf3e8b89"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("81ffddd0-9c92-42e5-813d-aafd9512aa67"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("87d4f709-b1ee-44d2-9fcc-6befe95dbe06"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("892d0231-c163-4f40-8933-fbfbf79357b9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("94f93099-4228-4d11-a245-ec13d727ded5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("973cc43e-eca9-4895-9735-1f0b8eb10103"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9cbca1e3-dfc1-40ea-a094-74e02202c2b9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9d22504d-d561-41fa-8ffc-ab4bfb7e3ccc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a1175a36-f2f2-4658-8338-d72cea8307d5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a8063fcc-8b83-4a9f-982c-e9c05767e255"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a9fcd567-146c-4da1-8152-e06c8c86d1be"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ac300e45-1f38-4874-8f61-c46bb87fe89f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b093f2af-9af9-40a2-9bc7-7de9793b5e47"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b159a13e-f330-41cc-83d5-451f3c80fceb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b47879ad-4d75-425b-8ca3-3afe7fa6d85a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b74c5091-5c46-44b8-8065-aab513fe7ac4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b754a6bc-5675-41c4-9155-fc456dd77b67"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bab95bb7-02b9-4678-84bb-6a1bbd753968"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c51dee4c-7786-4616-9ece-73c269a6c9ef"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c59b3398-f52d-48b7-9345-3f640236ae0a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c66c55ba-ae0f-4ba3-8f05-cb41bf0c7e54"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c6c7b6a0-cac5-44a8-a75e-6e0988394022"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c9996545-16d5-4592-b06e-8c2ae70edce1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("cac47a83-1b13-4ff2-81a2-fb1bc93deb69"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("cd4217fa-cb09-4eec-bbdc-d9b8b21aec0f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("cfd0a0c1-21ff-463d-8daf-9975d6ea713b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d8618e2c-0c18-44a7-9400-ce54ab3a1279"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e483b8cf-a62a-473b-aa9c-590aed10dd89"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e6476c10-bbb2-4ae7-8083-0de1979c9d18"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e8fd966c-4f4f-4046-bf49-6fced1405d71"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f24230a1-af14-47ab-8927-df451b2780c3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f685197d-229f-4ccf-ad4b-20eedf673103"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f6937e0c-b5a8-449d-b396-4d2e2792490a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f6e5c671-e50b-4eaa-9cab-db99beab904d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f91391a9-b0fe-4069-80e3-8816eb7f318f"));

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("027923cd-6973-40a1-a485-f0b50c10dc11"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9939), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("08a13565-e398-46a7-ab11-955322b85e8a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9905), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1363cb14-3d96-4dbe-8b76-393ae67da414"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9966), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("15aa95fe-9326-411b-be59-e6b0352a50ca"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9936), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("15d6abea-bfff-493f-9759-a93fa0e58ed7"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9922), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("18ab116c-7be9-4366-9d3c-63ff28b76a9e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9950), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1c795204-c7b3-45aa-a09a-a5781f95fab1"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9944), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1cd9c3a3-ecc5-4e44-bc97-9abc75ea22e1"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9920), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("1e05f35d-29b8-4c81-b8f6-ad2cb67a3ad7"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9930), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1ed416f7-1245-4197-aa0f-0da885963e21"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9937), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("22c82ce8-a0ea-4387-a0e1-9f6967001375"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9868), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("25412482-b4a1-4be2-8960-e77ea13b6288"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9949), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2833a812-9822-4eb0-9795-2a10daa244c4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9958), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2b7d0054-1c37-425a-9eb9-238862d6cb5f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9942), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("2c5fdffb-a074-4b2a-98a6-3bf4f841e5cd"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9951), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2cd3ca35-e350-48fc-8f42-a7878809f600"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9934), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2edfd300-ed49-460b-be55-1fc4b130e5ec"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9974), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2ee30c71-78c9-496a-9597-7486e85b8437"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9898), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2f9867ae-9ce5-46d1-9ca6-4275e65c6440"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9943), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2faae2b4-38c3-4fbd-b996-ea4e41d20c81"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9910), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3903ab1f-d8cf-4db1-ba73-27303ef883a1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9931), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3ae42feb-cca3-4361-a225-d8e16b631170"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9915), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("408dddd5-b595-49c5-9428-bcf2acb7b3f1"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9945), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("458d17b5-0beb-4893-9682-b0f7dda3b249"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9924), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("4ed29e63-bf27-497d-8144-ef01abe6710d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9968), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("5108ad52-e24d-417a-87aa-d9b1c7edf0a3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9892), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("528132c3-2866-46ee-b8b7-667117cb4b7f"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9918), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("5b32e100-c656-4f49-bbb0-7fe35a0d7106"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9947), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("60b2e18c-da61-43ad-915d-e3e4b240af7a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9897), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6925114f-ca7a-4a44-a8d0-2675cb2e9d23"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9914), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("697597b9-cef2-43b9-9db6-b418466f04a2"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9966), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6c36b105-e7d8-4c18-b796-71318db628d6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9973), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("72866b7a-a67c-4173-b191-eac36a019a28"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9964), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("74d8bed6-954c-483a-9fa7-cec7982df476"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9893), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("78682dbd-a46b-4cb6-91bf-81f92d885884"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9935), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7a02fd97-aa1b-45f5-aaaa-24e0e8d869ce"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9870), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7b58821e-bfdd-4e9f-a834-bffded13fecb"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9946), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("83ff68b6-ac2b-4591-89b6-d8536f70f6c6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9943), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("8ac6f8ce-d094-4b16-84cb-702a086c4612"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9887), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8b4399ff-8ad9-4390-8962-d77651dd6eaa"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9615), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8d4257b3-9a9d-42e4-b9ec-bb891456cb93"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9891), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8f5ee30c-94f3-4ee8-8972-fcdff4504025"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9909), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("92056dba-67b0-422a-a638-1f36c8adc151"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9907), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("93854f08-cf0b-418b-a648-00716ad1ab00"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9911), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("95acb0e7-5fb5-4f86-aed5-f2551e4edd73"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9928), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9939d7b0-1b59-40ac-b258-e6a7b43d67a0"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9946), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("999cf915-361c-4c25-b244-e3282b65b248"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9876), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9bb72bc4-f999-4c7c-a7d3-c6d6da70d855"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9866), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a0f85fa7-b131-4fac-b366-cc4726e16de3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9974), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a57e1e18-8418-425a-b75d-8d32885d8c0b"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9919), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("a5d2e9e2-3450-48cb-bd0d-ea8f7c2a8093"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9971), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("adac6af4-e2ad-4029-b643-8548a5a75ee1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9878), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b0228196-7d31-440c-9613-5b14a606ac3e"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9962), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b3e2ce65-c0cb-4fcf-aadf-a3ca6f9ff2ce"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9929), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b8022b8f-043b-4bcd-8067-6c69666f6681"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9960), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b88e984b-16b2-4c3e-a495-db35b19d4e41"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9972), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ba9e0005-5d12-4c7f-aaf2-ab9c2b39cb3a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9930), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("bab2e8c8-e851-4e7b-9322-367bc7768cb6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9956), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c0a4b77a-cffd-4a2d-b529-ec755b1d6eae"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9885), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c1c302c4-d489-47cd-955c-a2c731a66f05"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9917), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("c637145e-8548-4ccc-be1f-d1abf04d335e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9972), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("c6923270-7475-4d91-aa2e-c8f3415aadd8"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9927), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("c6c31530-89cd-4b5e-ac3b-7fa07c7f11ba"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9911), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("c76cd8b7-6312-49ca-bef5-da32c6f7f229"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9902), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c87648a6-87dc-4619-b3a0-3a36fa8b903a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9968), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("d22f43be-9fd9-4c44-8ee6-8151c54e0ebc"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9904), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d8a7a8de-c8ee-43b7-b3fd-24966fabf561"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9965), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d9d80f0f-5ed0-46d5-81b8-54c1b1895c38"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9940), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("dbfcefbd-4519-42c8-a70d-c2fde38f51be"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9959), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("dc3e6342-5cd2-45fa-8336-546f7ff2c3e6"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9955), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e21d0d11-a75c-4afc-8aa8-0b5fb4233f16"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9939), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("e519b94a-80a2-4d70-b4d3-acd13569ab52"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9932), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e7583911-3ad7-4160-bca4-fd2a9df8eda1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9936), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("f497642c-372b-40eb-92f9-676e6643ba68"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9963), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fa63fa30-0dd2-4a2d-90b6-9053ff6753c4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9889), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fc9c27e9-5d9d-4cda-be29-26015c481bad"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9970), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("ff457dcc-0446-4c7f-a707-b47087e4e72d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 29, 3, 3, 58, 705, DateTimeKind.Local).AddTicks(9916), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null }
                });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-basic-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 19, 3, 58, 671, DateTimeKind.Utc).AddTicks(3923));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-enterprise-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 19, 3, 58, 671, DateTimeKind.Utc).AddTicks(4046));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 19, 3, 58, 671, DateTimeKind.Utc).AddTicks(4040));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-yearly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 19, 3, 58, 671, DateTimeKind.Utc).AddTicks(4049));

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 9, 29, 3, 3, 58, 657, DateTimeKind.Local).AddTicks(6050), "sk-T1V014qhKjhOwoNARwJzePjfwrooj1zgmojQtJ" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 29, 3, 3, 58, 658, DateTimeKind.Local).AddTicks(4858));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 29, 3, 3, 58, 658, DateTimeKind.Local).AddTicks(4475));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 9, 29, 3, 3, 58, 655, DateTimeKind.Local).AddTicks(8775), "4590fc3bfae32bc3151f242ddf591b3b", "bade127329034a39b5046ebb54737db1" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("027923cd-6973-40a1-a485-f0b50c10dc11"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("08a13565-e398-46a7-ab11-955322b85e8a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1363cb14-3d96-4dbe-8b76-393ae67da414"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("15aa95fe-9326-411b-be59-e6b0352a50ca"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("15d6abea-bfff-493f-9759-a93fa0e58ed7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("18ab116c-7be9-4366-9d3c-63ff28b76a9e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1c795204-c7b3-45aa-a09a-a5781f95fab1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1cd9c3a3-ecc5-4e44-bc97-9abc75ea22e1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1e05f35d-29b8-4c81-b8f6-ad2cb67a3ad7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1ed416f7-1245-4197-aa0f-0da885963e21"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("22c82ce8-a0ea-4387-a0e1-9f6967001375"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("25412482-b4a1-4be2-8960-e77ea13b6288"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2833a812-9822-4eb0-9795-2a10daa244c4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2b7d0054-1c37-425a-9eb9-238862d6cb5f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2c5fdffb-a074-4b2a-98a6-3bf4f841e5cd"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2cd3ca35-e350-48fc-8f42-a7878809f600"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2edfd300-ed49-460b-be55-1fc4b130e5ec"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2ee30c71-78c9-496a-9597-7486e85b8437"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2f9867ae-9ce5-46d1-9ca6-4275e65c6440"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2faae2b4-38c3-4fbd-b996-ea4e41d20c81"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3903ab1f-d8cf-4db1-ba73-27303ef883a1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3ae42feb-cca3-4361-a225-d8e16b631170"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("408dddd5-b595-49c5-9428-bcf2acb7b3f1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("458d17b5-0beb-4893-9682-b0f7dda3b249"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4ed29e63-bf27-497d-8144-ef01abe6710d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5108ad52-e24d-417a-87aa-d9b1c7edf0a3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("528132c3-2866-46ee-b8b7-667117cb4b7f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5b32e100-c656-4f49-bbb0-7fe35a0d7106"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("60b2e18c-da61-43ad-915d-e3e4b240af7a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6925114f-ca7a-4a44-a8d0-2675cb2e9d23"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("697597b9-cef2-43b9-9db6-b418466f04a2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6c36b105-e7d8-4c18-b796-71318db628d6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("72866b7a-a67c-4173-b191-eac36a019a28"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("74d8bed6-954c-483a-9fa7-cec7982df476"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("78682dbd-a46b-4cb6-91bf-81f92d885884"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7a02fd97-aa1b-45f5-aaaa-24e0e8d869ce"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7b58821e-bfdd-4e9f-a834-bffded13fecb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("83ff68b6-ac2b-4591-89b6-d8536f70f6c6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8ac6f8ce-d094-4b16-84cb-702a086c4612"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8b4399ff-8ad9-4390-8962-d77651dd6eaa"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8d4257b3-9a9d-42e4-b9ec-bb891456cb93"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8f5ee30c-94f3-4ee8-8972-fcdff4504025"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("92056dba-67b0-422a-a638-1f36c8adc151"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("93854f08-cf0b-418b-a648-00716ad1ab00"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("95acb0e7-5fb5-4f86-aed5-f2551e4edd73"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9939d7b0-1b59-40ac-b258-e6a7b43d67a0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("999cf915-361c-4c25-b244-e3282b65b248"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9bb72bc4-f999-4c7c-a7d3-c6d6da70d855"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a0f85fa7-b131-4fac-b366-cc4726e16de3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a57e1e18-8418-425a-b75d-8d32885d8c0b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a5d2e9e2-3450-48cb-bd0d-ea8f7c2a8093"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("adac6af4-e2ad-4029-b643-8548a5a75ee1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b0228196-7d31-440c-9613-5b14a606ac3e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b3e2ce65-c0cb-4fcf-aadf-a3ca6f9ff2ce"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b8022b8f-043b-4bcd-8067-6c69666f6681"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b88e984b-16b2-4c3e-a495-db35b19d4e41"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ba9e0005-5d12-4c7f-aaf2-ab9c2b39cb3a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("bab2e8c8-e851-4e7b-9322-367bc7768cb6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c0a4b77a-cffd-4a2d-b529-ec755b1d6eae"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c1c302c4-d489-47cd-955c-a2c731a66f05"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c637145e-8548-4ccc-be1f-d1abf04d335e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c6923270-7475-4d91-aa2e-c8f3415aadd8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c6c31530-89cd-4b5e-ac3b-7fa07c7f11ba"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c76cd8b7-6312-49ca-bef5-da32c6f7f229"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c87648a6-87dc-4619-b3a0-3a36fa8b903a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d22f43be-9fd9-4c44-8ee6-8151c54e0ebc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d8a7a8de-c8ee-43b7-b3fd-24966fabf561"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d9d80f0f-5ed0-46d5-81b8-54c1b1895c38"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("dbfcefbd-4519-42c8-a70d-c2fde38f51be"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("dc3e6342-5cd2-45fa-8336-546f7ff2c3e6"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e21d0d11-a75c-4afc-8aa8-0b5fb4233f16"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e519b94a-80a2-4d70-b4d3-acd13569ab52"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e7583911-3ad7-4160-bca4-fd2a9df8eda1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f497642c-372b-40eb-92f9-676e6643ba68"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fa63fa30-0dd2-4a2d-90b6-9053ff6753c4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fc9c27e9-5d9d-4cda-be29-26015c481bad"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ff457dcc-0446-4c7f-a707-b47087e4e72d"));

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("02d4672d-0b07-457f-82c5-2a0eb3bf3e5b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(107), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("061bc111-d4bb-4366-b5c9-a64a518fd3d2"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(56), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0972d79b-b1ba-4e9c-9b92-94cee210a487"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(179), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("09771f55-2389-4a7f-92ce-32d6875966c8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(160), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0a031eda-d0bf-4331-983f-ab5b4ecb3d51"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(113), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("16d5b74f-ed8d-4c8a-95d5-60dc3b208c63"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(158), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("171ecd5a-5113-407f-9428-1c8a6cc9ba79"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(94), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("18082677-466b-4c27-b4ba-46cab17a0ea1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(139), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("1c86029f-e078-4592-8a04-1627c1df04df"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(154), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("2438b48e-1b75-4b0f-8d82-5f740e51dcbb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(171), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("255e7afe-840c-4fff-b86f-ef667250ff49"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(135), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("28a1313b-bdcd-4d57-acd9-0cc49929146c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(143), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("2a587324-fb77-4e01-9d9a-c655caf9a53f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(142), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("2aefa488-ae59-4115-a4cd-39ac2b5a03ea"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(93), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("31ab0159-59b0-4419-9acb-efad149346c7"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(163), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("327b33d0-f9dd-47c1-86df-0ca2b3c414c0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(182), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("38ed7375-9456-4027-86f8-9f9f23713e79"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(153), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3cc862a9-48aa-4c6e-b48b-7b5f0cb817cc"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 126, DateTimeKind.Local).AddTicks(9692), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4f23747c-db49-427e-8ec6-fe7b5f655fef"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(89), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("501de647-40f3-4e63-9f6c-a2e87720ab53"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(180), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5067d7e6-3abe-418c-b291-cfabfa9e8e42"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(101), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("516b4a57-1cea-406e-a9ac-e7c82208a57f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(181), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5239cc33-3ea8-4689-9a2f-6a2a39b12b51"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(170), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5c2a9b6e-553a-4c67-81b2-c41b6f3ba727"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(119), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("5c32e57f-c7fb-4fcc-a5c6-31c3c109a178"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(134), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5df957a4-2aad-4fa0-b003-9cee5e6b9bcb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(173), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("5f008e9f-bf0e-4912-afc7-158a4a1d6854"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(159), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("602f123d-03cf-4f80-a18d-1ecce3e5d4e0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(71), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("626b8c4f-fbb9-46dc-9c00-cc576a05bd33"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(164), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("62d8973b-3da6-4b5f-bb37-7ff72febeb61"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(64), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6949246d-bbbc-4030-9206-eb1523c4719f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(69), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6ad94cc1-9762-40a7-a04c-0a40037e2a67"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(183), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6d517915-f556-494e-8aa8-32b7b5a04897"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(115), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("6dcf297f-a902-4e0f-9d48-7fb68b0094d0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(65), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6f58fb72-1da2-40b5-900d-819faf95bb44"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(95), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("6f659d5a-8c39-4293-bb16-951c0e662a32"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(124), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("704d9e2a-3eca-4aa1-9f93-c06b55ffd6bb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(85), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("75e1c13f-a4af-423d-911d-f2b8864311a8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(63), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("762c6fb0-d8d6-46fa-95b1-0bf991895f58"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(98), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("79bad3b6-c0d2-4034-a44d-53749248546d"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(149), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7a15ca67-88f0-45c3-aec7-3bc6b03a94f8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(130), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7d1ad6ed-7cf9-4367-a80c-d4a49fc96520"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(132), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7d979ae6-93a7-4a9b-95de-9f9abf3e8b89"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(145), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("81ffddd0-9c92-42e5-813d-aafd9512aa67"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(121), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("87d4f709-b1ee-44d2-9fcc-6befe95dbe06"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(103), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("892d0231-c163-4f40-8933-fbfbf79357b9"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(155), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("94f93099-4228-4d11-a245-ec13d727ded5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(148), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("973cc43e-eca9-4895-9735-1f0b8eb10103"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(172), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("9cbca1e3-dfc1-40ea-a094-74e02202c2b9"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(59), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9d22504d-d561-41fa-8ffc-ab4bfb7e3ccc"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(152), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a1175a36-f2f2-4658-8338-d72cea8307d5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(138), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("a8063fcc-8b83-4a9f-982c-e9c05767e255"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(161), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a9fcd567-146c-4da1-8152-e06c8c86d1be"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(169), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("ac300e45-1f38-4874-8f61-c46bb87fe89f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(175), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("b093f2af-9af9-40a2-9bc7-7de9793b5e47"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(86), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b159a13e-f330-41cc-83d5-451f3c80fceb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(131), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b47879ad-4d75-425b-8ca3-3afe7fa6d85a"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(150), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b74c5091-5c46-44b8-8065-aab513fe7ac4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(110), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("b754a6bc-5675-41c4-9155-fc456dd77b67"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(140), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("bab95bb7-02b9-4678-84bb-6a1bbd753968"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(151), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c51dee4c-7786-4616-9ece-73c269a6c9ef"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(174), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("c59b3398-f52d-48b7-9345-3f640236ae0a"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(116), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("c66c55ba-ae0f-4ba3-8f05-cb41bf0c7e54"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(123), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("c6c7b6a0-cac5-44a8-a75e-6e0988394022"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(144), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("c9996545-16d5-4592-b06e-8c2ae70edce1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(133), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("cac47a83-1b13-4ff2-81a2-fb1bc93deb69"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(141), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("cd4217fa-cb09-4eec-bbdc-d9b8b21aec0f"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(105), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("cfd0a0c1-21ff-463d-8daf-9975d6ea713b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(62), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d8618e2c-0c18-44a7-9400-ce54ab3a1279"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(128), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e483b8cf-a62a-473b-aa9c-590aed10dd89"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(73), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e6476c10-bbb2-4ae7-8083-0de1979c9d18"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(162), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e8fd966c-4f4f-4046-bf49-6fced1405d71"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(165), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f24230a1-af14-47ab-8927-df451b2780c3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(61), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f685197d-229f-4ccf-ad4b-20eedf673103"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(78), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f6937e0c-b5a8-449d-b396-4d2e2792490a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(88), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f6e5c671-e50b-4eaa-9cab-db99beab904d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(129), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("f91391a9-b0fe-4069-80e3-8816eb7f318f"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 21, 53, 41, 127, DateTimeKind.Local).AddTicks(174), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null }
                });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-basic-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 13, 53, 41, 87, DateTimeKind.Utc).AddTicks(7417));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-enterprise-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 13, 53, 41, 87, DateTimeKind.Utc).AddTicks(7538));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 13, 53, 41, 87, DateTimeKind.Utc).AddTicks(7532));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-yearly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 13, 53, 41, 87, DateTimeKind.Utc).AddTicks(7541));

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 9, 28, 21, 53, 41, 73, DateTimeKind.Local).AddTicks(3186), "sk-Kr187fg6Q2Yr4IZz4CV6siwVdJdJ1U7dOIc5j8" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 21, 53, 41, 74, DateTimeKind.Local).AddTicks(2246));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 21, 53, 41, 74, DateTimeKind.Local).AddTicks(1843));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 9, 28, 21, 53, 41, 71, DateTimeKind.Local).AddTicks(6062), "c163e3d641d5cb281575dbc9d6b7071e", "9110e647ab634e7b9efe654bd730eed7" });
        }
    }
}
