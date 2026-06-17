import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Select = forwardRef(({ className, label, error, options = [], placeholder, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-zinc-300 font-medium">{label}</label>}
      <select
        ref={ref}
        className={cn(
          'w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition duration-200 appearance-none',
          'focus:border-white/20 focus:bg-white/10',
          error ? 'border-red-500/50' : 'border-white/10',
          className
        )}
        {...props}
      >
        {placeholder && <option value="" className="bg-[#181825]">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-[#181825]">{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
})

Select.displayName = 'Select'
export default Select
