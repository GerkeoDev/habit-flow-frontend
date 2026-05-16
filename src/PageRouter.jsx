import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import { PublicRoute, PrivateRoute } from './components/RouteGuards'
import LandingPage from './pages/LandingPage'
import HTTPClient from './utils/HTTPClient'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import DetailPage from './pages/DetailPage'
import HabitsPage from './pages/HabitsPage'

const PageRouter = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const client = new HTTPClient()
    client.me()
      .then(res => setUser(res.data))
      .catch(() => {
        setUser(null)
        console.log('not logged in')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div></div>//<LoadingPage />

  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
          <BrowserRouter>
          <Routes>
            <Route 
              path='/' 
              element={<PublicRoute><LandingPage /></PublicRoute>} 
            />
            <Route 
              path='/account' 
              element={<AuthPage />} 
            />
            <Route 
              path='/dashboard' 
              element={<PrivateRoute><DashboardPage /></PrivateRoute>} 
            />
            <Route 
              path='/habits/' 
              element={<PrivateRoute><HabitsPage /></PrivateRoute>} 
            />
            <Route 
              path='/habits/:id' 
              element={<PrivateRoute><DetailPage /></PrivateRoute>} 
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default PageRouter
