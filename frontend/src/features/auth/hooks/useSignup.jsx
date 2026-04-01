import { useState } from "react"
import { signUpService } from "../services/auth.service";

export const useSignup=()=>{
    const [error, setError]=useState(null);

    const signup=async(data)=>{
        try{
            const response=await signUpService(data);

            return response;
        }catch(error){
            setError(error.message || 'Signup Failed!');
            throw error
        }
    }

    return {signup, error};
}