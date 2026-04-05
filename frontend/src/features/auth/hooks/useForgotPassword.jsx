import { useState } from "react";
import { forgotPasswordService } from "../services/auth.service";

export const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const forgotPassword = async (data) => {
        try {
            setLoading(true);
            setError(null);
            const response = await forgotPasswordService(data);
            setSuccess(response.message);
            return response;
        } catch (error) {
            setError(error?.message || 'Failed to send OTP!');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { forgotPassword, loading, error, success };
}