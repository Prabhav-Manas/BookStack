import { useState } from "react";
import { signUpService } from "../services/auth.service";

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (data) => {
        try {
            setError(null);
            setIsLoading(true);

            const response = await signUpService(data);
            return response;

        } catch (error) {
            const message =
                error?.message ||
                error?.error ||
                "Signup failed. Please try again.";

            setError(message);
            throw error;

        } finally {
            setIsLoading(false);
        }
    };

    return { signup, error, isLoading };
};