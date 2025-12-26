// src/GuidePage.tsx
// Lu Design - 指南页
// 包含快速开始、设计理念、开发指南

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Palette, Code, ArrowRight, Check } from 'lucide-react';

const GuidePage: React.FC = () => {
  return (
    <div className="bg-background">
      <div className="container py-12">
        {/* Hero 区 */}
        <motion.header
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            开发指南
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted md:text-lg">
            从安装到定制，快速掌握 Lu Design 的使用方法
          </p>
        </motion.header>

        {/* 三大核心卡片 */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <GuideCard
            icon={<Rocket className="h-6 w-6" />}
            title="快速开始"
            description="5 分钟完成安装与配置"
            delay={0}
          />
          <GuideCard
            icon={<Palette className="h-6 w-6" />}
            title="设计理念"
            description="Lucid + Unique 的核心思想"
            delay={0.1}
          />
          <GuideCard
            icon={<Code className="h-6 w-6" />}
            title="开发指南"
            description="组件使用与最佳实践"
            delay={0.2}
          />
        </div>

        {/* 快速开始 */}
        <Section id="quick-start" title="快速开始">
          <StepCard step={1} title="安装依赖">
            <CodeBlock
              code={`npm install lu-design
# 或
pnpm add lu-design
# 或
yarn add lu-design`}
            />
          </StepCard>

          <StepCard step={2} title="引入样式">
            <CodeBlock
              code={`// main.tsx 或 App.tsx\nimport 'lu-design/dist/style.css';`}
            />
          </StepCard>

          <StepCard step={3} title="使用组件">
            <CodeBlock
              code={`import { Button, Table, Input } from 'lu-design';

export default function App() {
  return (
    <div>
      <Button variant="primary">开始使用</Button>
    </div>
  );
}`}
            />
          </StepCard>
        </Section>

        {/* 设计理念 */}
        <Section id="design-philosophy" title="设计理念">
          <div className="space-y-6">
            <PhilosophyCard
              title="Lucid - 清晰"
              points={[
                '高对比度的色彩体系，确保信息层级清晰',
                '舒适的行高与留白，营造空气感',
                '一致的交互反馈，降低认知成本',
              ]}
            />
            <PhilosophyCard
              title="Unique - 独特"
              points={[
                '深海蓝 + 珊瑚橙的高端配色',
                '玻璃拟态 + 多层阴影的现代视觉',
                '流畅的动画与微交互设计',
              ]}
            />
            <PhilosophyCard
              title="Enterprise - 企业级"
              points={[
                'TypeScript 严格类型支持',
                '完整的无障碍（a11y）支持',
                '高性能的虚拟化大数据表格',
              ]}
            />
          </div>
        </Section>

        {/* 开发指南 */}
        <Section id="dev-guide" title="开发指南">
          <div className="space-y-6">
            <GuideItem title="按需引入">
              <p className="text-sm text-muted">
                Lu Design 支持 Tree Shaking，按需引入可有效减小打包体积：
              </p>
              <CodeBlock
                code={`import { Button, Input } from 'lu-design';\n// 只会打包 Button 和 Input 组件`}
              />
            </GuideItem>

            <GuideItem title="主题定制">
              <p className="text-sm text-muted">
                通过 CSS 变量覆盖默认主题色：
              </p>
              <CodeBlock
                code={`:root {
  --color-primary: #2B5CFF;
  --color-secondary: #FF7A59;
  --shadow-soft: 0 2px 8px rgba(15,23,42,0.04);
}`}
              />
            </GuideItem>

            <GuideItem title="暗黑模式">
              <p className="text-sm text-muted">
                在 html 元素上添加 .dark 类即可切换暗黑模式：
              </p>
              <CodeBlock
                code={`document.documentElement.classList.add('dark');\n// 或移除\ndocument.documentElement.classList.remove('dark');`}
              />
            </GuideItem>
          </div>
        </Section>

        {/* 下一步 */}
        <motion.div
          className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            准备好开始了吗？
          </h2>
          <p className="mb-6 text-sm text-muted">
            查看组件文档，探索 Lu Design 的所有组件
          </p>
          <Link
            to="/components"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:scale-105 hover:shadow-intense"
          >
            浏览组件
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// 指南卡片
const GuideCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="rounded-xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-soft-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </motion.div>
  );
};

// Section 容器
const Section: React.FC<{
  id: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => {
  return (
    <motion.section
      id={id}
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-foreground">{title}</h2>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
};

// 步骤卡片
const StepCard: React.FC<{
  step: number;
  title: string;
  children: React.ReactNode;
}> = ({ step, title, children }) => {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {step}
        </div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// 设计理念卡片
const PhilosophyCard: React.FC<{
  title: string;
  points: string[];
}> = ({ title, points }) => {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 开发指南项
const GuideItem: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
};

// 代码块
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-[#020617]/90 px-4 py-3 text-xs text-slate-100">
      <code>{code}</code>
    </pre>
  );
};

export default GuidePage;
