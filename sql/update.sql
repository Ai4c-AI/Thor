CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;
CREATE TABLE "Loggers" (
    "Id" text NOT NULL,
    "Type" integer NOT NULL,
    "Content" text NOT NULL,
    "PromptTokens" integer NOT NULL,
    "CompletionTokens" integer NOT NULL,
    "Quota" bigint NOT NULL,
    "ModelName" text NOT NULL,
    "TokenName" text,
    "UserName" text,
    "UserId" text,
    "ChannelId" text,
    "TotalTime" integer NOT NULL,
    "Stream" boolean NOT NULL,
    "ChannelName" text,
    "IP" text,
    "UserAgent" text,
    "UpdatedAt" timestamp with time zone,
    "Modifier" text,
    "CreatedAt" timestamp with time zone NOT NULL,
    "Creator" text,
    CONSTRAINT "PK_Loggers" PRIMARY KEY ("Id")
);

CREATE TABLE "ModelStatisticsNumbers" (
    "Id" text NOT NULL,
    "Year" integer NOT NULL,
    "Month" integer NOT NULL,
    "Day" integer NOT NULL,
    "ModelName" text NOT NULL,
    "Quota" integer NOT NULL,
    "TokenUsed" integer NOT NULL,
    "Count" integer NOT NULL,
    "UpdatedAt" timestamp with time zone,
    "Modifier" text,
    "CreatedAt" timestamp with time zone NOT NULL,
    "Creator" text,
    CONSTRAINT "PK_ModelStatisticsNumbers" PRIMARY KEY ("Id")
);

CREATE TABLE "StatisticsConsumesNumbers" (
    "Id" text NOT NULL,
    "Year" integer NOT NULL,
    "Month" integer NOT NULL,
    "Day" integer NOT NULL,
    "Number" bigint NOT NULL,
    "Type" integer NOT NULL,
    "Value" bigint NOT NULL,
    "UpdatedAt" timestamp with time zone,
    "Modifier" text,
    "CreatedAt" timestamp with time zone NOT NULL,
    "Creator" text,
    CONSTRAINT "PK_StatisticsConsumesNumbers" PRIMARY KEY ("Id")
);

CREATE INDEX "IX_Loggers_Creator" ON "Loggers" ("Creator");

CREATE INDEX "IX_Loggers_ModelName" ON "Loggers" ("ModelName");

CREATE INDEX "IX_Loggers_TokenName" ON "Loggers" ("TokenName");

CREATE INDEX "IX_Loggers_UserName" ON "Loggers" ("UserName");

CREATE INDEX "IX_ModelStatisticsNumbers_Creator" ON "ModelStatisticsNumbers" ("Creator");

CREATE INDEX "IX_ModelStatisticsNumbers_Day" ON "ModelStatisticsNumbers" ("Day");

CREATE INDEX "IX_ModelStatisticsNumbers_ModelName" ON "ModelStatisticsNumbers" ("ModelName");

CREATE INDEX "IX_ModelStatisticsNumbers_Month" ON "ModelStatisticsNumbers" ("Month");

CREATE INDEX "IX_ModelStatisticsNumbers_Year" ON "ModelStatisticsNumbers" ("Year");

CREATE INDEX "IX_StatisticsConsumesNumbers_Creator" ON "StatisticsConsumesNumbers" ("Creator");

CREATE INDEX "IX_StatisticsConsumesNumbers_Day" ON "StatisticsConsumesNumbers" ("Day");

CREATE INDEX "IX_StatisticsConsumesNumbers_Month" ON "StatisticsConsumesNumbers" ("Month");

CREATE INDEX "IX_StatisticsConsumesNumbers_Year" ON "StatisticsConsumesNumbers" ("Year");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20241103165851_Initial', '9.0.2');

ALTER TABLE "StatisticsConsumesNumbers" ALTER COLUMN "UpdatedAt" TYPE timestamp without time zone;

ALTER TABLE "StatisticsConsumesNumbers" ALTER COLUMN "CreatedAt" TYPE timestamp without time zone;

ALTER TABLE "ModelStatisticsNumbers" ALTER COLUMN "UpdatedAt" TYPE timestamp without time zone;

ALTER TABLE "ModelStatisticsNumbers" ALTER COLUMN "CreatedAt" TYPE timestamp without time zone;

ALTER TABLE "Loggers" ALTER COLUMN "UpdatedAt" TYPE timestamp without time zone;

ALTER TABLE "Loggers" ALTER COLUMN "CreatedAt" TYPE timestamp without time zone;

ALTER TABLE "Loggers" ADD "OrganizationId" text;

