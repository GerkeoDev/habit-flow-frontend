import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const mockGetOneHabit = vi.fn()

vi.mock('../utils/HTTPClient', () => ({
  default: vi.fn().mockImplementation(function () {
    return { getOneHabit: mockGetOneHabit }
  }),
}))

import DetailPage from '../pages/DetailPage'

const renderDetailPage = () => {
  return render(
    <AuthContext.Provider value={{ user: { userName: 'Test' }, setUser: vi.fn() }}>
      <MemoryRouter initialEntries={['/habits/123']}>
        <Routes>
          <Route path="/habits/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  )
}

const mockHabit = {
  _id: '123',
  title: 'Read 10 pages',
  frequency: 'daily',
  stats: {
    currentStreak: 5,
    bestStreak: 10,
    totalCompletions: 42,
    completedToday: false,
  },
  completedDates: ['2026-06-14', '2026-06-13'],
}

describe('DetailPage', () => {
  beforeEach(() => {
    mockGetOneHabit.mockResolvedValue({ data: mockHabit })
  })

  it('shows habit title', async () => {
    renderDetailPage()
    await waitFor(() => {
      expect(screen.getByText('Read 10 pages')).toBeInTheDocument()
    })
  })

  it('shows back button', async () => {
    renderDetailPage()
    await waitFor(() => {
      expect(screen.getByText('Back to Dashboard')).toBeInTheDocument()
    })
  })

  it('shows all 4 stat cards', async () => {
    renderDetailPage()
    await waitFor(() => {
      expect(screen.getByText('Current Streak')).toBeInTheDocument()
      expect(screen.getByText('Best Streak')).toBeInTheDocument()
      expect(screen.getByText('Total Completions')).toBeInTheDocument()
      expect(screen.getByText('Completed Today')).toBeInTheDocument()
    })
  })

  it('shows stat values', async () => {
    renderDetailPage()
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
    })
  })

  it('shows Mark Today button when not completed', async () => {
    renderDetailPage()
    await waitFor(() => {
      expect(screen.getByText('Mark Today')).toBeInTheDocument()
    })
  })

  it('shows Completed when already checked', async () => {
    mockGetOneHabit.mockResolvedValue({
      data: { ...mockHabit, stats: { ...mockHabit.stats, completedToday: true } },
    })
    renderDetailPage()
    await waitFor(() => {
      expect(screen.getByText('Completed ✓')).toBeInTheDocument()
    })
  })

  it('shows history section with dates', async () => {
    renderDetailPage()
    await waitFor(() => {
      expect(screen.getByText('History')).toBeInTheDocument()
      expect(screen.getByText('Jun 14, 2026')).toBeInTheDocument()
    })
  })
})
