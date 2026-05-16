import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    return user ? children : <Navigate to='/account' />
}

const PublicRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    return user ? <Navigate to='/dashboard' /> : children
}

export { PrivateRoute, PublicRoute }