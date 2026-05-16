import { Link } from "react-router-dom"
import logo from '../assets/fire-icon.svg'

const HeaderCmp = () => {
    return (
        <div className="border-b border-gray-300 mb-4">
            <div className="flex justify-between items-center p-5">
                <Link to="/" className="text-sm flex gap-2">
                    <div className='h-5 w-5 flex justify-center'><img src={logo} alt="Logo"/></div>
                    HabitFlow
                </Link>

                <div className="flex gap-6 text-sm">
                    <Link to="/">Home</Link>
                    {/* <Link to="/about">About</Link> */}
                    <Link to="/account">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default HeaderCmp