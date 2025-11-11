/**
 * Thor AI Gateway - 统一设计系统
 * 基于现代UI设计原则，提供一致的视觉体验
 */

// 🎨 主色调系统 - 基于蓝色调的专业科技风格
export const DESIGN_TOKENS = {
  // 主要颜色
  primary: {
    50: '#eff6ff',    // 最浅蓝
    100: '#dbeafe',   // 浅蓝背景
    200: '#bfdbfe',   // 边框蓝
    300: '#93c5fd',   // 按钮边框
    400: '#60a5fa',   // 次要按钮
    500: '#3b82f6',   // 主要按钮 
    600: '#2563eb',   // 悬停状态
    700: '#1d4ed8',   // 激活状态
    800: '#1e40af',   // 深蓝文字
    900: '#1e3a8a',   // 最深蓝
    950: '#172554'    // 极深蓝
  },

  // 中性色调 - 提供层次感
  neutral: {
    0: '#ffffff',     // 纯白
    50: '#f9fafb',    // 背景白
    100: '#f3f4f6',   // 浅灰背景  
    200: '#e5e7eb',   // 边框灰
    300: '#d1d5db',   // 禁用文字
    400: '#9ca3af',   // 次要文字
    500: '#6b7280',   // 正文文字
    600: '#4b5563',   // 标题文字
    700: '#374151',   // 深色文字
    800: '#1f2937',   // 导航背景
    900: '#111827',   // 深色背景
    950: '#030712'    // 极深背景
  },

  // 辅助色调
  accent: {
    cyan: {
      50: '#ecfeff',
      400: '#22d3ee', 
      500: '#06b6d4',
      600: '#0891b2'
    },
    purple: {
      50: '#faf5ff',
      400: '#a855f7',
      500: '#8b5cf6', 
      600: '#7c3aed'
    },
    emerald: {
      50: '#ecfdf5',
      400: '#34d399',
      500: '#10b981',
      600: '#059669'
    },
    amber: {
      50: '#fffbeb',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706'
    }
  },

  // 渐变系统 - 使用中性灰色调
  gradients: {
    // 主背景渐变 - 统一使用中性灰色系
    primary: 'bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100  dark:via-slate-800 dark:to-gray-900',
    
    // 区域背景渐变
    section: {
      hero: 'bg-gradient-to-br from-gray-50/90 via-white to-slate-50/90  dark:via-slate-800/80 dark:to-slate-900',
      stats: 'bg-gradient-to-r from-slate-100/80 to-gray-100/80 dark:from-slate-800/60 dark:to-slate-700/60',
      features: 'bg-gradient-to-br from-white via-gray-50/50 to-slate-50  dark:via-slate-800/60 dark:to-slate-800',
      footer: 'bg-gradient-to-r from-slate-900 to-gray-900 dark:from-slate-950 dark:to-gray-950'
    },

    // 卡片渐变
    card: {
      glass: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl',
      elevated: 'bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-800 dark:to-gray-950/30',
      interactive: 'hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:hover:from-slate-700 dark:hover:to-gray-900/30'
    },

    // 文字渐变
    text: {
      primary: 'bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 dark:from-slate-100 dark:via-gray-200 dark:to-slate-100',
      accent: 'bg-gradient-to-r from-gray-600 via-slate-600 to-gray-600 dark:from-gray-400 dark:via-slate-400 dark:to-gray-400'
    }
  },

  // 阴影系统 - 创建层次感
  shadows: {
    sm: 'shadow-sm shadow-gray-500/5 dark:shadow-gray-400/10',
    md: 'shadow-md shadow-gray-500/10 dark:shadow-gray-400/20',
    lg: 'shadow-lg shadow-gray-500/15 dark:shadow-gray-400/25',
    xl: 'shadow-xl shadow-gray-500/20 dark:shadow-gray-400/30',
    '2xl': 'shadow-2xl shadow-gray-500/25 dark:shadow-gray-400/35',
    
    // 特殊阴影
    glow: 'shadow-lg shadow-gray-500/30 dark:shadow-gray-400/40',
    colored: {
      gray: 'shadow-lg shadow-gray-500/25',
      cyan: 'shadow-lg shadow-cyan-500/25', 
      purple: 'shadow-lg shadow-purple-500/25',
      emerald: 'shadow-lg shadow-emerald-500/25'
    }
  },

  // 边框系统
  borders: {
    subtle: 'border border-slate-200/80 dark:border-slate-700/80',
    accent: 'border border-gray-200/80 dark:border-gray-700/80',
    interactive: 'border border-slate-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-gray-600'
  },

  // 动画过渡
  transitions: {
    smooth: 'transition-all duration-300 ease-out',
    fast: 'transition-all duration-200 ease-out', 
    slow: 'transition-all duration-500 ease-out'
  }
} as const;

// 🎯 组件样式预设
export const COMPONENT_STYLES = {
  // 页面容器
  pageContainer: `min-h-screen ${DESIGN_TOKENS.gradients.primary}`,
  
  // 内容区域
  contentSection: `py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative`,
  
  // 卡片样式
  card: {
    base: `${DESIGN_TOKENS.gradients.card.glass} ${DESIGN_TOKENS.borders.subtle} ${DESIGN_TOKENS.shadows.md} rounded-2xl ${DESIGN_TOKENS.transitions.smooth}`,
    interactive: `${DESIGN_TOKENS.gradients.card.interactive} hover:${DESIGN_TOKENS.shadows.lg} hover:scale-105 cursor-pointer`,
    elevated: `${DESIGN_TOKENS.gradients.card.elevated} ${DESIGN_TOKENS.shadows.xl} rounded-3xl`
  },

  // 按钮样式
  button: {
    primary: `bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800  ${DESIGN_TOKENS.shadows.glow} ${DESIGN_TOKENS.transitions.smooth}`,
    secondary: `${DESIGN_TOKENS.gradients.card.glass} ${DESIGN_TOKENS.borders.interactive} ${DESIGN_TOKENS.transitions.smooth} hover:${DESIGN_TOKENS.shadows.md}`,
    ghost: `bg-transparent hover:bg-gray-50 dark:hover:bg-gray-950/30 ${DESIGN_TOKENS.transitions.smooth}`
  },

  // 文字样式
  text: {
    hero: `bg-gradient-to-r ${DESIGN_TOKENS.gradients.text.primary} bg-clip-text `,
    accent: `bg-gradient-to-r ${DESIGN_TOKENS.gradients.text.accent} bg-clip-text `,
    body: 'text-slate-600 dark:text-slate-300',
    muted: 'text-slate-500 dark:text-slate-400'
  }
} as const;

// 🌟 预定义组合样式
export const LAYOUT_PRESETS = {
  heroSection: `${DESIGN_TOKENS.gradients.section.hero} min-h-screen flex items-center justify-center relative overflow-hidden`,
  statsSection: `${DESIGN_TOKENS.gradients.section.stats} ${COMPONENT_STYLES.contentSection}`,
  featuresSection: `${DESIGN_TOKENS.gradients.section.features} ${COMPONENT_STYLES.contentSection}`,
  footerSection: `${DESIGN_TOKENS.gradients.section.footer} py-16 `
} as const;