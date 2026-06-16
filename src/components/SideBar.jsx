import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
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
    const [isOpen, setIsOpen] = useState(false)

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

    const closeSidebar = () => setIsOpen(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`
                    fixed
                    top-4
                    left-4
                    z-50
                    lg:hidden
                    bg-[#111827]/90
                    border border-white/10
                    backdrop-blur-xl
                    rounded-xl
                    p-2.5
                    text-white
                    cursor-pointer
                    hover:bg-white/10
                    transition
                    duration-200
                    ${isOpen ? 'hidden' : ''}
                `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            <div className={`
                    w-[230px]
                    bg-[#111827]/90
                    p-4
                    flex 
                    flex-col 
                    h-screen
                    backdrop-blur-xl
                    border-r border-white/10 
                    justify-between
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                    fixed
                    lg:sticky
                    top-0
                    left-0
                    z-50
                    transition-transform
                    duration-300
                    ease-in-out
                `}
            >
                <div className='py-4 px-3 flex gap-3 items-center'>
                    <div className='h-6 w-6 flex justify-center'><img src={logo} alt="Logo"/></div>
                    <div className='font-semibold text-white texl-lg tracking-tight'>HabitFlow</div>
                    <button
                        onClick={closeSidebar}
                        className="lg:hidden ml-auto text-gray-400 hover:text-white cursor-pointer transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div className='p-2 pt-0 flex flex-col justify-between h-full'>
                    <ul className='my-2 flex flex-col gap-2' onClick={closeSidebar}>
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
        </>
    )
}

export default SideBar