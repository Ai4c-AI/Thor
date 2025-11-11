import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Calendar,
  CreditCard,
  Receipt,
  TrendingUp,
  ArrowUp,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import {
  getUserCurrentSubscription,
  getUserSubscriptionHistory,
  getUserPurchaseRecords,
  getUserUpgradeHistory,
  getUserQuotaUsage
} from "../../services/SubscriptionService";
import { renderQuota } from "../../utils/render";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 1 | 2 | 3; // 1=Monthly, 2=Yearly, 3=Weekly
  level: number;
}

interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 0 | 1 | 2 | 3 | 4; // 0=Pending, 1=Active, 2=Expired, 3=Cancelled, 4=Suspended
  plan: SubscriptionPlan;
  currentDailyUsage: number;
  currentWeeklyUsage: number;
}

interface PurchaseRecord {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Cancelled' | 'Refunded';
  purchaseTime: string;
  paidTime?: string;
  plan: SubscriptionPlan;
}

interface UpgradeRecord {
  id: string;
  userId: string;
  fromPlanId: string;
  toPlanId: string;
  remainingValue: number;
  targetPrice: number;
  actualPayAmount: number;
  status: 'Pending' | 'Completed' | 'Failed' | 'Cancelled';
  upgradeTime: string;
  fromPlan: SubscriptionPlan;
  toPlan: SubscriptionPlan;
}

interface QuotaUsage {
  userId: string;
  userName: string;
  modelName: string;
  totalQuota: number;
  totalTokens: number;
  requestCount: number;
}

