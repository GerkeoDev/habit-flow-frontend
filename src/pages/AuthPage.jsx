import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useState } from "react"
import HeaderCmp from "../components/HeaderCmp"
import LoginFormCmp from "../components/LoginFormCmp"
import RegisterFormCmp from "../components/RegisterFormCmp"
import HTTPClient from "../utils/HTTPClient"
import SideBar from "../components/SideBar"

const AuthPage = () => {
    const [currentView, setCurrentView] = useState('Sign In')
    const { user } = useContext(AuthContext)

    const handleLogout = () => {
        const client = new HTTPClient()
        client.logout()
            .then(res => {
                console.log(res.data.message)
                window.location.href = '/account'
            })
            .catch(err => console.log(err))
    }
    return user ? (
        <div className="flex">
            <SideBar currentView={'account'} />
            <div className="w-full">
                <div className="w-96 mx-auto flex flex-col gap-5 px-5 pt-10">
                    <h2 className="">My Account</h2>
                    <button 
                        className="text-white cursor-pointer hover:text-red-300 w-full rounded-md p-2 border hover:border-red-300 bg-black hover:scale-101 transition duration-300"
                        onClick={handleLogout}
                    >Logout</button>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <HeaderCmp />
            <div className="w-96 mx-auto">
                {
                    currentView === 'Sign In' ? (
                        <LoginFormCmp changeCurrectView={setCurrentView}/>
                    ) : (
                        <RegisterFormCmp changeCurrectView={setCurrentView}/>
                    )
                }
            </div>
            
        </div>
    )
}

export default AuthPage