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

export const signInService = async (data) => {
    try {
        const response = await axiosInstance.post(`/auth/signin`, data);
        return response.data;
    } catch (error) {
        // throw the full response data object so message is accessible
        throw error.response?.data || { message: error.message };
    }
}

export const forgotPasswordService=async(data)=>{
    try{
        const response=await axiosInstance.post(`/auth/forgot-password`, data);
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const verifyOTPService=async(data)=>{
    try{
        const response=await axiosInstance.post(`/auth/verify-otp`, data);
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const resendOTPService = async (data) => {
    try {
        const response = await axiosInstance.post(`/auth/resend-otp`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const resetPasswordService = async (data) => {
    try {
        const response = await axiosInstance.post(`/auth/reset-password/${data.token}`, {
            password: data.password  //only send password in body
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}