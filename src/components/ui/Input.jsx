import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(({ className, label, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-zinc-300 font-medium">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition duration-200',
            'focus:border-white/20 focus:bg-white/10',
            error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10',
            Icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
