import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { MoreHorizontal, Plus, Edit, Trash2, Settings, Users, Receipt, TrendingUp, Gift } from "lucide-react";
import { toast } from "sonner";
import CreateSubscriptionPlan from "./features/CreateSubscriptionPlan";
import UpdateSubscriptionPlan from "./features/UpdateSubscriptionPlan";
import GiftSubscription from "./features/GiftSubscription";
import {
  getAllSubscriptionPlans,
  deleteSubscriptionPlan,
  getUserSubscriptions,
  getPurchaseRecords,
  getUsageStats,
  triggerMaintenance
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
  createdAt: string;
  groups?: string[];
}

interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Cancelled';
  plan: SubscriptionPlan;
  user: { userName: string };
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
  user: { userName: string };
}

interface UsageStat {
  userId: string;
  userName: string;
  modelName: string;
  totalQuota: number;
  totalTokens: number;
  requestCount: number;
}

export default function SubscriptionAdminPage() {
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateValue, setUpdateValue] = useState({} as SubscriptionPlan);
  const [giftVisible, setGiftVisible] = useState(false);

  // 套餐数据
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  // 用户订阅数据
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [subscriptionTotal, setSubscriptionTotal] = useState(0);
  const [subscriptionPage, setSubscriptionPage] = useState(1);
  const subscriptionPageSize = 10;

  // 购买记录数据
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [purchaseTotal, setPurchaseTotal] = useState(0);
  const [purchasePage, setPurchasePage] = useState(1);
  const purchasePageSize = 10;

  // 使用统计数据
  const [usageStats, setUsageStats] = useState<UsageStat[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);

  function loadPlans() {
    getAllSubscriptionPlans()
      .then((res) => {
        if (res.success) {
          setPlans(res.value || res.data);
        }
      });
  }

  function loadSubscriptions() {
    getUserSubscriptions(subscriptionPage, subscriptionPageSize)
      .then((res) => {
        if (res.success) {
          setSubscriptions(res.value.items);
          setSubscriptionTotal(res.value.total);
        }
      });
  }

  function loadPurchases() {
    getPurchaseRecords(purchasePage, purchasePageSize)
      .then((res) => {
        if (res.success) {
          setPurchases(res.data.items || res.value.items);
          setPurchaseTotal(res.data.total || res.value.total);
        }
      });
  }

  function loadUsageStats() {
    setStatsLoading(true);
    getUsageStats()
      .then((res) => {
        if (res.success) {
          setUsageStats(res.value || res.data || []);
        }
      })
      .finally(() => {
        setStatsLoading(false);
      });
  }

  function removePlan(id: string) {
    deleteSubscriptionPlan(id)
      .then((res) => {
        if (res.success) {
          loadPlans();
          toast.success("套餐已删除");
        } else {
          toast.error("删除套餐时出现错误");
        }
      });
  }

  function handleMaintenance() {
    setMaintenanceLoading(true);
    triggerMaintenance()
      .then((res) => {
        if (res.success) {
          const data = res.value || res.data;
          toast.success(`维护任务完成：过期订阅 ${data.expiredSubscriptions} 个，日额度重置 ${data.dailyQuotaReset} 个，周额度重置 ${data.weeklyQuotaReset} 个`);
          // 刷新数据
          loadSubscriptions();
          loadUsageStats();
        } else {
          toast.error("维护任务执行失败");
        }
      })
      .catch((error) => {
        console.error('维护任务执行错误:', error);
        toast.error("维护任务执行时出现错误：" + (error.message || "未知错误"));
      })
      .finally(() => {
        setMaintenanceLoading(false);
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

  function getStatusBadge(status: string, type: 'subscription' | 'payment') {
    const variants: Record<string, { variant: any; text: string }> = {
      // 订阅状态
      Active: { variant: 'default', text: '有效' },
      Expired: { variant: 'secondary', text: '已过期' },
      Cancelled: { variant: 'destructive', text: '已取消' },

      // 支付状态
      Pending: { variant: 'outline', text: '待支付' },
      Paid: { variant: 'default', text: '已支付' },
      Failed: { variant: 'destructive', text: '支付失败' },
      Refunded: { variant: 'secondary', text: '已退款' }
    };

    const config = variants[status] || { variant: 'outline', text: status };
    return <Badge variant={config.variant}>{config.text}</Badge>;
  }

  useMemo(() => {
    loadPlans();
    loadSubscriptions();
    loadPurchases();
    loadUsageStats();
  }, [subscriptionPage, purchasePage]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">套餐管理</h1>
          <p className="text-muted-foreground">管理订阅套餐、用户订阅和使用统计</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleMaintenance} disabled={maintenanceLoading}>
            <Settings className="mr-2 h-4 w-4" />
            {maintenanceLoading ? "维护中..." : "执行维护任务"}
          </Button>
          <Button variant="outline" onClick={() => setGiftVisible(true)}>
            <Gift className="mr-2 h-4 w-4" />
            赠送套餐
          </Button>
          <Button onClick={() => setCreateVisible(true)}>
            <Plus className="mr-2 h-4 w-4" />
            创建套餐
          </Button>
        </div>
      </div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            套餐管理
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            用户订阅
          </TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            购买记录
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            使用统计
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>套餐列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名称</TableHead>
                      <TableHead>价格</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>日额度</TableHead>
                      <TableHead>周额度</TableHead>
                      <TableHead>等级</TableHead>
                      <TableHead>绑定分组</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.length > 0 ? (
                      plans.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {plan.name}
                              {plan.tag && (
                                <Badge variant="secondary" className="text-xs">
                                  {plan.tag}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>¥{plan.price}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getTypeText(plan.type)}
                            </Badge>
                          </TableCell>
                          <TableCell>{renderQuota(plan.dailyQuotaLimit)}</TableCell>
                          <TableCell>{renderQuota(plan.weeklyQuotaLimit)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Level {plan.level}</Badge>
                          </TableCell>
                          <TableCell>
                            {plan.groups && plan.groups.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {plan.groups.slice(0, 2).map((group) => (
                                  <Badge key={group} variant="outline" className="text-xs">
                                    {group}
                                  </Badge>
                                ))}
                                {plan.groups.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{plan.groups.length - 2}
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">无限制</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={plan.isActive ? "default" : "secondary"}>
                              {plan.isActive ? "启用" : "禁用"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">打开菜单</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setUpdateVisible(true);
                                    setUpdateValue(plan);
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  编辑
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => removePlan(plan.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  删除
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center">
                          暂无数据
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>用户订阅列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户名</TableHead>
                      <TableHead>套餐名称</TableHead>
                      <TableHead>开始时间</TableHead>
                      <TableHead>结束时间</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.length > 0 ? (
                      subscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell className="font-medium">{subscription.user.userName}</TableCell>
                          <TableCell>{subscription.plan.name}</TableCell>
                          <TableCell>{formatDate(subscription.startDate)}</TableCell>
                          <TableCell>{formatDate(subscription.endDate)}</TableCell>
                          <TableCell>{getStatusBadge(subscription.status, 'subscription')}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          暂无数据
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* 分页控件可以在这里添加 */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>购买记录列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户名</TableHead>
                      <TableHead>套餐名称</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>支付方式</TableHead>
                      <TableHead>购买时间</TableHead>
                      <TableHead>支付时间</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchases.length > 0 ? (
                      purchases.map((purchase) => (
                        <TableRow key={purchase.id}>
                          <TableCell className="font-medium">{purchase.user.userName}</TableCell>
                          <TableCell>{purchase.plan.name}</TableCell>
                          <TableCell>¥{purchase.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {purchase.paymentMethod === 'alipay' ? '支付宝' : purchase.paymentMethod}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(purchase.purchaseTime)}</TableCell>
                          <TableCell>
                            {purchase.paidTime ? formatDate(purchase.paidTime) : '-'}
                          </TableCell>
                          <TableCell>{getStatusBadge(purchase.paymentStatus, 'payment')}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          暂无数据
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
              <CardTitle>使用统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户名</TableHead>
                      <TableHead>模型名称</TableHead>
                      <TableHead>消耗额度</TableHead>
                      <TableHead>总Token数</TableHead>
                      <TableHead>请求次数</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageStats.length > 0 ? (
                      usageStats.map((stat, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{stat.userName}</TableCell>
                          <TableCell>{stat.modelName}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {renderQuota(stat.totalQuota)}
                            </Badge>
                          </TableCell>
                          <TableCell>{stat.totalTokens.toLocaleString()}</TableCell>
                          <TableCell>{stat.requestCount}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          {statsLoading ? "加载中..." : "暂无数据"}
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

      <CreateSubscriptionPlan
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        onSuccess={() => {
          setCreateVisible(false);
          loadPlans();
        }}
      />
      <UpdateSubscriptionPlan
        visible={updateVisible}
        value={updateValue}
        onCancel={() => setUpdateVisible(false)}
        onSuccess={() => {
          setUpdateVisible(false);
          loadPlans();
        }}
      />
      <GiftSubscription
        visible={giftVisible}
        plans={plans}
        onCancel={() => setGiftVisible(false)}
        onSuccess={() => {
          setGiftVisible(false);
          loadSubscriptions();
          loadPurchases();
        }}
      />
    </div>
  );
}