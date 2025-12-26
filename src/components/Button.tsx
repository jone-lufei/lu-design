// src/components/Button.tsx
// Lu Design - Button 组件
// 支持渐变、玻璃拟态、波纹效果的高端按钮组件

import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否启用波纹效果 */
  ripple?: boolean;
  /** 子元素 */
  children: React.ReactNode;
}

interface RippleType {
  x: number;
  y: number;
  size: number;
  id: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      ripple = true,
      children,
      className = '',
      onClick,
      ...restProps
    },
    ref,
  ) => {
    const [ripples, setRipples] = React.useState<RippleType[]>([]);

    // 波纹点击处理
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || disabled || loading) return;

      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple = {
        x,
        y,
        size,
        id: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // 动画结束后移除波纹
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);

      // 触发原始 onClick
      onClick?.(e);
    };

    // 变体样式
    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-gradient-to-r from-primary to-secondary text-white shadow-glow hover:shadow-intense hover:scale-[1.02] active:scale-[0.98]',
      secondary:
        'bg-card border border-border text-foreground shadow-soft hover:border-primary/40 hover:shadow-soft-lg hover:bg-primary/5 active:scale-[0.98]',
      ghost:
        'bg-transparent text-foreground hover:bg-primary/10 hover:text-primary active:bg-primary/20',
      glass:
        'bg-glass backdrop-blur-xl border border-border/50 text-foreground shadow-soft hover:border-primary/40 hover:bg-glass/80 hover:shadow-soft-lg active:scale-[0.98]',
    };

    // 尺寸样式
    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs rounded-lg',
      md: 'px-5 py-2.5 text-sm rounded-xl',
      lg: 'px-7 py-3.5 text-base rounded-2xl',
    };

    // 禁用/加载样式
    const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

    return (
      <motion.button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        onClick={handleClick}
        className={[
          'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 overflow-hidden',
          variantClasses[variant],
          sizeClasses[size],
          (disabled || loading) && disabledClasses,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
        {...restProps}
      >
        {/* 悬浮光晕层 - 仅 primary 变体 */}
        {variant === 'primary' && !disabled && !loading && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-light to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}

        {/* 波纹动画层 */}
        {ripple && ripples.length > 0 && (
          <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
            {ripples.map((r) => (
              <motion.span
                key={r.id}
                className="absolute rounded-full bg-white/30"
                style={{
                  left: r.x,
                  top: r.y,
                  width: r.size,
                  height: r.size,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </span>
        )}

        {/* 加载动画 */}
        {loading && (
          <motion.svg
            className="h-4 w-4"
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
        )}

        {/* 按钮内容 */}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
