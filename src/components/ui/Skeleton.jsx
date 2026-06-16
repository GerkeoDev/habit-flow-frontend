import { cn } from '../../utils/cn'

const Skeleton = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-white/5',
        className
      )}
    />
  )
}

export default Skeleton
