// src/ResourcesPage.tsx
// Lu Design - 资源页
// 包含设计资源、图标库、Figma 文件

import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Figma, Palette, Boxes, Sparkles } from 'lucide-react';

const ResourcesPage: React.FC = () => {
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
            设计资源
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted md:text-lg">
            获取 Lu Design 的设计素材、图标库、Figma 组件等资源
          </p>
        </motion.header>

        {/* 资源分类 */}
        <div className="space-y-12">
          {/* Figma 设计资源 */}
          <ResourceSection
            icon={<Figma className="h-6 w-6" />}
            title="Figma 组件库"
            description="完整的 Lu Design 组件库 Figma 文件，包含所有组件的设计规范"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <ResourceCard
                title="Lu Design UI Kit"
                description="包含所有基础组件、业务组件的 Figma 设计文件"
                tags={['Figma', '组件库', 'v1.0']}
                downloadUrl="#"
                previewUrl="#"
              />
              <ResourceCard
                title="设计规范文档"
                description="色彩、字体、间距、圆角等设计规范的详细说明"
                tags={['Figma', '规范', 'v1.0']}
                downloadUrl="#"
                previewUrl="#"
              />
            </div>
          </ResourceSection>

          {/* 图标库 */}
          <ResourceSection
            icon={<Boxes className="h-6 w-6" />}
            title="图标库"
            description="高质量的矢量图标，支持多种格式下载"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <IconSetCard
                name="基础图标"
                count={120}
                formats={['SVG', 'PNG', 'IconFont']}
              />
              <IconSetCard
                name="业务图标"
                count={80}
                formats={['SVG', 'PNG']}
              />
              <IconSetCard
                name="品牌图标"
                count={40}
                formats={['SVG', 'PNG']}
              />
            </div>
          </ResourceSection>

          {/* 色彩资源 */}
          <ResourceSection
            icon={<Palette className="h-6 w-6" />}
            title="色彩系统"
            description="Lu Design 的完整色彩体系与使用指南"
          >
            <div className="space-y-4">
              <ColorPalette
                name="主色板"
                colors={[
                  { name: 'Primary', value: '#2B5CFF', var: '--color-primary' },
                  { name: 'Primary Light', value: '#5B7FFF', var: '--color-primary-light' },
                  { name: 'Primary Dark', value: '#1B3FDD', var: '--color-primary-dark' },
                  { name: 'Secondary', value: '#FF7A59', var: '--color-secondary' },
                ]}
              />
              <ColorPalette
                name="辅助色"
                colors={[
                  { name: 'Success', value: '#10B981', var: '--color-success' },
                  { name: 'Warning', value: '#F59E0B', var: '--color-warning' },
                  { name: 'Error', value: '#EF4444', var: '--color-error' },
                  { name: 'Info', value: '#3B82F6', var: '--color-info' },
                ]}
              />
            </div>
          </ResourceSection>

          {/* 其他资源 */}
          <ResourceSection
            icon={<Sparkles className="h-6 w-6" />}
            title="其他资源"
            description="品牌 Logo、设计模板等"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <ResourceCard
                title="品牌 Logo 包"
                description="包含各种尺寸和格式的 Lu Design Logo"
                tags={['SVG', 'PNG', 'AI']}
                downloadUrl="#"
              />
              <ResourceCard
                title="设计模板"
                description="常见业务场景的页面设计模板"
                tags={['Figma', '模板']}
                downloadUrl="#"
                previewUrl="#"
              />
            </div>
          </ResourceSection>
        </div>

        {/* 底部提示 */}
        <motion.div
          className="mt-16 rounded-2xl border border-border bg-card/70 p-8 text-center shadow-soft backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            需要更多资源？
          </h2>
          <p className="mb-6 text-sm text-muted">
            访问我们的 GitHub 仓库获取更多设计资源和开发工具
          </p>
          <a
            href="https://github.com/your-org/lu-design"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:scale-105 hover:shadow-intense"
          >
            访问 GitHub
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

// 资源区块
const ResourceSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => {
  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted">{description}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
};

// 资源卡片
const ResourceCard: React.FC<{
  title: string;
  description: string;
  tags: string[];
  downloadUrl?: string;
  previewUrl?: string;
}> = ({ title, description, tags, downloadUrl, previewUrl }) => {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-sm transition-all hover:shadow-soft-lg">
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-4 text-sm text-muted">{description}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-primary/5 px-2 py-0.5 text-xs text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        {downloadUrl && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-soft transition-all hover:bg-primary-dark hover:shadow-soft-lg"
          >
            <Download className="h-3.5 w-3.5" />
            下载
          </button>
        )}
        {previewUrl && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            预览
          </button>
        )}
      </div>
    </div>
  );
};

// 图标集卡片
const IconSetCard: React.FC<{
  name: string;
  count: number;
  formats: string[];
}> = ({ name, count, formats }) => {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-sm">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Boxes className="h-6 w-6" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-foreground">{name}</h3>
      <p className="mb-3 text-xs text-muted">{count} 个图标</p>
      <div className="flex flex-wrap gap-1">
        {formats.map((format) => (
          <span
            key={format}
            className="rounded-md bg-primary/5 px-1.5 py-0.5 text-[10px] text-muted"
          >
            {format}
          </span>
        ))}
      </div>
    </div>
  );
};

// 色彩面板
const ColorPalette: React.FC<{
  name: string;
  colors: Array<{ name: string; value: string; var: string }>;
}> = ({ name, colors }) => {
  const [copied, setCopied] = React.useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="rounded-xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-sm">
      <h3 className="mb-4 text-base font-semibold text-foreground">{name}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="group cursor-pointer space-y-2"
            onClick={() => handleCopy(color.value)}
          >
            <div
              className="h-16 rounded-lg shadow-soft transition-all group-hover:scale-105 group-hover:shadow-soft-lg"
              style={{ backgroundColor: color.value }}
            />
            <div>
              <p className="text-xs font-medium text-foreground">{color.name}</p>
              <p className="text-[10px] text-muted">
                {copied === color.value ? '已复制!' : color.value}
              </p>
              <p className="text-[10px] text-muted">{color.var}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
