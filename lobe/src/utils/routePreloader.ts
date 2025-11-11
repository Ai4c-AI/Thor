/**
 * 路由预加载工具
 * 提供智能的路由预加载策略，提升用户体验
 */

interface PreloadableComponent {
  preload?: () => Promise<any>;
}

interface RoutePreloadConfig {
  // 预加载延迟时间（毫秒）
  delay?: number;
  // 是否在空闲时预加载
  onIdle?: boolean;
  // 网络条件限制
  networkCondition?: 'fast' | 'slow' | 'any';
  // 优先级
  priority?: 'high' | 'medium' | 'low';
}

class RoutePreloader {
  private preloadedRoutes = new Set<string>();
  private preloadQueue: Array<{ component: PreloadableComponent; config: RoutePreloadConfig; routeName: string }> = [];
  private isProcessing = false;

  /**
   * 预加载单个路由组件
   */
  async preloadRoute(
    component: PreloadableComponent, 
    routeName: string, 
    config: RoutePreloadConfig = {}
  ): Promise<void> {
    // 避免重复预加载
    if (this.preloadedRoutes.has(routeName)) {
      return;
    }

    // 检查网络条件
    if (!this.shouldPreloadBasedOnNetwork(config.networkCondition)) {
      return;
    }

    const { delay = 0, onIdle = false } = config;

    const executePreload = async () => {
      try {
        if (component.preload) {
          await component.preload();
          this.preloadedRoutes.add(routeName);
        }
      } catch (error) {
        console.warn(`⚠️ 预加载失败: ${routeName}`, error);
      }
    };

    if (onIdle && 'requestIdleCallback' in window) {
      // 在浏览器空闲时预加载
      requestIdleCallback(() => {
        setTimeout(executePreload, delay);
      });
    } else {
      // 延迟预加载
      setTimeout(executePreload, delay);
    }
  }

  /**
   * 批量预加载路由
   */
  async preloadRoutes(routes: Array<{
    component: PreloadableComponent;
    routeName: string;
    config?: RoutePreloadConfig;
  }>): Promise<void> {
    // 按优先级排序
    const sortedRoutes = routes.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const aPriority = a.config?.priority || 'medium';
      const bPriority = b.config?.priority || 'medium';
      return priorityOrder[aPriority] - priorityOrder[bPriority];
    });

    this.preloadQueue.push(...sortedRoutes.map(route => ({
      component: route.component,
      config: route.config || {},
      routeName: route.routeName
    })));

    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  /**
   * 处理预加载队列
   */
  private async processQueue(): Promise<void> {
    this.isProcessing = true;

    while (this.preloadQueue.length > 0) {
      const { component, config, routeName } = this.preloadQueue.shift()!;
      
      // 高优先级的立即执行，其他的有间隔
      const delay = config.priority === 'high' ? 0 : 500;
      
      await this.preloadRoute(component, routeName, { ...config, delay });
      
      // 避免阻塞主线程
      if (this.preloadQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    this.isProcessing = false;
  }

  /**
   * 基于用户行为的智能预加载
   */
  preloadOnHover(
    element: HTMLElement, 
    component: PreloadableComponent, 
    routeName: string,
    config: RoutePreloadConfig = {}
  ): () => void {
    let hoverTimer: NodeJS.Timeout;
    
    const handleMouseEnter = () => {
      hoverTimer = setTimeout(() => {
        this.preloadRoute(component, routeName, { ...config, delay: 0 });
      }, 100); // 100ms 延迟，避免误触
    };

    const handleMouseLeave = () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // 返回清理函数
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }

  /**
   * 基于视口的预加载
   */
  preloadOnVisible(
    element: HTMLElement,
    component: PreloadableComponent,
    routeName: string,
    config: RoutePreloadConfig = {}
  ): () => void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.preloadRoute(component, routeName, config);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }

  /**
   * 检查是否应该基于网络条件预加载
   */
  private shouldPreloadBasedOnNetwork(condition?: 'fast' | 'slow' | 'any'): boolean {
    if (!condition || condition === 'any') {
      return true;
    }

    // 检查网络连接信息
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;

      if (condition === 'fast') {
        return effectiveType === '4g' || effectiveType === '5g';
      } else if (condition === 'slow') {
        return effectiveType === '2g' || effectiveType === '3g';
      }
    }

    // 如果无法检测网络条件，默认允许预加载
    return true;
  }

  /**
   * 获取预加载统计信息
   */
  getStats(): { preloadedCount: number; queueLength: number; preloadedRoutes: string[] } {
    return {
      preloadedCount: this.preloadedRoutes.size,
      queueLength: this.preloadQueue.length,
      preloadedRoutes: Array.from(this.preloadedRoutes)
    };
  }

  /**
   * 清除预加载缓存
   */
  clearCache(): void {
    this.preloadedRoutes.clear();
    this.preloadQueue.length = 0;
  }
}

// 创建全局实例
export const routePreloader = new RoutePreloader();

// 导出类型
export type { PreloadableComponent, RoutePreloadConfig };

// 导出便捷的 Hook
export const useRoutePreloader = () => {
  return {
    preloadRoute: routePreloader.preloadRoute.bind(routePreloader),
    preloadRoutes: routePreloader.preloadRoutes.bind(routePreloader),
    preloadOnHover: routePreloader.preloadOnHover.bind(routePreloader),
    preloadOnVisible: routePreloader.preloadOnVisible.bind(routePreloader),
    getStats: routePreloader.getStats.bind(routePreloader),
    clearCache: routePreloader.clearCache.bind(routePreloader)
  };
};