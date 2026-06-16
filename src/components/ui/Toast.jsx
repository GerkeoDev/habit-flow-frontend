import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useToastStore } from '../../store/toastStore'
import { cn } from '../../utils/cn'

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const colors = {
  success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
  error: 'bg-red-500/10 border-red-500/20 text-red-300',
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
}

const Toast = () => {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = icons[toast.type] || Info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-4 py-3 min-w-[300px] shadow-lg backdrop-blur-xl',
                colors[toast.type]
              )}
            >
              <Icon size={18} className="shrink-0" />
              <span className="text-sm flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="opacity-50 hover:opacity-100 transition cursor-pointer">
                <X size={14} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default Toast
