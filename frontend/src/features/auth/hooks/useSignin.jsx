import { useState } from "react"
import { signInService } from "../services/auth.service";

export const useSignin=()=>{
    const [error, setError]=useState();

    const signin=async(data)=>{
        try{
            const response=await signInService(data);

            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
            }

            return response;
        }catch(error){
            setError(error.message || 'Sign in Failed!');
            throw error;
        }
    }

    return {signin, error};
}