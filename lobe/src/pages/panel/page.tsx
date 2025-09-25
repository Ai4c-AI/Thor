import { renderNumber, renderQuota } from '../../utils/render';
import { useEffect, useState } from 'react';
import { GetStatistics } from '../../services/StatisticsService';
import { getIconByName } from '../../utils/iconutils';
import { GetUserRequest } from '../../services/TrackerService';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '../../components/ui/chart';
import { cn } from '../../lib/utils';
import {
  TrendingUp,
  LineChart as LineChartIcon,
  DollarSign,
  Zap,
  Users,
  Activity,
  CreditCard,
  RefreshCw,
  Download,
  Calendar,
  AlertTriangle,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import * as React from 'react';

// Chart configurations
const quotaChartConfig: ChartConfig = {
  consumed: {
    label: 'Consumed Quota',
    color: 'hsl(0 72.2% 50.6%)',
  },
  remaining: {
    label: 'Remaining Quota',
    color: 'hsl(221.2 83.2% 53.3%)',
  },
};

const trendChartConfig: ChartConfig = {
  consumption: {
    label: 'Consumption',
    color: 'hsl(221.2 83.2% 53.3%)',
  },
  requests: {
    label: 'Requests',
    color: 'hsl(142.1 76.2% 36.3%)',
  },
  tokens: {
    label: 'Tokens',
    color: 'hsl(262.1 83.3% 57.8%)',
  },
};

export default function PanelPage() {
  const { t } = useTranslation();

  const [data, setData] = useState<any>(undefined);
  const [consumeChart, setConsumeChart] = useState<any[]>([]);
  const [requestChart, setRequestChart] = useState<any[]>([]);
  const [tokenChart, setTokenChart] = useState<any[]>([]);
  const [modelsChart, setModelsChart] = useState<any[]>([]);
  const [modelsName, setModelsName] = useState<any[]>([]);
  const [userNewData, setUserNewData] = useState<any[] | null>(null);
  const [rechargeData, setRechargeData] = useState<any[] | null>(null);
  const [userRequest, setUserRequest] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Prepare chart data
  const quotaData = React.useMemo(() => {
    if (!data) return [];
    return [
      {
        name: 'consumed',
        value: data.currentConsumedCredit || 0,
        fill: quotaChartConfig.consumed.color
      },
      {
        name: 'remaining',
        value: data.currentResidualCredit || 0,
        fill: quotaChartConfig.remaining.color
      },
    ];
  }, [data]);

  // Value formatters
  const formatQuota = (value: number): string => renderQuota(value, 6);
  const formatNumber = (value: number): string => renderNumber(value);
  const formatDate = (value: string): string => `${value}${t('panel.chartLabels.day')}`;
  const formatRPM = (value: number): string => `${value.toFixed(2)} req/min`;
  const formatTPM = (value: number): string => `${value.toFixed(0)} tok/min`;

  // Calculate health indicators
  const getHealthStatus = () => {
    if (!data) return { status: 'unknown', message: '' };
    const remaining = data.currentResidualCredit || 0;
    const consumed = data.currentConsumedCredit || 0;
    const total = remaining + consumed;
    const usageRate = total > 0 ? (consumed / total) * 100 : 0;

    if (usageRate > 90) return { status: 'critical', message: t('panel.health.critical') };
    if (usageRate > 75) return { status: 'warning', message: t('panel.health.warning') };
    return { status: 'healthy', message: t('panel.health.healthy') };
  };

  const healthStatus = getHealthStatus();

  // Safe icon URL generator
  const getModelIconUrl = (icon: any): string | null => {
    if (!icon || typeof icon !== 'string' || !icon.trim()) {
      return null;
    }
    try {
      return `/src/assets/${icon.toLowerCase()}.svg`;
    } catch {
      return null;
    }
  };

  // Quota tooltip component
  const QuotaTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const config = quotaChartConfig[data.name as keyof typeof quotaChartConfig];
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {config?.label}
              </span>
              <span className="font-bold text-muted-foreground">
                {renderQuota(data.value, 2)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Trend chart tooltip
  const TrendTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid gap-2">
            <div className="font-medium">{formatDate(label)}</div>
            {payload.map((entry: any) => {
              const config = trendChartConfig[entry.dataKey as keyof typeof trendChartConfig];
              return (
                <div key={entry.dataKey} className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {config?.label}:
                  </span>
                  <span className="font-mono text-sm font-medium">
                    {entry.dataKey === 'consumption' ? formatQuota(entry.value) : formatNumber(entry.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  // Models chart configuration and data
  const modelsChartConfig: ChartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    modelsName.forEach((name, index) => {
      const colors = [
        'hsl(221.2 83.2% 53.3%)',
        'hsl(142.1 76.2% 36.3%)',
        'hsl(262.1 83.3% 57.8%)',
        'hsl(32.2 95% 44%)',
        'hsl(24.6 95% 53.1%)',
        'hsl(0 72.2% 50.6%)',
      ];
      config[name] = {
        label: name,
        color: colors[index % colors.length],
      };
    });
    return config;
  }, [modelsName]);

  const ModelsTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid gap-2">
            <div className="font-medium">{formatDate(label)}</div>
            {payload.filter((entry: any) => entry.value > 0).map((entry: any) => {
              const config = modelsChartConfig[entry.dataKey as keyof typeof modelsChartConfig];
              return (
                <div key={entry.dataKey} className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {config?.label}:
                  </span>
                  <span className="font-mono text-sm font-medium">
                    {renderQuota(entry.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  // Simple bar chart for user registration data
  const userBarChartConfig: ChartConfig = {
    users: {
      label: t('panel.chartLabels.userCount'),
      color: 'hsl(221.2 83.2% 53.3%)',
    },
  };

  const UserBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid gap-2">
            <div className="font-medium">{label}</div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: payload[0].color }}
              />
              <span className="text-sm text-muted-foreground">
                {t('panel.chartLabels.userCount')}:
              </span>
              <span className="font-mono text-sm font-medium">
                {payload[0].value}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Recharge pie chart configuration
  const rechargeChartConfig: ChartConfig = React.useMemo(() => {
    if (!rechargeData) return {};
    const config: ChartConfig = {};
    rechargeData.forEach((item, index) => {
      const colors = [
        'hsl(221.2 83.2% 53.3%)',
        'hsl(142.1 76.2% 36.3%)',
        'hsl(262.1 83.3% 57.8%)',
        'hsl(32.2 95% 44%)',
        'hsl(24.6 95% 53.1%)',
        'hsl(0 72.2% 50.6%)',
      ];
      config[item.name] = {
        label: item.name,
        color: colors[index % colors.length],
      };
    });
    return config;
  }, [rechargeData]);

  const RechargeTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: data.payload.fill }}
              />
              <span className="font-medium">{data.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {renderQuota(data.value)} ({data.payload.percent}%)
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Prepare recharge data for pie chart
  const rechargeDataForChart = React.useMemo(() => {
    if (!rechargeData) return [];
    return rechargeData.map((item, index) => {
      const colors = [
        'hsl(221.2 83.2% 53.3%)',
        'hsl(142.1 76.2% 36.3%)',
        'hsl(262.1 83.3% 57.8%)',
        'hsl(32.2 95% 44%)',
        'hsl(24.6 95% 53.1%)',
        'hsl(0 72.2% 50.6%)',
      ];
      return {
        ...item,
        fill: colors[index % colors.length],
      };
    });
  }, [rechargeData]);

  function loadUserRequest() {
    try {
      GetUserRequest()
        .then((res) => {
          setUserRequest(res.data || []);
        })
        .catch((error) => {
          console.error('Error loading user request:', error);
          setUserRequest([]);
        });
    } catch (error) {
      console.error('Error in loadUserRequest:', error);
      setUserRequest([]);
    }
  }

  function loadStatistics() {
    const consumeChart: any[] = [];
    const requestChart: any[] = [];
    const tokenChart: any[] = [];
    const modelsChart: any[] = [];
    const modelsName: any[] = [];

    setLoading(true);
    setRefreshing(true);

    try {
      GetStatistics()
        .then((res) => {
          const { modelDate, consumes, requests, tokens, models, userNewData, rechargeData } = res.data;

          if (userNewData) {
            setUserNewData(userNewData);
          } else {
            setUserNewData(null);
          }

          if (rechargeData) {
            setRechargeData(rechargeData);
          } else {
            setRechargeData(null);
          }

          modelDate.forEach((item: any, i: number) => {
            const consume = consumes?.find((x: any) => x.dateTime === item);
            const request = requests.find((x: any) => x.dateTime === item);
            const tokenData = tokens.find((x: any) => x.dateTime === item);
            consumeChart.push({
              date: item,
              consumption: consume?.value || 0,
            });
            requestChart.push({
              date: item,
              requests: request?.value || 0,
            });
            tokenChart.push({
              date: item,
              tokens: tokenData?.value || 0
            });

            const model = {} as any;
            models.forEach((modelItem: any) => {
              model[modelItem.name] = modelItem.data[i] || 0;
            });
            model.date = item;
            modelsChart.push(model);
          });

          models.forEach((item: any) => {
            modelsName.push(item.name);
          });

          setConsumeChart(consumeChart);
          setRequestChart(requestChart);
          setTokenChart(tokenChart);
          setModelsChart(modelsChart);
          setModelsName(modelsName);

          if (res.data?.modelRanking) {
            res.data.modelRanking.forEach((item: any) => {
              if (item.icon) {
                item.icon = getIconByName(item.icon).icon;
              }
            });
          }

          setData(res.data);
        })
        .catch((error) => {
          console.error('Error loading statistics:', error);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
          setRefreshing(false);
        });
    } catch (error) {
      console.error('Error in loadStatistics:', error);
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadStatistics();
    loadUserRequest();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="h-[200px]">
              <CardContent className="p-6">
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="h-[400px]">
          <CardContent className="p-6">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{t('panel.title')}</h1>
          {healthStatus.status !== 'healthy' && (
            <Badge variant={healthStatus.status === 'critical' ? 'destructive' : 'secondary'}>
              {healthStatus.status === 'critical' ? (
                <AlertTriangle className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {healthStatus.message}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">{t('panel.timeRange.1d')}</SelectItem>
              <SelectItem value="7d">{t('panel.timeRange.7d')}</SelectItem>
              <SelectItem value="30d">{t('panel.timeRange.30d')}</SelectItem>
              <SelectItem value="90d">{t('panel.timeRange.90d')}</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              loadStatistics();
              loadUserRequest();
            }}
            disabled={refreshing}
          >
            <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Health Alert */}
      {healthStatus.status === 'critical' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t('panel.alerts.criticalUsage')}</AlertTitle>
          <AlertDescription>
            {t('panel.alerts.criticalUsageDesc')}
          </AlertDescription>
        </Alert>
      )}

      {/* Core Financial Overview */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Enhanced Balance Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">
                {t('panel.statistics.currentResidualCredit')}
              </CardTitle>
              <CardDescription>
                {t('panel.statistics.balanceOverview')}
              </CardDescription>
            </div>
            <DollarSign className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {renderQuota(data?.currentResidualCredit || 0, 2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('panel.statistics.remainingBalance')}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('panel.statistics.consumed')}</span>
                    <span className="font-medium">{renderQuota(data?.currentConsumedCredit || 0, 2)}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, ((data?.currentConsumedCredit || 0) / ((data?.currentConsumedCredit || 0) + (data?.currentResidualCredit || 1))) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ChartContainer
                  config={quotaChartConfig}
                  className="aspect-square max-h-[160px]"
                >
                  <PieChart>
                    <ChartTooltip content={<QuotaTooltip />} />
                    <Pie
                      data={quotaData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {quotaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">{t('panel.statistics.quickStats')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('panel.statistics.recentConsumption')}</span>
                </div>
                <span className="font-semibold">
                  {renderQuota(data?.consumes?.reduce((a: number, b: any) => a + (b.value || 0), 0) || 0, 2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('panel.statistics.recentRequests')}</span>
                </div>
                <span className="font-semibold">
                  {renderNumber(data?.requests?.reduce((a: number, b: any) => a + (b.value || 0), 0) || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('panel.statistics.recentTokens')}</span>
                </div>
                <span className="font-semibold">
                  {renderNumber(data?.tokens?.reduce((a: number, b: any) => a + (b.value || 0), 0) || 0)}
                </span>
              </div>

              {/* Separator */}
              <div className="border-t border-border" />

              {/* RPM */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">{t('panel.statistics.averageRPM')}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-blue-600">
                    {formatRPM(data?.averageRPM || 0)}
                  </span>
                  <div className="text-xs text-muted-foreground">
                    {t('panel.statistics.realtime')}: {formatRPM(data?.realtimeRPM || 0)}
                  </div>
                </div>
              </div>

              {/* TPM */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">{t('panel.statistics.averageTPM')}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-green-600">
                    {formatTPM(data?.averageTPM || 0)}
                  </span>
                  <div className="text-xs text-muted-foreground">
                    {t('panel.statistics.realtime')}: {formatTPM(data?.realtimeTPM || 0)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">{t('panel.tabs.trends')}</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">{t('panel.tabs.models')}</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{t('panel.tabs.users')}</span>
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">{t('panel.tabs.revenue')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Consumption Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('panel.charts.consumptionTrend')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={trendChartConfig} className="h-[200px]">
                  <AreaChart data={consumeChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis tickFormatter={formatQuota} />
                    <ChartTooltip content={<TrendTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="consumption"
                      stackId="1"
                      stroke={trendChartConfig.consumption.color}
                      fill={trendChartConfig.consumption.color}
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Requests Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('panel.charts.requestsTrend')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={trendChartConfig} className="h-[200px]">
                  <LineChart data={requestChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis tickFormatter={formatNumber} />
                    <ChartTooltip content={<TrendTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="requests"
                      stroke={trendChartConfig.requests.color}
                      strokeWidth={2}
                      dot={{ fill: trendChartConfig.requests.color, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Tokens Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('panel.charts.tokensTrend')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={trendChartConfig} className="h-[200px]">
                  <AreaChart data={tokenChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis tickFormatter={formatNumber} />
                    <ChartTooltip content={<TrendTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="tokens"
                      stackId="1"
                      stroke={trendChartConfig.tokens.color}
                      fill={trendChartConfig.tokens.color}
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* 主要图表区域 */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {t('panel.charts.modelDistribution')}
                </CardTitle>
                <CardDescription>
                  {t('panel.charts.modelDistributionDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={modelsChartConfig}
                  className="h-[400px] w-full"
                >
                  <BarChart data={modelsChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={(value) => renderQuota(value)}
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip content={<ModelsTooltip />} />
                    {modelsName.slice(0, 15).map((name) => (
                      <Bar
                        key={name}
                        dataKey={name}
                        stackId="models"
                        fill={modelsChartConfig[name]?.color}
                        radius={[1, 1, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* 侧边栏统计信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('panel.charts.modelStats')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 模型总数 */}
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {modelsName.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('panel.charts.totalModels')}
                  </div>
                </div>

                {/* 模型排行榜 */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">{t('panel.charts.topModels')}</h4>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {data?.modelRanking?.slice(0, 10).map((model, index) => (
                      <div key={model.name} className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-xs font-medium text-muted-foreground w-4">
                            #{index + 1}
                          </span>
                          <div className="flex items-center gap-1 flex-1 min-w-0">
                            {getModelIconUrl(model.icon) && (
                              <img
                                src={getModelIconUrl(model.icon)!}
                                alt={typeof model.icon === 'string' ? model.icon : 'Model icon'}
                                className="w-4 h-4 flex-shrink-0"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            )}
                            <span className="text-xs truncate" title={model.name}>
                              {model.name}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-primary">
                          {renderQuota(model.value, 2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 图例 */}
                {modelsName.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">{t('panel.charts.modelLegend')}</h4>
                    <div className="grid grid-cols-1 gap-1 max-h-[200px] overflow-y-auto">
                      {modelsName.slice(0, 15).map((name, index) => (
                        <div key={name} className="flex items-center gap-2 text-xs">
                          <div
                            className="w-3 h-3 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: modelsChartConfig[name]?.color }}
                          />
                          <span className="truncate" title={name}>
                            {name}
                          </span>
                        </div>
                      ))}
                      {modelsName.length > 15 && (
                        <div className="text-xs text-muted-foreground text-center pt-2">
                          +{modelsName.length - 15} more models
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {userNewData ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t('panel.charts.newUserRegistration')}
                </CardTitle>
                <CardDescription>
                  {t('panel.charts.userGrowthAnalysis')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={userBarChartConfig} className="h-[350px]">
                  <BarChart data={userNewData?.map(item => ({
                    ...item,
                    name: typeof item.name === 'object' ? t('panel.chartLabels.userCount') : item.name
                  })) || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={userNewData && userNewData.length > 5 ? -30 : 0}
                      textAnchor={userNewData && userNewData.length > 5 ? "end" : "middle"}
                      height={userNewData && userNewData.length > 5 ? 60 : 30}
                    />
                    <YAxis />
                    <ChartTooltip content={<UserBarTooltip />} />
                    <Bar
                      dataKey="value"
                      fill={userBarChartConfig.users.color}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('panel.noData.users')}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          {rechargeData ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t('panel.charts.recentRechargeData')}
                </CardTitle>
                <CardDescription>
                  {t('panel.charts.revenueAnalysis')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={rechargeChartConfig} className="h-[400px]">
                  <PieChart>
                    <ChartTooltip content={<RechargeTooltip />} />
                    <Pie
                      data={rechargeDataForChart}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={3}
                      label={({ name, percent }) => `${name}: ${(percent).toFixed(0)}%`}
                    >
                      {rechargeDataForChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('panel.noData.revenue')}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}