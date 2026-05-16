import { useState } from "react"
import HTTPClient from "../utils/HTTPClient"

const RegisterFormCmp = (props) => {
    const { changeCurrectView } = props
    
    const [dataForm, setDataForm] = useState({})

    const handleChange = e => {
        setDataForm({
            ...dataForm,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!dataForm.email || !dataForm.userName || !dataForm.password) return

        const client = new HTTPClient()
        client.register(dataForm)
            .then(() => client.login(dataForm.email, dataForm.password))
            .then(() => client.me())
            .then(res => console.log(res))
            .then(() => window.location.href = '/')
            .catch(err => console.log(err))

        setDataForm({})
    }

    const inputStyle = "border border-gray-300 rounded-md p-2"
    const buttonStyle = "text-white w-full cursor-pointer rounded-md p-2 border border-white hover:border-black bg-black hover:opacity-95 transition duration-300"
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="m-3 flex flex-col gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <input 
                        type="text" 
                        id="userName"
                        placeholder="Name"
                        className={inputStyle}
                        minLength={3}
                        value={dataForm.userName || ""}
                        onChange={handleChange}
                    />
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Email"
                        className={inputStyle}
                        value={dataForm.email || ""}
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password"
                        className={inputStyle}
                        minLength={8}
                        value={dataForm.password || ""}
                        onChange={handleChange}
                    />
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