import SideBar from '../SideBar'
import Toast from '../ui/Toast'
import { cn } from '../../utils/cn'

const AppLayout = ({ children, currentView, className }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      <SideBar currentView={currentView} />
      <main className={cn('flex-1 p-4 pt-14 sm:p-6 sm:pt-0 lg:p-8 overflow-auto', className)}>
        {children}
      </main>
      <Toast />
    </div>
  )
}

export default AppLayout
