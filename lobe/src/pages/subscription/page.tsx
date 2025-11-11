import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Progress } from "../../components/ui/progress";
import {
  Crown,
  Calendar,
  CheckCircle,
  Clock,
  ShoppingCart,
  Star,
  Zap,
  Users,
  TrendingUp,
  AlertCircle,
  Smartphone,
  CreditCard,
  LogIn,
  Check,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import {
  getAvailablePlans,
  getUserCurrentSubscriptionDetailed,
  createPurchaseOrder,
  startPayment
} from "../../services/SubscriptionService";
import { renderQuota } from "../../utils/render";
import QRCode from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../../components/ui/dialog";
import { Alert, AlertDescription } from "../../components/ui/alert";

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
  status: 1 | 2 | 3; // 1=Active, 2=Expired, 3=Cancelled
  plan: SubscriptionPlan;
  dailyUsedQuota: number;
  weeklyUsedQuota: number;
  lastDailyResetDate: string;
  lastWeeklyResetDate: string;
  autoRenew: boolean;
  purchaseRecordId?: string;
}

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [countdown, setCountdown] = useState(300);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function loadPlans() {
    getAvailablePlans()
      .then((res) => {
        if (res.success) {
          setPlans(res.data);
        }
      });
  }

  function loadCurrentSubscription() {
    if (!isAuthenticated) return;

    getUserCurrentSubscriptionDetailed()
      .then((res) => {
        if (res.success && res.data) {
          setCurrentSubscription(res.data);
        }
      })
      .catch(() => {
        // 如果请求失败，可能是未登录
        setIsAuthenticated(false);
      });
  }

  function handlePurchase(planId: string) {
    if (!isAuthenticated) {
      toast.error('请先登录后再购买套餐');
      navigate('/login');
      return;
    }

    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    setSelectedPlan(plan);
    setLoading(true);
    createPurchaseOrder(planId, 'alipay')
      .then((res) => {
        if (res.success) {
          return startPayment(res.data.id);
        }
        throw new Error('创建订单失败');
      })
      .then((paymentRes) => {
        if (paymentRes.success) {
          setQrCode(paymentRes.data.qr);
          setCountdown(300);
          toast.success('支付二维码已生成，请扫码支付');
        } else {
          throw new Error('启动支付失败');
        }
      })
      .catch((error) => {
        toast.error(error.message || '购买失败');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
      case 1: return <Users className="h-5 w-5" />;
      case 2: return <Star className="h-5 w-5" />;
      case 3: return <Crown className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  }

  function getRemainingDays(endDate: string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  function formatPrice(price: number): string {
    return `¥${price}`;
  }

  function getPlanLevelText(level: number): string {
    switch (level) {
      case 1: return '基础版';
      case 2: return '专业版';
      case 3: return '企业版';
      default: return '标准版';
    }
  }

  function getUsagePercentage(used: number, limit: number): number {
    return Math.min(100, (used / limit) * 100);
  }

  // 检查登录状态
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useMemo(() => {
    loadPlans();
    loadCurrentSubscription();
  }, [isAuthenticated]);

  // QR code countdown timer
  useEffect(() => {
    let timer: any = null;
    if (qrCode && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setQrCode('');
      setCountdown(300);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [qrCode, countdown]);

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          订阅套餐
        </h1>
        <p className="text-sm text-muted-foreground mt-1">选择适合您的 AI 模型访问方案</p>
      </div>

      {/* 当前套餐状态 */}
      {currentSubscription && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  当前套餐
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  {currentSubscription.plan.name} • {getTypeText(currentSubscription.plan.type)}
                </CardDescription>
              </div>
              <Badge variant={currentSubscription.status === 1 ? 'default' : 'secondary'} className="text-xs">
                {currentSubscription.status === 1 ? '有效' : '已过期'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pt-0">
            {/* 核心信息网格 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">剩余</div>
                  <div className="text-sm font-bold truncate">{getRemainingDays(currentSubscription.endDate)}天</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                <Zap className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">日额度</div>
                  <div className="text-sm font-bold truncate">{renderQuota(currentSubscription.plan.dailyQuotaLimit)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">周额度</div>
                  <div className="text-sm font-bold truncate">{renderQuota(currentSubscription.plan.weeklyQuotaLimit)}</div>
                </div>
              </div>
            </div>

            {/* 使用进度 */}
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>今日使用</span>
                  <span className="text-muted-foreground">
                    {renderQuota(currentSubscription.dailyUsedQuota)} / {renderQuota(currentSubscription.plan.dailyQuotaLimit)}
                  </span>
                </div>
                <Progress
                  value={getUsagePercentage(currentSubscription.dailyUsedQuota, currentSubscription.plan.dailyQuotaLimit)}
                  className="h-1.5"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>本周使用</span>
                  <span className="text-muted-foreground">
                    {renderQuota(currentSubscription.weeklyUsedQuota)} / {renderQuota(currentSubscription.plan.weeklyQuotaLimit)}
                  </span>
                </div>
                <Progress
                  value={getUsagePercentage(currentSubscription.weeklyUsedQuota, currentSubscription.plan.weeklyQuotaLimit)}
                  className="h-1.5"
                />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" onClick={() => loadCurrentSubscription()}>
                <RefreshCw className="h-3 w-3 mr-1" />
                刷新
              </Button>
              {currentSubscription.status === 1 && getRemainingDays(currentSubscription.endDate) < 7 && (
                <Button size="sm" className="flex-1 h-8 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  续费
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 套餐列表 */}
      <div>
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-1">选择您的方案</h2>
          <p className="text-xs text-muted-foreground">灵活的定价，满足不同需求</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isPopular = !!plan.tag;
            const isCurrentPlan = currentSubscription?.planId === plan.id;
            const hasHigherPlan = (currentSubscription?.plan.level || 0) >= plan.level;

            return (
              <Card
                key={plan.id}
                className={`relative ${
                  isPopular ? 'border-primary' : ''
                } ${isCurrentPlan ? 'ring-2 ring-primary' : ''}`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-primary text-white px-2 py-0.5 text-xs">
                      <Star className="h-3 w-3 mr-1 inline" />
                      {plan.tag}
                    </Badge>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute top-2 right-2 z-20">
                    <Badge variant="default" className="gap-1 text-xs px-2 py-0.5">
                      <CheckCircle className="h-3 w-3" />
                      当前套餐
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-3 pt-4">
                  {/* Icon */}
                  <div className="flex justify-center mb-2">
                    <div className={`p-2 rounded-lg ${
                      plan.level === 3 ? 'bg-yellow-500/10 text-yellow-600' :
                      plan.level === 2 ? 'bg-blue-500/10 text-blue-600' :
                      'bg-gray-500/10 text-gray-600'
                    }`}>
                      {getPlanIcon(plan.level)}
                    </div>
                  </div>

                  {/* Plan Name & Level */}
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs">{getPlanLevelText(plan.level)}</Badge>
                    <CardTitle className="text-lg mb-1">{plan.name}</CardTitle>
                    <CardDescription className="text-xs">{plan.description}</CardDescription>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(plan.price)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {getTypeText(plan.type)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  {/* Features */}
                  <div className="space-y-2">
                    {[
                      { icon: Clock, label: '每日额度', value: renderQuota(plan.dailyQuotaLimit) },
                      { icon: TrendingUp, label: '每周额度', value: renderQuota(plan.weeklyQuotaLimit) },
                      { icon: Zap, label: 'AI 模型', value: `${plan.allowedModels.length} 个` },
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/50">
                        <div className="flex items-center gap-2">
                          <feature.icon className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium">{feature.label}</span>
                        </div>
                        <span className="text-xs font-bold">{feature.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Model List */}
                  <div>
                    <div className="text-xs font-medium mb-1 flex items-center gap-1">
                      <Check className="h-3 w-3 text-primary" />
                      支持模型
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {plan.allowedModels.slice(0, 4).map((model) => (
                        <Badge key={model} variant="secondary" className="text-xs px-1.5 py-0">
                          {model}
                        </Badge>
                      ))}
                      {plan.allowedModels.length > 4 && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0">
                          +{plan.allowedModels.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full h-9 text-sm"
                    onClick={() => handlePurchase(plan.id)}
                    disabled={loading || hasHigherPlan}
                    variant={isPopular ? "default" : "outline"}
                  >
                    {!isAuthenticated ? (
                      <>
                        <LogIn className="mr-1 h-4 w-4" />
                        登录购买
                      </>
                    ) : hasHigherPlan && !isCurrentPlan ? (
                      <>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        已有更高套餐
                      </>
                    ) : isCurrentPlan ? (
                      <>
                        <RefreshCw className="mr-1 h-4 w-4" />
                        续费套餐
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        立即购买
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {plans.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">暂无可用套餐</div>
          </CardContent>
        </Card>
      )}

      {/* 支付二维码弹窗 */}
      <Dialog open={qrCode !== ''} onOpenChange={(open) => {
        if (!open) {
          setQrCode('');
          setCountdown(300);
          setSelectedPlan(null);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-4 w-4 text-primary" />
              支付订单
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-3 py-3">
            {/* 套餐信息卡片 */}
            {selectedPlan && (
              <div className="w-full p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-xs text-muted-foreground">订阅套餐</div>
                    <div className="text-sm font-bold">{selectedPlan.name}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">{getPlanLevelText(selectedPlan.level)}</Badge>
                </div>

                <Separator className="my-2" />

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-0.5">套餐类型</div>
                    <div className="font-semibold">{getTypeText(selectedPlan.type)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-0.5">支付金额</div>
                    <div className="text-lg font-bold text-primary">
                      {formatPrice(selectedPlan.price)}
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <Zap className="h-3 w-3 inline mr-1" />
                    日额度: {renderQuota(selectedPlan.dailyQuotaLimit)}
                  </div>
                  <div>
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    周额度: {renderQuota(selectedPlan.weeklyQuotaLimit)}
                  </div>
                </div>
              </div>
            )}

            {/* 倒计时 */}
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">剩余时间:</span>
              <Badge variant="secondary" className="text-sm font-mono">
                {formatTime(countdown)}
              </Badge>
            </div>

            {/* 二维码 */}
            <div className="relative">
              <div className="p-4 rounded-lg bg-white border">
                <QRCode
                  value={qrCode}
                  size={180}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white px-3 py-0.5 text-xs">
                  <Smartphone className="h-3 w-3 mr-1" />
                  支付宝扫码
                </Badge>
              </div>
            </div>

            {/* 提示信息 */}
            <Alert className="bg-blue-50/50 border-blue-200">
              <AlertCircle className="h-3 w-3 text-blue-600" />
              <AlertDescription className="text-xs">
                <div className="font-medium text-blue-900 mb-0.5">支付说明</div>
                <ul className="text-blue-800 space-y-0.5 text-xs">
                  <li>• 请在 5 分钟内使用支付宝扫码完成支付</li>
                  <li>• 支付成功后订阅将在 1-3 分钟内自动生效</li>
                  <li>• 如有问题请联系客服</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              className="flex-1 h-8 text-xs"
              onClick={() => {
                setQrCode('');
                setCountdown(300);
                setSelectedPlan(null);
              }}
            >
              取消支付
            </Button>
            <Button
              className="flex-1 gap-1 h-8 text-xs"
              onClick={() => {
                setQrCode('');
                setCountdown(300);
                setSelectedPlan(null);
                loadCurrentSubscription();
                toast.success('正在确认支付状态，请稍候...');
              }}
            >
              <CheckCircle className="h-3 w-3" />
              我已支付
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}