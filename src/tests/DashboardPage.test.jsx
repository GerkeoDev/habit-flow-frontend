import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const mockGetAllHabits = vi.fn()

vi.mock('../utils/HTTPClient', () => ({
  default: vi.fn().mockImplementation(function () {
    return { getAllHabits: mockGetAllHabits }
  }),
}))

import DashboardPage from '../pages/DashboardPage'

const renderDashboard = () => {
  return render(
    <AuthContext.Provider value={{ user: { userName: 'TestUser' }, setUser: vi.fn() }}>
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    </AuthContext.Provider>
  )
}

describe('DashboardPage', () => {
  beforeEach(() => {
    mockGetAllHabits.mockResolvedValue({ data: [] })
  })

  it('shows greeting with user name', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText(/Hello, TestUser/)).toBeInTheDocument()
    })
  })

  it('shows subtitle text', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Here you can manage your habits')).toBeInTheDocument()
    })
  })

  it('shows + New Habit button', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('+ New Habit')).toBeInTheDocument()
    })
  })

  it('shows Your habits heading', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Your habits')).toBeInTheDocument()
    })
  })

  it('shows empty state when no habits', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Nothing to see here')).toBeInTheDocument()
    })
  })

  it('renders habit cards when habits exist', async () => {
    mockGetAllHabits.mockResolvedValue({
      data: [
        {
          _id: '1',
          title: 'Read 10 pages',
          stats: { currentStreak: 5, completedToday: false },
          completedDates: [],
        },
      ],
    })
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Read 10 pages')).toBeInTheDocument()
    })
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })
})
