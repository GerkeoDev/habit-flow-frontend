import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AuthPage from '../pages/AuthPage'

describe('AuthPage', () => {
  describe('when logged in', () => {
    it('shows My Account heading', () => {
      render(
        <AuthContext.Provider value={{ user: { userName: 'Test' }, setUser: vi.fn() }}>
          <MemoryRouter>
            <AuthPage />
          </MemoryRouter>
        </AuthContext.Provider>
      )
      const accountElements = screen.getAllByText('My Account')
      expect(accountElements.length).toBeGreaterThanOrEqual(1)
    })

    it('shows Logout button', () => {
      render(
        <AuthContext.Provider value={{ user: { userName: 'Test' }, setUser: vi.fn() }}>
          <MemoryRouter>
            <AuthPage />
          </MemoryRouter>
        </AuthContext.Provider>
      )
      const logoutButtons = screen.getAllByText('Logout')
      expect(logoutButtons.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('when logged out', () => {
    it('shows Sign In and Register toggle buttons', () => {
      render(
        <AuthContext.Provider value={{ user: null, setUser: vi.fn() }}>
          <MemoryRouter>
            <AuthPage />
          </MemoryRouter>
        </AuthContext.Provider>
      )
      const signIn = screen.getAllByText('Sign In')
      expect(signIn.length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText('Register')).toBeInTheDocument()
    })

    it('shows Sign In form by default', () => {
      render(
        <AuthContext.Provider value={{ user: null, setUser: vi.fn() }}>
          <MemoryRouter>
            <AuthPage />
          </MemoryRouter>
        </AuthContext.Provider>
      )
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
    })

    it('switches to Register form when Register tab is clicked', async () => {
      render(
        <AuthContext.Provider value={{ user: null, setUser: vi.fn() }}>
          <MemoryRouter>
            <AuthPage />
          </MemoryRouter>
        </AuthContext.Provider>
      )
      await userEvent.click(screen.getByText('Register'))
      await screen.findByPlaceholderText('Enter your name')
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    })
  })
})
