// src/App.tsx
// 应用入口：Router + 主题切换 + 全局布局 + Mock 组件数据

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { Github, Sun, Moon, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// 页面组件
import HomePage from './HomePage';
import ComponentDocPage from './ComponentDocPage';
import ComponentsOverviewPage from './ComponentsOverviewPage';
import GuidePage from './GuidePage';
import ResourcesPage from './ResourcesPage';
import BlogPage from './BlogPage';

// ============ Mock 组件数据结构 ============

export interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
}

const COMPONENTS: ComponentMeta[] = [
  {
    id: 'button',
    name: 'Button 按钮',
    description: '强调主操作，支持渐变、玻璃拟态和波纹效果。',
    tags: ['通用', '交互', 'Primary'],
    category: 'General',
  },
  {
    id: 'table',
    name: 'Table 表格',
    description: '为中后台场景优化的大数据表格，拥有舒适的行高和空气感。',
    tags: ['数据展示', '排序', '筛选'],
    category: 'Data Display',
  },
  {
    id: 'form',
    name: 'Form 表单',
    description: '基于 Schema 的表单容器，内置校验与布局。',
    tags: ['表单', '验证'],
    category: 'Form',
  },
  {
    id: 'modal',
    name: 'Modal 对话框',
    description: '柔和阴影与圆角设计的模态对话框，支持多层弹出。',
    tags: ['反馈', '浮层'],
    category: 'Feedback',
  },
  {
    id: 'input',
    name: 'Input 输入框',
    description: '支持前后缀、状态样式与清晰的焦点高亮。',
    tags: ['表单', '输入'],
    category: 'Form',
  },
  {
    id: 'badge',
    name: 'Badge 徽标',
    description: '用于状态标记与计数的小型组件，强调圆润与可读性。',
    tags: ['状态', '标签'],
    category: 'Data Display',
  },
];

// ============ 主题上下文 ============

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('lu-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia?.(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDark ? 'dark' : 'light';
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    window.localStorage.setItem('lu-theme', theme);
  }, [theme]);

  const toggleTheme = React.useCallback(
    () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============ 主题切换按钮 ============

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-glass shadow-soft border border-border overflow-hidden transition hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
      aria-label="切换明亮/暗黑模式"
    >
      <AnimatePresence initial={false} mode="wait">
        {theme === 'light' ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-amber-400"
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-sky-300"
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

// ============ 全局 Header - 高端玻璃拟态版本 ============

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-glass/60 backdrop-blur-2xl">
      <div className="container flex h-16 items-center justify-between">
        {/* 左侧：Logo + 品牌 */}
        <div className="flex items-center gap-3">
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary p-2 shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-glow">
            <span className="relative z-10 text-sm font-bold tracking-wider text-white">LU</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-light to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight">Lu Design</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-[10px] font-medium text-transparent">
              高端企业级设计系统
            </span>
          </div>
        </div>

        {/* 中间：主导航 */}
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { path: '/guide', label: '指南' },
            { path: '/components', label: '组件' },
            { path: '/resources', label: '资源' },
            { path: '/blog', label: '博客' },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted hover:bg-primary/5 hover:text-foreground',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 右侧：工具栏 */}
        <div className="flex items-center gap-2">
          <select
            className="hidden h-9 cursor-pointer rounded-full border border-border/50 bg-glass px-3 text-xs font-medium text-muted shadow-soft backdrop-blur-xl transition-all hover:border-primary/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:block"
            defaultValue="stable"
            aria-label="切换文档版本"
          >
            <option value="stable">v1.0</option>
            <option value="next">vNext</option>
          </select>

          <a
            href="https://github.com/your-org/lu-design"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-glass text-muted shadow-soft backdrop-blur-xl transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            aria-label="GitHub 仓库"
          >
            <Github className="h-4 w-4" />
          </a>

          <ThemeToggleButton />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-glass text-muted shadow-soft backdrop-blur-xl transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary md:hidden"
            aria-label="菜单"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <motion.div
          className="border-t border-border bg-card/95 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="container flex flex-col gap-1 py-4">
            {[
              { path: '/guide', label: '指南' },
              { path: '/components', label: '组件' },
              { path: '/resources', label: '资源' },
              { path: '/blog', label: '博客' },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-4 py-3 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted hover:bg-primary/5 hover:text-foreground',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

// ============ 全局布局 ============

const AppShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-card/40 text-xs text-muted">
        <div className="container flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Lu Design. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px]">
              Made for lucid & unique enterprise interfaces.
            </span>
            <span className="text-[11px] text-muted">
              当前版本：v1.0 · Next 分支正在开发中
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============ 路由容器（页面切换动画） ============

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={<HomePage components={COMPONENTS} />}
            />
            <Route
              path="/guide"
              element={<GuidePage />}
            />
            <Route
              path="/components"
              element={<ComponentsOverviewPage components={COMPONENTS} />}
            />
            <Route
              path="/components/:id"
              element={<ComponentDocPage components={COMPONENTS} />}
            />
            <Route
              path="/resources"
              element={<ResourcesPage />}
            />
            <Route
              path="/blog"
              element={<BlogPage />}
            />
            {/* 其它路由暂时先指向首页，防止 404 */}
            <Route
              path="*"
              element={<HomePage components={COMPONENTS} />}
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
};

// ============ 根组件 ============

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;