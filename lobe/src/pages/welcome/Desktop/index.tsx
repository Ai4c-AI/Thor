import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { 
  Github,
  Rocket,
  Server,
  Zap,
  Users,
  DollarSign,
  Grid3X3,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Flame,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { modelHot } from '../../../services/LoggerService';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';
import { DESIGN_TOKENS, COMPONENT_STYLES, LAYOUT_PRESETS } from '../../../styles/theme-design-system';


// 动画变量
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// 简化的动画组件
const MotionDiv = motion.div;

// 简洁的背景装饰组件 - 使用统一的灰色调
const BackgroundDecoration = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 主背景渐变球体 - 统一灰色系 */}
      <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-radial from-gray-400/10 via-gray-300/5 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-gradient-radial from-gray-500/8 via-gray-400/4 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-radial from-gray-600/6 via-gray-400/3 to-transparent rounded-full blur-3xl animate-pulse delay-[2000ms]" />
      
      {/* 中心装饰 - 缓慢旋转 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-gray-400/3 via-gray-300/2 to-gray-400/3 rounded-full blur-3xl animate-spin opacity-30" style={{ animationDuration: '30s' }} />
      
      {/* 精致的几何装饰点 */}
      <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 bg-gray-400/30 rounded-full animate-bounce delay-500" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-gray-500/30 rounded-full animate-bounce delay-700" />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-gray-600/40 rounded-full animate-bounce delay-300" />
      <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-gray-400/30 rounded-full animate-bounce delay-1000" />
      
      {/* 边缘光效 */}
      <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-gray-400/15 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-24 bg-gradient-to-t from-gray-400/15 to-transparent" />
    </div>
  );
});

