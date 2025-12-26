// src/components/Input.tsx
// Lu Design - Input 组件
// 支持前后缀、状态样式、焦点高亮的输入框组件

import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export interface InputProps
  extends Omit<HTMLMotionProps<'input'>, 'prefix' | 'size'> {
  /** 输入框尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 状态 */
  status?: 'default' | 'error' | 'warning' | 'success';
  /** 前缀图标或文本 */
  prefix?: React.ReactNode;
  /** 后缀图标或文本 */
  suffix?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 允许清空 */
  allowClear?: boolean;
  /** 清空回调 */
  onClear?: () => void;
  /** 容器类名 */
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      status = 'default',
      prefix,
      suffix,
      disabled = false,
      readOnly = false,
      allowClear = false,
      onClear,
      wrapperClassName = '',
      className = '',
      value,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [innerValue, setInnerValue] = React.useState(value ?? '');

    // 同步外部 value
    React.useEffect(() => {
      setInnerValue(value ?? '');
    }, [value]);

    // 尺寸样式
    const sizeClasses = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-5 text-base',
    };

    // 状态样式
    const statusClasses = {
      default: 'border-border focus:border-primary',
      error: 'border-red-400 focus:border-red-500',
      warning: 'border-amber-400 focus:border-amber-500',
      success: 'border-green-400 focus:border-green-500',
    };

    // 处理清空
    const handleClear = () => {
      setInnerValue('');
      onClear?.();
      if (onChange) {
        const syntheticEvent = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    // 是否显示清空按钮
    const showClear = allowClear && !disabled && !readOnly && innerValue;

    return (
      <div
        className={[
          'relative inline-flex w-full items-center gap-2 rounded-xl border bg-card shadow-soft transition-all duration-200',
          sizeClasses[size],
          statusClasses[status],
          isFocused && 'ring-2 ring-primary/20 shadow-soft-lg',
          disabled && 'cursor-not-allowed opacity-50',
          wrapperClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* 前缀 */}
        {prefix && (
          <span className="flex-shrink-0 text-muted">{prefix}</span>
        )}

        {/* 输入框 */}
        <motion.input
          ref={ref}
          type="text"
          value={innerValue}
          onChange={(e) => {
            setInnerValue(e.target.value);
            onChange?.(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            restProps.onFocus?.(e as any);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            restProps.onBlur?.(e as any);
          }}
          disabled={disabled}
          readOnly={readOnly}
          className={[
            'flex-1 bg-transparent text-foreground placeholder:text-muted focus:outline-none',
            disabled && 'cursor-not-allowed',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...restProps}
        />

        {/* 清空按钮 */}
        {showClear && (
          <motion.button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 rounded-full p-0.5 text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6m0-6 6 6" />
            </svg>
          </motion.button>
        )}

        {/* 后缀 */}
        {suffix && !showClear && (
          <span className="flex-shrink-0 text-muted">{suffix}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
