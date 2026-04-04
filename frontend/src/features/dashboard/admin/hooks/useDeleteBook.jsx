// useDeleteBook.jsx
import { useState } from "react";
import { deleteBookService } from "../services/admin.service";

export const useDeleteBook = () => {
    const [error, setError] = useState(null);

    const deleteBook = async (id) => {
        try {
            const response = await deleteBookService(id);
            return response;
        } catch (error) {
            setError(error?.message || 'Failed to delete book!');
            throw error;
        }
    }

    return { deleteBook, error };
}