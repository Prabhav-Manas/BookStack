import { useState } from "react";
import { resendOTPService } from "../services/auth.service";

export const useResendOTP = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const resendOTP = async (data) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            const response = await resendOTPService(data);
            setSuccess(response.message);
            return response;
        } catch (error) {
            setError(error?.message || error?.error || 'Failed to resend OTP!');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { resendOTP, loading, error, success };
}