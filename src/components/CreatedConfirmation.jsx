const CreatedConfirmation = props => {
    const { setCreatedConfirmation } = props
    const buttonStyle = "text-white w-full rounded-lg py-2 px-4 bg-black hover:bg-gray-900 cursor-pointer transition duration-100"
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"> 
            <div className="bg-white p-8 rounded-lg">
                <h2>Habit created successfully!</h2>
                <button className={buttonStyle} onClick={() => setCreatedConfirmation(false)}>Close</button>
            </div>
        </div>
    )
}
export default CreatedConfirmation