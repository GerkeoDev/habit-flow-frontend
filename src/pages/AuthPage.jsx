import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, CheckCircle2 } from 'lucide-react'
import HeaderCmp from '../components/HeaderCmp'
import LoginFormCmp from '../components/LoginFormCmp'
import RegisterFormCmp from '../components/RegisterFormCmp'
import HTTPClient from '../utils/HTTPClient'
import SideBar from '../components/SideBar'
import Button from '../components/ui/Button'

const AuthPage = () => {
  const [currentView, setCurrentView] = useState('Sign In')
  const { user } = useContext(AuthContext)

  const client = new HTTPClient()

  const handleLogout = () => {
    client.logout()
      .then(() => {
        window.location.href = '/account'
      })
      .catch(console.log)
  }

  if (user) {
    return (
      <div className="flex min-h-screen bg-[#0f1115] text-white">
        <SideBar currentView={'account'} />
        <div className="flex-1 flex items-start justify-center p-4 sm:p-6">
          <div className="w-full max-w-md pt-8">
            <div className="bg-[#181825] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold">My Account</h2>
              <p className="text-sm text-zinc-400 mt-1 mb-6">Manage your session</p>
              <Button variant="danger" className="w-full" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      <HeaderCmp />
      <div className="flex min-h-[calc(100vh-57px)]">
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-12 bg-gradient-to-b from-emerald-500/5 to-transparent border-r border-white/10">
          <Flame className="text-emerald-400 mb-4" size={48} />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent mb-4">
            HabitFlow
          </h2>
          <p className="text-zinc-400 text-center max-w-md mb-8">
            Build better habits with HabitFlow. Track your daily progress, maintain streaks, and achieve your goals.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-zinc-300">
              <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
              <span>Track daily habits</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
              <span>Automatic streaks</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
              <span>Progress analytics</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-start justify-center p-6 pt-12">
          <div className="w-full max-w-md">
            <div className="flex mb-6 bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setCurrentView("Sign In")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  currentView === "Sign In"
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentView("Register")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  currentView === "Register"
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>
            <AnimatePresence mode="wait">
              {currentView === "Sign In" ? (
                <motion.div
                  key="Sign In"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoginFormCmp />
                </motion.div>
              ) : (
                <motion.div
                  key="Register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <RegisterFormCmp />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
