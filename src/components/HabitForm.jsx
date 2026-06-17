import { useState } from 'react'
import Modal from './ui/Modal'
import Button from './ui/Button'
import Input from './ui/Input'

const HabitForm = ({ onClose, initialData, onSubmitProp }) => {
  const [title, setTitle] = useState(initialData?.title || '')

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="text-white text-lg font-semibold mb-1">
        {initialData?.title ? 'Update Habit' : 'Create Habit'}
      </h2>
      <p className="text-zinc-400 text-sm mb-4">
        {initialData?.title ? 'Edit your habit information.' : 'Start building a new daily habit.'}
      </p>
      <Input
        label="Habit Name"
        placeholder="Read 10 pages..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-3 mt-4">
        <Button variant="secondary" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSubmitProp({ title })} className="flex-1">
          Submit
        </Button>
      </div>
    </Modal>
  )
}

export default HabitForm
