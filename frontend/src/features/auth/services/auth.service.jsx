import axios from 'axios';
import environment from '../../../config/environment';

const API_URL=environment.API_URL

export const signUpService=async(data)=>{
    try{
        const response=await axios.post(`${API_URL}/auth/signup`, data);

        return response.data
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const signInService=async(data)=>{
    try{
        const response =await axios.post(`${API_URL}/auth/signin`, data);

        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}