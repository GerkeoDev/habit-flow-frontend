import { useState } from "react"
import HTTPClient from "../utils/HTTPClient"
import AuthValidation from "../utils/AuthValidation"

const RegisterFormCmp = (props) => {
    const { changeCurrectView } = props
    
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
        const missingFields = !dataForm.email || !dataForm.userName || !dataForm.password

        if (missingFields) {
            setFormErrors({
                message: "Missing required fields"
            })
            return
        }

        const errors = AuthValidation(dataForm)

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        const client = new HTTPClient()
        client.register(dataForm)
            .then(() => client.login(dataForm.email, dataForm.password))
            .then(() => client.me())
            .then(() => {
                setDataForm({})
                window.location.href = '/'
            })
            .catch(err => {
                setFormErrors(err.response?.data?.errors || { message: 'Server error' })
            })
        
    }

    const inputStyle = "border border-gray-300 rounded-md p-2 w-full focus:outline-none"
    const buttonStyle = "text-white w-full cursor-pointer rounded-md p-2 border border-white hover:border-black bg-black hover:opacity-95 transition duration-300"
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="m-3 flex flex-col gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <div>
                        {formErrors.userName && <p className="text-red-500 text-sm">{formErrors.userName}*</p>}
                        <input 
                            type="text" 
                            id="userName"
                            placeholder="Name"
                            className={inputStyle}
                            value={dataForm.userName || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}*</p>}
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Email"
                            className={inputStyle}
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
                            className={inputStyle}
                            value={dataForm.password || ""}
                            onChange={handleChange}
                        />
                    </div>
                    {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
                </div>
                <button type="submit" className={buttonStyle}>Register</button>
            </form>
            <hr className="m-3"/>
            <div className="flex flex-col gap-4 m-3">
                <p className="text-sm">Do you have an account?</p>
                <button onClick={() => changeCurrectView('Sign In')} className={buttonStyle}>Sign In</button>
            </div>
        </div>
    )
}

export default RegisterFormCmp