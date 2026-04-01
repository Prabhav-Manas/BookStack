import axios from "axios"
import environment from "../../../config/environment"
import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";

const VerifyEmail=()=>{
    const{token}=useParams();
    const [message, setMessage]=useState('Verifying Email...')

    const hasVerified=useRef(false);

    useEffect(()=>{
        if(!hasVerified.current){
            verifyEmail()
            hasVerified.current=true;
        }
    },[token])

    const verifyEmail=async()=>{
        try{
            const response=await axios.get(`${environment.API_URL}/auth/verify-email/${token}`);

            setMessage('Email Verified Successfully!');

            console.log('Verify-Email', response);

            setTimeout(()=>{
                window.location.href="/auth/signin"
            },2000)
        } catch (error){
            console.log('Error in verifying email:=>', error.message || error);
            setMessage('Email verification failed!')
        }
    }
    return(
        <div className="">
            <h4>{message}</h4>
        </div>
    )
}

export default VerifyEmail