import Modal from './ui/Modal'
import Button from './ui/Button'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const CreatedConfirmation = ({ setCreatedConfirmation }) => {
  return (
    <Modal isOpen={true} onClose={() => setCreatedConfirmation(false)}>
      <div className="flex flex-col items-center gap-4 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 size={64} className="text-emerald-400" />
        </motion.div>
        <h2 className="text-white text-lg font-semibold text-center">Habit created!</h2>
        <p className="text-zinc-400 text-sm text-center">
          Your habit has been added to your dashboard.
        </p>
        <Button
          variant="primary"
          className="w-full mt-2"
          onClick={() => setCreatedConfirmation(false)}
        >
          Got it
        </Button>
      </div>
    </Modal>
  )
}

export default CreatedConfirmation
