import './App.css'
import FullscreenLoading from './components/Loading'
import MainLayout from './_layout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { updatePwaThemeColor, listenForThemeUpdates } from './utils/pwa'
import { PreloadableComponent, routePreloader } from './utils/routePreloader'

import Nav from './components/@nav'
import useThemeStore from './store/theme'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'

// 创建一个智能的懒加载函数，支持预加载
const createLazyComponent = (importFn: () => Promise<any>, componentName: string) => {
  const LazyComponent = lazy(() => 
    importFn().catch(error => {
      console.error(`Failed to load ${componentName}:`, error);
      // 返回一个错误组件而不是让整个应用崩溃
      return { 
        default: () => (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-2">加载组件失败</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                重新加载
              </button>
            </div>
          </div>
        )
      };
    })
  );
  
  // 添加预加载方法
  (LazyComponent as any).preload = importFn;
  
  return LazyComponent;
};

// 按优先级分组懒加载组件
// 高优先级 - 用户最常访问的页面
const WelcomePage = createLazyComponent(() => import('./pages/welcome/page'), 'WelcomePage');
const LoginPage = createLazyComponent(() => import('./pages/login/page'), 'LoginPage');
const PanelPage = createLazyComponent(() => import('./pages/panel/page'), 'PanelPage');
const ModelPage = createLazyComponent(() => import('./pages/model/page'), 'ModelPage');

// 中优先级 - 管理功能页面
const ChannelPage = createLazyComponent(() => import('./pages/channel/page'), 'ChannelPage');
const TokenPage = createLazyComponent(() => import('./pages/token/page'), 'TokenPage');
const UserPage = createLazyComponent(() => import('./pages/user/page'), 'UserPage');
const SettingPage = createLazyComponent(() => import('./pages/setting/page'), 'SettingPage');

// 低优先级 - 较少使用的页面
const ProductPage = createLazyComponent(() => import('./pages/product/page'), 'ProductPage');
const RedeemCodePage = createLazyComponent(() => import('./pages/redeem-code/page'), 'RedeemCodePage');
const CurrentPage = createLazyComponent(() => import('./pages/current/page'), 'CurrentPage');
const RegisterPage = createLazyComponent(() => import('./pages/register/page'), 'RegisterPage');
const Auth = createLazyComponent(() => import('./pages/auth/page'), 'Auth');
const RateLimit = createLazyComponent(() => import('./pages/rate-limit/page'), 'RateLimit');
const DefaultLayout = createLazyComponent(() => import('./_layout/Default/page'), 'DefaultLayout');
const ModelManager = createLazyComponent(() => import('./pages/model-manager/page'), 'ModelManager');
const ModelMapPage = createLazyComponent(() => import('./pages/model-map/page'), 'ModelMapPage');
const UserGroupPage = createLazyComponent(() => import('./pages/user-group/page'), 'UserGroupPage');
const PlaygroundPage = createLazyComponent(() => import('./pages/playground'), 'PlaygroundPage');
const UsagePage = createLazyComponent(() => import('./pages/usage/page'), 'UsagePage');
const AnnouncementPage = createLazyComponent(() => import('./pages/announcement/page'), 'AnnouncementPage');
const LoggerPage = createLazyComponent(() => import('./pages/logger/page'), 'LoggerPage');

// 套餐相关页面
const SubscriptionPage = createLazyComponent(() => import('./pages/subscription/page'), 'SubscriptionPage');
const SubscriptionUpgradePage = createLazyComponent(() => import('./pages/subscription/upgrade'), 'SubscriptionUpgradePage');
const SubscriptionHistoryPage = createLazyComponent(() => import('./pages/subscription/history'), 'SubscriptionHistoryPage');
const SubscriptionAdminPage = createLazyComponent(() => import('./pages/subscription-admin/page'), 'SubscriptionAdminPage');

// 智能加载状态组件
const SmartLoadingFallback = ({ title }: { title: string }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingTips] = useState([
    '正在加载组件...',
    '准备渲染界面...',
    '即将完成...'
  ]);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 100);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % loadingTips.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, [loadingTips.length]);

  return (
    <FullscreenLoading 
      title={title}
    />
  );
};

