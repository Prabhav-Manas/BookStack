import { useEffect, useState } from "react";
import axiosInstance from "../../../../config/axiosInstance";
import {getSingleBookService} from "../services/user.service";

export const useGetSingleBook=(id)=>{
    const [singleBook, setSingleBook]=useState(null);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(null);

    const fetchBook=async()=>{
        try{
            setLoading(true);
            const response=await getSingleBookService(id);
            setSingleBook(response.book)
        }catch(error){
            setError(error.message || 'Failed to fetch book!');
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
       if(id) fetchBook();
    },[id])

    return{singleBook, loading, error}
}