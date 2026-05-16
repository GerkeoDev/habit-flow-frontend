import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import HTTPClient from '../utils/HTTPClient'
import logo from '../assets/fire-icon.svg'
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
        <div className="flex flex-col w-[185px] h-screen border-r border-gray-300 sticky top-0">
            <div className='py-6 flex gap-2 items-center justify-center text-xl'>
                <div className='h-6 w-6 flex justify-center'><img src={logo} alt="Logo"/></div>
                <div className='font-bold'>HabitFlow</div>
                <i></i>
            </div>
            <div className='p-2 pt-0 flex flex-col justify-between h-full'>
                <ul className='my-2 flex flex-col gap-2'>
                    <li>
                        <Link to="/dashboard" className={currentView === 'dashboard' ? 'active disabled buttonSideBar' : 'buttonSideBar'} >
                            <i className='h-4 w-4 flex justify-center'><img src={home} alt="Logo"/></i><span>Dashboard</span>
                        </Link>
                    </li>
                    <li>{/* Working on it */}
                        <Link to="/habits" className={currentView === 'habits' ? 'active disabled buttonSideBar' : 'buttonSideBar'}>
                            <i className='h-4 w-4 flex justify-center'><img src={fileCheck} alt="Logo"/></i><span>Habits</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account" className={currentView === 'account' ? 'active disabled buttonSideBar' : 'buttonSideBar'}>
                            <i className='h-4 w-4 flex justify-center'><img src={userSvg} alt="Logo"/></i><span>My account</span>
                        </Link>
                    </li>
                    
                </ul>
                <div>
                    <button 
                        className="buttonSideBar border border-gray-300" 
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