import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { LayoutDashboard, CheckSquare, UserCircle, LogOut, Menu, X } from 'lucide-react'
import HTTPClient from '../utils/HTTPClient'
import { cn } from '../utils/cn'
import logo from '../assets/fire-icon-white.svg'

const SideBar = ({ currentView }) => {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      const client = new HTTPClient()
      client.logout()
        .then(res => {
          console.log(res.data.message)
          setUser(null)
          navigate('/account')
        })
        .catch(err => console.log(err))
    }
  }

  const closeSidebar = () => setIsOpen(false)

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard', to: '/dashboard' },
    { icon: CheckSquare, label: 'Habits', view: 'habits', to: '/habits' },
    { icon: UserCircle, label: 'My Account', view: 'account', to: '/account' },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed top-4 left-4 z-50 lg:hidden',
          'bg-[#181825]/90 border border-white/10 backdrop-blur-xl rounded-xl p-2.5 text-white',
          'hover:bg-white/10 transition duration-200 cursor-pointer',
          isOpen && 'hidden'
        )}
      >
        <Menu size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside className={cn(
        'w-[240px] bg-[#12121a]/90 backdrop-blur-xl border-r border-white/10',
        'flex flex-col h-screen p-4',
        'fixed lg:sticky top-0 left-0 z-50',
        'transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
      )}>
        <div className="py-4 px-3 flex gap-3 items-center">
          <img src={logo} alt="HabitFlow" className="w-6 h-6" />
          <span className="font-semibold text-white text-lg tracking-tight">HabitFlow</span>
          <button
            onClick={closeSidebar}
            className="lg:hidden ml-auto text-zinc-400 hover:text-white cursor-pointer transition duration-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-2 pt-0 flex flex-col justify-between h-full">
          <nav className="my-2 flex flex-col gap-2" onClick={closeSidebar}>
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = currentView === item.view
              return (
                <Link
                  key={item.view}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition duration-200',
                    isActive
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 transition duration-200 cursor-pointer w-full"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default SideBar
