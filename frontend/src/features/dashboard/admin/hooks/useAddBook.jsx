import { useState } from "react";
import {addBookService} from "../services/admin.service"

export const useAddBook=()=>{
    const [error, setError]=useState(null);

    const addBook=async(data)=>{
        try{
            const response=await addBookService(data);
            return response;
        }catch(error){
            setError(error.message || 'Failed to add new book!');
            throw error;
        }
    }

    return {addBook, error}
}