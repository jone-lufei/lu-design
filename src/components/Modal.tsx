// src/components/Modal.tsx
// Lu Design - Modal 组件
// 柔和阴影与圆角设计的模态对话框，支持多层弹出

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface ModalProps {
  /** 是否显示 */
  visible: boolean;
  /** 标题 */
  title?: React.ReactNode;
  /** 内容 */
  children: React.ReactNode;
  /** 底部操作区 */
  footer?: React.ReactNode;
  /** 宽度 */
  width?: string | number;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否点击遮罩关闭 */
  maskClosable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** z-index 层级 */
  zIndex?: number;
  /** 自定义类名 */
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  footer,
  width = 520,
  closable = true,
  maskClosable = true,
  onClose,
  zIndex = 1000,
  className = '',
}) => {
  // 阻止滚动穿透
  React.useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  // 处理遮罩点击
  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && maskClosable) {
      onClose?.();
    }
  };

  // ESC 键关闭
  React.useEffect(() => {
    if (!visible || !closable) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [visible, closable, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex }}
        >
          {/* 遮罩层 */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleMaskClick}
          />

          {/* 对话框 */}
          <motion.div
            className={[
              'relative flex max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-intense',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ width: typeof width === 'number' ? `${width}px` : width }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* 标题栏 */}
            {(title || closable) && (
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                {title && (
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                )}
                {closable && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="ml-auto rounded-lg p-1.5 text-muted transition-all hover:bg-muted/10 hover:text-foreground"
                    aria-label="关闭"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {children}
            </div>

            {/* 底部操作区 */}
            {footer && (
              <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
