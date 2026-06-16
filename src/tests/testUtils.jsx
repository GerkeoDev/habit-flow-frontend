import { render } from '@testing-library/react'
import { AuthContext } from '../context/AuthContext'
import { MemoryRouter } from 'react-router-dom'

const defaultUser = { userName: 'TestUser' }

export function renderWithProviders(ui, { user = defaultUser, ...options } = {}) {
  return {
    user,
    ...render(ui, {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ user, setUser: () => {} }}>
          <MemoryRouter>
            {children}
          </MemoryRouter>
        </AuthContext.Provider>
      ),
      ...options,
    }),
  }
}
