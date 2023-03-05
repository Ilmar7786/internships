import axios from 'axios'
import * as process from "process";

const api = axios.create({
    baseURL: process.env.SERVER_URL
})

api.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

export { api }