// 优化的CountUpStatistic组件 - 使用灰色主题
const CountUpStatistic = memo(({ title, value, icon, variant = 'default' }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  variant?: 'default' | 'light' | 'dark' | 'medium';
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variantClasses = {
    default: 'text-gray-600 bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700',
    light: 'text-gray-500 bg-gray-100/50 dark:bg-gray-700/40 border-gray-300 dark:border-gray-600',
    dark: 'text-gray-700 bg-gray-200/50 dark:bg-gray-600/40 border-gray-400 dark:border-gray-500',
    medium: 'text-gray-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
  };

  useEffect(() => {
    if (inView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
      let startTime: number;
      const duration = 1200;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeProgress * numericValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  const suffixText = value.replace(/[0-9]/g, '');

  return (
    <MotionDiv
      ref={ref}
      {...scaleIn}
      animate={inView ? scaleIn.animate : scaleIn.initial}
      className={`p-6 rounded-2xl border-2 ${variantClasses[variant]} backdrop-blur-sm hover:scale-105 transition-all duration-300 h-full`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${variantClasses[variant]} flex items-center justify-center text-xl`}>
          {icon}
        </div>
        <Trophy className={`w-6 h-6 ${variantClasses[variant].split(' ')[0]} opacity-30`} />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
        <p className={`text-3xl font-bold ${variantClasses[variant].split(' ')[0]}`}>
          {inView ? `${count}${suffixText}` : '0'}
        </p>
      </div>
    </MotionDiv>
  );
});

const ThorWebsite = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 图表引用
  const donutChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);

  // 滚动检测
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [modelHotRef, modelHotInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // 模型热度数据
  const [modelHotData, setModelHotData] = useState<{ model: string, percentage: number }[]>([]);
  const [modelHotLoading, setModelHotLoading] = useState(true);

  // 获取模型热度数据
  useEffect(() => {
    const fetchModelHotData = async () => {
      try {
        setModelHotLoading(true);
        const response = await modelHot();
        if (response?.data) {
          setModelHotData(response.data);
        }
      } catch (error) {
        console.error('获取模型热度数据失败:', error);
      } finally {
        setModelHotLoading(false);
      }
    };

    fetchModelHotData();
  }, []);

  // 渲染饼图
  const renderDonutChart = useCallback(() => {
    if (!donutChartRef.current || modelHotLoading || !modelHotData.length) return null;

    const chart = echarts.init(donutChartRef.current);
    const colors = ['#1890ff', '#13c2c2', '#722ed1', '#eb2f96', '#faad14'];

    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      legend: {
        bottom: 10,
        left: 'center',
        textStyle: { color: '#9ca3af' }
      },
      series: [{
        name: '模型分布',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 8,
          borderColor: '#374151',
          borderWidth: 2
        },
        label: { show: false },
        data: modelHotData.map((item, index) => ({
          value: item.percentage,
          name: item.model,
          itemStyle: { color: colors[index % colors.length] }
        }))
      }]
    });

    return chart;
  }, [modelHotLoading, modelHotData]);

  // 渲染条形图
  const renderBarChart = useCallback(() => {
    if (!barChartRef.current || modelHotLoading || !modelHotData.length) return null;

    const chart = echarts.init(barChartRef.current);
    const topModels = [...modelHotData]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 8);

    const colors = ['#1890ff', '#13c2c2', '#722ed1', '#eb2f96', '#faad14', '#52c41a', '#fa541c', '#2f54eb'];

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        formatter: (params: Array<{name: string; value: number}>) => `${params[0].name}: ${params[0].value.toFixed(1)}%`
      },
      grid: {
        left: '5%',
        right: '10%',
        bottom: '5%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: {
          lineStyle: { color: 'rgba(255,255,255,0.1)' }
        }
      },
      yAxis: {
        type: 'category',
        data: topModels.map(item => item.model),
        axisLabel: { color: '#9ca3af' }
      },
      series: [{
        type: 'bar',
        barWidth: '60%',
        data: topModels.map((item, index) => ({
          value: item.percentage,
          itemStyle: { color: colors[index % colors.length] }
        })),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: '#9ca3af'
        }
      }]
    });

    return chart;
  }, [modelHotLoading, modelHotData]);

  // 图表渲染Effect
  useEffect(() => {
    if (!modelHotLoading && modelHotData.length > 0 && modelHotInView) {
      const donutChart = renderDonutChart();
      const barChart = renderBarChart();
      
      const handleResize = () => {
        donutChart?.resize();
        barChart?.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        donutChart?.dispose();
        barChart?.dispose();
      };
    }
  }, [modelHotLoading, modelHotData, modelHotInView, renderBarChart, renderDonutChart]);

  return (
    <main className={COMPONENT_STYLES.pageContainer}>
      {/* Hero Section */}
      <section ref={heroRef} className={LAYOUT_PRESETS.heroSection}>
        <BackgroundDecoration />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            <div className="text-center lg:text-left">
              <MotionDiv
                {...fadeInUp}
                animate={heroInView ? fadeInUp.animate : fadeInUp.initial}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${COMPONENT_STYLES.text.hero} leading-tight`}>
                    {t('welcome.title')}
                  </h1>
                  
                  <p className={`text-lg sm:text-xl ${COMPONENT_STYLES.text.body} leading-relaxed max-w-2xl`}>
                    {t('welcome.description')}{' '}
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 font-semibold text-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                      <Sparkles className="mr-1.5 w-4 h-4" />
                      200+
                    </span>
                  </p>
                  
                  <blockquote className={`text-base ${COMPONENT_STYLES.text.muted} italic border-l-4 border-gray-500/60 pl-6 py-3 bg-gradient-to-r from-gray-50/60 to-transparent dark:from-gray-900/20 dark:to-transparent rounded-r-xl ${DESIGN_TOKENS.transitions.smooth}`}>
                    <span className="text-gray-600 dark:text-gray-400">—</span>{t('welcome.tagline')}
                  </blockquote>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => navigate('/panel')}
                    className={`h-14 px-8 text-lg font-semibold ${COMPONENT_STYLES.button.primary} rounded-xl hover:scale-105 ${DESIGN_TOKENS.transitions.smooth} border-0 flex items-center justify-center gap-2`}
                  >
                    <Rocket className="w-5 h-5" />
                    {t('welcome.startNow')}
                  </button>
                  
                  <button
                    onClick={() => window.open('https://github.com/AIDotNet/Thor', '_blank')}
                    className={`h-14 px-8 text-lg font-medium ${COMPONENT_STYLES.button.secondary} rounded-xl hover:scale-105 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2`}
                  >
                    <Github className="w-5 h-5" />
                    <Star className="w-4 h-4" />
                    {t('welcome.giveStar')}
                  </button>
                </div>
              </MotionDiv>
            </div>

            <div>
              <MotionDiv
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className={`${COMPONENT_STYLES.card.elevated} p-8 ${DESIGN_TOKENS.shadows.xl} ${DESIGN_TOKENS.borders.subtle}`}>
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {t('welcome.community.title')}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('welcome.community.description')}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {[
                        { icon: <DollarSign className="w-6 h-6" />, title: t('welcome.community.payPerUse.title'), desc: t('welcome.community.payPerUse.description'), variant: 'default' },
                        { icon: <Grid3X3 className="w-6 h-6" />, title: t('welcome.community.appSupport.title'), desc: t('welcome.community.appSupport.description'), variant: 'light' },
                        { icon: <CheckCircle className="w-6 h-6" />, title: t('welcome.community.transparency.title'), desc: t('welcome.community.transparency.description'), variant: 'medium' }
                      ].map((item, index) => (
                        <MotionDiv
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="flex items-start p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 hover:scale-105 transition-transform duration-300"
                        >
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xl">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                          </div>
                        </MotionDiv>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className={LAYOUT_PRESETS.statsSection}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            {...fadeInUp}
            animate={statsInView ? fadeInUp.animate : fadeInUp.initial}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${COMPONENT_STYLES.text.hero} mb-6`}>
              平台数据统计
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Thor 作为企业级 AI 模型管理网关，为用户提供稳定可靠的服务
            </p>
          </MotionDiv>

          <MotionDiv
            {...staggerContainer}
            animate={statsInView ? staggerContainer.animate : {}}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <CountUpStatistic
                title={t('welcome.statistics.models')}
                value="200+"
                icon={<Server className="w-6 h-6" />}
                variant="default"
              />
              <CountUpStatistic
                title={t('welcome.statistics.users')}
                value="8000+"
                icon={<Users className="w-6 h-6" />}
                variant="light"
              />
              <CountUpStatistic
                title={t('welcome.statistics.requests')}
                value="1M+"
                icon={<Zap className="w-6 h-6" />}
                variant="medium"
              />
              <CountUpStatistic
                title={t('welcome.statistics.contributors')}
                value="10+"
                icon={<Flame className="w-6 h-6" />}
                variant="dark"
              />
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className={LAYOUT_PRESETS.featuresSection}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            {...fadeInUp}
            animate={featuresInView ? fadeInUp.animate : fadeInUp.initial}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${COMPONENT_STYLES.text.accent} mb-6`}>
              核心特性
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              强大的功能集合，为您的 AI 应用提供全方位支持
            </p>
          </MotionDiv>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Server className="w-8 h-8" />, 
                title: '多模型支持', 
                desc: '集成200+主流AI模型，一个接口访问所有服务',
                action: () => window.location.href = '/model'
              },
              { 
                icon: <Users className="w-8 h-8" />, 
                title: '用户管理', 
                desc: '完善的用户权限体系，支持多租户管理',
                action: () => navigate('/user')
              },
              { 
                icon: <Zap className="w-8 h-8" />, 
                title: '高性能', 
                desc: '优化的请求处理，支持高并发访问',
                action: () => navigate('/panel')
              }
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 border-2 border-gray-200 dark:border-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={feature.action}
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{feature.desc}</p>
                <div className="flex items-center text-gray-600 dark:text-gray-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  了解更多 <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={LAYOUT_PRESETS.footerSection}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Thor AI Gateway</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                企业级AI模型管理网关，为您的业务提供强大的AI能力支持
              </p>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <button
                onClick={() => window.open('https://github.com/AIDotNet/Thor', '_blank')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-gray-700/50"
              >
                <Github className="w-5 h-5" />
                GitHub
              </button>
              <button
                onClick={() => window.open('https://thor-ai.apifox.cn', '_blank')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-gray-700/50"
              >
                API 文档
              </button>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">© 2024 AIDotNet. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ThorWebsite;