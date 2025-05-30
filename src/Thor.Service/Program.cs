using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebSockets;
using Serilog;
using System.Text.Json.Serialization;
using Thor.Abstractions.Anthropic;
using Thor.Abstractions.Chats.Dtos;
using Thor.Abstractions.Dtos;
using Thor.Abstractions.Embeddings.Dtos;
using Thor.Abstractions.ObjectModels.ObjectModels.RequestModels;
using Thor.Abstractions.Responses;
using Thor.Abstractions.Tracker;
using Thor.AWSClaude.Extensions;
using Thor.AzureOpenAI.Extensions;
using Thor.BuildingBlocks.Event;
using Thor.Claude.Extensions;
using Thor.Core.DataAccess;
using Thor.Core.Extensions;
using Thor.DeepSeek.Extensions;
using Thor.Domain.Chats;
using Thor.Domain.Users;
using Thor.ErnieBot.Extensions;
using Thor.GCPClaude.Extensions;
using Thor.Hunyuan.Extensions;
using Thor.LocalEvent;
using Thor.LocalMemory.Cache;
using Thor.MetaGLM.Extensions;
using Thor.MiniMax.Extensions;
using Thor.Moonshot.Extensions;
using Thor.Ollama.Extensions;
using Thor.Provider;
using Thor.Qiansail.Extensions;
using Thor.RabbitMQEvent;
using Thor.RedisMemory.Cache;
using Thor.Service.BackgroundTask;
using Thor.Service.Eto;
using Thor.Service.EventBus;
using Thor.Service.Extensions;
using Thor.Service.Filters;
using Thor.Service.Infrastructure;
using Thor.Service.Infrastructure.Middlewares;
using Thor.Service.Options;
using Thor.Service.Service;
using Thor.Service.Service.OpenAI;
using Thor.SiliconFlow.Extensions;
using Thor.SparkDesk.Extensions;
using Thor.VolCenGine.Extensions;
using Product = Thor.Service.Domain.Product;