export default function SubscriptionHistoryPage() {
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState<UserSubscription[]>([]);
  const [purchaseRecords, setPurchaseRecords] = useState<PurchaseRecord[]>([]);
  const [upgradeHistory, setUpgradeHistory] = useState<UpgradeRecord[]>([]);
  const [quotaUsage, setQuotaUsage] = useState<QuotaUsage[]>([]);
  const [usageDays, setUsageDays] = useState(7);

  function loadCurrentSubscription() {
    getUserCurrentSubscription()
      .then((res) => {
        if (res.success && res.data) {
          setCurrentSubscription(res.data);
        }
      });
  }

  function loadSubscriptionHistory() {
    getUserSubscriptionHistory()
      .then((res) => {
        if (res.success) {
          setSubscriptionHistory(res.data);
        }
      });
  }

  function loadPurchaseRecords() {
    getUserPurchaseRecords()
      .then((res) => {
        if (res.success) {
          setPurchaseRecords(res.data);
        }
      });
  }

  function loadUpgradeHistory() {
    getUserUpgradeHistory()
      .then((res) => {
        if (res.success) {
          setUpgradeHistory(res.data);
        }
      });
  }

  function loadQuotaUsage() {
    getUserQuotaUsage(usageDays)
      .then((res) => {
        if (res.success) {
          setQuotaUsage(res.data);
        }
      });
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('zh-CN');
  }


  function getTypeText(type: number): string {
    switch (type) {
      case 3: return '包周';
      case 1: return '包月';
      case 2: return '包年';
      default: return type.toString();
    }
  }

  function getStatusBadge(status: number | string, type: 'subscription' | 'payment' | 'upgrade') {
    // 支付状态映射
    const paymentStatusMap: Record<string, number> = {
      'Pending': 10,
      'Paid': 11,
      'Failed': 12,
      'Cancelled': 12,
      'Refunded': 13
    };

    // 升级状态映射
    const upgradeStatusMap: Record<string, number> = {
      'Pending': 10,
      'Completed': 20,
      'Failed': 12,
      'Cancelled': 12
    };

    // 转换字符串状态为数字
    let numericStatus: number;
    if (typeof status === 'string') {
      if (type === 'payment') {
        numericStatus = paymentStatusMap[status] || 10;
      } else if (type === 'upgrade') {
        numericStatus = upgradeStatusMap[status] || 10;
      } else {
        numericStatus = 0;
      }
    } else {
      numericStatus = status;
    }

    const variants: Record<number, { variant: any; text: string; icon?: any }> = {
      // 订阅状态
      0: { variant: 'outline', text: '待激活', icon: Clock },
      1: { variant: 'default', text: '有效', icon: CheckCircle },
      2: { variant: 'secondary', text: '已过期', icon: Clock },
      3: { variant: 'destructive', text: '已取消', icon: XCircle },
      4: { variant: 'secondary', text: '已暂停', icon: RefreshCw },

      // 支付状态
      10: { variant: 'outline', text: '待支付', icon: Clock },
      11: { variant: 'default', text: '已支付', icon: CheckCircle },
      12: { variant: 'destructive', text: '支付失败', icon: XCircle },
      13: { variant: 'secondary', text: '已退款', icon: RefreshCw },

      // 升级状态
      20: { variant: 'default', text: '已完成', icon: CheckCircle }
    };

    const config = variants[numericStatus] || { variant: 'outline', text: String(status), icon: undefined };
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3" />}
        {config.text}
      </Badge>
    );
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
    loadSubscriptionHistory();
    loadPurchaseRecords();
    loadUpgradeHistory();
    loadQuotaUsage();
  }, [usageDays]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">订阅记录</h1>
          <p className="text-muted-foreground">查看您的订阅历史、购买记录和使用统计</p>
        </div>
      </div>

      {/* 当前套餐概览 */}
      {currentSubscription && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              当前有效套餐
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
                <div className="font-semibold">{getRemainingDays(currentSubscription.endDate)} 天</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">状态</div>
                {getStatusBadge(currentSubscription.status, 'subscription')}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            订阅历史
          </TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            购买记录
          </TabsTrigger>
          <TabsTrigger value="upgrades" className="flex items-center gap-2">
            <ArrowUp className="h-4 w-4" />
            升级记录
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            使用统计
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>订阅历史</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>套餐名称</TableHead>
                      <TableHead>套餐类型</TableHead>
                      <TableHead>开始时间</TableHead>
                      <TableHead>结束时间</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptionHistory.length > 0 ? (
                      subscriptionHistory.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell className="font-medium">{subscription.plan.name}</TableCell>
                          <TableCell>{getTypeText(subscription.plan.type)}</TableCell>
                          <TableCell>{formatDate(subscription.startDate)}</TableCell>
                          <TableCell>{formatDate(subscription.endDate)}</TableCell>
                          <TableCell>{getStatusBadge(subscription.status, 'subscription')}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          暂无订阅历史
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>购买记录</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>套餐名称</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>支付方式</TableHead>
                      <TableHead>购买时间</TableHead>
                      <TableHead>支付时间</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseRecords.length > 0 ? (
                      purchaseRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.plan.name}</TableCell>
                          <TableCell>¥{record.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {record.paymentMethod === 'alipay' ? '支付宝' :
                               record.paymentMethod === 'gift' ? '赠送' :
                               record.paymentMethod}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(record.purchaseTime)}</TableCell>
                          <TableCell>
                            {record.paidTime ? formatDate(record.paidTime) : '-'}
                          </TableCell>
                          <TableCell>{getStatusBadge(record.paymentStatus, 'payment')}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          暂无购买记录
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upgrades">
          <Card>
            <CardHeader>
              <CardTitle>升级记录</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>升级路径</TableHead>
                      <TableHead>剩余价值</TableHead>
                      <TableHead>目标价格</TableHead>
                      <TableHead>实付金额</TableHead>
                      <TableHead>升级时间</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upgradeHistory.length > 0 ? (
                      upgradeHistory.map((upgrade) => (
                        <TableRow key={upgrade.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <span>{upgrade.fromPlan.name}</span>
                              <ArrowUp className="h-4 w-4 text-muted-foreground" />
                              <span>{upgrade.toPlan.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>¥{upgrade.remainingValue.toFixed(2)}</TableCell>
                          <TableCell>¥{upgrade.targetPrice.toFixed(2)}</TableCell>
                          <TableCell>
                            {upgrade.actualPayAmount === 0 ? (
                              <Badge variant="secondary">免费</Badge>
                            ) : (
                              `¥${upgrade.actualPayAmount.toFixed(2)}`
                            )}
                          </TableCell>
                          <TableCell>{formatDate(upgrade.upgradeTime)}</TableCell>
                          <TableCell>{getStatusBadge(upgrade.status, 'upgrade')}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          暂无升级记录
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>使用统计</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant={usageDays === 7 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUsageDays(7)}
                  >
                    7天
                  </Button>
                  <Button
                    variant={usageDays === 30 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUsageDays(30)}
                  >
                    30天
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>模型名称</TableHead>
                      <TableHead>消耗额度</TableHead>
                      <TableHead>总Token数</TableHead>
                      <TableHead>请求次数</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotaUsage.length > 0 ? (
                      quotaUsage.map((usage, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{usage.modelName}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {renderQuota(usage.totalQuota)}
                            </Badge>
                          </TableCell>
                          <TableCell>{usage.totalTokens.toLocaleString()}</TableCell>
                          <TableCell>{usage.requestCount}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          暂无使用记录
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}