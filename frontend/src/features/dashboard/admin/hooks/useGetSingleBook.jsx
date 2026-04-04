import { useState, useEffect } from "react";
import { getBookService } from "../services/admin.service";

export const useGetSingleBook = (id) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBook = async () => {
        try {
            setLoading(true);
            const response = await getBookService(id);
            setBook(response.book);
        } catch (error) {
            setError(error?.message || 'Failed to fetch book!');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchBook();
    }, [id]);

    return { book, loading, error };
}