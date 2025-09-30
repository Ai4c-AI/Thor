using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using Thor.Core.DataAccess;
using Thor.Domain.Chats;
using Thor.Domain.System;
using Thor.Domain.Users;
using Thor.Service.DataAccess;
using Thor.Service.Domain;
using Thor.Service.Domain.Core;
using Thor.Service.Infrastructure.Helper;

namespace Thor.Core;

public abstract class ThorContext<TContext>(DbContextOptions<TContext> context, IServiceProvider serviceProvider)
    : BaseContext<TContext>(context, serviceProvider), IThorContext where TContext : BaseContext<TContext>
{
    public DbSet<User> Users { get; set; }

    public DbSet<Token> Tokens { get; set; }

    public DbSet<ChatChannel> Channels { get; set; }

    public DbSet<RedeemCode> RedeemCodes { get; set; }

    public DbSet<Setting> Settings { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<ProductPurchaseRecord> ProductPurchaseRecords { get; set; }

    public DbSet<RateLimitModel> RateLimitModels { get; set; }

    public DbSet<ModelManager> ModelManagers { get; set; }

    public DbSet<ModelMap> ModelMaps { get; set; }

    public DbSet<UserGroup> UserGroups { get; set; }

    public DbSet<Announcement> Announcements { get; set; }

    public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }

    public DbSet<UserSubscription> UserSubscriptions { get; set; }

    public DbSet<SubscriptionPurchaseRecord> SubscriptionPurchaseRecords { get; set; }

    public DbSet<SubscriptionQuotaUsage> SubscriptionQuotaUsages { get; set; }

    public DbSet<SubscriptionUpgrade> SubscriptionUpgrades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ConfigureAIDotNet();

        var user = new User("CA378C74-19E7-458A-918B-4DBB7AE1729D", "admin", "239573049@qq.com", "admin")
        {
            CreatedAt = DateTime.Now,
            Groups = ["default", "vip"],
        };
        user.SetAdmin();
        user.SetResidualCredit(1000000000);

        modelBuilder.Entity<User>().HasData(user);

        var token = new Token
        {
            Id = "CA378C74-19E7-458A-918B-4DBB7AE1729D",
            Key = "sk-" + StringHelper.GenerateRandomString(38),
            Creator = user.Id,
            Name = "默认Token",
            UnlimitedQuota = true,
            UnlimitedExpired = true,
            CreatedAt = DateTime.Now,
            Groups = ["default"],
        };

        modelBuilder.Entity<Token>().HasData(token);

        modelBuilder.InitSetting();

        var userGroups = new List<UserGroup>
        {
            new()
            {
                Id = Guid.Parse("CA378C74-19E7-458A-918B-4DBB7AE1729D"),
                Code = "default",
                Name = "默认",
                Description = "默认用户组",
                CreatedAt = DateTime.Now,
                Enable = true,
                Rate = 1,
            },
            new()
            {
                Id = Guid.Parse("CA378C74-19E7-458A-918B-4DBB7AE17291"),
                Code = "vip",
                Name = "VIP",
                Description = "VIP用户组",
                CreatedAt = DateTime.Now,
                Enable = true,
                Rate = 1,
            }
        };

        modelBuilder.Entity<UserGroup>().HasData(userGroups);

        // 配置套餐相关实体
        ConfigureSubscriptionEntities(modelBuilder);

        // 添加默认套餐数据
        SeedSubscriptionPlans(modelBuilder);

        modelBuilder.Entity<ModelMap>(options =>
        {
            options.HasKey(x => x.Id);

            options.Property(x => x.Id).ValueGeneratedOnAdd();

            options.Property(x => x.ModelId).IsRequired();

            options.HasIndex(x => x.ModelId);

            options.Property(x => x.ModelMapItems)
                .HasConversion((list => JsonSerializer.Serialize(list, JsonSerializerOptions.Web)),
                    (str => JsonSerializer.Deserialize<List<ModelMapItem>>(str, JsonSerializerOptions.Web) ??
                            new List<ModelMapItem>()));

            options.Property(x => x.Group)
                .HasConversion((x) => JsonSerializer.Serialize(x, JsonSerializerOptions.Web),
                    (x) => JsonSerializer.Deserialize<string[]>(x, JsonSerializerOptions.Web) ?? Array.Empty<string>());
        });

        modelBuilder.Entity<ModelManager>(options =>
        {
            options.Property(x => x.ContextPricingTiers)
                .HasColumnName("ContextPricingTiers")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, JsonSerializerOptions.Web),
                    v => string.IsNullOrEmpty(v)
                        ? new List<ContextPricingTier>()
                        : JsonSerializer.Deserialize<List<ContextPricingTier>>(v, JsonSerializerOptions.Web) ??
                          new List<ContextPricingTier>()
                );
        });

        if (!File.Exists("model-manager.json")) return;

        var modelManagers = new List<ModelManager>();
        try
        {
            var json = File.ReadAllText("model-manager.json");

            modelManagers.AddRange(JsonSerializer.Deserialize<List<ModelManager>>(json, new JsonSerializerOptions()
            {
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) },
                PropertyNameCaseInsensitive = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            }) ?? []);

            modelManagers.ForEach(x =>
            {
                x.Id = Guid.NewGuid();
                x.CreatedAt = DateTime.Now;
                x.Enable = true;
            });

            modelBuilder.Entity<ModelManager>().HasData(modelManagers);
        }
        catch (Exception e)
        {
            Console.WriteLine("模型默认配置文件错误：" + e);
        }
    }

    private static void ConfigureSubscriptionEntities(ModelBuilder modelBuilder)
    {
        // 配置套餐计划
        modelBuilder.Entity<SubscriptionPlan>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
            entity.Property(e => e.AllowedModels)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, JsonSerializerOptions.Web),
                    v => JsonSerializer.Deserialize<string[]>(v, JsonSerializerOptions.Web) ?? Array.Empty<string>()
                );
            
            entity.Property(e => e.Groups)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, JsonSerializerOptions.Web),
                    v => JsonSerializer.Deserialize<string[]>(v, JsonSerializerOptions.Web) ?? Array.Empty<string>()
                );
            
            entity.HasIndex(e => e.Type);
            entity.HasIndex(e => e.IsActive);
            entity.HasIndex(e => e.Sort);
        });

        // 配置用户订阅
        modelBuilder.Entity<UserSubscription>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId).IsRequired();
            entity.Property(e => e.PlanId).IsRequired();

            // 配置外键关系
            entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Plan)
                .WithMany()
                .HasForeignKey(e => e.PlanId)
                .OnDelete(DeleteBehavior.Restrict);

            // 创建复合索引
            entity.HasIndex(e => new { e.UserId, e.Status });
            entity.HasIndex(e => e.EndDate);
            entity.HasIndex(e => e.StartDate);
        });

        // 配置购买记录
        modelBuilder.Entity<SubscriptionPurchaseRecord>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId).IsRequired();
            entity.Property(e => e.PlanId).IsRequired();
            entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.RefundAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.OrderId).HasMaxLength(100);
            entity.Property(e => e.TransactionId).HasMaxLength(100);

            // 配置外键关系
            entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Plan)
                .WithMany()
                .HasForeignKey(e => e.PlanId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => e.OrderId).IsUnique();
            entity.HasIndex(e => e.TransactionId);
            entity.HasIndex(e => new { e.UserId, e.PaymentStatus });
            entity.HasIndex(e => e.PurchaseTime);
        });

        // 配置额度使用记录
        modelBuilder.Entity<SubscriptionQuotaUsage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId).IsRequired();
            entity.Property(e => e.SubscriptionId).IsRequired();
            entity.Property(e => e.ModelName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.RequestIp).HasMaxLength(45);
            entity.Property(e => e.UserAgent).HasMaxLength(500);
            entity.Property(e => e.RequestId).HasMaxLength(100);

            // 配置外键关系
            entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Subscription)
                .WithMany()
                .HasForeignKey(e => e.SubscriptionId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => new { e.UserId, e.UsageTime });
            entity.HasIndex(e => new { e.SubscriptionId, e.UsageTime });
            entity.HasIndex(e => e.ModelName);
            entity.HasIndex(e => e.RequestId);
        });

        // 配置套餐升级记录
        modelBuilder.Entity<SubscriptionUpgrade>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId).IsRequired();
            entity.Property(e => e.FromSubscriptionId).IsRequired();
            entity.Property(e => e.FromPlanId).IsRequired();
            entity.Property(e => e.ToPlanId).IsRequired();
            entity.Property(e => e.RemainingValue).HasColumnType("decimal(18,2)");
            entity.Property(e => e.TargetPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.ActualPayAmount).HasColumnType("decimal(18,2)");

            // 配置外键关系
            entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.FromPlan)
                .WithMany()
                .HasForeignKey(e => e.FromPlanId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.ToPlan)
                .WithMany()
                .HasForeignKey(e => e.ToPlanId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.FromSubscription)
                .WithMany()
                .HasForeignKey(e => e.FromSubscriptionId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.NewSubscription)
                .WithMany()
                .HasForeignKey(e => e.NewSubscriptionId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(e => e.PaymentRecord)
                .WithMany()
                .HasForeignKey(e => e.PaymentRecordId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.HasIndex(e => new { e.UserId, e.Status });
            entity.HasIndex(e => e.UpgradeTime);
            entity.HasIndex(e => e.FromSubscriptionId);
        });
    }

    private static void SeedSubscriptionPlans(ModelBuilder modelBuilder)
    {
        var plans = new List<SubscriptionPlan>
        {
            new()
            {
                Id = "plan-basic-monthly",
                Name = "基础套餐",
                Description = "适合轻度使用者，包含基础AI模型访问权限",
                Price = 9.99m,
                Type = SubscriptionType.Monthly,
                AllowedModels = new[] { "gpt-3.5-turbo", "claude-3-haiku" },
                DailyQuotaLimit = 500, // $5.00
                WeeklyQuotaLimit = 2500, // $25.00
                IsActive = true,
                Level = 1,
                Sort = 1,
                CreatedAt = DateTime.UtcNow
            },
            new()
            {
                Id = "plan-premium-monthly",
                Name = "高级套餐",
                Description = "包含GPT-4和Claude等高级模型，适合专业用户",
                Price = 49.99m,
                Type = SubscriptionType.Monthly,
                AllowedModels = new[] { "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo", "claude-3-sonnet", "claude-3-haiku" },
                DailyQuotaLimit = 2000, // $20.00
                WeeklyQuotaLimit = 10000, // $100.00
                IsActive = true,
                Level = 2,
                Sort = 2,
                Tag = "推荐",
                CreatedAt = DateTime.UtcNow
            },
            new()
            {
                Id = "plan-enterprise-monthly",
                Name = "企业套餐",
                Description = "包含最新GPT-5-Codex等顶级模型，无限制使用",
                Price = 99.99m,
                Type = SubscriptionType.Monthly,
                AllowedModels = new[] { "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo", "gpt-5-codex", "claude-3-opus", "claude-3-sonnet", "claude-3-haiku" },
                DailyQuotaLimit = 5000, // $50.00
                WeeklyQuotaLimit = 25000, // $250.00
                IsActive = true,
                Level = 3,
                Sort = 3,
                Tag = "热门",
                CreatedAt = DateTime.UtcNow
            },
            new()
            {
                Id = "plan-premium-yearly",
                Name = "高级套餐（年付）",
                Description = "年付享受8折优惠，包含GPT-4和Claude等高级模型",
                Price = 479.99m, // 原价599.88，8折优惠
                Type = SubscriptionType.Yearly,
                AllowedModels = new[] { "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo", "claude-3-sonnet", "claude-3-haiku" },
                DailyQuotaLimit = 2000, // $20.00
                WeeklyQuotaLimit = 10000, // $100.00
                IsActive = true,
                Level = 2,
                Sort = 4,
                CreatedAt = DateTime.UtcNow
            }
        };

        modelBuilder.Entity<SubscriptionPlan>().HasData(plans);
    }
}