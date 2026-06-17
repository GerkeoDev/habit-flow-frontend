import { Link } from 'react-router-dom'
import logo from '../../assets/fire-icon-white.svg'
import { cn } from '../../utils/cn'
import ThemeToggle from './ThemeToggle'

const HeaderCmp = ({ className }) => {
  return (
    <header className={cn(
      'sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl',
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-2.5 text-white font-semibold text-lg">
          <img src={logo} alt="HabitFlow" className="w-6 h-6" />
          <span className="tracking-tight">HabitFlow</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-zinc-400 hover:text-white transition duration-200">Home</Link>
          <Link to="/account" className="text-zinc-400 hover:text-white transition duration-200">Login</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export default HeaderCmp
