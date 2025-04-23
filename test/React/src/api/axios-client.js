import axios from "axios";

const axiosClient = axios.create({
    // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
    baseURL: 'http://localhost:8001/'
})


export default axiosClient;