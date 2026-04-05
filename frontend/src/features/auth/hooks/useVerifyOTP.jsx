import { useState } from "react";
import { verifyOTPService } from "../services/auth.service";

export const useVerifyOTP = () => {
    const [error, setError] = useState(null);

    const verifyOTP = async (data) => {
        try {
            const response = await verifyOTPService(data);
            return response;
        } catch (error) {
            setError(error?.message || error?.error || 'Failed to verify OTP!');
            throw error;
        }
    }

    return { verifyOTP, error };
}