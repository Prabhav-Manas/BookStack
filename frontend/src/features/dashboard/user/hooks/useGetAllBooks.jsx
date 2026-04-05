import { useState, useEffect } from "react";
import { fetchAllBooksForUsersService } from "../../admin/services/admin.service";

export const useGetAllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await fetchAllBooksForUsersService();
            setBooks(response.books || []);
        } catch (error) {
            setError(error?.message || 'Failed to fetch books!');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return { books, loading, error };
}