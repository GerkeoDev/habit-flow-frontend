import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import HTTPClient from '../utils/HTTPClient'
import logo from '../assets/fire-icon-white.svg'
import home from '../assets/svgs/home.svg'
import fileCheck from '../assets/svgs/file-check.svg'
import userSvg from '../assets/svgs/user.svg'
import logoutSvg from '../assets/svgs/logout.svg'

import '../styles/SideBar.css'


const SideBar = props => {
    const { currentView } = props
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        if(window.confirm('Are you sure you want to logout?')){
            const client = new HTTPClient()
            client.logout()
                .then(res => {
                    console.log(res.data.message)
                    setUser(null)
                    navigate('/account')
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className="
                w-[230px]
                bg-[#111827]/90
                p-4
                flex 
                flex-col 
                h-screen
                backdrop-blur-xl
                border-r border-white/10 
                justify-between
                sticky 
                top-0
            "
        >
            <div className='py-4 px-3 flex gap-3 items-center'>
                <div className='h-6 w-6 flex justify-center'><img src={logo} alt="Logo"/></div>
                <div className='font-semibold text-white texl-lg tracking-tight'>HabitFlow</div>
                <i></i>
            </div>
            <div className='p-2 pt-0 flex flex-col justify-between h-full'>
                <ul className='my-2 flex flex-col gap-2'>
                    <li>
                        <Link to="/dashboard" className={` 
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    px-4
                                    py-3
                                    text-sm
                                    transition
                                    duration-200
                                    hover:shadow-[0_6px_20px_rgba(255,255,255,0.07)]
                                    ${
                                        currentView === 'dashboard'
                                            ? 'bg-white/10 text-white border border-white/10 shadow-[0_4px_16px_rgba(255,255,255,0.07)]'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`
                                }>
                            <i className='h-4 w-4 flex justify-center'><img src={home} alt="Logo"/></i><span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/habits" className={` 
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    px-4
                                    py-3
                                    text-sm
                                    transition
                                    duration-200
                                    hover:shadow-[0_6px_20px_rgba(255,255,255,0.07)]
                                    ${
                                        currentView === 'habits'
                                            ? 'bg-white/10 text-white border border-white/10 shadow-[0_4px_16px_rgba(255,255,255,0.07)]'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`
                                }>
                            <i className='h-4 w-4 flex justify-center'><img src={fileCheck} alt="Logo"/></i><span>Habits</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account" className={` 
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    px-4
                                    py-3
                                    text-sm
                                    transition
                                    duration-200
                                    hover:shadow-[0_6px_20px_rgba(255,255,255,0.07)]
                                    ${
                                        currentView === 'account'
                                            ? 'bg-white/10 text-white border border-white/10 shadow-[0_4px_16px_rgba(255,255,255,0.07)]'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`
                                }>
                            <i className='h-4 w-4 flex justify-center'><img src={userSvg} alt="Logo"/></i><span>My account</span>
                        </Link>
                    </li>
                </ul>
                <div>
                    <button 
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            px-4
                            py-3
                            text-sm
                            text-red-300
                            hover:bg-red-500/10
                            transition
                            duration-200
                            cursor-pointer
                            hover:shadow-[0_6px_20px_rgba(255,0,0,0.07)]
                        " 
                        onClick={handleLogout}
                    >
                        <i className='h-4 w-4 flex justify-center'><img src={logoutSvg} alt="Logo"/></i><span>Logout</span>
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default SideBar