import { useState } from "react";
import { signInService } from "../services/auth.service";
import { useAuth } from "../../../context/AuthContext";

export const useSignin = () => {
    const [error, setError] = useState();
    const { login } = useAuth();

    const signin = async (data) => {
        try {
            setError(null);
            const response = await signInService(data);

            // Use context login instead of manually setting localStorage
            if (response.accessToken) {
                login(response.accessToken, response.user);
            }

            return response;
        } catch (error) {
            const message =
                error?.message ||
                error?.error ||
                'Sign in failed. Please try again.';
            setError(message);
            throw error;
        }
    }

    return { signin, error };
}