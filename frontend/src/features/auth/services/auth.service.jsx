import axios from 'axios';
import environment from '../../../config/environment';
import axiosInstance from '../../../config/axiosInstance';

const API_URL=environment.API_URL

export const signUpService=async(data)=>{
    try{
        const response=await axiosInstance.post(`/auth/signup`, data);

        return response.data
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const signInService=async(data)=>{
    try{
        const response =await axiosInstance.post(`/auth/signin`, data);

        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}