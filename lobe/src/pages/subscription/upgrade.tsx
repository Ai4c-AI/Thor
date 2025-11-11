import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  ArrowUp,
  Crown,
  CheckCircle,
  ShoppingCart,
  Star,
  Zap,
  Users,
  TrendingUp,
  Clock,
  Calculator,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";
import {
  getUpgradeablePlans,
  getUserCurrentSubscriptionDetailed,
  calculateUpgradeCost,
  createUpgrade,
  executeFreeUpgrade,
  startUpgradePayment
} from "../../services/SubscriptionService";
import { renderQuota } from "../../utils/render";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 1 | 2 | 3; // 1=Monthly, 2=Yearly, 3=Weekly
  allowedModels: string[];
  dailyQuotaLimit: number;
  weeklyQuotaLimit: number;
  isActive: boolean;
  level: number;
  icon?: string;
  tag?: string;
  sort: number;
}

interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Cancelled';
  plan: SubscriptionPlan;
  dailyUsedQuota: number;
  weeklyUsedQuota: number;
  lastDailyResetDate: string;
  lastWeeklyResetDate: string;
  autoRenew: boolean;
  purchaseRecordId?: string;
}

interface UpgradeCostCalculation {
  currentPlan: SubscriptionPlan;
  targetPlan: SubscriptionPlan;
  remainingDays: number;
  remainingValue: number;
  targetPrice: number;
  actualPayAmount: number;
  discountAmount: number;
  canUpgrade: boolean;
  savingsPercentage: number;
}

