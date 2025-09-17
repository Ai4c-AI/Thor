import { useEffect, useState, useRef } from 'react';
import { MessageSquare, Image, Headphones, Wrench, Download, Volume2, Languages, Calendar, Filter } from 'lucide-react';
import { renderNumber, renderQuota } from '../../utils/render';
import * as echarts from 'echarts';
import { getTokens } from '../../services/TokenService';
import { GetUsage } from '../../services/UsageService';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

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

    // 图表容器引用
    const chatCompletionChartRef = useRef<HTMLDivElement>(null);
    const imagesChartRef = useRef<HTMLDivElement>(null);
    const embeddingsChartRef = useRef<HTMLDivElement>(null);
    const audioSpeechChartRef = useRef<HTMLDivElement>(null);
    const audioTranscriptionChartRef = useRef<HTMLDivElement>(null);
    const audioTranslationChartRef = useRef<HTMLDivElement>(null);
    const dailyUsageChartRef = useRef<HTMLDivElement>(null);
    const requestsChartRef = useRef<HTMLDivElement>(null);
    const tokensChartRef = useRef<HTMLDivElement>(null);

    // 图表实例引用
    const chartInstancesRef = useRef<{ [key: string]: echarts.ECharts }>({});

    // ECharts compatible color palette - matches the design system
    const chartColors = {
        primary: '#0f172a',
        success: '#22c55e',
        warning: '#f59e0b',
        destructive: '#ef4444',
        info: '#3b82f6',
        muted: '#64748b',
        background: '#ffffff',
        foreground: '#0f172a',
        border: '#e2e8f0',
        // Chart specific gradients
        primaryAlpha80: 'rgba(15, 23, 42, 0.8)',
        successAlpha80: 'rgba(34, 197, 94, 0.8)',
        warningAlpha80: 'rgba(245, 158, 11, 0.8)',
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
                setTimeout(() => {
                    updateCharts(response.data);
                    Object.values(chartInstancesRef.current).forEach(chart => {
                        chart?.resize();
                    });
                }, 100);
            }
        } catch (error) {
            console.error('获取使用数据失败', error);
        } finally {
            setLoading(false);
        }
    };

    // 当选择的Token或日期范围变化时，重新获取数据
    useEffect(() => {
        if (dateRange) {
            fetchUsageData();
        }
    }, [selectedApiKey, dateRange]);

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

    // 更新图表数据
    const updateCharts = (data: any) => {
        if (!data || !data.dailyUsage || data.dailyUsage.length === 0) {
            return;
        }

        const dailyUsageData = data.dailyUsage.map((item: any) => ({
            date: new Date(item.date),
            cost: item.cost,
            requestCount: item.requestCount,
            tokenCount: item.tokenCount,
            modelUsage: item.modelUsage || []
        })).sort((a: any, b: any) => a.date.getTime() - b.date.getTime());

        const dailyDates = dailyUsageData.map((item: any) => `${item.date.getMonth() + 1}/${item.date.getDate()}`);
        const dailyCosts = dailyUsageData.map((item: any) => item.cost);
        const dailyRequests = dailyUsageData.map((item: any) => item.requestCount);
        const dailyTokens = dailyUsageData.map((item: any) => item.tokenCount);

        updateCostChart(dailyDates, dailyCosts, dailyUsageData);
        updateRequestsChart(dailyDates, dailyRequests);
        updateTokensChart(dailyDates, dailyTokens);

        // Update service charts
        const dates = dailyDates;
        const services = [
            { ref: chatCompletionChartRef, endpoint: '/v1/chat/completions', title: t('usage.chatCompletion'), hasTokens: true },
            { ref: imagesChartRef, endpoint: '/v1/images/generations', title: t('usage.images'), hasTokens: false },
            { ref: embeddingsChartRef, endpoint: '/v1/embeddings', title: t('usage.embeddings'), hasTokens: true },
            { ref: audioSpeechChartRef, endpoint: '/v1/audio/speech', title: t('usage.audioSpeech'), hasTokens: false },
            { ref: audioTranscriptionChartRef, endpoint: '/v1/audio/transcriptions', title: t('usage.audioTranscription'), hasTokens: false },
            { ref: audioTranslationChartRef, endpoint: '/v1/audio/translations', title: t('usage.audioTranslation'), hasTokens: false }
        ];

        services.forEach(service => {
            const serviceData = prepareChartDataForService(service.endpoint, data);
            updateChart(service.ref, service.title, dates, serviceData, service.hasTokens);
        });
    };

    // 更新消费图表
    const updateCostChart = (dates: string[], costs: number[], dailyUsageData: any[]) => {
        if (!dailyUsageChartRef.current) return;

        if (chartInstancesRef.current['dailyUsage']) {
            chartInstancesRef.current['dailyUsage'].dispose();
        }

        const chart = echarts.init(dailyUsageChartRef.current);
        chartInstancesRef.current['dailyUsage'] = chart;

        const totalCost = costs.reduce((sum, current) => sum + current, 0);
        const hasModelUsage = dailyUsageData.some(item => item.modelUsage && item.modelUsage.length > 0);

        let series: any[] = [];

        if (hasModelUsage) {
            const allModels = new Set<string>();
            dailyUsageData.forEach(item => {
                if (item.modelUsage) {
                    item.modelUsage.forEach((model: any) => {
                        allModels.add(model.modelName);
                    });
                }
            });

            const modelColors = [chartColors.primary, chartColors.success, chartColors.warning, chartColors.destructive, chartColors.info];

            Array.from(allModels).forEach((modelName, index) => {
                const modelData = dailyUsageData.map(item => {
                    const modelUsage = item.modelUsage?.find((m: any) => m.modelName === modelName);
                    return modelUsage ? modelUsage.cost : 0;
                });

                series.push({
                    name: modelName,
                    type: 'bar',
                    stack: 'cost',
                    barWidth: '60%',
                    itemStyle: {
                        color: modelColors[index % modelColors.length]
                    },
                    data: modelData
                });
            });
        } else {
            series = [{
                name: t('usage.cost'),
                type: 'bar',
                barWidth: '60%',
                itemStyle: {
                    color: chartColors.primary
                },
                data: costs
            }];
        }

        const option = {
            backgroundColor: 'transparent',
            title: {
                text: `${t('usage.totalSpend')}: ${renderQuota(totalCost)}`,
                left: 10,
                top: 10,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: chartColors.primary
                }
            },
            grid: {
                top: hasModelUsage ? 80 : 60,
                right: 20,
                bottom: 50,
                left: 0,
                containLabel: false
            },
            legend: hasModelUsage ? {
                top: 40,
                left: 10,
                orient: 'horizontal',
                itemGap: 10,
                textStyle: {
                    fontSize: 12,
                    color: chartColors.foreground
                }
            } : undefined,
            tooltip: {
                trigger: 'axis',
                confine: true,
                backgroundColor: chartColors.background,
                borderColor: chartColors.border,
                textStyle: {
                    color: chartColors.foreground
                },
                formatter: (params: any) => {
                    const dateStr = params[0].axisValue;
                    let result = `<div style="font-weight:bold;margin-bottom:5px">${t('usage.date')}: ${dateStr}</div>`;

                    params.forEach((param: any) => {
                        if (param.value > 0) {
                            result += `<div style="display:flex;justify-content:space-between;margin:3px 0">
                  <span style="margin-right:15px">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${param.color};margin-right:5px"></span>
                    ${param.seriesName}:
                  </span>
                  <span style="font-weight:bold">${renderQuota(param.value)}</span>
                </div>`;
                        }
                    });

                    return result;
                }
            },
            xAxis: {
                type: 'category',
                data: dates,
                boundaryGap: true,
                axisLine: {
                    lineStyle: { color: chartColors.border }
                },
                axisTick: { alignWithLabel: true },
                axisLabel: {
                    interval: 0,
                    rotate: dates.length > 5 ? 30 : 0,
                    fontSize: 11,
                    margin: 10,
                    color: chartColors.muted
                }
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false }
            },
            series: series
        };

        chart.setOption(option);
    };

    // 更新请求数图表
    const updateRequestsChart = (dates: string[], requests: number[]) => {
        if (!requestsChartRef.current) return;

        if (chartInstancesRef.current['requests']) {
            chartInstancesRef.current['requests'].dispose();
        }

        const chart = echarts.init(requestsChartRef.current);
        chartInstancesRef.current['requests'] = chart;

        const totalRequests = requests.reduce((sum, current) => sum + current, 0);

        const option = {
            backgroundColor: 'transparent',
            title: {
                text: `${t('usage.totalRequests')}: ${renderNumber(totalRequests)}`,
                left: 10,
                top: 10,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: chartColors.success
                }
            },
            grid: {
                top: 60,
                right: 20,
                bottom: 50,
                left: 0,
                containLabel: false
            },
            tooltip: {
                trigger: 'axis',
                confine: true,
                backgroundColor: chartColors.background,
                borderColor: chartColors.border,
                textStyle: {
                    color: chartColors.foreground
                }
            },
            xAxis: {
                type: 'category',
                data: dates,
                boundaryGap: true,
                axisLine: {
                    lineStyle: { color: chartColors.border }
                },
                axisTick: { alignWithLabel: true },
                axisLabel: {
                    interval: 0,
                    rotate: dates.length > 5 ? 30 : 0,
                    fontSize: 11,
                    margin: 10,
                    color: chartColors.muted
                }
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false }
            },
            series: [{
                name: t('usage.requests'),
                type: 'bar',
                barWidth: '60%',
                itemStyle: {
                    color: chartColors.success
                },
                data: requests
            }]
        };

        chart.setOption(option);
    };

    // 更新令牌数图表
    const updateTokensChart = (dates: string[], tokens: number[]) => {
        if (!tokensChartRef.current) return;

        if (chartInstancesRef.current['tokens']) {
            chartInstancesRef.current['tokens'].dispose();
        }

        const chart = echarts.init(tokensChartRef.current);
        chartInstancesRef.current['tokens'] = chart;

        const totalTokens = tokens.reduce((sum, current) => sum + current, 0);

        const option = {
            backgroundColor: 'transparent',
            title: {
                text: `${t('usage.totalTokens')}: ${renderNumber(totalTokens)}`,
                left: 10,
                top: 10,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: chartColors.warning
                }
            },
            grid: {
                top: 60,
                right: 20,
                bottom: 50,
                left: 0,
                containLabel: false
            },
            tooltip: {
                trigger: 'axis',
                confine: true,
                backgroundColor: chartColors.background,
                borderColor: chartColors.border,
                textStyle: {
                    color: chartColors.foreground
                }
            },
            xAxis: {
                type: 'category',
                data: dates,
                boundaryGap: true,
                axisLine: {
                    lineStyle: { color: chartColors.border }
                },
                axisTick: { alignWithLabel: true },
                axisLabel: {
                    interval: 0,
                    rotate: dates.length > 5 ? 30 : 0,
                    fontSize: 11,
                    margin: 10,
                    color: chartColors.muted
                }
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false }
            },
            series: [{
                name: t('usage.tokenCount'),
                type: 'bar',
                barWidth: '60%',
                itemStyle: {
                    color: chartColors.warning
                },
                data: tokens
            }]
        };

        chart.setOption(option);
    };

    // 准备特定服务的图表数据
    const prepareChartDataForService = (apiEndpoint: string, data: any) => {
        const resultData = {
            requestCount: new Array(data.dailyUsage.length).fill(0),
            tokenCount: new Array(data.dailyUsage.length).fill(0)
        };

        const sortedDailyUsage = [...data.dailyUsage].sort((a: any, b: any) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        sortedDailyUsage.forEach((daily, index) => {
            const requests = data.serviceRequests.filter(
                (req: any) => {
                    if (apiEndpoint === '/v1/chat/completions') {
                        return (req.apiEndpoint.startsWith('/v1/chat/completions') ||
                            req.apiEndpoint.startsWith('/v1/completions')) &&
                            req.date === daily.date;
                    }
                    return req.apiEndpoint.startsWith(apiEndpoint) && req.date === daily.date;
                }
            );

            const totalRequests = requests.reduce((sum: number, req: any) => sum + (req.requestCount || 0), 0);
            const totalTokens = requests.reduce((sum: number, req: any) => sum + (req.tokenCount || 0), 0);

            resultData.requestCount[index] = totalRequests;
            resultData.tokenCount[index] = totalTokens;
        });

        return resultData;
    };

    // 更新单个图表
    const updateChart = (chartRef: any, title: string, dates: any, seriesData: any, hasTokens: boolean) => {
        if (!chartRef.current) return;

        if (chartInstancesRef.current[title]) {
            chartInstancesRef.current[title].dispose();
        }

        const chart = echarts.init(chartRef.current);
        chartInstancesRef.current[title] = chart;

        const option = {
            backgroundColor: 'transparent',
            grid: {
                top: 30,
                right: 20,
                bottom: 50,
                left: 50,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                confine: true,
                backgroundColor: chartColors.background,
                borderColor: chartColors.border,
                textStyle: {
                    color: chartColors.foreground
                }
            },
            legend: hasTokens ? {
                data: [t('usage.requests'), t('usage.tokenCount')],
                right: 0,
                top: 0
            } : {
                data: [t('usage.requests')],
                right: 0,
                top: 0
            },
            xAxis: {
                type: 'category',
                data: dates,
                boundaryGap: true,
                axisLine: {
                    lineStyle: { color: chartColors.border }
                },
                axisTick: { alignWithLabel: true },
                axisLabel: {
                    interval: 0,
                    rotate: dates.length > 5 ? 30 : 0,
                    fontSize: 11,
                    margin: 10,
                    color: chartColors.muted
                }
            },
            yAxis: {
                type: 'value',
                name: hasTokens ? t('usage.quantity') : t('usage.requests'),
                axisLine: {
                    show: true,
                    lineStyle: { color: chartColors.primary }
                },
                axisTick: { show: true },
                axisLabel: {
                    color: chartColors.muted
                },
                splitLine: {
                    lineStyle: {
                        color: chartColors.border,
                        type: 'dashed'
                    }
                }
            },
            series: hasTokens ? [
                {
                    name: t('usage.requests'),
                    type: 'bar',
                    stack: '总量',
                    barWidth: '40%',
                    itemStyle: {
                        color: chartColors.primary
                    },
                    data: seriesData.requestCount
                },
                {
                    name: t('usage.tokenCount'),
                    type: 'bar',
                    stack: '总量',
                    barWidth: '40%',
                    itemStyle: {
                        color: chartColors.success
                    },
                    data: seriesData.tokenCount
                }
            ] : [
                {
                    name: t('usage.requests'),
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle: {
                        color: chartColors.primary
                    },
                    data: seriesData.requestCount
                }
            ]
        };

        chart.setOption(option);
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

    // 初始化并监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            Object.values(chartInstancesRef.current).forEach(chart => {
                chart?.resize();
            });
        };

        window.addEventListener('resize', handleResize);
        setTimeout(handleResize, 300);

        return () => {
            window.removeEventListener('resize', handleResize);
            Object.values(chartInstancesRef.current).forEach(chart => {
                chart?.dispose();
            });
            chartInstancesRef.current = {};
        };
    }, []);

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
            <div className="grid gap-6 md:grid-cols-2">
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
                            <div ref={dailyUsageChartRef} className="h-[380px] w-full" />
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
                                <div ref={requestsChartRef} className="h-[140px] w-full" />
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
                                <div ref={tokensChartRef} className="h-[140px] w-full" />
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
                                    <div ref={chatCompletionChartRef} className="h-[320px] w-full" />
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
                                    <div ref={imagesChartRef} className="h-[320px] w-full" />
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
                                    <div ref={embeddingsChartRef} className="h-[320px] w-full" />
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
                                    <div ref={audioSpeechChartRef} className="h-[320px] w-full" />
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
                                    <div ref={audioTranscriptionChartRef} className="h-[320px] w-full" />
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
                                    <div ref={audioTranslationChartRef} className="h-[320px] w-full" />
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}