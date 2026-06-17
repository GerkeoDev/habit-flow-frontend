import { cn } from '../../utils/cn'

const Card = ({ className, children, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-[#181825] border border-white/10 rounded-2xl p-5 backdrop-blur-xl transition-all duration-200',
        hover && 'hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(255,255,255,0.03)] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
