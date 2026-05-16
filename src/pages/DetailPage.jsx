import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import HTTPClient from "../utils/HTTPClient"
import SideBar from "../components/SideBar"
import check from '../assets/svgs/circle-check.svg'
import x from '../assets/svgs/x.svg'

const DetailPage = () => {
    const { id } = useParams()
    
    const client = new HTTPClient()
    const navigate = useNavigate()

    const [ habit, setHabit ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    const localDate = dayjs().format('YYYY-MM-DD')

    useEffect(() => {
        client.getOneHabit(id, localDate)
            .then(res => setHabit(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    const checkToday = () => {
        client.checkHabit(id, localDate)
            .then(res => setHabit(res.data))
            .catch(err => console.log(err))
    }

    if (loading) return <div></div>

    if (!habit) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                <p className="text-9xl">404</p>
                <h1>Page Not Found</h1>
                <p> The page you are looking for does not exist.</p>
            </div>
        )
    }

    const sortedDates = [...habit.completedDates].sort((a, b) =>
        dayjs(b).diff(dayjs(a))
    )
    
    return(
        <div className="flex flex-row">
        <SideBar currentView={'habits'}/>

        <div className="content p-5 w-full">
            <div className="p-2">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-gray-500 hover:text-black cursor-pointer"
                >
                    ← Back
                </button>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-300">
                <div>
                    <h2>{habit.title}</h2>
                    <p className="text-sm capitalize">{habit.frequency} habit</p>
                </div>

                <div>
                    <button
                        onClick={checkToday}
                        disabled={habit.stats.completedToday}
                        className={`text-white rounded-lg py-2 px-4 border border-white hover:border-black cursor-pointer transition duration-100
                            ${habit.stats.completedToday ? 'bg-green-600 cursor-not-allowed' : 'bg-black active:opacity-95'}
                        `}
                    >
                        {habit.stats.completedToday ? 'Completed today' : 'Mark today ✓'}
                    </button>
                </div>
            </div>
            <div className="mt-5 border border-gray-300 rounded-md">
                <div className="p-4 border-b border-gray-300 flex justify-between text-sm">
                    <span>Current streak</span>
                    <span>{habit.stats.currentStreak} {habit.frequency === 'daily' ? 'days' : 'weeks'}</span>
                </div>
                <div className="p-4 border-b border-gray-300 flex justify-between text-sm">
                    <span>Best streak</span>
                    <span>{habit.stats.bestStreak}</span>
                </div>
                <div className="p-4 border-b border-gray-300 flex justify-between text-sm">
                    <span>Total completions</span>
                    <span>{habit.stats.totalCompletions}</span>
                </div>
                <div className="p-4 flex justify-between text-sm">
                    <span>Completed today</span>
                    <span>{habit.stats.completedToday ? <div className='h-6 w-6 flex flex-row justify-center'>Yes <img src={check} alt="Logo"/></div>: <div className='h-6 w-6 flex flex-row justify-center'>No <img src={x} alt="Logo"/></div>}</span>
                </div>
            </div>
            <div className="mt-5">
                <p className="p-2">History</p>
                <ul className="flex flex-col border border-gray-300 rounded-md">
                    {sortedDates.map((date, index) => (
                        <li
                            key={index}
                            className="p-4 border-b border-gray-300 flex justify-between items-center text-sm"
                        >
                            <span>{dayjs(date).format('YYYY-MM-DD')}</span>
                            <span><i className='h-6 w-6 flex justify-center'><img src={check} alt="Logo"/></i></span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    </div>
    )
}

export default DetailPage