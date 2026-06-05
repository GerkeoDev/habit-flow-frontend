import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import HTTPClient from "../utils/HTTPClient"
import SideBar from "../components/SideBar"
import LoadingPage from "./LoadingPage"

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
            .finally(() => setTimeout(() => setLoading(false), 800))
    }, [])

    const checkToday = () => {
        client.checkHabit(id, localDate)
            .then(res => setHabit(res.data))
            .catch(err => console.log(err))
    }

    if (loading) return <LoadingPage />

    if (!habit) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
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
        <div className="min-h-screen bg-[#0f1115] text-white flex">
        <SideBar currentView={'habits'}/>

        <div className="flex-1 p-8">
            <div className="p-2">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-gray-400 hover:text-white transition duration-200 cursor-pointer"
                >
                    ← Back
                </button>
            </div>
            <div className="
                bg-[#111827]/90
                border border-white/10
                rounded-3xl
                p-6
                flex justify-between items-center
                backdrop-blur-xl
                shadow-[0_8px_32px_rgba(255,255,255,0.03)]
            ">
                <div>
                    <h2 className="text-white">
                        {habit.title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Daily habit
                    </p>
                </div>
                <div>
                    <button
                        onClick={checkToday}
                        disabled={habit.stats.completedToday}
                        className={`
                            rounded-xl
                            px-5
                            py-3
                            font-semibold
                            transition
                            duration-200
                            active:scale-[0.98]
                            cursor-pointer

                            ${
                            habit.stats.completedToday
                            ? "bg-green-500 text-white shadow-[0_4px_32px_rgba(0,255,255,0.3)]"
                            : "bg-white text-black hover:opacity-90 shadow-[0_4px_32px_rgba(255,255,255,0.1)]"
                            }
                        `}
                    >
                        {habit.stats.completedToday ? 'Completed today' : 'Mark today ✓'}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="
                    bg-[#111827]/90
                    border border-white/10
                    rounded-3xl
                    p-5
                ">
                    <div className="text-xs text-gray-500 uppercase">
                        Current Streak
                    </div>
                    <div className="text-2xl font-semibold mt-2">
                        {habit.stats.currentStreak}
                    </div>
                </div>

                <div className="
                    bg-[#111827]/90
                    border border-white/10
                    rounded-3xl
                    p-5
                ">
                    <div className="text-xs text-gray-500 uppercase">
                        Best streak
                    </div>
                    <div className="text-2xl font-semibold mt-2">
                        {habit.stats.bestStreak}
                    </div>
                </div>

                <div className="
                    bg-[#111827]/90
                    border border-white/10
                    rounded-3xl
                    p-5
                ">
                    <div className="text-xs text-gray-500 uppercase">
                        Total completions
                    </div>
                    <div className="text-2xl font-semibold mt-2">
                        {habit.stats.totalCompletions}
                    </div>
                </div>

                <div className="
                    bg-[#111827]/90
                    border border-white/10
                    rounded-3xl
                    p-5
                ">
                    <div className="text-xs text-gray-500 uppercase">
                        Completed today
                    </div>
                    <div className="text-2xl font-semibold mt-2">
                        {habit.stats.completedToday ? 'Yes✅' : 'No❌'}
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="text-white mb-4">
                    History
                </div>
                <ul className="
                    bg-[#111827]/90
                    border border-white/10
                    rounded-3xl
                    overflow-hidden
                ">
                    {sortedDates.map((date, index) => (
                        <li
                            key={index}
                            className="
                                p-4
                                border-b
                                border-white/5
                                flex
                                justify-between
                                items-center
                                hover:bg-white/[0.03]
                                transition
                            "
                        >
                            <span>{dayjs(date).format('YYYY-MM-DD')}</span>
                            <span className="
                                bg-[rgba(0,255,255,0.05)]
                                shadow-[0_2px_16px_rgba(0,255,255,0.1)]
                                rounded-xl
                            ">✅</span>
                        </li>
                    ))}
                    {
                        sortedDates.length === 0 && <div
                            className="
                                bg-[#111827]/90
                                border border-white/10
                                rounded-3xl
                                p-10
                                text-center
                                text-gray-400
                            "
                        >
                            No completions yet.
                        </div>
                    }
                </ul>
            </div>

        </div>
    </div>
    )
}

export default DetailPage