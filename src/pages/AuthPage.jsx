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

    const client = new HTTPClient()

    const handleLogout = () => {
        client.logout()
            .then(() => {
                window.location.href = '/account'
            })
            .catch(console.log)
    }
    return user ? (
        <div className="flex min-h-screen bg-[#0f1115] text-white">
            <SideBar currentView={'account'} />
            <div className="flex-1 flex items-top justify-center p-4 sm:p-6">
                <div className="w-full max-w-md">
                    <div className="bg-[#111827]/90 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
                        <h2>My Account</h2>
                        <div className="text-sm text-gray-400 mb-6">Manage your session</div>
                        <button 
                            className="
                                text-red-300
                                font-semibold
                                cursor-pointer 
                                w-full 
                                rounded-xl 
                                py-3
                                bg-red-500/10
                                hover:opacity-90
                                hover:scale-[1.01]
                                active:scale-[0.98]
                                transition duration-200
                                shadow-[0_4px_16px_rgba(255,0,0,0.07)]
                                hover:shadow-[0_6px_20px_rgba(255,0,0,0.1)]
                            "
                            onClick={handleLogout}
                        >Logout</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <HeaderCmp />
            <div className="min-h-screen bg-[#0f1115] text-white flex flex-col">
            <div className="flex-1 flex items-top justify-center p-4 sm:p-6">
                <div className="w-full max-w-md">
                    <div className="bg-[#111827]/90 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
                        <div className="flex mb-6 bg-white/5 rounded-xl p-1">
                            <button
                                onClick={() => setCurrentView("Sign In")}
                                className={`flex-1 py-2 rounded-lg text-sm transition ${
                                    currentView === "Sign In"
                                        ? "bg-white text-black"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Sign In
                            </button>

                            <button
                                onClick={() => setCurrentView("Register")}
                                className={`flex-1 py-2 rounded-lg text-sm transition ${
                                    currentView === "Register"
                                        ? "bg-white text-black"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Register
                            </button>
                        </div>
                        {currentView === "Sign In" ? (
                            <LoginFormCmp/>
                        ) : (
                            <RegisterFormCmp/>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AuthPage