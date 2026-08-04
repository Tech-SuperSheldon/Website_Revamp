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




import axios from "axios";
import { getApiBaseUrl } from './apiBase.mjs';

const getBaseURL = () => {
  const configuredUrl = getApiBaseUrl(process.env);
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return configuredUrl;
  }
  return configuredUrl;
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
