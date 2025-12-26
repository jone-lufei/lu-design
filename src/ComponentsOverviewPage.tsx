// src/ComponentsOverviewPage.tsx
// 组件总览页：基于 Mock 数据展示所有组件卡片

import React from 'react';
import type { ComponentMeta } from './App';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ComponentsOverviewPageProps {
  components: ComponentMeta[];
}

const ComponentsOverviewPage: React.FC<ComponentsOverviewPageProps> = ({
  components,
}) => {
  return (
    <div className="bg-background">
      <section className="container py-10">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">
            全部组件
          </h1>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            Lu Design 提供了一套为中后台场景优化的组件体系，下方是当前已发布的组件列表。
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((c) => (
            <article
              key={c.id}
              className="flex flex-col rounded-xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur"
            >
              <h2 className="text-sm font-semibold text-foreground">
                {c.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-xs text-muted">
                {c.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/5 px-2 py-0.5 text-[10px] text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/components/${c.id}`}
                className="mt-auto inline-flex items-center pt-3 text-xs font-medium text-primary hover:text-primary/80"
              >
                查看文档
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ComponentsOverviewPage;