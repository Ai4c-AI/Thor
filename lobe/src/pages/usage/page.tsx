import { useEffect, useState } from 'react';
import { MessageSquare, Image, Headphones, Wrench, Download, Volume2, Languages, Calendar, Filter, TrendingUp } from 'lucide-react';
import { renderNumber, renderQuota } from '../../utils/render';
import { getTokens } from '../../services/TokenService';
import { GetUsage } from '../../services/UsageService';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Bar, BarChart, Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from '@/components/ui/chart';

// shadcn/ui imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UsagePage() {
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState<{start: string, end: string} | null>(null);
    const [selectedApiKey, setSelectedApiKey] = useState<string | undefined>(undefined);
    const [tokenOptions, setTokenOptions] = useState<{ label: string; value: string }[]>([]);
    const { t } = useTranslation();

    // 使用数据
    const [usageData, setUsageData] = useState<any>({
        totalCost: 0,
        totalRequestCount: 0,
        totalTokenCount: 0,
        dailyUsage: [],
        serviceRequests: []
    });

    // 处理后的图表数据
    const [chartData, setChartData] = useState<{
        dailyUsage: Array<{
            date: string;
            cost: number;
            requests: number;
            tokens: number;
            [key: string]: any;
        }>;
        serviceCharts: {
            [key: string]: Array<{
                date: string;
                requests: number;
                tokens?: number;
            }>;
        };
    }>({ dailyUsage: [], serviceCharts: {} });

    // Chart configurations using shadcn theming system
    const chartConfigs = {
        dailyUsage: {
            cost: {
                label: t('usage.cost'),
                color: 'hsl(var(--destructive))'
            },
            requests: {
                label: t('usage.requests'),
                color: 'hsl(var(--primary))'
            },
            tokens: {
                label: t('usage.tokenCount'),
                color: 'hsl(var(--chart-3))'
            }
        } satisfies ChartConfig,

        service: {
            requests: {
                label: t('usage.requests'),
                color: 'hsl(var(--primary))'
            },
            tokens: {
                label: t('usage.tokenCount'),
                color: 'hsl(var(--chart-2))'
            }
        } satisfies ChartConfig
    };

    // 加载Token列表
    const loadTokenList = async () => {
        setLoading(true);
        try {
            const response = await getTokens(1, 1000);
            if (response.success && response.data) {
                const options = [
                    { label: t('usage.allApiKeys'), value: 'all' },
                    ...(response.data.items || []).map((item: any) => ({
                        label: item.name || item.key,
                        value: item.key
                    }))
                ];
                setTokenOptions(options);
            }
        } catch (error) {
            console.error('加载Token失败', error);
        } finally {
            setLoading(false);
        }
    };

    // 初始加载Token列表
    useEffect(() => {
        loadTokenList();

        // 默认设置日期范围为最近7天
        const endDate = dayjs();
        const startDate = dayjs().subtract(7, 'day');
        setDateRange({
            start: startDate.format('YYYY-MM-DD'),
            end: endDate.format('YYYY-MM-DD')
        });
    }, []);

    // 根据选择的Token和日期范围获取使用数据
    const fetchUsageData = async () => {
        if (!dateRange) return;

        setLoading(true);
        try {
            const tokenKey = !selectedApiKey || selectedApiKey === 'all' ? '' : selectedApiKey;
            const response = await GetUsage(tokenKey, dateRange.start, dateRange.end);

            if (response.success && response.data) {
                setUsageData(response.data);
                processChartData(response.data);
            }
        } catch (error) {
            console.error('获取使用数据失败', error);
        } finally {
            setLoading(false);
        }
    };

    // 处理图表数据
    const processChartData = (data: any) => {
        if (!data || !data.dailyUsage || data.dailyUsage.length === 0) {
            setChartData({ dailyUsage: [], serviceCharts: {} });
            return;
        }

        // 处理日常使用数据
        const processedDailyUsage = data.dailyUsage
            .map((item: any) => {
                const date = new Date(item.date);
                return {
                    date: `${date.getMonth() + 1}/${date.getDate()}`,
                    cost: item.cost || 0,
                    requests: item.requestCount || 0,
                    tokens: item.tokenCount || 0,
                    modelUsage: item.modelUsage || []
                };
            })
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // 处理服务类型图表数据
        const serviceEndpoints = [
            '/v1/chat/completions',
            '/v1/images/generations',
            '/v1/embeddings',
            '/v1/audio/speech',
            '/v1/audio/transcriptions',
            '/v1/audio/translations'
        ];

        const serviceCharts: any = {};

        serviceEndpoints.forEach(endpoint => {
            serviceCharts[endpoint] = data.dailyUsage.map((dailyItem: any) => {
                const dailyDate = dailyItem.date;

                const requests = data.serviceRequests
                    .filter((req: any) => {
                        const matchesEndpoint = endpoint === '/v1/chat/completions'
                            ? (req.apiEndpoint.startsWith('/v1/chat/completions') || req.apiEndpoint.startsWith('/v1/completions'))
                            : req.apiEndpoint.startsWith(endpoint);
                        return matchesEndpoint && req.date === dailyDate;
                    })
                    .reduce((sum: number, req: any) => sum + (req.requestCount || 0), 0);

                const tokens = data.serviceRequests
                    .filter((req: any) => {
                        const matchesEndpoint = endpoint === '/v1/chat/completions'
                            ? (req.apiEndpoint.startsWith('/v1/chat/completions') || req.apiEndpoint.startsWith('/v1/completions'))
                            : req.apiEndpoint.startsWith(endpoint);
                        return matchesEndpoint && req.date === dailyDate;
                    })
                    .reduce((sum: number, req: any) => sum + (req.tokenCount || 0), 0);

                const displayDate = new Date(dailyDate);
                return {
                    date: `${displayDate.getMonth() + 1}/${displayDate.getDate()}`,
                    requests,
                    tokens
                };
            });
        });

        setChartData({ dailyUsage: processedDailyUsage, serviceCharts });
    };

    // 当选择的Token或日期范围变化时，重新获取数据
    useEffect(() => {
        if (dateRange) {
            fetchUsageData();
        }
    }, [selectedApiKey, dateRange]);

    // 处理模型使用情况的图表数据
    const getModelUsageChartData = () => {
        if (!chartData.dailyUsage.length) return [];

        const hasModelData = chartData.dailyUsage.some(item => item.modelUsage && item.modelUsage.length > 0);
        if (!hasModelData) return chartData.dailyUsage;

        const allModels = new Set<string>();
        chartData.dailyUsage.forEach(item => {
            if (item.modelUsage) {
                item.modelUsage.forEach((model: any) => {
                    allModels.add(model.modelName);
                });
            }
        });

        return chartData.dailyUsage.map(item => {
            const result: any = { date: item.date };

            Array.from(allModels).forEach(modelName => {
                const modelUsage = item.modelUsage?.find((m: any) => m.modelName === modelName);
                result[modelName] = modelUsage ? modelUsage.cost : 0;
            });

            return result;
        });
    };

    // 为模型使用情况生成动态图表配置
    const getModelChartConfig = (): ChartConfig => {
        const modelData = getModelUsageChartData();
        if (!modelData.length) return {};

        const allModels = new Set<string>();
        chartData.dailyUsage.forEach(item => {
            if (item.modelUsage) {
                item.modelUsage.forEach((model: any) => {
                    allModels.add(model.modelName);
                });
            }
        });

        const colors = [
            'hsl(var(--chart-1))',
            'hsl(var(--chart-2))',
            'hsl(var(--chart-3))',
            'hsl(var(--chart-4))',
            'hsl(var(--chart-5))'
        ];

        const config: ChartConfig = {};
        Array.from(allModels).forEach((modelName, index) => {
            config[modelName] = {
                label: modelName,
                color: colors[index % colors.length]
            };
        });

        return config;
    };

    // 处理每个API类别的数据
    const getCategoryData = (categoryEndpoint: string) => {
        const filteredRequests = usageData.serviceRequests.filter(
            (req: any) => {
                if (categoryEndpoint === '/v1/chat/completions') {
                    return req.apiEndpoint.startsWith('/v1/chat/completions') ||
                        req.apiEndpoint.startsWith('/v1/completions');
                }
                return req.apiEndpoint.startsWith(categoryEndpoint);
            }
        );

        const summary = {
            requestCount: 0,
            tokenCount: 0,
            imageCount: 0,
            cost: 0,
            audioSeconds: 0
        };

        filteredRequests.forEach((req: any) => {
            summary.requestCount += req.requestCount || 0;
            summary.tokenCount += req.tokenCount || 0;
            summary.imageCount += req.imageCount || 0;
            summary.cost += req.cost || 0;
            summary.audioSeconds += req.audioSeconds || 0;
        });

        return summary;
    };







    // 导出数据
    const handleExport = () => {
        const tokenKey = !selectedApiKey || selectedApiKey === 'all' ? undefined : selectedApiKey;
        const csvContent = generateCSV(usageData);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `usage-${dateRange?.start}-to-${dateRange?.end}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 生成CSV文件内容
    const generateCSV = (data: any) => {
        let csvContent = `${t('usage.date')},${t('usage.apiEndpoint')},${t('usage.apiName')},${t('usage.model')},${t('usage.requests')},${t('usage.tokenCount')},${t('usage.imageCount')},${t('usage.cost')}\n`;

        if (data.serviceRequests && data.serviceRequests.length > 0) {
            data.serviceRequests.forEach((req: any) => {
                const date = new Date(req.date).toISOString().split('T')[0];
                const cost = renderQuota(req.cost);
                const row = `${date},${req.apiEndpoint},${req.apiName},${req.modelName},${req.requestCount},${req.tokenCount},${req.imageCount},${cost}\n`;
                csvContent += row;
            });
        }

        return csvContent;
    };


    // 获取各类别的统计数据
    const chatCompletionsData = getCategoryData('/v1/chat/completions');
    const imagesData = getCategoryData('/v1/images/generations');
    const embeddingsData = getCategoryData('/v1/embeddings');
    const audioSpeechData = getCategoryData('/v1/audio/speech');
    const audioTranscriptionData = getCategoryData('/v1/audio/transcriptions');
    const audioTranslationData = getCategoryData('/v1/audio/translations');

    return (
        <div className="p-6 space-y-6 bg-background min-h-screen">
            {/* Header with filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">{t('usage.title')}</h1>
                    <p className="text-muted-foreground">{t('usage.subtitle')}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={selectedApiKey} onValueChange={setSelectedApiKey}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={t('usage.selectApiKey')} />
                            </SelectTrigger>
                            <SelectContent>
                                {tokenOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="flex gap-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="start-date" className="sr-only">Start Date</Label>
                                <Input
                                    type="date"
                                    id="start-date"
                                    value={dateRange?.start || ''}
                                    onChange={(e) => setDateRange(prev => prev ? {...prev, start: e.target.value} : {start: e.target.value, end: ''})}
                                    className="w-[140px]"
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="end-date" className="sr-only">End Date</Label>
                                <Input
                                    type="date"
                                    id="end-date"
                                    value={dateRange?.end || ''}
                                    onChange={(e) => setDateRange(prev => prev ? {...prev, end: e.target.value} : {start: '', end: e.target.value})}
                                    className="w-[140px]"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleExport}
                        disabled={loading}
                        variant="outline"
                        className="gap-2"
                    >
                        <Download className="h-4 w-4" />
                        {t('usage.exportData')}
                    </Button>
                </div>
            </div>

            {/* Overview Statistics */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="col-span-full md:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            {t('usage.spendStatistics')}
                        </CardTitle>
                        <CardDescription>
                            {t('usage.totalSpendDescription')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-[380px] w-full" />
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <div className="text-sm font-medium">
                                        {t('usage.totalSpend')}: {renderQuota(usageData.totalCost || 0)}
                                    </div>
                                </div>
                                <ChartContainer config={getModelChartConfig()} className="h-[350px] w-full">
                                    <BarChart data={getModelUsageChartData()}>
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip
                                            content={<ChartTooltipContent
                                                formatter={(value, name) => [
                                                    renderQuota(Number(value)),
                                                    name
                                                ]}
                                            />}
                                        />
                                        {Object.keys(getModelChartConfig()).length > 1 ? (
                                            Object.keys(getModelChartConfig()).map((key) => (
                                                <Bar
                                                    key={key}
                                                    dataKey={key}
                                                    stackId="cost"
                                                    fill={`var(--color-${key})`}
                                                    radius={[0, 0, 0, 0]}
                                                />
                                            ))
                                        ) : (
                                            <Bar
                                                dataKey="cost"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        )}
                                        {Object.keys(getModelChartConfig()).length > 1 && (
                                            <ChartLegend content={<ChartLegendContent />} />
                                        )}
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                {t('usage.requestsStatistics')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <Skeleton className="h-[140px] w-full" />
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-sm font-medium">
                                        {t('usage.totalRequests')}: {renderNumber(usageData.totalRequestCount || 0)}
                                    </div>
                                    <ChartContainer config={chartConfigs.dailyUsage} className="h-[110px] w-full">
                                        <AreaChart data={chartData.dailyUsage}>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip
                                                content={<ChartTooltipContent
                                                    formatter={(value, name) => [
                                                        renderNumber(Number(value)),
                                                        t('usage.requests')
                                                    ]}
                                                />}
                                            />
                                            <Area
                                                dataKey="requests"
                                                type="monotone"
                                                fill="hsl(var(--primary))"
                                                fillOpacity={0.2}
                                                stroke="hsl(var(--primary))"
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ChartContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                {t('usage.tokensStatistics')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <Skeleton className="h-[140px] w-full" />
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-sm font-medium">
                                        {t('usage.totalTokens')}: {renderNumber(usageData.totalTokenCount || 0)}
                                    </div>
                                    <ChartContainer config={chartConfigs.dailyUsage} className="h-[110px] w-full">
                                        <AreaChart data={chartData.dailyUsage}>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip
                                                content={<ChartTooltipContent
                                                    formatter={(value, name) => [
                                                        renderNumber(Number(value)),
                                                        t('usage.tokenCount')
                                                    ]}
                                                />}
                                            />
                                            <Area
                                                dataKey="tokens"
                                                type="monotone"
                                                fill="hsl(var(--chart-3))"
                                                fillOpacity={0.2}
                                                stroke="hsl(var(--chart-3))"
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ChartContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Separator className="flex-1" />
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Wrench className="h-5 w-5" />
                        {t('usage.apiCapabilities')}
                    </h2>
                    <Separator className="flex-1" />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                {t('usage.chatCompletions')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-[320px] w-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.requests')}</span>
                                            <Badge variant="secondary">{chatCompletionsData.requestCount}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.tokenCount')}</span>
                                            <Badge variant="secondary">{renderNumber(chatCompletionsData.tokenCount)}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.cost')}</span>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                {renderQuota(chatCompletionsData.cost)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <ChartContainer config={chartConfigs.service} className="h-[280px] w-full">
                                        <BarChart data={chartData.serviceCharts['/v1/chat/completions'] || []}>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                            <ChartTooltip
                                                content={<ChartTooltipContent
                                                    formatter={(value, name) => {
                                                        if (name === 'requests') {
                                                            return [renderNumber(Number(value)), t('usage.requests')];
                                                        } else if (name === 'tokens') {
                                                            return [renderNumber(Number(value)), t('usage.tokenCount')];
                                                        }
                                                        return [renderNumber(Number(value)), name];
                                                    }}
                                                />}
                                            />
                                            <Bar
                                                dataKey="requests"
                                                fill="hsl(var(--primary))"
                                                radius={[2, 2, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="tokens"
                                                fill="hsl(var(--chart-2))"
                                                radius={[2, 2, 0, 0]}
                                            />
                                            <ChartLegend content={<ChartLegendContent />} />
                                        </BarChart>
                                    </ChartContainer>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                    <Image className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                {t('usage.images')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-[320px] w-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.requests')}</span>
                                            <Badge variant="secondary">{imagesData.requestCount}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.imageCount')}</span>
                                            <Badge variant="secondary">{imagesData.imageCount}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.cost')}</span>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                {renderQuota(imagesData.cost)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <ChartContainer config={{requests: {label: t('usage.requests'), color: 'hsl(var(--primary))'}}} className="h-[280px] w-full">
                                        <BarChart data={chartData.serviceCharts['/v1/images/generations'] || []}>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                            <ChartTooltip
                                                content={<ChartTooltipContent
                                                    formatter={(value, name) => [
                                                        renderNumber(Number(value)),
                                                        t('usage.requests')
                                                    ]}
                                                />}
                                            />
                                            <Bar
                                                dataKey="requests"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                    <Wrench className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                {t('usage.embeddings')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-[320px] w-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.requests')}</span>
                                            <Badge variant="secondary">{embeddingsData.requestCount}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.inputTokens')}</span>
                                            <Badge variant="secondary">{embeddingsData.tokenCount}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.cost')}</span>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                {renderQuota(embeddingsData.cost)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <ChartContainer config={chartConfigs.service} className="h-[280px] w-full">
                                        <BarChart data={chartData.serviceCharts['/v1/embeddings'] || []}>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                            <ChartTooltip
                                                content={<ChartTooltipContent
                                                    formatter={(value, name) => {
                                                        if (name === 'requests') {
                                                            return [renderNumber(Number(value)), t('usage.requests')];
                                                        } else if (name === 'tokens') {
                                                            return [renderNumber(Number(value)), t('usage.inputTokens')];
                                                        }
                                                        return [renderNumber(Number(value)), name];
                                                    }}
                                                />}
                                            />
                                            <Bar
                                                dataKey="requests"
                                                fill="hsl(var(--primary))"
                                                radius={[2, 2, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="tokens"
                                                fill="hsl(var(--chart-2))"
                                                radius={[2, 2, 0, 0]}
                                            />
                                            <ChartLegend content={<ChartLegendContent />} />
                                        </BarChart>
                                    </ChartContainer>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                                    <Volume2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                                {t('usage.audioSpeech')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-[320px] w-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.requests')}</span>
                                            <Badge variant="secondary">{audioSpeechData.requestCount}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.cost')}</span>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                {renderQuota(audioSpeechData.cost)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <ChartContainer config={{requests: {label: t('usage.requests'), color: 'hsl(var(--primary))'}}} className="h-[280px] w-full">
                                        <BarChart data={chartData.serviceCharts['/v1/audio/speech'] || []}>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                            <ChartTooltip
                                                content={<ChartTooltipContent
                                                    formatter={(value, name) => [
                                                        renderNumber(Number(value)),
                                                        t('usage.requests')
                                                    ]}
                                                />}
                                            />
                                            <Bar
                                                dataKey="requests"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                                    <Headphones className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                {t('usage.audioTranscription')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-[320px] w-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.requests')}</span>
                                            <Badge variant="secondary">{audioTranscriptionData.requestCount}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.cost')}</span>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                {renderQuota(audioTranscriptionData.cost)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <ChartContainer config={{requests: {label: t('usage.requests'), color: 'hsl(var(--primary))'}}} className="h-[280px] w-full">
                                        <BarChart data={chartData.serviceCharts['/v1/audio/transcriptions'] || []}>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                            <ChartTooltip
                                                content={<ChartTooltipContent
                                                    formatter={(value, name) => [
                                                        renderNumber(Number(value)),
                                                        t('usage.requests')
                                                    ]}
                                                />}
                                            />
                                            <Bar
                                                dataKey="requests"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                                    <Languages className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                </div>
                                {t('usage.audioTranslation')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-[320px] w-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.requests')}</span>
                                            <Badge variant="secondary">{audioTranslationData.requestCount}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">{t('usage.cost')}</span>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                {renderQuota(audioTranslationData.cost)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <ChartContainer config={{requests: {label: t('usage.requests'), color: 'hsl(var(--primary))'}}} className="h-[280px] w-full">
                                        <BarChart data={chartData.serviceCharts['/v1/audio/translations'] || []}>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                            <ChartTooltip
                                                content={<ChartTooltipContent
                                                    formatter={(value, name) => [
                                                        renderNumber(Number(value)),
                                                        t('usage.requests')
                                                    ]}
                                                />}
                                            />
                                            <Bar
                                                dataKey="requests"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}