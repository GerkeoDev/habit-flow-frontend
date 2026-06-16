import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HabitForm from '../components/HabitForm'

describe('HabitForm', () => {
  const defaultProps = {
    onSubmitProp: vi.fn(),
    onClose: vi.fn(),
    initialData: { title: '', frequency: 'daily' },
  }

  it('renders Create Habit title for new habit', () => {
    render(<HabitForm {...defaultProps} />)
    expect(screen.getByText('Create Habit')).toBeInTheDocument()
  })

  it('renders Update Habit title when editing', () => {
    render(<HabitForm {...defaultProps} initialData={{ title: 'Read', frequency: 'daily' }} />)
    expect(screen.getByText('Update Habit')).toBeInTheDocument()
  })

  it('renders habit name input', () => {
    render(<HabitForm {...defaultProps} />)
    expect(screen.getByPlaceholderText('Read 10 pages...')).toBeInTheDocument()
  })

  it('renders Close and Submit buttons', () => {
    render(<HabitForm {...defaultProps} />)
    expect(screen.getByText('Close')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('calls onClose when Close button is clicked', async () => {
    const onClose = vi.fn()
    render(<HabitForm {...defaultProps} onClose={onClose} />)
    await userEvent.click(screen.getByText('Close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onSubmitProp with form data on submit', async () => {
    const onSubmitProp = vi.fn()
    render(<HabitForm {...defaultProps} onSubmitProp={onSubmitProp} />)
    const input = screen.getByPlaceholderText('Read 10 pages...')
    await userEvent.type(input, 'Meditate')
    await userEvent.click(screen.getByText('Submit'))
    expect(onSubmitProp).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Meditate' })
    )
  })
})