try
{
    Directory.SetCurrentDirectory(AppContext.BaseDirectory);

    var builder = WebApplication.CreateBuilder(new WebApplicationOptions()
    {
        Args = args,
        ContentRootPath = AppContext.BaseDirectory,
    });

    // 添加Windows服务支持
    if (OperatingSystem.IsWindows())
    {
        builder.Host.UseWindowsService(options => { options.ServiceName = "ThorService"; });
    }

    builder.HostEnvironment();

    Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(builder.Configuration)
        .CreateLogger();

    builder.Host.UseSerilog(Log.Logger);

    builder.Services.ConfigureHttpJsonOptions(options =>
    {
        options.SerializerOptions.Converters.Add(new JsonDateTimeConverter());
        options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

    builder.Services.AddHttpClient();

    builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddMapster();

    if (string.IsNullOrEmpty(CacheOptions.Type) ||
        CacheOptions.Type.Equals("Memory", StringComparison.OrdinalIgnoreCase))
    {
        builder.Services.AddLocalMemory();
    }
    else if (CacheOptions.Type.Equals("Redis", StringComparison.OrdinalIgnoreCase))
    {
        builder.Services.AddRedisMemory(CacheOptions.ConnectionString);
    }

    var rabbitMqConnectionString = builder.Configuration["RabbitMQ:ConnectionString"];
    if (!string.IsNullOrEmpty(rabbitMqConnectionString))
    {
        builder.Services.AddRabbitMqEventBus(builder.Configuration);

        var serializerType = builder.Configuration["RabbitMQ:Serializer"];
        if (serializerType?.Equals("MessagePack", StringComparison.OrdinalIgnoreCase) == true)
        {
            builder.Services.AddRabbitMqMessagePackSerializer();
        }
        else
        {
            builder.Services.AddRabbitMqJsonSerializer();
        }
    }
    else
    {
        builder.Services.AddLocalEventBus();
    }


    builder.Services.AddMvcCore().AddApiExplorer();
    builder.Services
        .AddEndpointsApiExplorer()
        .AddSwaggerGen()
        .AddCustomAuthentication()
        .AddHttpContextAccessor()
        .AddScoped<IEventHandler<ChatLogger>, ChatLoggerEventHandler>()
        .AddScoped<IEventHandler<CreateUserEto>, CreateUserEventHandler>()
        .AddScoped<IEventHandler<UpdateModelManagerCache>, ModelManagerEventHandler>()
        .AddTransient<JwtHelper>()
        .AddSingleton<OpenTelemetryMiddlewares>()
        .AddSingleton<UnitOfWorkMiddleware>()
        .AddScoped<AuthorizeService>()
        .AddScoped<ChannelService>()
        .AddScoped<EmailService>()
        .AddScoped<ImageService>()
        .AddScoped<LoggerService>()
        .AddScoped<ModelManagerService>()
        .AddScoped<AnthropicChatService>()
        .AddScoped<ResponsesService>()
        .AddScoped<ProductService>()
        .AddScoped<RateLimitModelService>()
        .AddScoped<SystemService>()
        .AddScoped<ChatService>()
        .AddScoped<ITrackerStorage, TrackerStorage>()
        .AddScoped<RedeemCodeService>()
        .AddScoped<TokenService>()
        .AddScoped<UserGroupService>()
        .AddScoped<TrackerService>()
        .AddScoped<ModelMapService>()
        .AddScoped<UserService>()
        .AddScoped<IUserContext, DefaultUserContext>()
        .AddHostedService<StatisticBackgroundTask>()
        .AddHostedService<LoggerBackgroundTask>()
        .AddHostedService<TrackerBackgroundTask>()
        .AddHostedService<AutoChannelDetectionBackgroundTask>()
        .AddOpenAIService()
        .AddMoonshotService()
        .AddSparkDeskService()
        .AddQiansailService()
        .AddGCPClaudeService()
        .AddMetaGLMService()
        .AddHunyuanService()
        .AddClaudiaService()
        .AddAWSClaudeService()
        .AddOllamaService()
        .AddAzureOpenAIService()
        .AddErnieBotService()
        .AddGiteeAIService()
        .AddMiniMaxService()
        .AddVolCenGineService()
        .AddSiliconFlowService()
        .AddDeepSeekService();

    builder.Services
        .AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                builder => builder
                    .SetIsOriginAllowed(_ => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        });

    // 获取环境变量
    var dbType = builder.Configuration["DBType"];

    builder.Services.AddThorDataAccess((collection =>
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);

        if (dbType.Equals("PostgreSQL", StringComparison.OrdinalIgnoreCase) ||
            dbType.Equals("pgsql", StringComparison.OrdinalIgnoreCase))
        {
            collection.AddThorPostgreSQLDbContext(builder.Configuration);
        }
        else if (dbType.Equals("mysql", StringComparison.OrdinalIgnoreCase))
        {
            collection.AddThorMySqlDbContext(builder.Configuration);
        }
        else if (dbType.Equals("Sqlite", StringComparison.OrdinalIgnoreCase))
        {
            collection.AddThorSqliteDbContext(builder.Configuration);
        }
        else if (dbType.Equals("SqlServer", StringComparison.OrdinalIgnoreCase))
        {
            collection.AddThorSqlServerDbContext(builder.Configuration);
        }
        else if (dbType.Equals("dm", StringComparison.OrdinalIgnoreCase))
        {
            collection.AddThorDMDbContext(builder.Configuration);
        }
        else
        {
            collection.AddThorSqliteDbContext(builder.Configuration);
        }
    }));

    builder.AddServiceDefaults();

    builder.Services.AddWebSockets(options =>
    {
        options.AllowedOrigins.Add("*");
        options.KeepAliveInterval = TimeSpan.FromSeconds(120);
    });

    var app = builder.Build();

    await app.MigrateDatabaseAsync();

    app.MapDefaultEndpoints();

    await SettingService.LoadingSettings(app);

    app.UseCors("AllowAll");

    app.UseWebSockets();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseStaticFiles();

    app.Use((async (context, next) =>
    {
        if (context.Request.Path == "/")
        {
            if (string.IsNullOrEmpty(ChatCoreOptions.Master))
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
                if (File.Exists(path))
                {
                    await context.Response.SendFileAsync(path);
                    return;
                }
            }
            else
            {
                context.Response.Redirect(ChatCoreOptions.Master);
                return;
            }
        }

        context.Response.Headers["AI-Gateway-Versions"] = "1.0.0.4";
        context.Response.Headers["AI-Gateway-Name"] = "Thor";

        if (context.Request.Path.Value?.EndsWith(".js") == true)
        {
            var path = context.Request.Path.Value;

            // 判断是否存在.br文件
            var brPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path.TrimStart('/') + ".br");
            if (File.Exists(brPath))
            {
                context.Response.Headers.Append("Content-Encoding", "br");
                context.Response.Headers.Append("Content-Type", "application/javascript");

                await context.Response.SendFileAsync(brPath);

                return;
            }

            // 判断是否存在.gz文件
            var gzPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path.TrimStart('/') + ".gz");
            if (File.Exists(gzPath))
            {
                context.Response.Headers.Append("Content-Encoding", "gzip");
                context.Response.Headers.Append("Content-Type", "application/javascript");
                await context.Response.SendFileAsync(gzPath);
                return;
            }
        }
        else if (context.Request.Path.Value?.EndsWith(".css") == true)
        {
            // 判断是否存在.br文件
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot",
                context.Request.Path.Value.TrimStart('/'));
            if (File.Exists(path))
            {
                context.Response.Headers.Append("Content-Type", "text/css");
                await context.Response.SendFileAsync(path);
                return;
            }
        }

        await next(context);

        if (context.Response.StatusCode == 404)
        {
            if (string.IsNullOrEmpty(ChatCoreOptions.Master))
            {
                // 判断是否存在文件
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot",
                    context.Request.Path.Value.TrimStart('/'));

                if (File.Exists(path))
                {
                    context.Response.StatusCode = 200;
                    context.Response.Headers.Append("Content-Type",
                        HttpContextExtensions.GetContentType(Path.GetExtension(path)));
                    await context.Response.SendFileAsync(path);
                    return;
                }

                // 返回index.html
                path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");

                if (File.Exists(path))
                {
                    context.Response.StatusCode = 200;
                    await context.Response.SendFileAsync(path);
                    return;
                }
            }
            else
            {
                context.Response.Redirect(ChatCoreOptions.Master);
                return;
            }
        }
    }));

    app.UseOpenTelemetry();

    app.UseMiddleware<OpenTelemetryMiddlewares>();
    app.UseMiddleware<UnitOfWorkMiddleware>();

    if (!Directory.Exists("/data"))
    {
        Directory.CreateDirectory("/data");
    }

    app.MapModelManager();

    app.MapPost("/api/v1/authorize/token", async (AuthorizeService service, [FromBody] LoginInput input) =>
        await service.TokenAsync(input))
        .AddEndpointFilter<ResultFilter>()
        .WithDescription("Get token")
        .WithTags("Authorize")
        .WithOpenApi();

    app.MapPost("/api/v1/authorize/github", async (AuthorizeService service, string code) =>
            await service.GithubAsync(code))
        .AddEndpointFilter<ResultFilter>()
        .WithDescription("Github login")
        .WithTags("Authorize")
        .WithOpenApi();

    app.MapPost("/api/v1/authorize/gitee", async (AuthorizeService service, string code, string redirectUri) =>
            await service.GiteeAsync(code, redirectUri))
        .AddEndpointFilter<ResultFilter>()
        .WithDescription("Github login")
        .WithTags("Authorize")
        .WithOpenApi();

    app.MapPost("/api/v1/authorize/casdoor", async (AuthorizeService service, string code) =>
            await service.CasdoorAsync(code))
        .AddEndpointFilter<ResultFilter>()
        .WithDescription("Casdoor login")
        .WithTags("Authorize")
        .WithOpenApi();

    #region Token

    var token = app.MapGroup("/api/v1/token")
        .AddEndpointFilter<ResultFilter>()
        .RequireAuthorization()
        .WithTags("Token");

    token.MapPost(string.Empty, async (TokenService service, TokenInput input) =>
            await service.CreateAsync(input))
        .WithDescription("创建Token")
        .WithOpenApi();

    token.MapGet("{id}", async (TokenService service, long id) =>
            await service.GetAsync(id))
        .WithDescription("获取Token详情")
        .WithOpenApi();

    token.MapGet("list", async (TokenService service, int page, int pageSize, string? token, string? keyword) =>
            await service.GetListAsync(page, pageSize, token, keyword))
        .WithDescription("获取Token列表")
        .WithOpenApi();

    token.MapPut(string.Empty, async (TokenService service, Token input) =>
            await service.UpdateAsync(input))
        .WithDescription("更新Token");

    token.MapDelete("{id}", async (TokenService service, string id) =>
            await service.RemoveAsync(id))
        .WithDescription("删除Token");

    token.MapPut("Disable/{id}", async (TokenService service, string id) =>
            await service.DisableAsync(id))
        .WithDescription("禁用Token");

    #endregion

    #region Channel

    var channel = app.MapGroup("/api/v1/channel")
        .WithTags("Channel")
        .AddEndpointFilter<ResultFilter>()
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    channel.MapPost("", async (ChannelService service, ChatChannelInput input) =>
        await service.CreateAsync(input));

    channel.MapGet("list", async (ChannelService service, int page, int pageSize, string? keyword, string[] groups) =>
        await service.GetAsync(page, pageSize, keyword, groups));

    channel.MapDelete("{id}", async (ChannelService service, string id) =>
        await service.RemoveAsync(id));

    channel.MapGet("{id}", async (ChannelService service, string id) =>
        await service.GetAsync(id));

    channel.MapPut("{id}", async (ChannelService service, ChatChannelInput input, string id) =>
        await service.UpdateAsync(id, input));

    channel.MapPut("/disable/{id}", async (ChannelService services, string id) =>
        await services.DisableAsync(id));

    channel.MapPut("/test/{id}", async (ChannelService services, string id) =>
        await services.TestChannelAsync(id));

    channel.MapPut("/control-automatically/{id}", async (ChannelService services, string id) =>
        await services.ControlAutomaticallyAsync(id));

    channel.MapPut("/order/{id}", async (ChannelService services, string id, int order) =>
        await services.UpdateOrderAsync(id, order));

    channel.MapGet("/tag", async (ChannelService services) =>
        await services.GetTagsAsync());

    #endregion

    #region Model

    var model = app.MapGroup("/api/v1/model")
        .WithTags("Model")
        .AddEndpointFilter<ResultFilter>()
        .RequireAuthorization();

    model.MapGet("/types", ModelService.GetPlatformNames)
        .WithDescription("获取渠道平台类型")
        .WithOpenApi();

    model.MapGet("/models", ModelService.GetModels)
        .WithDescription("获取模型")
        .WithOpenApi();

    model.MapGet("/use-models", async (HttpContext context) => { return await ModelService.GetUseModels(context); })
        .WithDescription("获取使用模型")
        .AllowAnonymous()
        .WithOpenApi();

    model.MapGet("/provider", ModelService.GetProviderAsync)
        .WithDescription("获取所有模型提供商")
        .WithOpenApi();

    model.MapGet("/info", async (HttpContext context) => { return await ModelService.GetModelInfoAsync(context); })
        .WithDescription("获取模型信息")
        .WithOpenApi();

    #endregion

    #region Logger

    var log = app.MapGroup("/api/v1/logger")
        .WithTags("Logger")
        .AddEndpointFilter<ResultFilter>()
        .RequireAuthorization();

    log.MapGet(string.Empty,
            async (LoggerService service, int page, int pageSize, ThorChatLoggerType? type, string? model,
                    DateTime? startTime,
                    DateTime? endTime, string? keyword, string? organizationId) =>
                await service.GetAsync(page, pageSize, type, model, startTime, endTime, keyword, organizationId))
        .WithDescription("获取日志")
        .WithDisplayName("获取日志")
        .WithOpenApi();

    log.MapGet("view-consumption",
            async (LoggerService service, ThorChatLoggerType? type, string? model, DateTime? startTime,
                    DateTime? endTime, string? keyword) =>
                await service.ViewConsumptionAsync(type, model, startTime, endTime, keyword))
        .WithDescription("查看消耗")
        .WithDisplayName("查看消耗")
        .WithOpenApi();

    log.MapGet("model-hot",
            async (LoggerService service) =>
                await service.GetModelHotAsync())
        .WithDescription("获取模型热度")
        .WithDisplayName("获取模型热度")
        .WithOpenApi();

    #endregion

    #region User

    var user = app.MapGroup("/api/v1/user")
        .WithTags("User")
        .AddEndpointFilter<ResultFilter>();

    user.MapPost(string.Empty, async (UserService service, CreateUserInput input) =>
            await service.CreateAsync(input))
        .AllowAnonymous();

    user.MapGet("email-code", async (UserService service, string email) =>
            await service.GetEmailCodeAsync(email))
        .AllowAnonymous();

    user.MapGet(string.Empty, async (UserService service, int page, int pageSize, string? keyword) =>
            await service.GetListAsync(page, pageSize, keyword))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    user.MapGet("info", async (UserService service) =>
            await service.GetAsync())
        .RequireAuthorization();


    user.MapDelete("{id}", async (UserService service, string id) =>
            await service.RemoveAsync(id))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    user.MapPut(string.Empty, async (UserService service, UpdateUserInput input) =>
            await service.UpdateAsync(input))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    user.MapPut("/info", async (UserService service, UpdateUserInfoInput input) =>
            await service.UpdateInfoAsync(input))
        .RequireAuthorization();

    user.MapPost("/enable/{id}", async (UserService service, string id) =>
            await service.EnableAsync(id))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    user.MapPut("/update-password", async (UserService service, UpdatePasswordInput input) =>
            await service.UpdatePasswordAsync(input))
        .RequireAuthorization();

    user.MapPost("/upload-avatar", async (UserService UserService, HttpContext context) =>
            await UserService.UploadAvatarAsync(context))
        .RequireAuthorization();

    #endregion

    #region ModelMapService

    var modelMap = app.MapGroup("/api/v1/modelmap")
        .WithTags("ModelMap")
        .AddEndpointFilter<ResultFilter>()
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    // Complete the modelMap group with HTTP endpoints
    modelMap.MapGet(string.Empty, async (ModelMapService service) =>
            await service.GetListAsync())
        .WithDescription("获取模型映射列表")
        .WithOpenApi();

    modelMap.MapPost(string.Empty, async (ModelMapService service, ModelMap modelMap) =>
            await service.CreateAsync(modelMap))
        .WithDescription("创建模型映射")
        .WithOpenApi();

    modelMap.MapPut(string.Empty, async (ModelMapService service, ModelMap modelMap) =>
            await service.UpdateAsync(modelMap))
        .WithDescription("更新模型映射")
        .WithOpenApi();

    modelMap.MapDelete("{id}", async (ModelMapService service, Guid id) =>
            await service.DeleteAsync(id))
        .WithDescription("删除模型映射")
        .WithOpenApi();

    #endregion

    #region UserGroup

    var userGroup = app.MapGroup("/api/v1/userGroup")
        .WithTags("UserGroup")
        .AddEndpointFilter<ResultFilter>();

    userGroup.MapPost(string.Empty, async (UserGroupService service, UserGroup userGroup) =>
            await service.CreateAsync(userGroup))
        .WithDescription("创建用户分组")
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        })
        .WithOpenApi();

    userGroup.MapGet(string.Empty, async (UserGroupService service) =>
            await service.GetListAsync())
        .WithDescription("获取用户分组列表")
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        })
        .WithOpenApi();

    userGroup.MapPut(string.Empty, async (UserGroupService service, UserGroup userGroup) =>
            await service.UpdateAsync(userGroup))
        .WithDescription("更新用户分组")
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        })
        .WithOpenApi();

    userGroup.MapDelete("{id}", async (UserGroupService service, Guid id) =>
            await service.DeleteAsync(id))
        .WithDescription("删除用户分组")
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        })
        .WithOpenApi();

    userGroup.MapPut("/enable/{id}", async (UserGroupService service, Guid id, bool enable) =>
            await service.EnableAsync(id, enable))
        .WithDescription("启用/禁用用户分组")
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        })
        .WithOpenApi();

    userGroup.MapGet("user", async (UserGroupService service) =>
            await service.GetCurrentUserGroupAsync())
        .WithDescription("获取用户分组")
        .RequireAuthorization()
        .WithOpenApi();

    #endregion

    #region Redeem Code

    var redeemCode = app.MapGroup("/api/v1/redeemCode")
        .WithGroupName("RedeemCode")
        .WithTags("RedeemCode")
        .AddEndpointFilter<ResultFilter>();

    redeemCode.MapPost(string.Empty, async (RedeemCodeService service, RedeemCodeInput input) =>
            await service.CreateAsync(input))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    redeemCode.MapGet(string.Empty, async (RedeemCodeService service, int page, int pageSize, string? keyword) =>
            await service.GetAsync(page, pageSize, keyword))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    redeemCode.MapPut("{id}", async (RedeemCodeService service, string id, RedeemCodeInput input) =>
            await service.UpdateAsync(id, input))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    redeemCode.MapPut("/enable/{id}", async (RedeemCodeService service, string id) =>
            await service.EnableAsync(id))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    redeemCode.MapDelete("{id}", async (RedeemCodeService service, string id) =>
            await service.RemoveAsync(id))
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    redeemCode.MapPost("/use/{code}", async (RedeemCodeService service, string code) =>
            await service.UseAsync(code))
        .RequireAuthorization(new AuthorizeAttribute());

    #endregion

    #region Setting

    var setting = app.MapGroup("/api/v1/setting")
        .WithGroupName("Setting")
        .WithTags("Setting")
        .AddEndpointFilter<ResultFilter>()
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    setting.MapGet(string.Empty, SettingService.GetSettings)
        .WithDescription("获取设置")
        .AllowAnonymous()
        .WithOpenApi();

    setting.MapPut(string.Empty, SettingService.UpdateSettingsAsync)
        .WithDescription("更新设置")
        .WithOpenApi();

    #endregion

    #region Statistics

    var statistics = app.MapGroup("/api/v1/statistics")
        .WithGroupName("Statistics")
        .WithTags("Statistics")
        .AddEndpointFilter<ResultFilter>()
        .RequireAuthorization();

    statistics.MapGet(string.Empty,
        async ([FromServices] IThorContext dbContext,
                [FromServices] ILoggerDbContext loggerDbContext,
                [FromServices] IUserContext userContext) =>
            await StatisticsService.GetStatisticsAsync(loggerDbContext, dbContext, userContext));

    #endregion

    #region Product

    var product = app.MapGroup("/api/v1/product")
        .WithGroupName("Product")
        .WithTags("Product")
        .AddEndpointFilter<ResultFilter>();

    product.MapGet(string.Empty, async (ProductService service) =>
            await service.GetProductsAsync())
        .WithDescription("获取产品列表")
        .WithOpenApi()
        .RequireAuthorization();

    product.MapPost(string.Empty, (ProductService service, Product product) =>
            service.Create(product))
        .WithDescription("创建产品")
        .WithOpenApi()
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    product.MapPut(string.Empty, ([FromServices] ProductService service, [FromBody] Product product) =>
        service.Update(product))
        .WithDescription("更新产品")
        .WithOpenApi()
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    product.MapDelete("{id}", async ([FromServices] ProductService service, string id) =>
        await service.DeleteAsync(id))
        .WithDescription("删除产品")
        .WithOpenApi()
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    product.MapPost("start-pay-payload/{id}", async ([FromServices] ProductService service, string id) =>
        await service.StartPayPayloadAsync(id))
        .WithDescription("发起支付")
        .WithOpenApi()
        .RequireAuthorization();

    product.MapPost("pay-complete-callback",
            async ([FromServices] ProductService service, HttpContext context) =>
            await service.PayCompleteCallbackAsync(context))
        .WithDescription("支付回调处理")
        .WithOpenApi()
        .AllowAnonymous();

    #endregion

    #region 模型限流策略

    var rateLimitModel = app.MapGroup("/api/v1/rateLimitModel")
        .WithGroupName("RateLimitModel")
        .WithTags("RateLimitModel")
        .AddEndpointFilter<ResultFilter>()
        .RequireAuthorization(new AuthorizeAttribute()
        {
            Roles = RoleConstant.Admin
        });

    rateLimitModel.MapGet(string.Empty, async (RateLimitModelService service, int page, int pageSize) =>
            await service.GetAsync(page, pageSize))
        .WithDescription("获取限流策略")
        .WithOpenApi();

    rateLimitModel.MapPost(string.Empty, async (RateLimitModelService service, RateLimitModel limitModel) =>
            await service.CreateAsync(limitModel))
        .WithDescription("创建限流策略")
        .WithOpenApi();

    rateLimitModel.MapPut(string.Empty, async (RateLimitModelService service, RateLimitModel limitModel) =>
            await service.UpdateAsync(limitModel))
        .WithDescription("更新限流策略")
        .WithOpenApi();

    rateLimitModel.MapDelete("{id}", async (RateLimitModelService service, string id) =>
            await service.RemoveAsync(id))
        .WithDescription("删除限流策略")
        .WithOpenApi();

    rateLimitModel.MapPut("/disable/{id}", async (RateLimitModelService service, string id) =>
            await service.Disable(id))
        .WithDescription("禁用|启用限流策略")
        .WithOpenApi();

    #endregion

    #region System

    var system = app.MapGroup("/api/v1/system")
        .WithGroupName("System")
        .WithTags("System")
        .AddEndpointFilter<ResultFilter>();

    system.MapGet("info", async (SystemService service) =>
            await service.InviteInfo())
        .WithDescription("获取邀请信息")
        .WithOpenApi();

    #endregion

    var tracker = app.MapGroup("/api/v1/tracker")
        .WithTags("Tracker")
        .AddEndpointFilter<ResultFilter>();

    tracker.MapGet(string.Empty, async (TrackerService service) => await service.GetAsync())
        .WithDescription("获取Tracker")
        .WithOpenApi();

    tracker.MapGet("request-user", (TrackerService service) => service.GetUserRequest())
        .WithDescription("获取用户请求")
        .WithOpenApi();

    app.MapPost("/v1/responses", (ResponsesService responsesService, HttpContext context, ResponsesInput input) =>
            responsesService.ExecuteAsync(context, input))
        .WithDescription("OpenAI Responses")
        .WithOpenApi();

    // 对话补全请求
    app.MapPost("/v1/chat/completions",
            async (ChatService service, HttpContext httpContext, ThorChatCompletionsRequest request) =>
                await service.ChatCompletionsAsync(httpContext, request))
        .WithGroupName("OpenAI")
        .WithDescription("Get completions from OpenAI")
        .WithOpenApi();

    app.MapPost("/v1/messages",
        (async (HttpContext context, AnthropicChatService service, AnthropicInput input) =>
        {
            await service.MessageAsync(context, input);
        }));

    // 文本补全接口,不建议使用，使用对话补全即可
    app.MapPost("/v1/completions", async (ChatService service, HttpContext context, CompletionCreateRequest input) =>
            await service.CompletionsAsync(context, input))
        .WithGroupName("OpenAI")
        .WithDescription("Get completions from OpenAI")
        .WithOpenApi();

    app.MapPost("/v1/embeddings",
            async (ChatService embeddingService, HttpContext context, ThorEmbeddingInput module) =>
                await embeddingService.EmbeddingAsync(context, module))
        .WithDescription("OpenAI")
        .WithDescription("Embedding")
        .WithOpenApi();

    app.MapPost("/v1/images/generations",
            async (ChatService imageService, HttpContext context, ImageCreateRequest request) =>
                await imageService.CreateImageAsync(context, request))
        .WithDescription("OpenAI")
        .WithDescription("Image")
        .WithOpenApi();

    app.MapPost("/v1/images/edits",
            async (ChatService imageService, HttpContext context) =>
                await imageService.EditsImageAsync(context))
        .WithDescription("OpenAI")
        .WithDescription("Image")
        .WithOpenApi();

    app.MapPost("v1/images/variations",
            async (ChatService imageService, HttpContext context) =>
                await imageService.VariationsAsync(context))
        .WithDescription("OpenAI")
        .WithDescription("Image")
        .WithOpenApi();

    app.MapGet("/v1/models", async (HttpContext context) => { return await ModelService.GetAsync(context); })
        .WithDescription("获取模型列表")
        .WithOpenApi();

    app.Map("/v1/realtime", (applicationBuilder =>
    {
        applicationBuilder.Run(async (context) =>
        {
            var chatService = context.RequestServices.GetRequiredService<ChatService>();

            await chatService.RealtimeAsync(context).ConfigureAwait(true);
        });
    }));

    app.MapPost("/v1/audio/transcriptions",
        async (ChatService chatService, HttpContext context) => { await chatService.TranscriptionsAsync(context); });


    app.MapPost("/v1/audio/translations",
        async (ChatService chatService, HttpContext context) => { await chatService.TranscriptionsAsync(context); });

    app.MapPost("/v1/audio/speech",
        async (ChatService chatService, HttpContext context, AudioCreateSpeechRequest request) =>
        {
            await chatService.SpeechAsync(context, request);
        });

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    await app.RunAsync();
}
catch (Exception ex)
{
    Log.Fatal(ex, ex.Message);
}
finally
{
    Log.CloseAndFlush();
}