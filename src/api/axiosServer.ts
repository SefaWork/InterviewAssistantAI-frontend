import axios from "axios";

/**Axios instance to be used for API calls. */
export default axios.create({
    baseURL: "http://localhost:8000"
})