// useUpdateBook.jsx
import { useState } from "react";
import { updateBookService } from "../services/admin.service";

export const useUpdateBook = () => {
    const [error, setError] = useState(null);

    const updateBook = async (id, data) => {
        try {
            const response = await updateBookService(id, data);
            return response;
        } catch (error) {
            setError(error?.message || 'Failed to update book!');
            throw error;
        }
    }

    return { updateBook, error };
}