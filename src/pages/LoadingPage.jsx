import loader from '../assets/svgs/loader.svg'
const LoadingPage = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-white">
            <img src={loader} alt="Loader" className="w-10 h-10 animate-spin" />
        </div>
    )
}

export default LoadingPage