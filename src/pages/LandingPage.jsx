import { Link } from "react-router-dom"
import HeaderCmp from "../components/HeaderCmp"

const LandingPage = () => {
    return (
        <div>
            <HeaderCmp />
            <div className="p-5 w-full flex justify-center text-white">
                <div className="w-full max-w-xl">
                    <div className="p-2 border-b border-white/10">
                        <h2>Welcome to HabitFlow</h2>
                        <p className="text-sm text-gray-500">
                            Manage your habits and track your progress every day.
                        </p>
                    </div>
                    <ul className="mt-5 flex flex-col border border-white/10 rounded-md bg-[#111827]/90">
                        <li className="p-4 border-b border-white/10 text-sm">
                            Track daily and weekly habits
                        </li>
                        <li className="p-4 border-b border-white/10 text-sm">
                            Automatic streak calculation
                        </li>
                        <li className="p-4 border-b border-white/10 text-sm">
                            View detailed history and progress
                        </li>
                        <li className="p-4 text-sm">
                            Simple, distraction-free interface
                        </li>
                    </ul>
                    <div className="mt-5">
                        <Link
                            to="/account"
                            className="
                                w-full
                                block
                                text-center
                                rounded-xl
                                bg-white
                                py-3
                                text-sm
                                font-semibold
                                text-black
                                transition
                                duration-200
                                hover:opacity-90
                                hover:scale-[1.01]
                                active:scale-[0.98]
                                cursor-pointer
                                shadow-[0_4px_16px_rgba(255,255,255,0.07)]
                                hover:shadow-[0_6px_20px_rgba(255,255,255,0.07)]
                            "
                        >Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage