import { useState, useEffect } from "react";
import { fetchTotalUsersService } from "../services/admin.service";

export const useGetTotalUsers = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTotalUsers = async () => {
        try {
            setLoading(true);
            const response = await fetchTotalUsersService();
            setTotalUsers(response.totalUsers);
        } catch (error) {
            setError(error?.message || 'Failed to fetch total users!');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTotalUsers();
    }, []);

    return { totalUsers, loading, error };
}