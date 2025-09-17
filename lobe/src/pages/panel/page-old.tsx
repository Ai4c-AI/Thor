import { renderNumber, renderQuota } from '../../utils/render';
import { useEffect, useState } from 'react';
import { GetStatistics } from '../../services/StatisticsService';
import { getIconByName } from '../../utils/iconutils';
import { GetUserRequest } from '../../services/TrackerService';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
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
  CreditCard
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
  ResponsiveContainer,
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

  // Prepare chart data
  const quotaData = React.useMemo(() => {
    if (!data) return [];
    return [
      {
        name: 'consumed',
        value: data.currentConsumedCredit,
        fill: quotaChartConfig.consumed.color
      },
      {
        name: 'remaining',
        value: data.currentResidualCredit,
        fill: quotaChartConfig.remaining.color
      },
    ];
  }, [data]);

  // ECharts compatible color palette - matches the design system
  const chartColors = {
    primary: '#0f172a',           // hsl(222.2 84% 4.9%)
    destructive: '#ef4444',       // hsl(0 84.2% 60.2%)
    popover: '#ffffff',           // hsl(0 0% 100%)
    popoverForeground: '#0f172a', // hsl(222.2 84% 4.9%)
    border: '#e2e8f0',           // hsl(214.3 31.8% 91.4%)
    mutedForeground: '#64748b',   // hsl(215.4 16.3% 46.9%)
    foreground: '#0f172a',        // hsl(222.2 84% 4.9%)
    background: '#ffffff',        // hsl(0 0% 100%)
    // Additional chart-specific colors
    primaryAlpha30: 'rgba(15, 23, 42, 0.3)',
    primaryAlpha20: 'rgba(15, 23, 42, 0.2)',
    primaryAlpha80: 'rgba(15, 23, 42, 0.8)',
    primaryAlpha90: 'rgba(15, 23, 42, 0.9)',
    primaryAlpha5: 'rgba(15, 23, 42, 0.05)'
  };

  const colors = [chartColors.primary, chartColors.destructive];

  function loadUserRequest() {
    GetUserRequest().then((res) => {
      setUserRequest(res.data);
    });
  }

  function loadStatistics() {
    const consumeChart: any[] = [];
    const requestChart: any[] = [];
    const tokenChart: any[] = [];
    const modelsChart: any[] = [];
    const modelsName: any[] = [];

    setLoading(true);

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
          const token = tokens.find((x: any) => x.dateTime === item);
          consumeChart.push({
            date: item,
            consumption: consume?.value,
          });
          requestChart.push({
            date: item,
            requests: request?.value,
          });
          tokenChart.push({
            date: item,
            tokens: token?.value
          });

          const model = {} as any;
          models.forEach((item: any) => {
            model[item.name] = item.data[i];
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

        res.data?.modelRanking?.forEach((item: any) => {
          item.icon = getIconByName(item.icon).icon;
        });

        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadStatistics();
    loadUserRequest();
  }, []);

  // Value formatters
  const formatQuota = (value: number) => renderQuota(value, 6);
  const formatNumber = (value: number) => renderNumber(value);
  const formatDate = (value: string) => `${value}${t('panel.chartLabels.day')}`;

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


  // 初始化和渲染 echarts 图表
  useEffect(() => {
    // 仅在数据加载完成且组件挂载时渲染图表
    if (loading || !data) return;

    // 渲染环形图 (Donut Chart)
    if (donutChartRef.current) {
      try {
        const donutChart = echarts.init(donutChartRef.current);
      donutChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            return `${params.name}: ${renderQuota(params.value, 2)} (${params.percent}%)`;
          },
          backgroundColor: chartColors.popover,
          borderColor: chartColors.border,
          textStyle: {
            color: `hsl(${getCSSCustomProperty('--popover-foreground')})`
          }
        },
        legend: {
          bottom: '0%',
          left: 'center',
          textStyle: {
            color: chartColors.foreground
          }
        },
        series: [
          {
            name: t('panel.statistics.quotaDistribution'),
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: data.currentConsumedCredit, name: t('panel.statistics.consumedQuota'), itemStyle: { color: colors[1] } },
              { value: data.currentResidualCredit, name: t('panel.statistics.remainingQuota'), itemStyle: { color: colors[0] } },
            ],
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
              return Math.random() * 200;
            }
          }
        ]
      });

      // 响应式处理
      const resizeDonut = () => {
        donutChart.resize();
      };

      window.addEventListener('resize', resizeDonut);

        return () => {
          window.removeEventListener('resize', resizeDonut);
          donutChart.dispose();
        };
      } catch (error) {
        console.error('Error rendering donut chart:', error);
      }
    }
  }, [loading, data, colors]);

  // 渲染折线图
  const renderLineChart = (
    ref: React.RefObject<HTMLDivElement>,
    data: any[],
    category: string,
    valueFormatter: (value: any) => string,
    translatedLabel?: string
  ) => {
    if (!ref.current || data.length === 0) return;

    try {
      const chart = echarts.init(ref.current);

    const xAxisData = data.map(item => item.date);
    const seriesData = data.map(item => item[category]);
    const displayLabel = translatedLabel || category;

    chart.setOption({
      tooltip: {
          trigger: 'axis',
          confine: true,
          backgroundColor: chartColors.popover,
          borderColor: chartColors.border,
          textStyle: {
              color: chartColors.popoverForeground
          },
          formatter: (params: any) => {
              const dateStr = params[0].value;
              let result = `<div style="font-weight:bold;margin-bottom:4px">${dateStr}${t('panel.chartLabels.day')}</div>`;

              // 将params按value排序
              params.sort((a: any, b: any) => b.value - a.value);

              params.forEach((param: any) => {
                if (param.value > 0) {
                  result += `<div style="display:flex;justify-content:space-between;margin:3px 0">
                    <span>${param.marker}${param.seriesName}</span>
                    <span style="margin-left:15px;font-weight:bold">${valueFormatter(param.value)}</span>
                  </div>`;
                }
              });

              return result;
          },
          axisPointer: {
              type: 'shadow',
              lineStyle: {
                  color: 'transparent'
              },
              crossStyle: {
                  color: 'transparent'
              }
          }
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: labelFormatter,
          color: chartColors.mutedForeground,
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: chartColors.border
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: valueFormatter,
          color: chartColors.mutedForeground,
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: chartColors.border,
            type: 'dashed',
            opacity: 0.5
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '8%',
        containLabel: true
      },
      series: [
        {
          name: displayLabel,
          type: 'line',
          data: seriesData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: chartColors.primaryAlpha30
            },
            scale: true
          },
          showSymbol: data.length <= 10,
          lineStyle: {
            width: 3,
            color: chartColors.primary,
            shadowColor: chartColors.primaryAlpha20,
            shadowBlur: 10,
            cap: 'round'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: chartColors.primaryAlpha30
              }, {
                offset: 1,
                color: chartColors.primaryAlpha5
              }]
            },
            origin: 'start'
          },
          itemStyle: {
            color: chartColors.primary,
            borderWidth: 2,
            borderColor: chartColors.background
          }
        }
      ],
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut'
    });

      return chart;
    } catch (error) {
      console.error('Error rendering line chart:', error);
      return null;
    }
  };


  // 渲染模型折线图
  const renderModelsLineChart = () => {
    if (!modelsChartRef.current || !modelsChart.length) return;

    try {
      const chart = echarts.init(modelsChartRef.current);

    // 提取x轴数据
    const xAxisData = modelsChart.map(item => item.date);

    // 准备各个模型的数据，只保留大于0的数值
    const series = modelsName.map(name => ({
      name: name,
      type: 'bar',
      data: modelsChart.map(item => item[name] > 0 ? item[name] : '-'),
      stack: 'total',
      emphasis: {
        focus: 'series',
        itemStyle: {
          shadowBlur: 15,
          shadowOffsetX: 0,
          shadowOffsetY: 5,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      },
      barMaxWidth: '50%',
      // 只显示非0数据
      label: {
        show: false
      }
    }));

    chart.setOption({
      tooltip: {
          trigger: 'axis',
          confine: true,
          backgroundColor: chartColors.popover,
          borderColor: chartColors.border,
          textStyle: {
              color: chartColors.popoverForeground
          },
          formatter: (params: any) => {
              const dateStr = params[0].axisValue;
              let result = `<div style="font-weight:bold;margin-bottom:4px">${dateStr}${t('panel.chartLabels.day')}</div>`;
              params.forEach((param: any) => {
                if (param.value > 0) {
                  result += `<div style="display:flex;justify-content:space-between;margin:3px 0">
                    <span>${param.marker}${param.seriesName}</span>
                    <span style="margin-left:15px;font-weight:bold">${modelsValueFormatter(param.value)}</span>
                  </div>`;
                }
              });

              return result;
          },
          axisPointer: {
              type: 'shadow',
              lineStyle: {
                  color: 'transparent'
              },
              crossStyle: {
                  color: 'transparent'
              }
          }
      },
      legend: {
        data: modelsName,
        type: 'scroll',
        bottom: 0,
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          fontSize: 12
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: labelFormatter,
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: chartColors.border
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: any) => modelsValueFormatter(value),
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: chartColors.border
          }
        }
      },
      series: series
    });

      return chart;
    } catch (error) {
      console.error('Error rendering models chart:', error);
      return null;
    }
  };

  // 渲染漏斗图 - 替换为柱状图
  const renderBarChart = (
    ref: React.RefObject<HTMLDivElement>,
    data: any[] | null,
    valueFormatter?: (value: any) => string
  ) => {
    if (!ref.current || !data || data.length === 0) return;

    try {
      const chart = echarts.init(ref.current);

    // 确保数据字段名正确，并处理可能的对象格式
    const categories = data.map(item => typeof item.name === 'object' ? JSON.stringify(item.name) : item.name);
    const values = data.map(item => item.value);

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params: any) {
          const value = params[0].value;
          if (valueFormatter) {
            return `${params[0].name}: ${valueFormatter(value)}`;
          }
          return `${params[0].name}: ${value}`;
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          interval: 0,
          rotate: data.length > 5 ? 30 : 0,
          fontSize: 12,
          color: chartColors.mutedForeground,
          formatter: function (value: any) {
            // 如果是对象字符串，尝试提取更有意义的值
            if (value.startsWith('{') && value.endsWith('}')) {
              try {
                return t('panel.chartLabels.userCount');
              } catch (e) {
                return value;
              }
            }
            return value;
          }
        },
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: chartColors.border
          }
        }
      },
      yAxis: {
        type: 'value',
        name: t('panel.chartLabels.userCount'),
        nameTextStyle: {
          color: chartColors.mutedForeground,
          fontSize: 12
        },
        minInterval: 1, // 强制Y轴以整数显示
        axisLabel: {
          formatter: (value: any) => value, // 显示整数
          color: chartColors.mutedForeground,
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: chartColors.border,
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: t('panel.chartLabels.userCount'),
          type: 'bar',
          data: values,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: chartColors.primary
              }, {
                offset: 1,
                color: chartColors.primaryAlpha80
              }]
            },
            borderRadius: [4, 4, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: chartColors.primaryAlpha90
                }, {
                  offset: 1,
                  color: chartColors.primary
                }]
              }
            }
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            fontSize: 12,
            color: chartColors.mutedForeground
          },
          barWidth: '60%',
          animationDelay: (idx: number) => idx * 100
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5
    });

      return chart;
    } catch (error) {
      console.error('Error rendering bar chart:', error);
      return null;
    }
  };

  // 渲染饼图
  const renderPieChart = (
    ref: React.RefObject<HTMLDivElement>,
    data: any[] | null,
    valueFormatter?: (value: any) => string
  ) => {
    if (!ref.current || !data || data.length === 0) return;

    try {
      const chart = echarts.init(ref.current);

    const seriesData = data.map(item => ({
      value: item.value,
      name: item.name
    }));

    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          if (valueFormatter) {
            return `${params.name}: ${valueFormatter(params.value)} (${params.percent}%)`;
          }
          return `${params.name}: ${params.value} (${params.percent}%)`;
        }
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        bottom: 10,
        data: data.map(item => item.name)
      },
      series: [
        {
          name: t('panel.chartLabels.value'),
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 6,
            borderColor: chartColors.background,
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {d}%'
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold',
              fontSize: 16
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          data: seriesData
        }
      ],
      animationType: 'scale',
      animationEasing: 'elasticOut'
    });

      return chart;
    } catch (error) {
      console.error('Error rendering pie chart:', error);
      return null;
    }
  };

  // 当数据变化或组件挂载时重新渲染所有图表
  useEffect(() => {
    if (loading || !data) return;

    try {
      // 消费折线图
      const consumeLineChart = renderLineChart(consumeChartRef, consumeChart, 'consumption', cunsumeValueFormatter, t('panel.chartLabels.consumption'));

      // 请求折线图
      const requestLineChart = renderLineChart(requestChartRef, requestChart, 'requests', requestValueFormatter, t('panel.chartLabels.requests'));

      // Token折线图
      const tokenLineChart = renderLineChart(tokenChartRef, tokenChart, 'tokens', tokenValueFormatter, t('panel.chartLabels.tokens'));
      // 模型使用情况折线图
      const modelsChart = renderModelsLineChart();

      // 新用户柱状图
      const userNewChart = renderBarChart(userNewDataChartRef, userNewData);

      // 充值数据饼图
      const rechargeChart = renderPieChart(rechargeDataChartRef, rechargeData, modelsValueFormatter);

    // 为了响应窗口大小变化，添加resize事件监听
    const resizeHandler = () => {
      consumeLineChart?.resize();
      requestLineChart?.resize();
      tokenLineChart?.resize();
      modelsChart?.resize();
      userNewChart?.resize();
      rechargeChart?.resize();
    };

    window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);

        // 释放图表实例
        consumeLineChart?.dispose();
        requestLineChart?.dispose();
        tokenLineChart?.dispose();
        modelsChart?.dispose();
        userNewChart?.dispose();
        rechargeChart?.dispose();
      };
    } catch (error) {
      console.error('Error rendering charts:', error);
    }
  }, [loading, data, consumeChart, requestChart, tokenChart, modelsChart, userNewData, rechargeData, userRequest]);

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
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Current Balance Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('panel.statistics.currentResidualCredit')}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {renderQuota(data?.currentResidualCredit, 2)}
            </div>
            <div className="mt-4">
              <div ref={donutChartRef} style={{ height: 180, width: '100%' }} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Consumption */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('panel.statistics.recentConsumption')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {renderQuota(data?.consumes?.reduce((a: number, b: any) => a + b.value, 0), 2)}
            </div>
            <div className="mt-4">
              <div ref={consumeChartRef} style={{ height: 120 }} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('panel.statistics.recentRequests')}
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {renderNumber(data?.requests?.reduce((a: number, b: any) => a + b.value, 0))}
            </div>
            <div className="mt-4">
              <div ref={requestChartRef} style={{ height: 120 }} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Tokens */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('panel.statistics.recentTokens')}
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {renderNumber(data?.tokens?.reduce((a: number, b: any) => a + b.value, 0))}
            </div>
            <div className="mt-4">
              <div ref={tokenChartRef} style={{ height: 120 }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            {t('panel.charts.modelDistribution')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={modelsChartRef} style={{ height: 350 }} />
        </CardContent>
      </Card>

      {/* Additional Charts Row */}
      <div className={cn(
        "grid gap-6",
        userNewData && rechargeData ? "md:grid-cols-2" : "md:grid-cols-1"
      )}>
        {/* New User Registration */}
        {userNewData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('panel.charts.newUserRegistration')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={userNewDataChartRef} style={{ height: 350 }} />
            </CardContent>
          </Card>
        )}

        {/* Recent Recharge Data */}
        {rechargeData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t('panel.charts.recentRechargeData')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={rechargeDataChartRef} style={{ height: 350 }} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
