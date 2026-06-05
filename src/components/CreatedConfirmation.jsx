const CreatedConfirmation = props => {
    const { setCreatedConfirmation } = props
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"> 
            <div className="bg-[#111827]/90 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl w-full max-w-sm text-center">
                <h2 className="text-white">Habit created successfully!✅</h2>
                <div className="text-gray-400 text-sm mb-6">Your habit has been added to your dashboard.</div>
                <button className=" 
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
                        " onClick={() => setCreatedConfirmation(false)}>Close</button>
            </div>
        </div>
    )
}
export default CreatedConfirmation