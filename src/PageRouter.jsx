import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthContext } from './context/AuthContext'
import { PublicRoute, PrivateRoute } from './components/RouteGuards'
import LandingPage from './pages/LandingPage'
import HTTPClient from './utils/HTTPClient'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import DetailPage from './pages/DetailPage'
import HabitsPage from './pages/HabitsPage'
import LoadingPage from './pages/LoadingPage'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
}

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.2,
}

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path='/' element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path='/account' element={<AuthPage />} />
          <Route path='/dashboard' element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path='/habits/' element={<PrivateRoute><HabitsPage /></PrivateRoute>} />
          <Route path='/habits/:id' element={<PrivateRoute><DetailPage /></PrivateRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

const PageRouter = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const client = new HTTPClient()
    client.me()
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setTimeout(() => setLoading(false), 800))
  }, [])

  if (loading) return <LoadingPage />

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default PageRouter
