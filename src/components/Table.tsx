// src/components/Table.tsx
// Lu Design - Table 组件
// 为中后台场景优化的大数据表格，舒适行高、空气感、排序筛选

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export interface ColumnDef<T = any> {
  /** 列标识 */
  key: string;
  /** 列标题 */
  title: string;
  /** 数据字段 key */
  dataIndex?: string;
  /** 自定义渲染函数 */
  render?: (value: any, record: T, index: number) => React.ReactNode;
  /** 列宽度 */
  width?: string | number;
  /** 是否可排序 */
  sortable?: boolean;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  /** 列配置 */
  columns: ColumnDef<T>[];
  /** 数据源 */
  dataSource: T[];
  /** 行唯一标识字段 */
  rowKey?: string | ((record: T) => string);
  /** 是否显示斑马纹 */
  striped?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否启用悬浮效果 */
  hoverable?: boolean;
  /** 加载状态 */
  loading?: boolean;
  /** 空数据提示 */
  emptyText?: string;
  /** 自定义类名 */
  className?: string;
}

type SortOrder = 'asc' | 'desc' | null;

interface SortState {
  key: string;
  order: SortOrder;
}

const Table = <T extends Record<string, any>>({
  columns,
  dataSource,
  rowKey = 'id',
  striped = true,
  bordered = false,
  hoverable = true,
  loading = false,
  emptyText = '暂无数据',
  className = '',
}: TableProps<T>) => {
  const [sortState, setSortState] = React.useState<SortState>({
    key: '',
    order: null,
  });

  // 获取行唯一标识
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') return rowKey(record);
    return record[rowKey] ?? String(index);
  };

  // 排序处理
  const handleSort = (columnKey: string) => {
    setSortState((prev) => {
      if (prev.key !== columnKey) {
        return { key: columnKey, order: 'asc' };
      }
      if (prev.order === 'asc') {
        return { key: columnKey, order: 'desc' };
      }
      if (prev.order === 'desc') {
        return { key: '', order: null };
      }
      return { key: columnKey, order: 'asc' };
    });
  };

  // 排序后的数据
  const sortedData = React.useMemo(() => {
    if (!sortState.order || !sortState.key) return dataSource;

    const column = columns.find((col) => col.key === sortState.key);
    if (!column?.dataIndex) return dataSource;

    return [...dataSource].sort((a, b) => {
      const aVal = a[column.dataIndex!];
      const bVal = b[column.dataIndex!];

      if (aVal === bVal) return 0;

      const isAsc = sortState.order === 'asc';
      if (aVal == null) return isAsc ? 1 : -1;
      if (bVal == null) return isAsc ? -1 : 1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return isAsc ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      return isAsc ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [dataSource, sortState, columns]);

  // 渲染单元格内容
  const renderCell = (column: ColumnDef<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(
        column.dataIndex ? record[column.dataIndex] : undefined,
        record,
        index,
      );
    }
    return column.dataIndex ? record[column.dataIndex] : null;
  };

  return (
    <div
      className={[
        'relative overflow-hidden rounded-xl border border-border bg-card shadow-soft',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* 加载遮罩 */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-card px-4 py-3 shadow-soft-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg
              className="h-5 w-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-25"
              />
              <path
                d="M12 2 A10 10 0 0 1 22 12"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.svg>
            <span className="text-sm font-medium text-muted">加载中...</span>
          </motion.div>
        </div>
      )}

      {/* 表格容器 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* 表头 */}
          <thead className="bg-card/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={[
                    'px-4 py-3.5 text-sm font-semibold text-foreground',
                    bordered && 'border-b border-border',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    !column.align && 'text-left',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                    >
                      <span>{column.title}</span>
                      {sortState.key === column.key ? (
                        sortState.order === 'asc' ? (
                          <ChevronUp className="h-4 w-4 text-primary" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-primary" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 opacity-40" />
                      )}
                    </button>
                  ) : (
                    column.title
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* 表体 */}
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm text-muted"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => (
                <motion.tr
                  key={getRowKey(record, index)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className={[
                    'transition-colors',
                    striped && index % 2 === 1 && 'bg-muted/5',
                    hoverable && 'hover:bg-primary/5',
                    bordered && 'border-b border-border',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={[
                        'px-4 py-3.5 text-sm text-foreground',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        !column.align && 'text-left',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
