# Thor AI Gateway 首页设计文档

## 设计理念

基于 shadcn/ui 设计系统，为 Thor AI Gateway 创建了一个现代化、响应式的首页布局。设计强调清晰的信息架构、优雅的视觉层次和流畅的用户体验。

## 布局架构

### 1. 统一布局系统 (`/src/layouts/shadcn-layout.tsx`)

提供三种核心布局模式：

- **ShadcnLayout**: 基础布局容器，提供全局样式和主题支持
- **PageLayout**: 内容页面布局，包含容器约束和响应式内边距
- **DashboardLayout**: 仪表板布局，支持侧边栏和主内容区分离

### 2. 首页组件结构

```
/welcome (首页)
├── HeroSection (主视觉区)
│   ├── 品牌标识
│   ├── 主标题和描述
│   ├── CTA 按钮组
│   └── 特性亮点卡片
├── StatsSection (数据统计)
│   └── 四项核心指标卡片
├── FeaturesSection (功能特性)
│   └── 六大核心功能网格
└── FooterSection (页脚)
    ├── 品牌信息
    ├── 产品链接
    ├── 资源链接
    └── 社区链接
```

## 设计特点

### 视觉设计

1. **色彩系统**
   - 主色调：蓝色系 (`--primary: 221.2 83.2% 53.3%`)
   - 中性色：灰色调度，提供层次感
   - 支持亮/暗主题自动切换

2. **排版层次**
   - Hero 标题：4xl-7xl 响应式字号
   - 章节标题：3xl-5xl 渐进式缩放
   - 正文：基础 16px，移动端 14px

3. **空间系统**
   - 统一的 padding/margin 比例
   - 响应式间距：移动端紧凑，桌面端宽松
   - 章节间距：py-16 md:py-24

### 交互设计

1. **悬停效果**
   - 卡片：scale(1.05) 微缩放
   - 按钮：背景色渐变过渡
   - 链接：下划线和颜色变化

2. **动画过渡**
   - 所有交互：300ms ease-out
   - 页面加载：渐进式显示
   - 背景装饰：subtle float 动画

3. **响应式断点**
   - sm: 640px
   - md: 768px
   - lg: 1024px
   - xl: 1280px

## 组件说明

### HeroSection
- **目的**: 第一印象区域，传达产品核心价值
- **布局**: 左右两栏，左侧文案，右侧特性卡片
- **响应式**: 移动端垂直堆叠

### StatsSection
- **目的**: 展示平台实力和规模
- **布局**: 四宫格统计卡片
- **响应式**: 移动端 2x2，桌面端 1x4

### FeaturesSection
- **目的**: 详细介绍核心功能
- **布局**: 3 列网格卡片系统
- **响应式**: 移动端单列，平板双列，桌面三列

### FooterSection
- **目的**: 提供导航和资源链接
- **布局**: 四栏分组信息
- **响应式**: 移动端垂直堆叠

## 技术栈

- **UI 框架**: React 18
- **样式系统**: Tailwind CSS v4 + shadcn/ui
- **组件库**: Radix UI primitives
- **图标**: Lucide React
- **工具函数**: clsx + tailwind-merge

## 使用指南

### 导入首页

```tsx
import ShadcnWelcomePage from '@/pages/welcome/shadcn-page';
```

### 自定义主题

编辑 `/src/styles/shadcn-globals.css` 中的 CSS 变量：

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  /* ... 更多变量 */
}
```

### 扩展布局

使用提供的布局组件创建新页面：

```tsx
import { PageLayout } from '@/layouts/shadcn-layout';

function NewPage() {
  return (
    <PageLayout>
      {/* 页面内容 */}
    </PageLayout>
  );
}
```

## 性能优化

1. **组件懒加载**: 使用 React.lazy() 按需加载
2. **图片优化**: 使用 WebP 格式和响应式图片
3. **CSS 优化**: PurgeCSS 移除未使用样式
4. **缓存策略**: 静态资源长期缓存

## 可访问性

- 语义化 HTML 结构
- ARIA 标签支持
- 键盘导航友好
- 高对比度模式兼容
- 屏幕阅读器优化

## 未来改进

- [ ] 添加页面过渡动画
- [ ] 实现骨架屏加载
- [ ] 添加更多交互微动画
- [ ] 优化移动端手势交互
- [ ] 支持 PWA 特性