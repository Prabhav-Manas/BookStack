import axios from "axios";
import environment from "./environment";

const axiosInstance=axios.create({
    baseURL:environment.API_URL
})

// Request Interceptor — attach token to every outgoing request
axiosInstance.interceptors.request.use((config)=>{
    const token=localStorage.getItem('accessToken');

    if(token){
        config.headers['Authorization']=`Bearer ${token}`
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
})

// Response Interceptor — handle token expiry globally
axiosInstance.interceptors.response.use((response)=>{
    return response
}, (error)=>{
    if(error.response.status===401){
        localStorage.removeItem('accessToken');
        window.location.href="/"
    }
    return Promise.reject(error);
})

export default axiosInstance;