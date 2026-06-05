import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import HTTPClient from "../utils/HTTPClient"
import dayjs from "dayjs"
import SideBar from "../components/SideBar"
import HabitForm from "../components/HabitForm"
import CreatedConfirmation from "../components/CreatedConfirmation"

const HabitsPage = () => {

    const client = new HTTPClient()
    const navigate = useNavigate()

    const initialData = {
        title: '',
        frequency: 'daily'
    }
    const [habits, setHabits] = useState([])
    const [habit, setHabit] = useState(initialData)
    const [showForm, setShowForm] = useState(false)
    const [createdConfirmation, setCreatedConfirmation] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const localDate = dayjs().format('YYYY-MM-DD')
        client.getAllHabits(localDate)
            .then(res => setHabits(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])


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

    if(loading) return <div></div>

    return (
        <div className="flex flex-row">
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
            <SideBar currentView={'habits'}/>
            <div className="flex-1 p-8">
                <div>
                    <div>
                        <button className="
                            text-black
                            font-semibold
                            cursor-pointer 
                            w-full 
                            rounded-xl 
                            py-3
                            bg-white 
                            hover:opacity-90
                            active:scale-[0.98]
                            transition duration-200
                            shadow-[0_4px_16px_rgba(255,255,255,0.1)]
                            hover:shadow-[0_6px_20px_rgba(255,255,255,0.1)]
                        " onClick={() => setShowForm(!showForm)}>+ New Habit</button>
                    </div>
                </div>
                <ul className="mt-4 flex flex-col gap-4">
                    {habits.length === 0 && <li>Nothing to see here</li>}
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
                                    justify-between 
                                    items-center
                                    backdrop-blur-xl
                                    shadow-[0_8px_32px_rgba(255,255,255,0.03)]
                                    hover:shadow-[0_12px_40px_rgba(255,255,255,0.03)]
                                "
                            >   
                                <div className="flex justify-left gap-1 items-end text-sm w-1/3">
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
    )
}

export default HabitsPage