import { cn } from '../../utils/cn'

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

const Avatar = ({ className, name, src, size = 'md' }) => {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={cn('rounded-full object-cover', sizes[size], className)}
      />
    )
  }

  return (
    <div className={cn(
      'rounded-full bg-white/10 flex items-center justify-center font-semibold text-zinc-300',
      sizes[size],
      className
    )}>
      {initials}
    </div>
  )
}

export default Avatar
