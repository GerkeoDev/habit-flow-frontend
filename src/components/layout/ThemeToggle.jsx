import { Moon, Sun } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useThemeStore } from '../../hooks/useTheme'
import { useEffect } from 'react'

const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition duration-200 cursor-pointer',
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default ThemeToggle
