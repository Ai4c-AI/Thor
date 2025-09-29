using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Thor.Domain.Chats;
using Thor.Domain.Users;
using Thor.Service.Domain;

namespace Thor.Core.DataAccess;

public interface IThorContext
{
    DatabaseFacade Database { get; }

    DbSet<User> Users { get; set; }

    DbSet<Token> Tokens { get; set; }

    DbSet<ChatChannel> Channels { get; set; }

    DbSet<RedeemCode> RedeemCodes { get; set; }

    DbSet<Setting> Settings { get; set; }

    DbSet<Product> Products { get; set; }

    DbSet<ProductPurchaseRecord> ProductPurchaseRecords { get; set; }

    DbSet<RateLimitModel> RateLimitModels { get; set; }

    DbSet<ModelManager> ModelManagers { get; set; }

    DbSet<ModelMap> ModelMaps { get; set; }

    DbSet<UserGroup> UserGroups { get; set; }

    DbSet<Announcement> Announcements { get; set; }

    DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }

    DbSet<UserSubscription> UserSubscriptions { get; set; }

    DbSet<SubscriptionPurchaseRecord> SubscriptionPurchaseRecords { get; set; }

    DbSet<SubscriptionQuotaUsage> SubscriptionQuotaUsages { get; set; }

    DbSet<SubscriptionUpgrade> SubscriptionUpgrades { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
}