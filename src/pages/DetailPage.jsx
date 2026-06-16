import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Flame, Trophy, CheckCircle2, Activity } from 'lucide-react'
import dayjs from 'dayjs'
import HTTPClient from '../utils/HTTPClient'
import SideBar from '../components/SideBar'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Skeleton from '../components/ui/Skeleton'
import Toast from '../components/ui/Toast'
import { useToastStore } from '../store/toastStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const DetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const client = useMemo(() => new HTTPClient(), [])

  const [habit, setHabit] = useState(null)
  const [loading, setLoading] = useState(true)

  const localDate = dayjs().format('YYYY-MM-DD')

  useEffect(() => {
    client.getOneHabit(id, localDate)
      .then(res => setHabit(res.data))
      .catch(() => {})
      .finally(() => setTimeout(() => setLoading(false), 800))
  }, [client, id, localDate])

  const checkToday = () => {
    client.checkHabit(id, localDate)
      .then(res => setHabit(res.data))
      .catch(() => {})
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex">
        <SideBar currentView='habits' />
        <div className="flex-1 p-4 pt-14 sm:p-6 sm:pt-0 lg:p-8">
          <Toast />
          <Skeleton className="h-10 w-40 mb-6" />
          <Skeleton className="h-32 w-full rounded-2xl mb-6" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!habit) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-bold text-zinc-600 mb-4">404</p>
          <p className="text-xl text-zinc-400 mb-6">Habit not found</p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const sortedDates = [...(habit.completedDates || [])].sort((a, b) => dayjs(b).diff(dayjs(a)))

  const last7Days = Array.from({ length: 7 }, (_, i) => dayjs().subtract(6 - i, 'day'))
  const chartData = last7Days.map(d => ({
    day: d.format('ddd'),
    date: d.format('YYYY-MM-DD'),
    completed: habit.completedDates?.includes(d.format('YYYY-MM-DD')) ? 1 : 0
  }))

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      <SideBar currentView='habits' />
      <div className="flex-1 p-4 pt-14 sm:p-6 sm:pt-0 lg:p-8">
        <Toast />

        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition mb-6 cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Dashboard</span>
        </button>

        <Card className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{habit.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="default">
                <Calendar size={14} className="inline mr-1" />
                {habit.frequency === 'weekly' ? 'Weekly' : 'Daily'}
              </Badge>
            </div>
          </div>
          <motion.button
            whileTap={habit.stats.completedToday ? undefined : { scale: 0.95 }}
            onClick={habit.stats.completedToday ? undefined : checkToday}
            disabled={habit.stats.completedToday}
            className={`
              inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition cursor-pointer
              ${habit.stats.completedToday
                ? 'bg-white/10 text-emerald-500 border border-emerald-500/30'
                : 'bg-white text-black hover:opacity-90'
              }
            `}
          >
            <CheckCircle2 size={18} />
            {habit.stats.completedToday ? 'Completed \u2713' : 'Mark Today'}
          </motion.button>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="p-5">
            <div className="bg-white/5 rounded-xl p-2 inline-flex">
              <Flame size={20} className="text-orange-400" />
            </div>
            <div className="text-3xl font-bold mt-3">{habit.stats.currentStreak}</div>
            <div className="text-sm text-zinc-400 mt-1">Current Streak</div>
          </Card>
          <Card className="p-5">
            <div className="bg-white/5 rounded-xl p-2 inline-flex">
              <Trophy size={20} className="text-amber-400" />
            </div>
            <div className="text-3xl font-bold mt-3">{habit.stats.bestStreak}</div>
            <div className="text-sm text-zinc-400 mt-1">Best Streak</div>
          </Card>
          <Card className="p-5">
            <div className="bg-white/5 rounded-xl p-2 inline-flex">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-bold mt-3">{habit.stats.totalCompletions}</div>
            <div className="text-sm text-zinc-400 mt-1">Total Completions</div>
          </Card>
          <Card className="p-5">
            <div className="bg-white/5 rounded-xl p-2 inline-flex">
              <Activity size={20} className="text-blue-400" />
            </div>
            <div className="text-3xl font-bold mt-3">{habit.stats.completedToday ? 'Yes' : 'No'}</div>
            <div className="text-sm text-zinc-400 mt-1">Completed Today</div>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Last 7 Days</h2>
          <Card className="p-4 border border-white/10 rounded-2xl bg-[#181825]">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#2a2a3e" vertical={false} />
                <XAxis dataKey="day" stroke="#6b6b80" tick={{ fill: '#a0a0b8', fontSize: 12 }} />
                <YAxis hide={true} />
                <Tooltip
                  contentStyle={{ background: '#1e1e2e', border: '1px solid #2a2a3e', borderRadius: '8px', color: '#fff' }}
                  labelStyle={{ color: '#a0a0b8' }}
                />
                <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.completed ? '#10b981' : '#2a2a3e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">History</h2>
          <div className="bg-[#181825] rounded-2xl border border-white/10 overflow-hidden">
            {sortedDates.length > 0 ? (
              sortedDates.map((date, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-white/5 flex justify-between items-center hover:bg-white/[0.02] transition"
                >
                  <span className="text-zinc-300">{dayjs(date).format('MMM D, YYYY')}</span>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-zinc-400">
                No completions yet. Start today! <span role="img" aria-label="fire">🔥</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DetailPage
