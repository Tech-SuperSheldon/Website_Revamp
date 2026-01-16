// import axios from "axios" 

// const axiosClient = axios.create({
//   baseURL: 'https://website-revamp-mn1t.onrender.com',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   },
//   withCredentials: true,
// });

// axiosClient.interceptors.request.use(
//     response => response,
//     error => {
//         return Promise.reject(error.response?.data || error.message) ;
//     }
// )

// export default axiosClient ;




import axios from "axios" 

// Use environment variable or default to production
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Check if we're on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Try to use local backend if available, otherwise use production
      return process.env.NEXT_PUBLIC_API_URL || 'https://website-revamp-mn1t.onrender.com';
    }
  }
  return process.env.NEXT_PUBLIC_API_URL || 'https://website-revamp-mn1t.onrender.com';
};

const axiosClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Axios error:', error);
        return Promise.reject(error.response?.data || error.message);
    }
);

export default axiosClient ;
