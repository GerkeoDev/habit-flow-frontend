import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import SideBar from '../components/SideBar'

const renderSideBar = (currentView = 'dashboard') => {
  return render(
    <AuthContext.Provider value={{ user: { userName: 'Test' }, setUser: vi.fn() }}>
      <MemoryRouter>
        <SideBar currentView={currentView} />
      </MemoryRouter>
    </AuthContext.Provider>
  )
}

describe('SideBar', () => {
  it('renders navigation links', () => {
    renderSideBar()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Habits')).toBeInTheDocument()
    expect(screen.getByText('My Account')).toBeInTheDocument()
  })

  it('renders Logout button', () => {
    renderSideBar()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('highlights the current view link', () => {
    renderSideBar('dashboard')
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink?.className).toContain('bg-white/10')
  })

  it('renders hamburger button for mobile', () => {
    renderSideBar()
    const hamburger = document.querySelector('.lucide-menu')
    expect(hamburger).toBeInTheDocument()
  })
})
