using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Thor.Provider.Thor
{
    /// <inheritdoc />
    public partial class AddWeeklySubscriptionType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("00e04ae3-b7bd-4c54-bf23-631a93d1decd"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("0499e5f5-e6ea-4db8-b693-9d8304961a17"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("09b19b91-8a89-442d-8ede-6a4a750e894c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("12d8a2c4-3993-41cc-9c7c-913c62e770d4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("18ba4be5-2c2d-4b7c-a3b3-33fe77c5748b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1d5fca41-ba0f-423a-a7c7-9b0137450cfd"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("1f69c6ad-31a4-4579-80e0-b85399428929"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("2edbba15-1442-4c0a-89bf-74952e594e13"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3cd03761-eac9-4bdb-ae5b-f55b56a2441d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("3d1ddceb-9edc-4509-903f-6cc5cdbd63ce"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4073fbd5-1f59-4ad1-a78c-1024e6c7725a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("41d18093-ec55-4ed4-88ea-1db79e6a4e8a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("43be90c3-2f8d-4bcd-a554-82b86f0b6bc0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4403d5d3-2013-4ea1-a938-71801fda61a9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("4483bcfd-ee2a-4c6d-9c47-6717342550e2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("44c73a9d-ccd8-4fa2-93d7-187113a4da88"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("48b3380a-b3c0-4d9a-84ce-6794083b9151"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("491edcb4-4c66-4666-9831-53075029bba1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("51c824f5-b556-44e2-988f-06a834c54f90"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5242f55a-42e0-4c55-b271-2c9a28ac8816"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("59046c79-d341-4fdf-a648-52b06bd5c4dc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5ae2e20d-2e03-47f6-a800-80e7b60d6ceb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5c5b9799-731f-4109-83eb-f1b01f60638d"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5d33d63c-e0b2-46f2-acf2-d96dfdf98e0b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("5e5c44a4-6609-4a69-a2b1-0c25c5b4c7e3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("61290e82-94d8-4066-b342-030ad9df8b35"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("61bcc308-32dc-435d-95dd-9f97292c5a4c"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("62dac4b6-1d9d-45cc-aca3-e04b7a7c2714"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("69a67c6e-167a-4fe7-8b0f-7d2da2ef021b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6aaadf19-7fda-413d-a92f-33a973848e09"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6d4528ac-9921-4bcb-939f-a8c907d956a8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("6ee2f417-8390-4346-a40e-7d027b3817b3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("701a9390-2706-40b1-b69f-6a68ba344057"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("71daef5a-2b4d-4df6-b1df-f5c4c616c7e4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("78fd8631-d621-49f5-8ae2-d3140c986ac2"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7973a3c4-3f04-4804-9d7b-b5894a6a3ca1"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("79a014b8-3150-493c-ab6e-a227494cbc6a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("79a5ab81-d17c-4061-a413-1510476d9f7b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7ae05fd3-711b-4264-bbb9-89670b9aaab8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7c11e15b-e19a-492d-b121-66c370fce2ae"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7c609010-e286-4bed-aff5-052748c622a0"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("7ec50c47-0715-4c01-8470-73cbbdb0be68"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("82f7863c-9d9d-4961-abf1-e48574860405"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8397e599-2bc6-4c55-a28e-6d4d2620a74f"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("8fca6764-4edf-4789-82ca-cbbcd07c0a3e"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("92925cdb-d6d8-4303-8129-ef1b2d36d75b"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9476c67e-0350-4893-9bb2-d6641f133e33"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("951cc4fe-9c04-450d-a021-f6e0c33eacdb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("964af39f-4c1c-4519-9bb4-b224b68bfdc5"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("9daa23d1-4c00-47df-bef6-9809383a0fd9"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a41eb9e2-7516-461d-8de6-557a135fe056"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a689183f-c1aa-48d1-904f-3d2c41b2b440"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a8c43c6f-499f-4eb0-8c5d-86ff0cde7508"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("a9e25409-87f9-45d2-86bf-c5c423edbd81"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ae37a816-8599-4f34-bc18-71bcd967fe18"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b23c1953-cf8c-4f36-b179-69c43da29555"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b7aaf249-520b-4bfc-802b-c9311c81df88"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("b8e9883a-a136-4f76-a0ca-a9362b4d6a2a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c0552e2b-32a8-41fb-a48d-1690aa55d2ca"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("c1f1a802-b32c-4074-9922-4094a0923dbc"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("cbceb626-0bc6-4d5e-aab3-cbbc23e10267"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("cdb1b563-67ec-4c5c-adae-df0c6110a696"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d3ead805-d634-49e6-b3fe-b25278fe785a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d434a792-cf84-4ef6-bf5f-8539636e7f3a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d72ba8c4-617c-4352-826f-dd029595aedb"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d7599fb4-6588-4522-85e8-002155831eca"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("d9048d22-2930-4549-a089-91afb0007662"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("da1d803f-0f1d-436f-8d49-75fcb9746f12"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("db05bd1e-bba1-46bc-ac60-482b24e011f3"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("de783c8c-d42a-4263-9735-a950c9c3f4a7"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e183bbda-f7af-475f-9f35-be2e27c45b06"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e1b98579-817a-42e5-96a0-327c515fe2f8"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e2c12da4-fd98-4262-95b4-a5480adafd24"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("e5edd131-6ecb-487d-ac53-9d43412019a4"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("ef56ba32-f115-4d2f-b56d-7b6a754c4d6a"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("f78144f6-7b87-410c-97c8-4595465a2397"));

            migrationBuilder.DeleteData(
                table: "ModelManagers",
                keyColumn: "Id",
                keyValue: new Guid("fbb46b7c-9574-4ed0-beb4-67051f0e46ec"));

            migrationBuilder.AddColumn<string>(
                name: "Groups",
                table: "SubscriptionPlans",
                type: "TEXT",
                nullable: true);

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
                columns: new[] { "CreatedAt", "Groups" },
                values: new object[] { new DateTime(2025, 9, 28, 13, 53, 41, 87, DateTimeKind.Utc).AddTicks(7417), null });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-enterprise-monthly",
                columns: new[] { "CreatedAt", "Groups" },
                values: new object[] { new DateTime(2025, 9, 28, 13, 53, 41, 87, DateTimeKind.Utc).AddTicks(7538), null });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-monthly",
                columns: new[] { "CreatedAt", "Groups" },
                values: new object[] { new DateTime(2025, 9, 28, 13, 53, 41, 87, DateTimeKind.Utc).AddTicks(7532), null });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-yearly",
                columns: new[] { "CreatedAt", "Groups" },
                values: new object[] { new DateTime(2025, 9, 28, 13, 53, 41, 87, DateTimeKind.Utc).AddTicks(7541), null });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Groups",
                table: "SubscriptionPlans");

            migrationBuilder.InsertData(
                table: "ModelManagers",
                columns: new[] { "Id", "AudioCacheRate", "AudioOutputRate", "AudioPromptRate", "Available", "CacheHitRate", "CacheRate", "CompletionRate", "ContextPricingTiers", "CreatedAt", "Creator", "DefaultContextLength", "Description", "Enable", "Extension", "Icon", "IsVersion2", "Model", "Modifier", "PromptRate", "QuotaMax", "QuotaType", "Tags", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("00e04ae3-b7bd-4c54-bf23-631a93d1decd"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8143), null, 4096, "GPT-3.5 Turbo 16k 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("0499e5f5-e6ea-4db8-b693-9d8304961a17"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8209), null, 4096, "ChatGLM Lite 文本模型", true, "{}", "ChatGLM", false, "chatglm_lite", null, 0.1429m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("09b19b91-8a89-442d-8ede-6a4a750e894c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8202), null, 4096, "Hunyuan Lite 文本模型", true, "{}", "Hunyuan", false, "hunyuan-lite", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("12d8a2c4-3993-41cc-9c7c-913c62e770d4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8232), null, 4096, "GLM 4 全部文本模型", true, "{}", "ChatGLM", false, "glm-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("18ba4be5-2c2d-4b7c-a3b3-33fe77c5748b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8212), null, 4096, "ChatGLM Turbo 文本模型", true, "{}", "ChatGLM", false, "chatglm_turbo", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1d5fca41-ba0f-423a-a7c7-9b0137450cfd"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8222), null, 4096, "Claude Instant 1 文本模型", true, "{}", "Claude", false, "claude-instant-1", null, 0.815m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("1f69c6ad-31a4-4579-80e0-b85399428929"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8201), null, 4096, "Whisper 1 语音识别模型", true, "{}", "OpenAI", false, "whisper-1", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "stt", null },
                    { new Guid("2edbba15-1442-4c0a-89bf-74952e594e13"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8207), null, 4096, "4.0 超级文本模型", true, "{}", "Spark", false, "4.0Ultra", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3cd03761-eac9-4bdb-ae5b-f55b56a2441d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8149), null, 4096, "GPT-4 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-0314", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("3d1ddceb-9edc-4509-903f-6cc5cdbd63ce"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8194), null, 4096, "Text Embedding 3 Small 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-small", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("4073fbd5-1f59-4ad1-a78c-1024e6c7725a"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8221), null, 4096, "Claude 3 Opus 20240229 文本模型", true, "{}", "Claude", false, "claude-3-opus-20240229", null, 30m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("41d18093-ec55-4ed4-88ea-1db79e6a4e8a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8194), null, 4096, "Text Embedding 3 Large 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-3-large", null, 0.13m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null },
                    { new Guid("43be90c3-2f8d-4bcd-a554-82b86f0b6bc0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8160), null, 4096, "GPT-4 32k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0613", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4403d5d3-2013-4ea1-a938-71801fda61a9"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8216), null, 4096, "Claude 3 Haiku 文本模型", true, "{}", "Claude", false, "claude-3-haiku", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("4483bcfd-ee2a-4c6d-9c47-6717342550e2"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8181), null, 4096, "GPT-4o Mini 2024-07-18 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini-2024-07-18", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("44c73a9d-ccd8-4fa2-93d7-187113a4da88"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8193), null, 4096, "Text Davinci Edit 001 文本模型", true, "{}", "OpenAI", false, "text-davinci-edit-001", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("48b3380a-b3c0-4d9a-84ce-6794083b9151"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8206), null, 4096, "通用文本模型 v3.5", true, "{}", "Spark", false, "generalv3.5", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("491edcb4-4c66-4666-9831-53075029bba1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8162), null, 4096, "GPT-4 全部文本模型", true, "{}", "OpenAI", false, "gpt-4-all", null, 30m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u8054\\u7F51\"]", "chat", null },
                    { new Guid("51c824f5-b556-44e2-988f-06a834c54f90"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8221), null, 4096, "Claude 3 Sonnet 20240229 文本模型", true, "{}", "Claude", false, "claude-3-sonnet-20240229", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5242f55a-42e0-4c55-b271-2c9a28ac8816"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8223), null, 4096, "Claude Instant 1.2 文本模型", true, "{}", "Claude", false, "claude-instant-1.2", null, 0.4m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("59046c79-d341-4fdf-a648-52b06bd5c4dc"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8213), null, 4096, "Claude 2 文本模型", true, "{}", "Claude", false, "claude-2", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5ae2e20d-2e03-47f6-a800-80e7b60d6ceb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8147), null, 4096, "GPT-4 文本模型", true, "{}", "OpenAI", false, "gpt-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5c5b9799-731f-4109-83eb-f1b01f60638d"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8186), null, 4096, "Moonshot v1 32k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-32k", null, 2m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5d33d63c-e0b2-46f2-acf2-d96dfdf98e0b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8215), null, 4096, "Claude 2.1 文本模型", true, "{}", "Claude", false, "claude-2.1", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("5e5c44a4-6609-4a69-a2b1-0c25c5b4c7e3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8228), null, 4096, "Embedding 2 嵌入模型", true, "{}", "OpenAI", false, "embedding-2", null, 0.0355m, "", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("61290e82-94d8-4066-b342-030ad9df8b35"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8165), null, 4096, "Gemini Pro 文本模型", true, "{}", "Google", false, "gemini-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("61bcc308-32dc-435d-95dd-9f97292c5a4c"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8127), null, 4096, "GPT-3.5 Turbo 0301 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0301", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("62dac4b6-1d9d-45cc-aca3-e04b7a7c2714"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8228), null, 4096, "Embedding BERT 512 v1 嵌入模型", true, "{}", "OpenAI", false, "embedding-bert-512-v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("69a67c6e-167a-4fe7-8b0f-7d2da2ef021b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8199), null, 4096, "TTS 1 HD 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("6aaadf19-7fda-413d-a92f-33a973848e09"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8173), null, 4096, "GPT-4 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-vision-preview", null, 10m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("6d4528ac-9921-4bcb-939f-a8c907d956a8"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8168), null, 4096, "Gemini Pro 视觉模型", true, "{}", "Google", false, "gemini-pro-vision", null, 2m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("6ee2f417-8390-4346-a40e-7d027b3817b3"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8124), null, 4096, "GPT-3.5 Turbo 0125 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0125", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("701a9390-2706-40b1-b69f-6a68ba344057"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8129), null, 4096, "GPT-3.5 Turbo 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-0613", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("71daef5a-2b4d-4df6-b1df-f5c4c616c7e4"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8174), null, 4096, "GPT-4o 文本模型", true, "{}", "OpenAI", false, "gpt-4o", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("78fd8631-d621-49f5-8ae2-d3140c986ac2"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8187), null, 4096, "Moonshot v1 8k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-8k", null, 1m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7973a3c4-3f04-4804-9d7b-b5894a6a3ca1"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8229), null, 4096, "Embedding S1 v1 嵌入模型", true, "{}", null, false, "embedding_s1_v1", null, 0.1m, "128K", 1, "[\"\\u5D4C\\u5165\\u6A21\\u578B\"]", "embedding", null },
                    { new Guid("79a014b8-3150-493c-ab6e-a227494cbc6a"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8184), null, 4096, "GPT-4o 2024-08-06 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-08-06", null, 1.25m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("79a5ab81-d17c-4061-a413-1510476d9f7b"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8175), null, 4096, "ChatGPT 4o 最新文本模型", true, "{}", "OpenAI", false, "chatgpt-4o-latest", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("7ae05fd3-711b-4264-bbb9-89670b9aaab8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8232), null, 4096, "GLM 4v 文本模型", true, "{}", "ChatGLM", false, "glm-4v", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7c11e15b-e19a-492d-b121-66c370fce2ae"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8159), null, 4096, "GPT-4 32k 0314 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k-0314", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7c609010-e286-4bed-aff5-052748c622a0"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8192), null, 4096, "Text Davinci 003 文本模型", true, "{}", "OpenAI", false, "text-davinci-003", null, 10m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("7ec50c47-0715-4c01-8470-73cbbdb0be68"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8170), null, 4096, "GPT-4 Turbo 2024-04-09 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-2024-04-09", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("82f7863c-9d9d-4961-abf1-e48574860405"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8191), null, 4096, "Text Davinci 002 文本模型", true, "{}", "OpenAI", false, "text-davinci-002", null, 10m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8397e599-2bc6-4c55-a28e-6d4d2620a74f"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8205), null, 4096, "通用文本模型 v3", true, "{}", "Spark", false, "generalv3", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("8fca6764-4edf-4789-82ca-cbbcd07c0a3e"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8231), null, 4096, "GLM 4 文本模型", true, "{}", "ChatGLM", false, "glm-4", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("92925cdb-d6d8-4303-8129-ef1b2d36d75b"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8187), null, 4096, "Text Babbage 001 文本模型", true, "{}", "OpenAI", false, "text-babbage-001", null, 0.25m, "8K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9476c67e-0350-4893-9bb2-d6641f133e33"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8157), null, 4096, "GPT-4 32k 文本模型", true, "{}", "OpenAI", false, "gpt-4-32k", null, 30m, "32K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("951cc4fe-9c04-450d-a021-f6e0c33eacdb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8188), null, 4096, "Text Curie 001 文本模型", true, "{}", "OpenAI", false, "text-curie-001", null, 1m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("964af39f-4c1c-4519-9bb4-b224b68bfdc5"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8211), null, 4096, "ChatGLM 标准文本模型", true, "{}", "ChatGLM", false, "chatglm_std", null, 0.3572m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("9daa23d1-4c00-47df-bef6-9809383a0fd9"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8183), null, 4096, "GPT-4o 2024-05-13 文本模型", true, "{}", "OpenAI", false, "gpt-4o-2024-05-13", null, 3m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("a41eb9e2-7516-461d-8de6-557a135fe056"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8164), null, 4096, "Gemini 1.5 Pro 文本模型", true, "{}", "Google", false, "gemini-1.5-pro", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a689183f-c1aa-48d1-904f-3d2c41b2b440"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8219), null, 4096, "Claude 3 Haiku 20240307 文本模型", true, "{}", "Claude", false, "claude-3-haiku-20240307", null, 0.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a8c43c6f-499f-4eb0-8c5d-86ff0cde7508"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8152), null, 4096, "GPT-4 1106 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-1106-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("a9e25409-87f9-45d2-86bf-c5c423edbd81"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8224), null, 4096, "DALL-E 3 图像生成模型", true, "{}", "OpenAI", false, "dall-e-3", null, 20000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("ae37a816-8599-4f34-bc18-71bcd967fe18"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8210), null, 4096, "ChatGLM Pro 文本模型", true, "{}", "ChatGLM", false, "chatglm_pro", null, 0.7143m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b23c1953-cf8c-4f36-b179-69c43da29555"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8156), null, 4096, "GPT-4 1106 视觉预览模型", true, "{}", "OpenAI", false, "gpt-4-1106-vision-preview", null, 10m, "128K", 1, "[\"\\u89C6\\u89C9\",\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("b7aaf249-520b-4bfc-802b-c9311c81df88"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8227), null, 4096, "GPT Image 图片生成模型", true, "{}", "OpenAI", false, "gpt-image-1", null, 50000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("b8e9883a-a136-4f76-a0ca-a9362b4d6a2a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8200), null, 4096, "TTS 1 HD 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-hd-1106", null, 15m, null, 2, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("c0552e2b-32a8-41fb-a48d-1690aa55d2ca"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8145), null, 4096, "GPT-3.5 Turbo Instruct 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-instruct", null, 0.001m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("c1f1a802-b32c-4074-9922-4094a0923dbc"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8130), null, 4096, "GPT-3.5 Turbo 1106 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-1106", null, 0.25m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("cbceb626-0bc6-4d5e-aab3-cbbc23e10267"), null, null, null, true, null, null, 2m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8204), null, 4096, "通用文本模型", true, "{}", "Spark", false, "general", null, 2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("cdb1b563-67ec-4c5c-adae-df0c6110a696"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8148), null, 4096, "GPT-4 0125 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-0125-preview", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d3ead805-d634-49e6-b3fe-b25278fe785a"), null, null, null, true, null, null, 5m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8219), null, 4096, "Claude 3.5 Sonnet 20240620 文本模型", true, "{}", "Claude", false, "claude-3-5-sonnet-20240620", null, 3m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d434a792-cf84-4ef6-bf5f-8539636e7f3a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8185), null, 4096, "Moonshot v1 128k 文本模型", true, "{}", "Moonshot", false, "moonshot-v1-128k", null, 5.06m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d72ba8c4-617c-4352-826f-dd029595aedb"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8163), null, 4096, "GPT-4 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo", null, 5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d7599fb4-6588-4522-85e8-002155831eca"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(7845), null, 4096, "GPT-3.5 Turbo 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo", null, 0.75m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("d9048d22-2930-4549-a089-91afb0007662"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8230), null, 4096, "GLM 3 Turbo 文本模型", true, "{}", "ChatGLM", false, "glm-3-turbo", null, 0.355m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("da1d803f-0f1d-436f-8d49-75fcb9746f12"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8172), null, 4096, "GPT-4 Turbo 预览文本模型", true, "{}", "OpenAI", false, "gpt-4-turbo-preview", null, 5m, "8K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\"]", "chat", null },
                    { new Guid("db05bd1e-bba1-46bc-ac60-482b24e011f3"), null, null, null, true, null, null, 3m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8169), null, 4096, "Gemini 1.5 Flash 文本模型", true, "{}", "Google", false, "gemini-1.5-flash", null, 0.2m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("de783c8c-d42a-4263-9735-a950c9c3f4a7"), null, null, null, true, null, null, 4m, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8177), null, 4096, "GPT-4o Mini 文本模型", true, "{}", "OpenAI", false, "gpt-4o-mini", null, 0.07m, "128K", 1, "[\"\\u6587\\u672C\",\"\\u89C6\\u89C9\",\"\\u97F3\\u9891\"]", "chat", null },
                    { new Guid("e183bbda-f7af-475f-9f35-be2e27c45b06"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8214), null, 4096, "Claude 2.0 文本模型", true, "{}", "Claude", false, "claude-2.0", null, 7.5m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e1b98579-817a-42e5-96a0-327c515fe2f8"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8196), null, 4096, "TTS 1 语音合成模型", true, "{}", "OpenAI", false, "tts-1", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("e2c12da4-fd98-4262-95b4-a5480adafd24"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8151), null, 4096, "GPT-4 0613 文本模型", true, "{}", "OpenAI", false, "gpt-4-0613", null, 15m, "128K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("e5edd131-6ecb-487d-ac53-9d43412019a4"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8197), null, 4096, "TTS 1 1106 语音合成模型", true, "{}", "OpenAI", false, "tts-1-1106", null, 7.5m, null, 1, "[\"\\u97F3\\u9891\"]", "tts", null },
                    { new Guid("ef56ba32-f115-4d2f-b56d-7b6a754c4d6a"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8223), null, 4096, "DALL-E 2 图像生成模型", true, "{}", "OpenAI", false, "dall-e-2", null, 8000m, null, 2, "[\"\\u56FE\\u7247\"]", "image", null },
                    { new Guid("f78144f6-7b87-410c-97c8-4595465a2397"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8144), null, 4096, "GPT-3.5 Turbo 16k 0613 文本模型", true, "{}", "OpenAI", false, "gpt-3.5-turbo-16k-0613", null, 0.75m, "16K", 1, "[\"\\u6587\\u672C\"]", "chat", null },
                    { new Guid("fbb46b7c-9574-4ed0-beb4-67051f0e46ec"), null, null, null, true, null, null, null, "[]", new DateTime(2025, 9, 28, 18, 30, 35, 142, DateTimeKind.Local).AddTicks(8195), null, 4096, "Text Embedding Ada 002 嵌入模型", true, "{}", "OpenAI", false, "text-embedding-ada-002", null, 0.1m, "8K", 1, "[\"\\u6587\\u672C\"]", "embedding", null }
                });

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-basic-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 10, 30, 35, 106, DateTimeKind.Utc).AddTicks(423));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-enterprise-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 10, 30, 35, 106, DateTimeKind.Utc).AddTicks(560));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-monthly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 10, 30, 35, 106, DateTimeKind.Utc).AddTicks(551));

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: "plan-premium-yearly",
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 10, 30, 35, 106, DateTimeKind.Utc).AddTicks(563));

            migrationBuilder.UpdateData(
                table: "Tokens",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Key" },
                values: new object[] { new DateTime(2025, 9, 28, 18, 30, 35, 89, DateTimeKind.Local).AddTicks(2338), "sk-v3fUJZtQv4M7O0ZxGTTyAIJ570HGZYGJnANERy" });

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae17291"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 18, 30, 35, 90, DateTimeKind.Local).AddTicks(5649));

            migrationBuilder.UpdateData(
                table: "UserGroups",
                keyColumn: "Id",
                keyValue: new Guid("ca378c74-19e7-458a-918b-4dbb7ae1729d"),
                column: "CreatedAt",
                value: new DateTime(2025, 9, 28, 18, 30, 35, 90, DateTimeKind.Local).AddTicks(5138));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "CA378C74-19E7-458A-918B-4DBB7AE1729D",
                columns: new[] { "CreatedAt", "Password", "PasswordHas" },
                values: new object[] { new DateTime(2025, 9, 28, 18, 30, 35, 86, DateTimeKind.Local).AddTicks(8644), "f0c2922b6652e170a8917bb046442652", "266d804e34b8470d850292c4e7be3ec4" });
        }
    }
}
