// src/BlogPage.tsx
// Lu Design - 博客页
// 包含版本更新、技术分享

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight, Sparkles, Rocket, Code } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: 'release' | 'tech' | 'design';
  author: string;
}

const POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Lu Design v1.0 正式发布',
    excerpt: '经过数月的精心打磨，Lu Design v1.0 正式发布！全新的设计语言、完整的组件库、高端的视觉风格，为企业级中后台应用带来全新体验。',
    date: '2025-12-25',
    tags: ['发布', 'v1.0', '里程碑'],
    category: 'release',
    author: 'Lu Design Team',
  },
  {
    id: '2',
    title: '深度解析：玻璃拟态设计在 Lu Design 中的应用',
    excerpt: '玻璃拟态（Glassmorphism）是 Lu Design 的核心视觉元素之一。本文将深入探讨我们如何通过 backdrop-filter、半透明背景和细边框打造出高端的玻璃质感。',
    date: '2025-12-20',
    tags: ['设计', '玻璃拟态', '视觉'],
    category: 'design',
    author: 'UI Team',
  },
  {
    id: '3',
    title: 'Table 组件的性能优化实践',
    excerpt: '在中后台场景中，大数据表格的性能至关重要。本文分享 Lu Design Table 组件如何通过虚拟滚动、懒加载等技术实现万级数据的流畅渲染。',
    date: '2025-12-15',
    tags: ['性能优化', 'Table', '技术分享'],
    category: 'tech',
    author: 'Dev Team',
  },
  {
    id: '4',
    title: 'Tailwind CSS v4 迁移指南',
    excerpt: 'Lu Design 已全面升级到 Tailwind CSS v4。本文将详细介绍迁移过程中遇到的问题、解决方案，以及 v4 带来的新特性。',
    date: '2025-12-10',
    tags: ['Tailwind', 'CSS', '迁移'],
    category: 'tech',
    author: 'Dev Team',
  },
  {
    id: '5',
    title: '无障碍设计实践：让每个人都能使用 Lu Design',
    excerpt: 'Web 可访问性（a11y）是 Lu Design 的核心原则之一。本文将分享我们在键盘导航、屏幕阅读器支持、ARIA 属性等方面的实践经验。',
    date: '2025-12-05',
    tags: ['无障碍', 'a11y', '设计'],
    category: 'design',
    author: 'UI Team',
  },
];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const filteredPosts = React.useMemo(() => {
    if (activeCategory === 'all') return POSTS;
    return POSTS.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

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
            博客
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted md:text-lg">
            版本更新、技术分享、设计理念
          </p>
        </motion.header>

        {/* 分类筛选 */}
        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { key: 'all', label: '全部', icon: <Sparkles className="h-4 w-4" /> },
            { key: 'release', label: '版本发布', icon: <Rocket className="h-4 w-4" /> },
            { key: 'tech', label: '技术分享', icon: <Code className="h-4 w-4" /> },
            { key: 'design', label: '设计理念', icon: <Tag className="h-4 w-4" /> },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={[
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeCategory === cat.key
                  ? 'bg-primary text-white shadow-glow'
                  : 'border border-border bg-card text-muted hover:border-primary/40 hover:text-foreground',
              ].join(' ')}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* 文章列表 */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} delay={index * 0.05} />
          ))}
        </div>

        {/* 空状态 */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-muted">该分类下暂无文章</p>
          </motion.div>
        )}

        {/* 底部订阅提示 */}
        <motion.div
          className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            订阅更新通知
          </h2>
          <p className="mb-6 text-sm text-muted">
            关注我们的 GitHub 仓库，第一时间获取版本更新和技术文章
          </p>
          <a
            href="https://github.com/your-org/lu-design"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:scale-105 hover:shadow-intense"
          >
            关注 GitHub
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

// 博客文章卡片
const BlogPostCard: React.FC<{ post: BlogPost; delay: number }> = ({
  post,
  delay,
}) => {
  const categoryConfig = {
    release: { label: '版本发布', color: 'text-primary bg-primary/10' },
    tech: { label: '技术分享', color: 'text-green-600 bg-green-500/10 dark:text-green-400' },
    design: { label: '设计理念', color: 'text-secondary bg-secondary/10' },
  };

  const config = categoryConfig[post.category];

  return (
    <motion.article
      className="group rounded-xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-sm transition-all hover:shadow-soft-lg md:p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {/* 分类标签 */}
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
        >
          {config.label}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Calendar className="h-3.5 w-3.5" />
          <time>{post.date}</time>
        </div>
      </div>

      {/* 标题 */}
      <h2 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">
        {post.title}
      </h2>

      {/* 摘要 */}
      <p className="mb-4 text-sm leading-relaxed text-muted md:text-base">
        {post.excerpt}
      </p>

      {/* 标签 */}
      <div className="mb-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-muted/10 px-2 py-0.5 text-xs text-muted"
          >
            <Tag className="h-3 w-3" />
            {tag}
          </span>
        ))}
      </div>

      {/* 底部信息 */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted">作者：{post.author}</span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2"
        >
          阅读全文
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
};

export default BlogPage;
