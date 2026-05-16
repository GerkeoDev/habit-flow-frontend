import { useState } from "react"

const HabitForm = ({onSubmitProp, onClose, initialData}) => {
    const [form, setForm] = useState(initialData)
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        onSubmitProp(form)
        setForm({
            title: '',
            frequency: 'daily'
        })
    }
    const buttonStyle = "text-white w-full rounded-lg py-2 px-4 bg-black active:bg-gray-900 border border-white hover:border-black cursor-pointer transition duration-100"
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg">
                <h2>Create a new Habit</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <input type="text" name="title" onChange={handleChange} value={form.title} required placeholder="Habit" 
                            className="border border-gray-300 p-1 focus:outline-none rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <select name="frequency" onChange={handleChange} value={form.frequency} required placeholder="Frequency" 
                            className="border border-gray-300 p-1 focus:outline-none rounded-md"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button className={buttonStyle} onClick={onClose}>Close</button>
                        <button type="submit" className={buttonStyle} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HabitForm