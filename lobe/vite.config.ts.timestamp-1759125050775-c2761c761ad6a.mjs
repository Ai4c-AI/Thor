// vite.config.ts
import { defineConfig } from "file:///C:/Users/Administrator/Documents/GitHub/Thor/lobe/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Administrator/Documents/GitHub/Thor/lobe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import viteCompression from "file:///C:/Users/Administrator/Documents/GitHub/Thor/lobe/node_modules/vite-plugin-compression/dist/index.mjs";
import path from "path";
import tailwindcss from "file:///C:/Users/Administrator/Documents/GitHub/Thor/lobe/node_modules/@tailwindcss/vite/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Administrator\\Documents\\GitHub\\Thor\\lobe";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "esnext",
    // 优化代码分割
    rollupOptions: {
      output: {
        // 手动分割代码块
        manualChunks: {
          // 将 React 相关库分离到单独的 chunk
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // 将 UI 组件库分离
          "ui-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip"
          ],
          // 将工具库分离
          "utils-vendor": [
            "clsx",
            "class-variance-authority",
            "zustand",
            "react-i18next",
            "sonner",
            "framer-motion"
          ],
          // 将图标库分离
          "icons-vendor": ["lucide-react"],
          // 将表单相关库分离
          "form-vendor": [
            "react-hook-form",
            "@hookform/resolvers",
            "zod"
          ],
          // 将拖拽相关库分离
          "dnd-vendor": [
            "@dnd-kit/core",
            "@dnd-kit/sortable",
            "@dnd-kit/utilities"
          ]
        },
        // 为动态导入的模块生成更好的文件名
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/").pop() : "chunk";
          return `js/[name]-[hash].js`;
        },
        // 为入口文件生成更好的文件名
        entryFileNames: "js/[name]-[hash].js",
        // 为静态资源生成更好的文件名
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
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
    chunkSizeWarningLimit: 1e3,
    // 启用源码映射（仅在开发环境）
    sourcemap: process.env.NODE_ENV === "development",
    // 压缩选项
    minify: "terser",
    terserOptions: {
      compress: {
        // 移除 console.log
        drop_console: process.env.NODE_ENV === "production",
        // 移除 debugger
        drop_debugger: true,
        // 移除无用代码
        pure_funcs: process.env.NODE_ENV === "production" ? ["console.log", "console.info"] : [],
        // 减少内存使用
        passes: 1
      },
      mangle: {
        // 保留函数名以便调试
        keep_fnames: process.env.NODE_ENV !== "production"
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
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : []
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-i18next",
      "zustand",
      "clsx",
      "class-variance-authority"
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
        changeOrigin: true
      },
      "/v1": {
        target: "http://localhost:5045",
        changeOrigin: true
      }
    }
  },
  // 预览服务器配置
  preview: {
    port: 5170,
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcVGhvclxcXFxsb2JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcVGhvclxcXFxsb2JlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0RvY3VtZW50cy9HaXRIdWIvVGhvci9sb2JlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIlxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgdGFpbHdpbmRjc3MoKSxcclxuICAgIHZpdGVDb21wcmVzc2lvbih7XHJcbiAgICAgIHZlcmJvc2U6IHRydWUsXHJcbiAgICAgIGRpc2FibGU6IGZhbHNlLFxyXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQwLFxyXG4gICAgICBhbGdvcml0aG06IFwiYnJvdGxpQ29tcHJlc3NcIixcclxuICAgICAgZXh0OiBcIi5iclwiLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxyXG4gICAgLy8gXHU0RjE4XHU1MzE2XHU0RUUzXHU3ODAxXHU1MjA2XHU1MjcyXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIFx1NjI0Qlx1NTJBOFx1NTIwNlx1NTI3Mlx1NEVFM1x1NzgwMVx1NTc1N1xyXG4gICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgLy8gXHU1QzA2IFJlYWN0IFx1NzZGOFx1NTE3M1x1NUU5M1x1NTIwNlx1NzlCQlx1NTIzMFx1NTM1NVx1NzJFQ1x1NzY4NCBjaHVua1xyXG4gICAgICAgICAgJ3JlYWN0LXZlbmRvcic6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gXHU1QzA2IFVJIFx1N0VDNFx1NEVGNlx1NUU5M1x1NTIwNlx1NzlCQlxyXG4gICAgICAgICAgJ3VpLXZlbmRvcic6IFtcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hY2NvcmRpb24nLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWFsZXJ0LWRpYWxvZycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtYXZhdGFyJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1jaGVja2JveCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtY29sbGFwc2libGUnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWNvbnRleHQtbWVudScsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtZGlhbG9nJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51JyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1ob3Zlci1jYXJkJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1sYWJlbCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtbWVudWJhcicsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtbmF2aWdhdGlvbi1tZW51JyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1wb3BvdmVyJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1wcm9ncmVzcycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2Nyb2xsLWFyZWEnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNlbGVjdCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2VwYXJhdG9yJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zbGlkZXInLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNsb3QnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXN3aXRjaCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdGFicycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9hc3QnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXAnXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBcdTVDMDZcdTVERTVcdTUxNzdcdTVFOTNcdTUyMDZcdTc5QkJcclxuICAgICAgICAgICd1dGlscy12ZW5kb3InOiBbXHJcbiAgICAgICAgICAgICdjbHN4JyxcclxuICAgICAgICAgICAgJ2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eScsXHJcbiAgICAgICAgICAgICd6dXN0YW5kJyxcclxuICAgICAgICAgICAgJ3JlYWN0LWkxOG5leHQnLFxyXG4gICAgICAgICAgICAnc29ubmVyJyxcclxuICAgICAgICAgICAgJ2ZyYW1lci1tb3Rpb24nXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBcdTVDMDZcdTU2RkVcdTY4MDdcdTVFOTNcdTUyMDZcdTc5QkJcclxuICAgICAgICAgICdpY29ucy12ZW5kb3InOiBbJ2x1Y2lkZS1yZWFjdCddLFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBcdTVDMDZcdTg4NjhcdTUzNTVcdTc2RjhcdTUxNzNcdTVFOTNcdTUyMDZcdTc5QkJcclxuICAgICAgICAgICdmb3JtLXZlbmRvcic6IFtcclxuICAgICAgICAgICAgJ3JlYWN0LWhvb2stZm9ybScsXHJcbiAgICAgICAgICAgICdAaG9va2Zvcm0vcmVzb2x2ZXJzJyxcclxuICAgICAgICAgICAgJ3pvZCdcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIFx1NUMwNlx1NjJENlx1NjJGRFx1NzZGOFx1NTE3M1x1NUU5M1x1NTIwNlx1NzlCQlxyXG4gICAgICAgICAgJ2RuZC12ZW5kb3InOiBbXHJcbiAgICAgICAgICAgICdAZG5kLWtpdC9jb3JlJyxcclxuICAgICAgICAgICAgJ0BkbmQta2l0L3NvcnRhYmxlJyxcclxuICAgICAgICAgICAgJ0BkbmQta2l0L3V0aWxpdGllcydcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFx1NEUzQVx1NTJBOFx1NjAwMVx1NUJGQ1x1NTE2NVx1NzY4NFx1NkEyMVx1NTc1N1x1NzUxRlx1NjIxMFx1NjZGNFx1NTk3RFx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFxyXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAoY2h1bmtJbmZvKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmYWNhZGVNb2R1bGVJZCA9IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZCA/IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZC5zcGxpdCgnLycpLnBvcCgpIDogJ2NodW5rJztcclxuICAgICAgICAgIHJldHVybiBganMvW25hbWVdLVtoYXNoXS5qc2A7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICAvLyBcdTRFM0FcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdTY2RjRcdTU5N0RcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFx1NEUzQVx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NzUxRlx1NjIxMFx1NjZGNFx1NTk3RFx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFxyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpbmZvID0gYXNzZXRJbmZvLm5hbWU/LnNwbGl0KCcuJykgfHwgW107XHJcbiAgICAgICAgICBjb25zdCBleHQgPSBpbmZvW2luZm8ubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgJiYgL1xcLihtcDR8d2VibXxvZ2d8bXAzfHdhdnxmbGFjfGFhYykoXFw/LiopPyQvaS50ZXN0KGFzc2V0SW5mby5uYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYG1lZGlhL1tuYW1lXS1baGFzaF0uJHtleHR9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZSAmJiAvXFwuKHBuZ3xqcGU/Z3xnaWZ8c3ZnfHdlYnB8YXZpZikoXFw/LiopPyQvaS50ZXN0KGFzc2V0SW5mby5uYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYGltYWdlcy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgJiYgL1xcLih3b2ZmMj98ZW90fHR0ZnxvdGYpKFxcPy4qKT8kL2kudGVzdChhc3NldEluZm8ubmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBmb250cy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvLyBcdTU0MkZcdTc1MjggQ1NTIFx1NEVFM1x1NzgwMVx1NTIwNlx1NTI3MlxyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgXHJcbiAgICAvLyBcdThCQkVcdTdGNkUgY2h1bmsgXHU1OTI3XHU1QzBGXHU4QjY2XHU1NDRBXHU5NjUwXHU1MjM2XHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXHJcbiAgICBcclxuICAgIC8vIFx1NTQyRlx1NzUyOFx1NkU5MFx1NzgwMVx1NjYyMFx1NUMwNFx1RkYwOFx1NEVDNVx1NTcyOFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1RkYwOVxyXG4gICAgc291cmNlbWFwOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyxcclxuICAgIFxyXG4gICAgLy8gXHU1MzhCXHU3RjI5XHU5MDA5XHU5ODc5XHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIC8vIFx1NzlGQlx1OTY2NCBjb25zb2xlLmxvZ1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcclxuICAgICAgICAvLyBcdTc5RkJcdTk2NjQgZGVidWdnZXJcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG4gICAgICAgIC8vIFx1NzlGQlx1OTY2NFx1NjVFMFx1NzUyOFx1NEVFM1x1NzgwMVxyXG4gICAgICAgIHB1cmVfZnVuY3M6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyBbJ2NvbnNvbGUubG9nJywgJ2NvbnNvbGUuaW5mbyddIDogW10sXHJcbiAgICAgICAgLy8gXHU1MUNGXHU1QzExXHU1MTg1XHU1QjU4XHU0RjdGXHU3NTI4XHJcbiAgICAgICAgcGFzc2VzOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hbmdsZToge1xyXG4gICAgICAgIC8vIFx1NEZERFx1NzU1OVx1NTFGRFx1NjU3MFx1NTQwRFx1NEVFNVx1NEZCRlx1OEMwM1x1OEJENVxyXG4gICAgICAgIGtlZXBfZm5hbWVzOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXHJcbiAgICAgIH0sXHJcbiAgICAgIGZvcm1hdDoge1xyXG4gICAgICAgIC8vIFx1NzlGQlx1OTY2NFx1NkNFOFx1OTFDQVxyXG4gICAgICAgIGNvbW1lbnRzOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBlc2J1aWxkOiB7XHJcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsXHJcbiAgICAvLyBcdTU3MjhcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTRFMkRcdTc5RkJcdTk2NjQgY29uc29sZSBcdTU0OEMgZGVidWdnZXJcclxuICAgIGRyb3A6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdXHJcbiAgfSxcclxuICBcclxuICAvLyBcdTRGMThcdTUzMTZcdTRGOURcdThENTZcdTk4ODRcdTY3ODRcdTVFRkFcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGluY2x1ZGU6IFtcclxuICAgICAgJ3JlYWN0JyxcclxuICAgICAgJ3JlYWN0LWRvbScsXHJcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcclxuICAgICAgJ3JlYWN0LWkxOG5leHQnLFxyXG4gICAgICAnenVzdGFuZCcsXHJcbiAgICAgICdjbHN4JyxcclxuICAgICAgJ2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eSdcclxuICAgIF0sXHJcbiAgICBleGNsdWRlOiBbXHJcbiAgICAgIC8vIFx1NjM5Mlx1OTY2NFx1NEUwMFx1NEU5Qlx1NEUwRFx1OTcwMFx1ODk4MVx1OTg4NFx1Njc4NFx1NUVGQVx1NzY4NFx1NTMwNVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA1MTcwLFxyXG4gICAgLy8gXHU1NDJGXHU3NTI4IEhNUlxyXG4gICAgaG1yOiB0cnVlLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo1MDQ1XCIsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBcIi92MVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTA0NVwiLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBcclxuICAvLyBcdTk4ODRcdTg5QzhcdTY3MERcdTUyQTFcdTU2NjhcdTkxNERcdTdGNkVcclxuICBwcmV2aWV3OiB7XHJcbiAgICBwb3J0OiA1MTcwLFxyXG4gICAgaG9zdDogdHJ1ZVxyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVYsU0FBUyxvQkFBb0I7QUFDaFgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGlCQUFpQjtBQUp4QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFD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
