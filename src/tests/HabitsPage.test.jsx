import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const mockGetAllHabits = vi.fn()

vi.mock('../utils/HTTPClient', () => ({
  default: vi.fn().mockImplementation(function () {
    return { getAllHabits: mockGetAllHabits }
  }),
}))

import HabitsPage from '../pages/HabitsPage'

const renderHabitsPage = () => {
  return render(
    <AuthContext.Provider value={{ user: { userName: 'Test' }, setUser: vi.fn() }}>
      <MemoryRouter>
        <HabitsPage />
      </MemoryRouter>
    </AuthContext.Provider>
  )
}

describe('HabitsPage', () => {
  beforeEach(() => {
    mockGetAllHabits.mockResolvedValue({ data: [] })
  })

  it('shows New Habit button', async () => {
    renderHabitsPage()
    await waitFor(() => {
      expect(screen.getByText('New Habit')).toBeInTheDocument()
    })
  })

  it('shows empty state when no habits', async () => {
    renderHabitsPage()
    await waitFor(() => {
      expect(screen.getByText('No habits found.')).toBeInTheDocument()
    })
  })

  it('renders habit cards when habits exist', async () => {
    mockGetAllHabits.mockResolvedValue({
      data: [
        {
          _id: '1',
          title: 'Exercise',
          stats: { currentStreak: 3, completedToday: true },
          completedDates: [],
        },
      ],
    })
    renderHabitsPage()
    await waitFor(() => {
      expect(screen.getByText('Exercise')).toBeInTheDocument()
    })
    expect(screen.getByText('3 days')).toBeInTheDocument()
  })
})
