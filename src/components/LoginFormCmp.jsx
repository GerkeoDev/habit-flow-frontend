import { useState } from "react"
import HTTPClient from "../utils/HTTPClient"

const LoginFormCmp = () => {
    
    const [dataForm, setDataForm] = useState({})
    const [formErrors, setFormErrors] = useState({})

    const handleChange = e => {
        setDataForm({
            ...dataForm,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!dataForm.email || !dataForm.password) {
            setFormErrors({ message: "Missing required fields" })
            return
        }

        const client = new HTTPClient()
        client.login(dataForm.email, dataForm.password)
            .then(() => client.me())
            .then(res => console.log(res))
            .then(() => {
                setDataForm({})
                window.location.href = '/'
            })
            .catch(err => {
                setFormErrors(err.response?.data?.errors || { message: 'Server error' })
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="m-3 flex flex-col gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <div>
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}*</p>}
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Email"
                            className="
                                w-full
                                rounded-xl
                                border border-white/10
                                bg-white/5
                                px-4
                                py-3
                                text-white
                                placeholder:text-gray-500
                                outline-none
                                transition
                                duration-200
                                focus:border-white/20
                                focus:bg-white/10
                            "
                            value={dataForm.email || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}*</p>}
                        <input 
                            type="password" 
                            id="password"
                            placeholder="Password"
                            className="
                                w-full
                                rounded-xl
                                border border-white/10
                                bg-white/5
                                px-4
                                py-3
                                text-white
                                placeholder:text-gray-500
                                outline-none
                                transition
                                duration-200
                                focus:border-white/20
                                focus:bg-white/10
                            "
                            minLength={8}
                            value={dataForm.password || ""}
                            onChange={handleChange}
                        />
                    </div>
                    {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}*</p>}
                </div>
                <button 
                    type="submit" 
                    className="
                        text-black
                        font-semibold
                        cursor-pointer 
                        w-full 
                        rounded-xl 
                        py-3 
                        border hover:border-white 
                        bg-white 
                        hover:opacity-90
                        active:scale-[0.98]
                        transition duration-200
                        shadow-[0_8px_32px_rgba(255,255,255,0.1)]
                        hover:shadow-[0_12px_40px_rgba(255,255,255,0.1)]
                    "
                >Sign In</button>
            </form>
            
        </div>
    )
}

export default LoginFormCmp