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
        })
    }
    const isEditing = initialData.title !== ''
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#111827]/90 p-6 rounded-3xl border border-white/10 w-full max-w-md backdrop-blur-xl shadow-2xl mx-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="pb-4">
                        <h2 className="text-white">{isEditing ? 'Update Habit' : 'Create Habit'}</h2>
                        <label className="text-gray-400 text-sm">{isEditing ? 'Edit your habit information.' : 'Start building a new daily habit.'}</label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-300 text-sm">Habit Name</label>
                        <input type="text" name="title" onChange={handleChange} value={form.title} required placeholder="Read 10 pages..." 
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
                        />
                    </div>
                    <div className="flex gap-3 mt-2">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="
                                w-full
                                rounded-xl
                                border border-white/10
                                bg-white/5
                                py-3
                                text-sm
                                font-medium
                                text-gray-300
                                transition
                                duration-200
                                hover:bg-white/10
                                hover:text-white
                                cursor-pointer
                                shadow-[0_4px_16px_rgba(255,255,255,0.07)]
                                hover:shadow-[0_6px_20px_rgba(255,255,255,0.07)]
                            "
                        >Close</button>
                        <button 
                            type="submit" 
                            className="
                                w-full
                                rounded-xl
                                bg-white
                                py-3
                                text-sm
                                font-semibold
                                text-black
                                transition
                                duration-200
                                hover:opacity-90
                                active:scale-[0.98]
                                cursor-pointer
                                shadow-[0_4px_16px_rgba(255,255,255,0.07)]
                                hover:shadow-[0_6px_20px_rgba(255,255,255,0.07)]
                            "
                        >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HabitForm