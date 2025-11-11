/**
 * 统一的控制台设计主题配置
 * 基于UI设计师的玻璃态设计规范
 */

import useThemeStore from '../store/theme';

export const useConsoleTheme = () => {
  const { themeMode } = useThemeStore();
  
  // 检测当前是否为暗色主题
  const isDarkMode = themeMode === 'dark' || 
    (themeMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // 动态玻璃态卡片样式 - 基于当前主题
  const glassCardStyle = {
    background: isDarkMode
      ? 'rgba(25, 25, 25, 0.8)'
      : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: isDarkMode
      ? '1px solid hsl(217 12% 63% / 0.2)'
      : '1px solid hsl(214 13% 93%)',
    boxShadow: isDarkMode
      ? '0 20px 40px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  // 统一的主题配置 - 基于 CSS 自定义属性
  const consoleThemeConfig = {
    components: {
      Card: {
        headerBg: 'transparent',
        headerFontSize: 16,
        headerFontSizeSM: 14,
        colorBgContainer: isDarkMode ? 'hsl(222 84% 5%)' : 'hsl(0 0% 100%)',
      },
      Table: {
        headerBg: isDarkMode ? 'hsl(222 84% 5%)' : 'hsl(0 0% 100%)',
        colorBgContainer: isDarkMode ? 'hsl(222 84% 5%)' : 'hsl(0 0% 100%)',
        borderColor: isDarkMode ? 'hsl(217 12% 63% / 0.2)' : 'hsl(214 13% 93%)',
      },
      Button: {
        borderRadius: 8,
        controlHeight: 32,
      },
      Input: {
        borderRadius: 8,
        controlHeight: 32,
      },
      Select: {
        borderRadius: 8,
        controlHeight: 32,
      },
      Statistic: {
        contentFontSize: 24,
        titleFontSize: 14,
      }
    },
  };

  // 页面布局样式
  const pageLayoutStyle = {
    padding: '8px',
    minHeight: '100vh',
  };

  // Header区域样式
  const headerCardStyle = {
    marginBottom: '16px',
    ...glassCardStyle,
  };

  // 内容区域样式
  const contentCardStyle = {
    ...glassCardStyle,
  };

  return {
    glassCardStyle,
    consoleThemeConfig,
    pageLayoutStyle,
    headerCardStyle,
    contentCardStyle,
    isDarkMode,
  };
};

// 导出常用的设计规范常量
export const CONSOLE_DESIGN_TOKENS = {
  // 圆角规范
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 16,
  },
  
  // 阴影规范
  BOX_SHADOW: {
    LIGHT: '0 2px 8px rgba(0,0,0,0.06)',
    MEDIUM: '0 8px 32px rgba(0, 0, 0, 0.1)',
    HEAVY: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
  
  // 玻璃态背景规范
  GLASS_BACKGROUND: {
    LIGHT: 'rgba(255, 255, 255, 0.9)',
    DARK: 'rgba(25, 25, 25, 0.8)',
  },
  
  // 间距规范
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  }
};

export default useConsoleTheme;