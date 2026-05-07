import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-teal-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
};

let counter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const remove = useCallback((id) => {
    const handle = timersRef.current.get(id);
    if (handle) {
      clearTimeout(handle);
      timersRef.current.delete(id);
    }
    setToasts((cur) => cur.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (toast) => {
      const id = ++counter;
      const item = { id, type: 'info', duration: 3500, ...toast };
      setToasts((cur) => [...cur, item]);
      if (item.duration > 0) {
        const handle = setTimeout(() => remove(id), item.duration);
        timersRef.current.set(id, handle);
      }
      return id;
    },
    [remove]
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  const api = useMemo(
    () => ({
      push,
      remove,
      success: (message, opts) => push({ type: 'success', message, ...opts }),
      error: (message, opts) => push({ type: 'error', message, ...opts }),
      info: (message, opts) => push({ type: 'info', message, ...opts }),
      warning: (message, opts) => push({ type: 'warning', message, ...opts }),
    }),
    [push, remove]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed top-4 right-4 z-[60] flex flex-col gap-2 w-[min(380px,calc(100vw-2rem))]">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto rounded-xl border bg-white/95 backdrop-blur-xl border-zinc-200 dark:bg-zinc-900/95 dark:border-white/10 shadow-xl px-4 py-3 flex items-start gap-3"
            >
              <div className="mt-0.5">{ICONS[t.type]}</div>
              <div className="flex-1 min-w-0">
                {t.title && (
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{t.title}</p>
                )}
                {t.message && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{t.message}</p>
                )}
              </div>
              <button
                onClick={() => remove(t.id)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function useOptionalToast() {
  return useContext(ToastContext) ?? {
    push: () => {},
    remove: () => {},
    success: () => {},
    error: () => {},
    info: () => {},
    warning: () => {},
  };
}

