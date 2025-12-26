// src/components/Badge.tsx
// Lu Design - Badge 组件
// 用于状态标记与计数的小型组件，强调圆润与可读性

import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'size'> {
  /** 变体 */
  variant?: BadgeVariant;
  /** 尺寸 */
  size?: BadgeSize;
  /** 是否为圆点样式 */
  dot?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      className = '',
      ...restProps
    },
    ref,
  ) => {
    // 变体样式
    const variantClasses: Record<BadgeVariant, string> = {
      default: 'bg-muted/20 text-muted border-muted/30',
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
      warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      error: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
      info: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    };

    // 尺寸样式
    const sizeClasses: Record<BadgeSize, string> = {
      sm: dot ? 'h-1.5 w-1.5' : 'px-1.5 py-0.5 text-[10px]',
      md: dot ? 'h-2 w-2' : 'px-2 py-1 text-xs',
      lg: dot ? 'h-2.5 w-2.5' : 'px-2.5 py-1.5 text-sm',
    };

    return (
      <motion.span
        ref={ref}
        className={[
          'inline-flex items-center justify-center font-medium transition-all',
          dot ? 'rounded-full border' : 'rounded-full border',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        {...restProps}
      >
        {!dot && children}
      </motion.span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
