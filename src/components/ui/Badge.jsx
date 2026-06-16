import { cn } from '../../utils/cn'

const variants = {
  default: 'bg-white/5 text-zinc-300 border border-white/10',
  success: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
  danger: 'bg-red-500/10 text-red-300 border border-red-500/20',
  warning: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  fire: 'bg-orange-500/10 text-orange-300 border border-orange-500/20',
  primary: 'bg-white text-black',
}

const Badge = ({ className, variant = 'default', children }) => {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}

export default Badge
