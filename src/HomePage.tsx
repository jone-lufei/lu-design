// src/HomePage.tsx
// Lu Design 官网首页 - 高端视觉版本 v2.0
// 特性：玻璃拟态 + 深度阴影 + 动态渐变 + 丰富微动效

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Palette,
  Code2,
} from 'lucide-react';
import type { ComponentMeta } from './App';

interface HomePageProps {
  components: ComponentMeta[];
}

// 组件展示墙动画
const wallContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const wallItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
  },
};

const HomePage: React.FC<HomePageProps> = ({ components }) => {
  return (
    <div className="relative min-h-screen">
      {/* 背景渐变网格 */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Hero 区域 */}
      <section className="relative overflow-hidden">
        {/* 动态网格背景 */}
        <div className="pointer-events-none absolute inset-0">
          {/* 渐变基础层 */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          
          {/* 动态网格 */}
          <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
              </pattern>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2B5CFF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FF7A59" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2B5CFF" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* 大型光晕球 - 左上 */}
          <motion.div
            className="absolute -top-1/2 left-1/4 h-[1000px] w-[1000px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(43,92,255,0.25) 0%, rgba(43,92,255,0.12) 40%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* 中型光晕球 - 右下 */}
          <motion.div
            className="absolute -bottom-1/3 right-1/3 h-[700px] w-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,122,89,0.22) 0%, rgba(255,122,89,0.1) 40%, transparent 70%)',
              filter: 'blur(70px)',
            }}
            animate={{
              y: [0, 45, 0],
              x: [0, -35, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* 小型光晕球 - 中心 */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(91,127,255,0.18) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* 漂浮小光点 */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{
                left: `${10 + (i * 6)}%`,
                top: `${15 + (i * 4)}%`,
                opacity: 0.3,
              }}
              animate={{
                y: [0, -25 - i * 2, 0],
                x: [0, 8 + i * 1.5, 0],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: 10 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        <div className="container relative py-20 md:py-32 lg:py-40">
          <div className="mx-auto max-w-5xl">
            {/* 顶部徽章 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex justify-center"
            >
              <div className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm font-medium text-transparent">
                  Lu Design 2.0 · 为高端企业应用而生
                </span>
              </div>
            </motion.div>

            {/* 主标题 - 渐变文字 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-center text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
              style={{
                background: 'linear-gradient(135deg, #0F1419 0%, #2B5CFF 50%, #FF7A59 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
              }}
            >Lu Design<br />
              轻盈之美 构建未来
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed text-muted md:text-xl"
            >
              一套由卢飞博士为企业级中后台场景打造的 React 组件库。
              <br />
              兼具清晰的信息架构、细腻的视觉语言与现代工程化能力。
            </motion.p>

            {/* CTA 按钮组 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16 flex flex-wrap items-center justify-center gap-4"
            >
              {/* 主按钮 - 渐变 + 光泽 */}
              <button
                type="button"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-intense focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-light to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  开始使用
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              {/* 次要按钮 - 玻璃拟态 */}
              <button
                type="button"
                className="group rounded-full border border-border bg-glass px-8 py-4 text-base font-semibold text-foreground shadow-soft backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <span className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  查看 GitHub
                </span>
              </button>
            </motion.div>

            {/* 特性卡片网格 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 sm:grid-cols-3"
            >
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="极致性能"
                description="TypeScript 原生支持，代码提示与类型检查一步到位"
              />
              <FeatureCard
                icon={<Layers className="h-6 w-6" />}
                title="丰富组件"
                description="为中后台场景深度优化，表格、表单、数据展示全面覆盖"
              />
              <FeatureCard
                icon={<Palette className="h-6 w-6" />}
                title="主题系统"
                description="灵活的设计 Token，支持暗黑模式，轻松定制品牌风格"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 组件展示墙 */}
      <section className="relative py-20">
        <div className="container">
          {/* 区块标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              组件一览
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted md:text-lg">
              从通用组件到数据展示，一套风格统一、可深度定制的中后台组件体系。
            </p>
          </motion.div>

          {/* 组件卡片网格 */}
          <motion.div
            variants={wallContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {components.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ========== 子组件 ========== */

// 特性卡片
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-border bg-glass p-6 shadow-soft backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-soft-lg">
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mb-2 text-base font-semibold">{title}</h3>
    <p className="text-sm leading-relaxed text-muted">{description}</p>
  </div>
);

// 组件卡片
const ComponentCard: React.FC<{ component: ComponentMeta }> = ({
  component,
}) => (
  <motion.article
    variants={wallItemVariants}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="group relative overflow-hidden rounded-2xl border border-border bg-glass p-6 shadow-soft backdrop-blur-xl"
  >
    {/* Hover 时的背景渐变 */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    
    {/* 头部 */}
    <div className="mb-4 flex items-start justify-between">
      <div className="flex-1">
        <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {component.name}
        </h3>
        <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          {component.category}
        </span>
      </div>
    </div>

    {/* 描述 */}
    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">
      {component.description}
    </p>

    {/* 标签 */}
    <div className="mb-5 flex flex-wrap gap-2">
      {component.tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* 底部操作 */}
    <button
      type="button"
      className="group/btn inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
    >
      查看详情
      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
    </button>

    {/* 装饰性光效 */}
    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
  </motion.article>
);

export default HomePage;