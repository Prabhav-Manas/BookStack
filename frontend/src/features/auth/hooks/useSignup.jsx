import { useState } from "react";
import { signUpService } from "../services/auth.service";

export const useSignup = () => {
    const [error, setError] = useState(null);

    const signup = async (data) => {
        try {
            setError(null); // ✅ clear previous error
            const response = await signUpService(data);
            return response;
        } catch (error) {
            // ✅ extract message properly
            const message =
                error?.message ||
                error?.error ||
                'Signup failed. Please try again.';
            setError(message);
            throw error;
        }
    }

    return { signup, error };
}