CREATE INDEX "IX_Loggers_OrganizationId" ON "Loggers" ("OrganizationId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20241202104506_AddOrganizationId', '9.0.2');

ALTER TABLE "Loggers" ADD "IsSuccess" boolean NOT NULL DEFAULT FALSE;

ALTER TABLE "Loggers" ADD "Metadata" text;

ALTER TABLE "Loggers" ADD "OpenAIProject" text;

ALTER TABLE "Loggers" ADD "ServiceId" text;

ALTER TABLE "Loggers" ADD "Url" text;

CREATE TABLE "Tracings" (
    "Id" text NOT NULL,
    "TraceId" text NOT NULL,
    "ChatLoggerId" text NOT NULL,
    "Name" text NOT NULL,
    "Type" integer NOT NULL,
    "StartTime" timestamp without time zone NOT NULL,
    "EndTime" timestamp without time zone,
    "Duration" bigint NOT NULL,
    "Status" integer NOT NULL,
    "ErrorMessage" text,
    "Depth" integer NOT NULL,
    "ServiceName" text NOT NULL,
    "Attributes" text,
    "Children" text NOT NULL,
    "UpdatedAt" timestamp without time zone,
    "Modifier" text,
    "CreatedAt" timestamp without time zone NOT NULL,
    "Creator" text,
    CONSTRAINT "PK_Tracings" PRIMARY KEY ("Id")
);

CREATE INDEX "IX_Loggers_ServiceId" ON "Loggers" ("ServiceId");

CREATE INDEX "IX_Loggers_UserId" ON "Loggers" ("UserId");

CREATE INDEX "IX_Tracings_ChatLoggerId" ON "Tracings" ("ChatLoggerId");

CREATE INDEX "IX_Tracings_Creator" ON "Tracings" ("Creator");

CREATE INDEX "IX_Tracings_TraceId" ON "Tracings" ("TraceId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20250515194304_AddTracing', '9.0.2');

CREATE TABLE "RequestLogs" (
    "Id" text NOT NULL,
    "ChatLoggerId" text,
    "RoutePath" text NOT NULL,
    "RequestTime" timestamp without time zone NOT NULL,
    "ResponseTime" timestamp without time zone NOT NULL,
    "DurationMs" bigint NOT NULL,
    "IsSuccess" boolean NOT NULL,
    "HttpStatusCode" integer NOT NULL,
    "ClientIp" text,
    "UserAgent" text,
    "RequestHeaders" text,
    "RequestBody" text,
    "ResponseBody" text,
    "ErrorMessage" text,
    "CreatedAt" timestamp without time zone NOT NULL,
    "UpdatedAt" timestamp without time zone,
    "Modifier" text,
    "Creator" text,
    CONSTRAINT "PK_RequestLogs" PRIMARY KEY ("Id")
);

CREATE INDEX "IX_RequestLogs_ChatLoggerId" ON "RequestLogs" ("ChatLoggerId");

CREATE INDEX "IX_RequestLogs_Creator" ON "RequestLogs" ("Creator");

CREATE INDEX "IX_RequestLogs_RoutePath" ON "RequestLogs" ("RoutePath");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20250717033022_AddRequestLogger', '9.0.2');

CREATE TABLE "ImageTaskLoggers" (
    "Id" text NOT NULL,
    "TaskId" character varying(100) NOT NULL,
    "TaskType" integer NOT NULL,
    "TaskStatus" integer NOT NULL,
    "Prompt" text NOT NULL,
    "ImageUrls" text,
    "Quota" bigint NOT NULL,
    "ModelName" character varying(100) NOT NULL,
    "TokenName" character varying(100),
    "UserName" character varying(100),
    "UserId" text,
    "ChannelId" text,
    "ChannelName" character varying(100),
    "TotalTime" integer NOT NULL,
    "IP" text,
    "UserAgent" text,
    "OrganizationId" text,
    "Url" text,
    "IsSuccess" boolean NOT NULL,
    "ErrorMessage" text,
    "TaskParameters" text,
    "Progress" integer NOT NULL,
    "TaskCreatedAt" timestamp without time zone,
    "TaskCompletedAt" timestamp without time zone,
    "Metadata" text,
    "UpdatedAt" timestamp without time zone,
    "Modifier" text,
    "CreatedAt" timestamp without time zone NOT NULL,
    "Creator" text,
    CONSTRAINT "PK_ImageTaskLoggers" PRIMARY KEY ("Id")
);

CREATE INDEX "IX_ImageTaskLoggers_ChannelId" ON "ImageTaskLoggers" ("ChannelId");

CREATE INDEX "IX_ImageTaskLoggers_CreatedAt" ON "ImageTaskLoggers" ("CreatedAt");

CREATE INDEX "IX_ImageTaskLoggers_Creator" ON "ImageTaskLoggers" ("Creator");

CREATE INDEX "IX_ImageTaskLoggers_ModelName" ON "ImageTaskLoggers" ("ModelName");

CREATE INDEX "IX_ImageTaskLoggers_OrganizationId" ON "ImageTaskLoggers" ("OrganizationId");

CREATE INDEX "IX_ImageTaskLoggers_TaskId" ON "ImageTaskLoggers" ("TaskId");

CREATE INDEX "IX_ImageTaskLoggers_TaskStatus" ON "ImageTaskLoggers" ("TaskStatus");

CREATE INDEX "IX_ImageTaskLoggers_TaskType" ON "ImageTaskLoggers" ("TaskType");

CREATE INDEX "IX_ImageTaskLoggers_UserId" ON "ImageTaskLoggers" ("UserId");

CREATE INDEX "IX_ImageTaskLoggers_UserName" ON "ImageTaskLoggers" ("UserName");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20250919191434_AddImageTask', '9.0.2');

COMMIT;

