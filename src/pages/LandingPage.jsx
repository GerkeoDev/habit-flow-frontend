import { Link } from "react-router-dom"
import HeaderCmp from "../components/HeaderCmp"

const LandingPage = () => {
    return (
        <div>
            <HeaderCmp />
            <div className="p-5 w-full flex justify-center">
                <div className="w-full max-w-xl">
                    <div className="p-2 border-b border-gray-300">
                        <h2>Welcome to HabitFlow</h2>
                        <p className="text-sm text-gray-500">
                            Manage your habits and track your progress every day.
                        </p>
                    </div>
                    <ul className="mt-5 flex flex-col border border-gray-300 rounded-md">
                        <li className="p-4 border-b border-gray-300 text-sm">
                            Track daily and weekly habits
                        </li>
                        <li className="p-4 border-b border-gray-300 text-sm">
                            Automatic streak calculation
                        </li>
                        <li className="p-4 border-b border-gray-300 text-sm">
                            View detailed history and progress
                        </li>
                        <li className="p-4 text-sm">
                            Simple, distraction-free interface
                        </li>
                    </ul>
                    <div className="mt-5">
                        <Link
                            to="/account"
                            className="text-white w-full block text-center rounded-lg py-2 px-4 bg-black active:opacity-95 border border-white hover:border-black cursor-pointer transition duration-100"
                        >Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage