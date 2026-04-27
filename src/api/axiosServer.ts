import axios from "axios";

const BASE_URL = "http://localhost:8000"

/**Axios instance to be used for API calls. */
export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
})