import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    // 优化代码分割
    rollupOptions: {
      output: {
        // 手动分割代码块
        manualChunks: {
          // 将 React 相关库分离到单独的 chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // 将 UI 组件库分离
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],
          
          // 将工具库分离
          'utils-vendor': [
            'clsx',
            'class-variance-authority',
            'zustand',
            'react-i18next',
            'sonner',
            'framer-motion'
          ],
          
          // 将图标库分离
          'icons-vendor': ['lucide-react'],
          
          // 将表单相关库分离
          'form-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          
          // 将拖拽相关库分离
          'dnd-vendor': [
            '@dnd-kit/core',
            '@dnd-kit/sortable',
            '@dnd-kit/utilities'
          ]
        },
        
        // 为动态导入的模块生成更好的文件名
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `js/[name]-[hash].js`;
        },
        
        // 为入口文件生成更好的文件名
        entryFileNames: 'js/[name]-[hash].js',
        
        // 为静态资源生成更好的文件名
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (assetInfo.name && /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return `media/[name]-[hash].${ext}`;
          }
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`;
          }
          if (assetInfo.name && /\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            return `fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    
    // 设置 chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
    
    // 启用源码映射（仅在开发环境）
    sourcemap: process.env.NODE_ENV === 'development',
    
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除 console.log
        drop_console: process.env.NODE_ENV === 'production',
        // 移除 debugger
        drop_debugger: true,
        // 移除无用代码
        pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.info'] : [],
        // 减少内存使用
        passes: 1
      },
      mangle: {
        // 保留函数名以便调试
        keep_fnames: process.env.NODE_ENV !== 'production'
      },
      format: {
        // 移除注释
        comments: false
      }
    }
  },
  esbuild: {
    target: "esnext",
    // 在生产环境中移除 console 和 debugger
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  
  // 优化依赖预构建
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-i18next',
      'zustand',
      'clsx',
      'class-variance-authority'
    ],
    exclude: [
      // 排除一些不需要预构建的包
    ]
  },
  
  server: {
    port: 5170,
    // 启用 HMR
    hmr: true,
    proxy: {
      "/api": {
        target: "http://localhost:5045",
        changeOrigin: true,
      },
      "/v1": {
        target: "http://localhost:5045",
        changeOrigin: true,
      },
    },
  },
  
  // 预览服务器配置
  preview: {
    port: 5170,
    host: true
  }
});
