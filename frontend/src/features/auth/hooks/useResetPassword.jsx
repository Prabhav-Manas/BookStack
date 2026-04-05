import { useState } from "react";
import { resetPasswordService } from "../services/auth.service";

export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const resetPassword = async (data) => {
        try {
            setLoading(true);
            setError(null);
            const response = await resetPasswordService(data);
            setSuccess(response.message);
            return response;
        } catch (error) {
            setError(error?.message || error?.error || 'Failed to reset password!');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { resetPassword, loading, error, success };
}