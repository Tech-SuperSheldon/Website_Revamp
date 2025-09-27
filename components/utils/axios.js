import axios from "axios" 

const axiosClient = axios.create({
  baseURL: 'https://super-sheldon1.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
    response => response,
    error => {
        return Promise.reject(error.response?.data || error.message) ;
    }
)

export default axiosClient ;