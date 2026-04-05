import { useState } from "react";
import { signInService } from "../services/auth.service";
import { useAuth } from "../../../context/AuthContext"; // ✅ import

export const useSignin = () => {
    const [error, setError] = useState();
    const { login } = useAuth(); // ✅ use login from context

    const signin = async (data) => {
        try {
            const response = await signInService(data);

            // Use context login instead of manually setting localStorage
            if (response.accessToken) {
                login(response.accessToken, response.user);
            }

            return response;
        } catch (error) {
            setError(error.message || 'Sign in Failed!');
            throw error;
        }
    }

    return { signin, error };
}