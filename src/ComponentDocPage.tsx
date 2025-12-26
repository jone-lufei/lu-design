// src/ComponentDocPage.tsx
// 通用组件文档页：左侧分类导航 + 右侧组件详情（标题 + Demo + 代码 + API）

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { ComponentMeta } from './App';
import { Copy, Check, Search } from 'lucide-react';
import Button from './components/Button';
import Table from './components/Table';
import Input from './components/Input';
import Badge from './components/Badge';
import Modal from './components/Modal';

interface ComponentDocPageProps {
  components: ComponentMeta[];
}

// API 表行结构
interface ApiRow {
  name: string;
  description: string;
  type: string;
  defaultValue?: string;
  version?: string;
}

// 将组件按分类分组，用于左侧导航
function groupByCategory(components: ComponentMeta[]) {
  return components.reduce<Record<string, ComponentMeta[]>>((acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {});
}

// Modal Demo 组件
const ModalDemo: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>打开对话框</Button>
      <Modal
        visible={visible}
        title="示例对话框"
        onClose={() => setVisible(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setVisible(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={() => setVisible(false)}>
              确定
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          这是一个高端玻璃拟态风格的对话框组件，支持多层弹出、ESC 键关闭、点击遮罩关闭等功能。
        </p>
      </Modal>
    </>
  );
};

const ComponentDocPage: React.FC<ComponentDocPageProps> = ({
  components,
}) => {
  const { id } = useParams<{ id: string }>();
  const grouped = React.useMemo(
    () => groupByCategory(components),
    [components],
  );

  const meta = components.find((c) => c.id === id);

  if (!meta) {
    return (
      <div className="bg-background">
        <div className="container py-10 text-xs text-muted">
          未找到对应的组件文档，请检查 URL 是否正确。
        </div>
      </div>
    );
  }

  const isButton = meta.id === 'button';

  const buttonApi: ApiRow[] = [
    {
      name: 'variant',
      description: '按钮变体类型',
      type: "'primary' | 'secondary' | 'ghost' | 'glass'",
      defaultValue: "'primary'",
      version: '1.0.0',
    },
    {
      name: 'size',
      description: '按钮尺寸',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      version: '1.0.0',
    },
    {
      name: 'loading',
      description: '是否显示加载状态',
      type: 'boolean',
      defaultValue: 'false',
      version: '1.0.0',
    },
    {
      name: 'disabled',
      description: '是否禁用',
      type: 'boolean',
      defaultValue: 'false',
      version: '1.0.0',
    },
    {
      name: 'ripple',
      description: '是否启用波纹效果',
      type: 'boolean',
      defaultValue: 'true',
      version: '1.0.0',
    },
  ];

  const buttonDemoCode = `import Button from 'lu-design';

export default function Demo() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">主按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="ghost">幽灵按钮</Button>
      <Button variant="glass">玻璃按钮</Button>
    </div>
  );
}`;

  return (
    <div className="bg-background">
      <div className="container flex gap-6 py-6">
        {/* 左侧侧边栏：分类 + 组件列表 */}
        <aside className="hidden w-64 shrink-0 md:block">
          <nav className="space-y-4 text-sm">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <div className="px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  {category}
                </div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const active = item.id === meta.id;
                    return (
                      <Link
                        key={item.id}
                        to={`/components/${item.id}`}
                        className={[
                          'flex items-center justify-between rounded-lg px-2 py-1.5 text-xs transition',
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted hover:bg-background hover:text-foreground',
                        ].join(' ')}
                      >
                        <span className="truncate">{item.name}</span>
                        {active && (
                          <span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* 右侧内容区域 */}
        <section className="min-w-0 flex-1">
          {/* 面包屑 */}
          <div className="mb-4 text-xs text-muted">
            <Link to="/components" className="hover:text-foreground">
              组件
            </Link>
            <span className="mx-1.5 text-border">/</span>
            <span>{meta.name}</span>
          </div>

          <div className="rounded-xl border border-border bg-card/70 p-4 shadow-soft backdrop-blur-sm sm:p-6">
            {/* 标题区域 */}
            <header className="mb-5 border-b border-border pb-3">
              <h1 className="text-lg font-semibold text-foreground">
                {meta.name}
              </h1>
              <p className="mt-1 text-xs text-muted">
                {meta.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/5 px-2 py-0.5 text-[10px] text-primary"
                  >
                    {tag}
                  </span>
                ))}
                <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] text-secondary">
                  Stable
                </span>
              </div>
            </header>

            {/* Demo + Code 区域 */}
            <section className="space-y-4">
              <article className="rounded-xl border border-border bg-background/80 p-4 shadow-soft">
                <header className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      {isButton ? '基础按钮' : '组件示例'}
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {isButton
                        ? '支持多种风格（variant）与尺寸（size），并且内置渐变与玻璃拟态视觉。'
                        : '该组件的演示区域，后续可根据实际组件行为进行扩展。'}
                    </p>
                  </div>
                </header>

                {/* Live Demo */}
                <div className="mb-3 rounded-lg border border-border bg-card/80 p-6">
                  {isButton ? (
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">主按钮</Button>
                      <Button variant="secondary">次要按钮</Button>
                      <Button variant="ghost">幽灵按钮</Button>
                      <Button variant="glass">玻璃按钮</Button>
                      <Button variant="primary" size="sm">小按钮</Button>
                      <Button variant="primary" size="lg">大按钮</Button>
                      <Button variant="primary" loading>加载中</Button>
                      <Button variant="primary" disabled>禁用</Button>
                    </div>
                  ) : meta.id === 'table' ? (
                    <Table
                      columns={[
                        { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
                        { key: 'age', title: '年龄', dataIndex: 'age', sortable: true, align: 'center' },
                        { key: 'city', title: '城市', dataIndex: 'city' },
                        {
                          key: 'status',
                          title: '状态',
                          dataIndex: 'status',
                          render: (val) => (
                            <Badge variant={val === '在线' ? 'success' : 'default'}>
                              {val}
                            </Badge>
                          ),
                        },
                      ]}
                      dataSource={[
                        { id: '1', name: '张三', age: 28, city: '北京', status: '在线' },
                        { id: '2', name: '李四', age: 32, city: '上海', status: '离线' },
                        { id: '3', name: '王五', age: 25, city: '深圳', status: '在线' },
                      ]}
                    />
                  ) : meta.id === 'input' ? (
                    <div className="space-y-4">
                      <Input placeholder="基础输入框" />
                      <Input placeholder="带前缀" prefix={<Search className="h-4 w-4" />} />
                      <Input placeholder="可清空" allowClear />
                      <Input placeholder="错误状态" status="error" />
                      <Input placeholder="成功状态" status="success" />
                    </div>
                  ) : meta.id === 'badge' ? (
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="default">默认</Badge>
                      <Badge variant="primary">主要</Badge>
                      <Badge variant="success">成功</Badge>
                      <Badge variant="warning">警告</Badge>
                      <Badge variant="error">错误</Badge>
                      <Badge variant="info">信息</Badge>
                      <Badge variant="primary" dot />
                    </div>
                  ) : meta.id === 'modal' ? (
                    <ModalDemo />
                  ) : (
                    <div className="text-center text-sm text-muted py-8">
                      该组件的演示区域，后续可扩展
                    </div>
                  )}
                </div>

                {/* Code Block（仅为 button 展示代码） */}
                {isButton && (
                  <CodeBlock code={buttonDemoCode} language="tsx" />
                )}
              </article>

              {/* API 区域 */}
              <section className="space-y-2">
                <h2 className="text-sm font-semibold text-foreground">
                  API
                </h2>
                <p className="text-xs text-muted">
                  以下为组件的关键属性说明，完整类型定义可在 TypeScript
                  提示中查看。
                </p>
                {isButton ? (
                  <ApiTable rows={buttonApi} />
                ) : (
                  <p className="text-xs text-muted">
                    {meta.name} 的详细 API 信息将在后续版本中补充。
                  </p>
                )}
              </section>

              {/* 额外说明 */}
              <section className="mt-4 border-t border-border pt-4 text-xs text-muted">
                更多关于交互规范、无障碍与设计建议，将在设计指南章节中详细说明。
              </section>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

// 简单 CodeBlock + 复制功能
const CodeBlock: React.FC<{ code: string; language?: string }> = ({
  code,
  language = 'tsx',
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('复制失败', e);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-[#020617]/90 text-xs text-slate-100 shadow-soft">
      <div className="flex items-center justify-between border-b border-border/40 bg-[#020617]/80 px-3 py-1.5">
        <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-full border border-slate-700/60 px-2 py-0.5 text-[10px] text-slate-300 transition hover:border-primary/60 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              已复制
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              复制
            </>
          )}
        </button>
      </div>
      <pre className="max-h-96 overflow-auto bg-transparent px-3 py-2 font-mono text-[11px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// 简单 API 表格
const ApiTable: React.FC<{ rows: ApiRow[] }> = ({ rows }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/80 shadow-soft">
      <table className="min-w-full border-collapse text-left text-xs">
        <thead className="bg-primary/5">
          <tr className="text-[11px] text-muted">
            <th className="px-3 py-2 font-medium">属性名</th>
            <th className="px-3 py-2 font-medium">说明</th>
            <th className="px-3 py-2 font-medium">类型</th>
            <th className="px-3 py-2 font-medium">默认值</th>
            <th className="px-3 py-2 font-medium">版本</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.name}
              className={
                idx % 2 === 0 ? 'bg-background' : 'bg-primary/2.5'
              }
            >
              <td className="px-3 py-2 align-top font-mono text-[11px] text-primary">
                {row.name}
              </td>
              <td className="px-3 py-2 align-top text-[11px] text-muted">
                {row.description}
              </td>
              <td className="px-3 py-2 align-top text-[11px]">
                <span className="rounded-full bg-primary/5 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                  {row.type}
                </span>
              </td>
              <td className="px-3 py-2 align-top text-[11px] text-muted">
                {row.defaultValue ?? '-'}
              </td>
              <td className="px-3 py-2 align-top text-[11px] text-muted">
                {row.version ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentDocPage;