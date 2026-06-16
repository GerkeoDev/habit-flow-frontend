import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Flame, CalendarCheck, TrendingUp, Zap, List, LayoutGrid } from 'lucide-react'
import dayjs from 'dayjs'
import HTTPClient from '../utils/HTTPClient'
import SideBar from '../components/SideBar'
import HabitForm from '../components/HabitForm'
import CreatedConfirmation from '../components/CreatedConfirmation'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Skeleton from '../components/ui/Skeleton'
import Toast from '../components/ui/Toast'
import { useToastStore } from '../store/toastStore'

const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const client = useMemo(() => new HTTPClient(), [])
  const { addToast } = useToastStore()

  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [createdConfirmation, setCreatedConfirmation] = useState(false)
  const [editingHabit, setEditingHabit] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode] = useState('card')

  useEffect(() => {
    const localDate = dayjs().format('YYYY-MM-DD')
    client.getAllHabits(localDate)
      .then(res => setHabits(res.data))
      .catch(() => addToast('Failed to load habits', 'error'))
      .finally(() => setLoading(false))
  }, [client, addToast])

  const createOrUpdateHabit = async (data) => {
    const localDate = dayjs().format('YYYY-MM-DD')
    if (editingHabit?._id) {
      try {
        await client.updateHabit(editingHabit._id, data, localDate)
        const res = await client.getOneHabit(editingHabit._id, localDate)
        setHabits(prev => prev.map(h => h._id === res.data._id ? res.data : h))
        setShowForm(false)
        setEditingHabit(null)
        addToast('Habit updated!', 'success')
      } catch {
        addToast('Failed to update habit', 'error')
      }
      return
    }
    try {
      const res = await client.createHabit(data, localDate)
      setHabits(prev => [...prev, res.data])
      setShowForm(false)
      setCreatedConfirmation(true)
      addToast('Habit created!', 'success')
    } catch {
      addToast('Failed to create habit', 'error')
    }
  }

  const deleteHabit = (id) => {
    if (!window.confirm('Are you sure you want to delete this habit?')) return
    client.deleteHabit(id)
      .then(() => {
        setHabits(prev => prev.filter(h => h._id !== id))
        addToast('Habit deleted', 'success')
      })
      .catch(() => addToast('Failed to delete habit', 'error'))
  }

  const checkHabit = (id) => {
    const localDate = dayjs().format('YYYY-MM-DD')
    client.checkHabit(id, localDate)
      .then(res => {
        setHabits(prev => prev.map(h => h._id === res.data._id ? res.data : h))
      })
      .catch(() => addToast('Failed to update habit', 'error'))
  }

  const timeOfDay = () => {
    const hour = dayjs().hour()
    if (hour < 12) return 'morning'
    if (hour < 17) return 'afternoon'
    return 'evening'
  }

  const filteredHabits = useMemo(() => {
    if (!searchQuery) return habits
    return habits.filter(h => h.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [habits, searchQuery])

  const totalHabits = habits.length
  const doneToday = habits.filter(h => h.stats?.completedToday).length
  const bestStreak = Math.max(...habits.map(h => h.stats?.currentStreak || 0), 0)
  const totalStreak = habits.reduce((sum, h) => sum + (h.stats?.currentStreak || 0), 0)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      <SideBar currentView="dashboard" />
      <div className="flex-1 p-4 pt-14 sm:p-6 sm:pt-0 lg:p-8">
        <Toast />

        {showForm && (
          <HabitForm
            initialData={{ title: editingHabit?.title || '' }}
            onClose={() => {
              setShowForm(false)
              setEditingHabit(null)
            }}
            onSubmitProp={createOrUpdateHabit}
          />
        )}

        {createdConfirmation && (
          <CreatedConfirmation setCreatedConfirmation={setCreatedConfirmation} />
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-white text-2xl font-semibold">
              Good {timeOfDay()}, {user?.userName}! 👋
            </h2>
            <p className="text-zinc-400 text-sm">{dayjs().format('dddd, MMMM D')}</p>
          </div>
          <Button variant="primary" onClick={() => { setEditingHabit(null); setShowForm(true) }}>
            <Plus size={18} />
            New Habit
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <Flame size={20} className="text-orange-400 mb-2" />
            <p className="text-2xl font-semibold text-white">{totalHabits}</p>
            <p className="text-zinc-400 text-xs">Total Habits</p>
          </Card>
          <Card>
            <CalendarCheck size={20} className="text-emerald-400 mb-2" />
            <p className="text-2xl font-semibold text-white">{doneToday}</p>
            <p className="text-zinc-400 text-xs">Done Today</p>
          </Card>
          <Card>
            <TrendingUp size={20} className="text-blue-400 mb-2" />
            <p className="text-2xl font-semibold text-white">{bestStreak}</p>
            <p className="text-zinc-400 text-xs">Best Streak</p>
          </Card>
          <Card>
            <Zap size={20} className="text-yellow-400 mb-2" />
            <p className="text-2xl font-semibold text-white">{totalStreak}</p>
            <p className="text-zinc-400 text-xs">Total Streak</p>
          </Card>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search habits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-3 text-white placeholder:text-zinc-500 outline-none transition duration-200 focus:border-white/20 focus:bg-white/10"
            />
          </div>
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'card' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {}}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {}}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : filteredHabits.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg">No habits yet. Create your first habit! 🎯</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-4">
              {filteredHabits.map(habit => (
                <motion.div
                  key={habit._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card
                    hover
                    onClick={() => navigate(`/habits/${habit._id}`)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-lg truncate">{habit.title}</p>
                      </div>
                      <Badge variant="fire">
                        <Flame size={14} />
                        {habit.stats?.currentStreak || 0} days
                      </Badge>
                      <input
                        type="checkbox"
                        checked={habit.stats?.completedToday || false}
                        className="w-5 h-5 accent-emerald-500 cursor-pointer shrink-0"
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => checkHabit(habit._id)}
                      />
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingHabit(habit)
                            setShowForm(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteHabit(habit._id)
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
