import { useEffect, useState } from "react"
import { fetchAllBooksService } from "../services/admin.service";

export const useGetBooks=()=>{
    const [books, setBooks]=useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]=useState(null);

    const getBooks=async()=>{
        try{
            setLoading(true);
            const response=await fetchAllBooksService();
            setBooks(response.books);
        }catch(error){
            setError(error?.message || error?.error || 'Failed to fetch books!');
            throw error
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getBooks()
    }, [])

    return {books, loading, getBooks, error}
}