export default function SubscriptionUpgradePage() {
  const [upgradeablePlans, setUpgradeablePlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [costCalculations, setCostCalculations] = useState<Record<string, UpgradeCostCalculation>>({});
  const [loading, setLoading] = useState(false);
  const [calculatingCosts, setCalculatingCosts] = useState<Set<string>>(new Set());

  function loadUpgradeablePlans() {
    getUpgradeablePlans()
      .then((res) => {
        if (res.success) {
          setUpgradeablePlans(res.data);
          // 为每个可升级套餐计算费用
          res.data.forEach((plan: SubscriptionPlan) => {
            calculateCostForPlan(plan.id);
          });
        }
      });
  }

  function loadCurrentSubscription() {
    getUserCurrentSubscriptionDetailed()
      .then((res) => {
        if (res.success && res.data) {
          setCurrentSubscription(res.data);
        }
      });
  }

  function calculateCostForPlan(targetPlanId: string) {
    setCalculatingCosts(prev => new Set([...prev, targetPlanId]));

    calculateUpgradeCost(targetPlanId)
      .then((res) => {
        if (res.success) {
          setCostCalculations(prev => ({
            ...prev,
            [targetPlanId]: res.data
          }));
        }
      })
      .catch((error) => {
        toast.error('计算升级费用失败');
      })
      .finally(() => {
        setCalculatingCosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(targetPlanId);
          return newSet;
        });
      });
  }

  function handleUpgrade(targetPlanId: string) {
    const calculation = costCalculations[targetPlanId];
    if (!calculation) {
      toast.error('请先计算升级费用');
      return;
    }

    setLoading(true);

    createUpgrade(targetPlanId)
      .then((res) => {
        if (res.success) {
          const upgradeRecord = res.data;

          if (calculation.actualPayAmount === 0) {
            // 免费升级
            return executeFreeUpgrade(upgradeRecord.id);
          } else {
            // 需要支付
            return startUpgradePayment(upgradeRecord.id)
              .then((paymentRes) => {
                if (paymentRes.success) {
                  window.open(paymentRes.data.qr, '_blank');
                  toast.success('升级支付二维码已生成，请扫码支付');
                } else {
                  throw new Error('启动升级支付失败');
                }
              });
          }
        }
        throw new Error('创建升级记录失败');
      })
      .then((result) => {
        if (calculation.actualPayAmount === 0 && result?.success) {
          toast.success('套餐升级成功！');
          // 重新加载当前订阅信息
          loadCurrentSubscription();
          loadUpgradeablePlans();
        }
      })
      .catch((error) => {
        toast.error(error.message || '升级失败');
      })
      .finally(() => {
        setLoading(false);
      });
  }


  function getTypeText(type: number): string {
    switch (type) {
      case 3: return '包周';
      case 1: return '包月';
      case 2: return '包年';
      default: return type.toString();
    }
  }

  function getPlanIcon(level: number) {
    switch (level) {
      case 1: return <Users className="h-6 w-6" />;
      case 2: return <Star className="h-6 w-6" />;
      case 3: return <Crown className="h-6 w-6" />;
      default: return <Zap className="h-6 w-6" />;
    }
  }

  function getRemainingDays(endDate: string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  useMemo(() => {
    loadCurrentSubscription();
    loadUpgradeablePlans();
  }, []);

  if (!currentSubscription) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">您当前没有有效的订阅，请先购买套餐</div>
            <Button className="mt-4" onClick={() => window.location.href = '/subscription'}>
              去购买套餐
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">套餐升级</h1>
          <p className="text-muted-foreground">升级到更高级的套餐，享受更多功能和额度</p>
        </div>
      </div>

      {/* 当前套餐信息 */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            当前套餐
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">套餐名称</div>
              <div className="font-semibold">{currentSubscription.plan.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">套餐价格</div>
              <div className="font-semibold">¥{currentSubscription.plan.price}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">剩余天数</div>
              <div className="font-semibold">{getRemainingDays(currentSubscription.endDate)} 天</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">套餐级别</div>
              <div className="font-semibold">Level {currentSubscription.plan.level}</div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">今日额度使用</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (currentSubscription.dailyUsedQuota / currentSubscription.plan.dailyQuotaLimit) * 100)}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm">
                  {renderQuota(currentSubscription.dailyUsedQuota)} / {renderQuota(currentSubscription.plan.dailyQuotaLimit)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">本周额度使用</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (currentSubscription.weeklyUsedQuota / currentSubscription.plan.weeklyQuotaLimit) * 100)}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm">
                  {renderQuota(currentSubscription.weeklyUsedQuota)} / {renderQuota(currentSubscription.plan.weeklyQuotaLimit)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 可升级套餐列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upgradeablePlans.map((plan) => {
          const calculation = costCalculations[plan.id];
          const isCalculating = calculatingCosts.has(plan.id);

          return (
            <Card key={plan.id} className="relative transition-all hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  {getPlanIcon(plan.level)}
                </div>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  {plan.name}
                  <ArrowUp className="h-4 w-4 text-green-600" />
                </CardTitle>
                <div className="text-2xl font-bold">
                  ¥{plan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{getTypeText(plan.type)}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                {/* 套餐特性 */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      日额度: {renderQuota(plan.dailyQuotaLimit)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      周额度: {renderQuota(plan.weeklyQuotaLimit)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {plan.allowedModels.length} 个AI模型
                    </span>
                  </div>
                </div>

                {/* 费用计算 */}
                {isCalculating ? (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Calculator className="h-4 w-4 animate-spin" />
                        <span className="text-sm">正在计算升级费用...</span>
                      </div>
                    </CardContent>
                  </Card>
                ) : calculation ? (
                  <Card >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">目标价格:</span>
                          <span className="font-medium">¥{calculation.targetPrice?.toFixed(2) || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">剩余价值抵扣:</span>
                          <span className="font-medium text-green-600">-¥{calculation.remainingValue?.toFixed(2) || 'N/A'}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">实际需支付:</span>
                          <span className="font-bold text-lg">
                            {calculation.actualPayAmount === 0 ? (
                              <span className="text-green-600">免费升级</span>
                            ) : (
                              `¥${calculation.actualPayAmount?.toFixed(2) || 'N/A'}`
                            )}
                          </span>
                        </div>
                        {calculation.savingsPercentage > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm">节省:</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {calculation.savingsPercentage}%
                            </Badge>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          基于剩余 {calculation.remainingDays} 天的使用期限计算
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => calculateCostForPlan(plan.id)}
                        >
                          <Calculator className="mr-2 h-4 w-4" />
                          计算升级费用
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  className="w-full mt-4"
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={loading || !calculation || isCalculating}
                  variant={calculation?.actualPayAmount === 0 ? "default" : "outline"}
                >
                  {calculation?.actualPayAmount === 0 ? (
                    <>
                      <ArrowUp className="mr-2 h-4 w-4" />
                      立即免费升级
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      升级到此套餐
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {upgradeablePlans.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">暂无可升级的套餐</div>
            <p className="text-sm text-muted-foreground mt-2">
              您已经是最高级别套餐，或者没有更高级别的套餐可供升级
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}