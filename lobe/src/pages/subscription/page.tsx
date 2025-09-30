import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
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
  LogIn
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">套餐购买</h1>
          <p className="text-muted-foreground">选择适合您的AI模型访问套餐</p>
        </div>
      </div>

      {/* 当前套餐状态 */}
      {currentSubscription && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
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
                <div className="text-sm text-muted-foreground">套餐类型</div>
                <div className="font-semibold">{getTypeText(currentSubscription.plan.type)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">剩余天数</div>
                <div className="font-semibold flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {getRemainingDays(currentSubscription.endDate)} 天
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">状态</div>
                <Badge variant={currentSubscription.status === 1? 'default' : 'secondary'}>
                  {currentSubscription.status === 1 ? '有效' : '已过期'}
                </Badge>
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
      )}

      {/* 套餐列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative transition-all hover:shadow-lg ${
              plan.tag ? 'border-orange-200 shadow-md' : ''
            }`}
          >
            {plan.tag && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white">
                  {plan.tag}
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                {getPlanIcon(plan.level)}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                ¥{plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /{getTypeText(plan.type)}
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

              <div className="space-y-3">
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

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="text-sm font-medium">支持的模型:</div>
                <div className="flex flex-wrap gap-1">
                  {plan.allowedModels.slice(0, 3).map((model) => (
                    <Badge key={model} variant="outline" className="text-xs">
                      {model}
                    </Badge>
                  ))}
                  {plan.allowedModels.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{plan.allowedModels.length - 3} 更多
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => handlePurchase(plan.id)}
                disabled={loading || (currentSubscription?.plan.level || 0) >= plan.level}
                variant={plan.tag ? "default" : "outline"}
              >
                {!isAuthenticated ? (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    登录后购买套餐
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {currentSubscription?.plan.level && currentSubscription.plan.level >= plan.level
                      ? '已拥有更高级套餐'
                      : `购买 ${getTypeText(plan.type)}套餐`
                    }
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
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
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              购买套餐 - {selectedPlan?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-4 py-4">
            {/* 倒计时显示 */}
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(countdown)}
            </Badge>

            {/* 套餐信息 */}
            {selectedPlan && (
              <div className="w-full text-center border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary mb-2">
                  ¥{selectedPlan.price}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {getTypeText(selectedPlan.type)}套餐
                </div>
                <div className="text-xs text-muted-foreground">
                  日额度: {renderQuota(selectedPlan.dailyQuotaLimit)} • 周额度: {renderQuota(selectedPlan.weeklyQuotaLimit)}
                </div>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>请在5分钟内完成支付</strong><br />
                使用支付宝扫描下方二维码完成支付
              </AlertDescription>
            </Alert>

            {/* 二维码 */}
            <div className="p-4 border rounded-lg bg-white">
              <QRCode
                value={qrCode}
                size={200}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Smartphone className="h-4 w-4" />
              请使用手机支付宝扫码
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setQrCode('');
                setCountdown(300);
                setSelectedPlan(null);
              }}
            >
              取消
            </Button>
            <Button
              className="gap-2"
              onClick={() => {
                setQrCode('');
                setCountdown(300);
                setSelectedPlan(null);
                loadCurrentSubscription();
                toast.success('如果支付成功，订阅将在几分钟内生效');
              }}
            >
              <CheckCircle className="h-4 w-4" />
              支付完成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}