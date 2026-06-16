import { useContext, useEffect, useMemo, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

import SideBar from "../components/SideBar"
import HTTPClient from "../utils/HTTPClient"
import HabitForm from "../components/HabitForm"
import dayjs from "dayjs"
import CreatedConfirmation from "../components/CreatedConfirmation"

const DashboardPage = () => {
    const initialData = {
        title: '',
        frequency: 'daily'
    }
    const [showForm, setShowForm] = useState(false)
    const [createdConfirmation, setCreatedConfirmation] = useState(false)
    const [habit, setHabit] = useState(initialData)
    const [habits, setHabits] = useState([])
    const [loading, setLoading] = useState(true)

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const client = useMemo(() => new HTTPClient(), [])

    useEffect(() => {
        const localDate = dayjs().format('YYYY-MM-DD')
        client.getAllHabits(localDate)
            .then(res => setHabits(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [client])

    const createOrUpdateHabit = async (data) => {
        const localDate = dayjs().format('YYYY-MM-DD')
        if (habit._id) {
            await client.updateHabit(habit._id, data, localDate)
                .then(() => {
                    client.getOneHabit(habit._id, localDate)
                        .then(res => setHabits(prev => prev.map(habit => habit._id === res.data._id ? res.data : habit)))
                        .catch(err => console.log(err))
                })
                .then(() => {
                    setShowForm(false)
                    setHabit(initialData)
                })
                .catch(err => console.log(err))
            return
        }
        client.createHabit(data, localDate)
            .then(res => setHabits(prev => [...prev, res.data]))
            .then(() => {
                setShowForm(false)
                setCreatedConfirmation(true)
            })
            .catch(err => console.log(err))
    }

    const deleteHabit = (id) => {
        window.confirm('Are you sure you want to delete this habit?') &&
        client.deleteHabit(id)
            .then(() => setHabits(prev => prev.filter(habit => habit._id !== id)))
            .catch(err => console.log(err))
    }

    const checkHabit = (id) => {
        const localDate = dayjs().format('YYYY-MM-DD')
        client.checkHabit(id, localDate)
            .then(res => {
                setHabits(prev => prev.map(habit => habit._id === res.data._id ? res.data : habit))
            })
            .catch(err => console.log(err))
    }

    if (loading) return <div></div>

    return (
        <div className="min-h-screen bg-[#0f1115] text-white flex flex-row">
            {
                showForm && <HabitForm 
                    initialData={habit}
                    onClose={()=> {
                        setShowForm(false)
                        setHabit(initialData)}}
                    onSubmitProp={createOrUpdateHabit}
                />
            }
            {
                createdConfirmation && <CreatedConfirmation setCreatedConfirmation={setCreatedConfirmation} />
            }
            <SideBar currentView={'dashboard'}/>
            <div className="flex-1 p-4 pt-14 sm:p-6 sm:pt-0 lg:p-8">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <div>
                        <h2>Hello, {user?.userName}!👋</h2>
                        <p className="text-sm text-gray-400">Here you can manage your habits</p>
                    </div>
                    <div>
                        <button 
                            className="
                                text-black 
                                rounded-xl 
                                font-semibold text-sm 
                                py-3 px-5 
                                active:scale-[0.98] 
                                bg-white 
                                hover:opacity-90 
                                cursor-pointer 
                                transition duration-100
                                shadow-[0_8px_32px_rgba(255,255,255,0.1)]
                                hover:shadow-[0_12px_40px_rgba(255,255,255,0.1)]
                        " onClick={() => setShowForm(!showForm)}>+ New Habit</button>
                    </div>
                </div>
                <div className="w-full">
                    <div>
                        <p>Your habits</p>
                    </div>
                    <ul className="mt-4 flex flex-col gap-4">
                        {habits.length === 0 && <li className="text-sm text-gray-400">Nothing to see here</li>}
                        {
                            habits?.map(habit => (
                                <li key={habit._id}
                                    onClick={() => navigate(`/habits/${habit._id}`)}
                                    className="
                                        bg-white/5
                                        p-5
                                        rounded-3xl
                                        border border-white/10
                                        hover:bg-white/[0.07] 
                                        cursor-pointer
                                        transition 
                                        duration-200 
                                        flex 
                                        flex-col
                                        sm:flex-row
                                        justify-between 
                                        items-start
                                        sm:items-center
                                        gap-4
                                        backdrop-blur-xl
                                        shadow-[0_8px_32px_rgba(255,255,255,0.03)]
                                        hover:shadow-[0_12px_40px_rgba(255,255,255,0.03)]
                                    "
                                >   
                                    <div className="flex justify-left gap-1 items-end text-sm w-full sm:w-1/3">
                                        <p className="text-white font-medium text-lg">
                                            {habit.title}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-gray-500 uppercase tracking-wide">Streak</span>
                                        <span className="text-white font-semibold">{habit.stats.currentStreak} days</span>
                                    </div>
                                    <div className="flex justify-right gap-3 items-center text-sm">
                                        <input 
                                            type="checkbox" 
                                            checked={habit.stats.completedToday}
                                            className="w-5 h-5 accent-green-500 cursor-pointer"
                                            onClick={e => e.stopPropagation()}
                                            onChange={() => checkHabit(habit._id)}
                                        />
                                        <button 
                                            className="
                                                border border-white/5
                                                bg-white/5
                                                text-gray-300 
                                                px-3 py-2
                                                rounded-xl
                                                hover:bg-white/10
                                                hover:text-white 
                                                cursor-pointer 
                                                transition 
                                                duration-200
                                                active:scale-[0.98]
                                            "
                                            onClick={e => {
                                                e.stopPropagation()
                                                setHabit({...habit, id: habit._id})
                                                setShowForm(true)
                                            }}
                                        >Edit</button>
                                        <button 
                                            className="
                                                text-red-300
                                                bg-red-500/5
                                                border border-red-500/10
                                                px-3 py-2 
                                                rounded-xl 
                                                hover:bg-red-500/10 
                                                cursor-pointer 
                                                transition 
                                                duration-200
                                                active:scale-[0.98]
                                            "
                                            onClick={e => {
                                                e.stopPropagation()
                                                deleteHabit(habit._id)
                                            }}
                                        >x</button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

export default DashboardPage