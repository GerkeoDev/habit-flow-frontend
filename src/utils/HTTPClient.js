import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL

let instance = null

class HTTPClient {
    constructor(){
        if (!instance) {
            instance = axios.create({
                baseURL: apiUrl,
                withCredentials: true
            })
        }
        this.instance = instance
    }

    me(){
        return this.instance.get('/me')
    }

    login(email, password){
        return this.instance.post('/login', {email, password})
    }

    register(data){
        return this.instance.post('/register', data)
    }

    logout(){
        return this.instance.post('/logout')
    }

    createHabit(data, localDate){
        return this.instance.post('/habits', data, {
            params: {localDate}
        })
    }

    getAllHabits(localDate){
        return this.instance.get('/habits', {
            params: {localDate}
        })
    }

    getOneHabit(id, localDate){
        return this.instance.get(`/habits/${id}`, {
            params: {localDate}
        })
    }

    updateHabit(id, data, localDate){
        return this.instance.put(`/habits/${id}`, data, {
            params: {localDate}
        })
    }

    deleteHabit(id){
        return this.instance.delete(`/habits/${id}`)
    }

    checkHabit(id, localDate){
        return this.instance.put(`/habits/${id}/check`, {localDate: localDate})
    }
}

export default HTTPClient