function App() {
  const { themeMode, toggleTheme } = useThemeStore();
  const { t } = useTranslation();

  // 预加载关键组件
  useEffect(() => {
    // 使用智能预加载策略
    routePreloader.preloadRoutes([
      // 高优先级 - 用户最常访问的页面
      {
        component: PanelPage as PreloadableComponent,
        routeName: 'panel',
        config: { priority: 'high', delay: 1000, networkCondition: 'any' }
      },
      {
        component: ModelPage as PreloadableComponent,
        routeName: 'model',
        config: { priority: 'high', delay: 1500, networkCondition: 'any' }
      },
      {
        component: LoginPage as PreloadableComponent,
        routeName: 'login',
        config: { priority: 'high', delay: 2000, networkCondition: 'any' }
      },
      
      // 中优先级 - 管理功能页面
      {
        component: ChannelPage as PreloadableComponent,   
        routeName: 'channel',
        config: { priority: 'medium', delay: 3000, onIdle: true, networkCondition: 'fast' }
      },
      {
        component: TokenPage as PreloadableComponent,
        routeName: 'token',
        config: { priority: 'medium', delay: 3500, onIdle: true, networkCondition: 'fast' }
      },
      {
        component: UserPage as PreloadableComponent,
        routeName: 'user',
        config: { priority: 'medium', delay: 4000, onIdle: true, networkCondition: 'fast' }
      },
      {
        component: SettingPage as PreloadableComponent,
        routeName: 'setting',
        config: { priority: 'medium', delay: 4500, onIdle: true, networkCondition: 'fast' }
      },
      
      // 低优先级 - 较少使用的页面
      {
        component: PlaygroundPage as PreloadableComponent,
        routeName: 'playground',
        config: { priority: 'low', delay: 5000, onIdle: true, networkCondition: 'fast' }
      },
      {
        component: ModelManager as PreloadableComponent,
        routeName: 'model-manager',
        config: { priority: 'low', delay: 5500, onIdle: true, networkCondition: 'fast' }
      }
    ]);

    // 清理函数
    return () => {
      // 在组件卸载时可以选择清理预加载缓存
      // routePreloader.clearCache();
    };
  }, []);

  // 在应用启动和主题变化时同步PWA主题色
  useEffect(() => {
    updatePwaThemeColor(themeMode);
  }, [themeMode]);

  // 监听来自Service Worker的主题更新消息
  useEffect(() => {
    // 仅在支持Service Worker的环境中启用
    if ('serviceWorker' in navigator) {
      const cleanup = listenForThemeUpdates((updatedThemeMode) => {
        // 如果收到主题更新消息，更新应用主题
        if (updatedThemeMode !== themeMode) {
          toggleTheme(updatedThemeMode);
        }
      });

      return cleanup;
    }
  }, [themeMode, toggleTheme]);

  const router = createBrowserRouter([
    {
      element: <MainLayout nav={<Nav />} />,
      children: [
        {
          path: 'panel', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.panel')} />}>
              <PanelPage />
            </Suspense>
          )
        },
        {
          path: 'channel', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.channel')} />}>
              <ChannelPage />
            </Suspense>
          )
        },
        {
          path: 'token', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.token')} />}>
              <TokenPage />
            </Suspense>
          )
        },
        {
          path: 'model-manager', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.modelManager')} />}>
              <ModelManager />
            </Suspense>
          )
        },
        {
          path: 'product', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.product')} />}>
              <ProductPage />
            </Suspense>
          )
        },
        {
          path: 'redeem-code', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.redeemCode')} />}>
              <RedeemCodePage />
            </Suspense>
          )
        },
        {
          path: 'user', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.user')} />}>
              <UserPage />
            </Suspense>
          )
        },
        {
          path: 'current', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.current')} />}>
              <CurrentPage />
            </Suspense>
          )
        },
        {
          path: 'setting', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.setting')} />}>
              <SettingPage />
            </Suspense>
          )
        },
        {
          path: 'rate-limit', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.rateLimit')} />}>
              <RateLimit />
            </Suspense>
          )
        },
        {
          path: 'model-map', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.modelMap')} />}>
              <ModelMapPage />
            </Suspense>
          )
        },
        {
          path: 'user-group', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.userGroup')} />}>
              <UserGroupPage />
            </Suspense>
          )
        },
        {
          path: 'playground', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.playground')} />}>
              <PlaygroundPage />
            </Suspense>
          )
        },
        {
          path: 'usage', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.usage')} />}>
              <UsagePage />
            </Suspense>
          )
        },
        {
          path: 'announcement',
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.announcement')} />}>
              <AnnouncementPage />
            </Suspense>
          )
        },
        {
          path: 'logger',
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.logger')} />}>
              <LoggerPage />
            </Suspense>
          )
        },
        {
          path: 'subscription/upgrade',
          element: (
            <Suspense fallback={<SmartLoadingFallback title="加载套餐升级页面..." />}>
              <SubscriptionUpgradePage />
            </Suspense>
          )
        },
        {
          path: 'subscription/history',
          element: (
            <Suspense fallback={<SmartLoadingFallback title="加载订阅记录页面..." />}>
              <SubscriptionHistoryPage />
            </Suspense>
          )
        },
        {
          path: 'subscription-admin',
          element: (
            <Suspense fallback={<SmartLoadingFallback title="加载套餐管理页面..." />}>
              <SubscriptionAdminPage />
            </Suspense>
          )
        }
      ]
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.login')} />}>
          <LoginPage />
        </Suspense>
      )
    }, 
    {
      path: "/register",
      element: (
        <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.register')} />}>
          <RegisterPage />
        </Suspense>
      )
    }, 
    {
      path: "/auth",
      element: (
        <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.auth')} />}>
          <Auth />
        </Suspense>
      )
    }, 
    {
      path: "/auth/gitee",
      element: (
        <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.auth')} />}>
          <Auth />
        </Suspense>
      )
    }, 
    {
      path: "/auth/casdoor",
      element: (
        <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.auth')} />}>
          <Auth />
        </Suspense>
      )
    },
    {
      element: (
        <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.defaultLayout')} />}>
          <DefaultLayout />
        </Suspense>
      ),
      children: [
        {
          path: '', 
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.welcome')} />}>
              <WelcomePage />
            </Suspense>
          )
        }, 
        {
          path: "/model",
          element: (
            <Suspense fallback={<SmartLoadingFallback title={t('pageTitle.loading.model')} />}>
              <ModelPage />
            </Suspense>
          )
        },
        {
          path: '/subscription',
          element: (
            <Suspense fallback={<SmartLoadingFallback title="加载套餐购买页面..." />}>
              <SubscriptionPage />
            </Suspense>
          )
        },
      ]
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App