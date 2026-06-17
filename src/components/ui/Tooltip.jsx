import { useState } from 'react'
import { cn } from '../../utils/cn'

const Tooltip = ({ content, children, className }) => {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className={cn(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap',
          'bg-zinc-800 text-zinc-200 border border-white/10 shadow-lg',
          'pointer-events-none z-50',
          className
        )}>
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 border-r border-b border-white/10 rotate-45 -mt-1" />
        </div>
      )}
    </div>
  )
}

export default Tooltip
