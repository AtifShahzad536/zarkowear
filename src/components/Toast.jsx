import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

const palette = {
  info: {
    bg: 'bg-indigo-600/95',
    border: 'border-indigo-400/80',
    text: 'text-white',
  },
  success: {
    bg: 'bg-emerald-600/95',
    border: 'border-emerald-300/80',
    text: 'text-white',
  },
  error: {
    bg: 'bg-rose-600/95',
    border: 'border-rose-300/70',
    text: 'text-white',
  },
  warning: {
    bg: 'bg-amber-500/95',
    border: 'border-amber-300/75',
    text: 'text-slate-900',
  },
};

let counter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ message, tone = 'info', dismissAfter = 3600 }) => {
    if (!message) return () => {};
    const id = ++counter;
    const toast = {
      id,
      message,
      tone: palette[tone] ? tone : 'info',
      createdAt: Date.now(),
    };
    setToasts((prev) => [...prev, toast]);
    if (dismissAfter > 0) {
      setTimeout(() => remove(id), dismissAfter);
    }
    return () => remove(id);
  }, [remove]);

  const value = useMemo(() => ({ showToast, remove }), [showToast, remove]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-5 z-[120] flex flex-col items-center gap-3 px-4">
        <AnimatePresence>
          {toasts.map((toast) => {
            const theme = palette[toast.tone];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.95 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                className={`pointer-events-auto w-full max-w-md rounded-2xl border ${theme.border} ${theme.bg} ${theme.text} shadow-2xl backdrop-blur-lg`}
              >
                <div className="flex items-start gap-4 px-5 py-4">
                  <div className="flex-1 text-sm leading-relaxed">{toast.message}</div>
                  <button
                    type="button"
                    onClick={() => remove(toast.id)}
                    className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.showToast;
}
