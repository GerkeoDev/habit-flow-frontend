import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-white text-black hover:opacity-90 shadow-[0_4px_16px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.1)]',
  secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
  ghost: 'text-zinc-400 hover:text-white hover:bg-white/5',
  danger: 'bg-red-500/10 text-red-300 border border-red-500/10 hover:bg-red-500/20',
  outline: 'border border-white/10 text-white hover:bg-white/5',
}

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

const Button = forwardRef(({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200',
        'active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
