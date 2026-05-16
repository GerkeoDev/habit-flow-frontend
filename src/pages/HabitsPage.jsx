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

    const checkedStyle = "w-5 h-5 border border-gray-300 rounded-full bg-green-500 cursor-pointer"
    const uncheckedStyle = "w-5 h-5 border border-gray-300 rounded-full cursor-pointer"
    const buttonStyle = "text-white w-full rounded-lg py-2 px-4 bg-black active:opacity-95 border border-white hover:border-black cursor-pointer transition duration-100"
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
            <div className="flex flex-col w-full p-5">
                <div>
                    <div>
                        <button className={buttonStyle} onClick={() => setShowForm(!showForm)}>+ New Habit</button>
                    </div>
                </div>
                <ul className="mt-3 flex flex-col border border-gray-300 rounded-md">
                    {habits.length === 0 && <li>Nothing to see here</li>}
                    {
                        habits?.map(habit => (
                            <li key={habit._id}
                                onClick={() => navigate(`/habits/${habit._id}`)}
                                className="p-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer active:scale-99 transition duration-200 flex justify-between items-center"
                            >   
                                <div className="flex justify-left gap-1 items-end text-sm w-1/3">
                                    <p>{habit.title}</p>
                                </div>
                                <div className="flex flex-col gap-1 items-end text-sm">
                                    <p>{habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}</p>
                                </div>
                                <div className="flex flex-col gap-1 items-end text-sm">
                                    <div>Streak</div>
                                    <div>{habit.stats.currentStreak} {habit.frequency === 'daily' ? 'days' : 'weeks'}</div>
                                </div>
                                <div className="flex justify-right gap-2 items-center text-sm">
                                    <input 
                                        type="checkbox" 
                                        checked={habit.stats.completedToday}
                                        className={habit.stats.completedToday ? checkedStyle : uncheckedStyle}
                                        onClick={e => e.stopPropagation()}
                                        onChange={() => checkHabit(habit._id)}
                                    />
                                    <button 
                                        className="text-gray-500 px-1.5 pb-0.5 rounded-sm hover:bg-black hover:text-white cursor-pointer transition duration-200"
                                        onClick={e => {
                                            e.stopPropagation()
                                            setHabit({...habit, id: habit._id})
                                            setShowForm(true)
                                        }}
                                    >Edit</button>
                                    <button 
                                        className="text-gray-500 px-2.5 pb-0.5 rounded-full hover:bg-black hover:text-white cursor-pointer transition duration-200"
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