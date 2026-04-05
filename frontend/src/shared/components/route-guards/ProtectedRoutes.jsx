import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) return <Navigate to="/auth/signin" replace />;

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            localStorage.removeItem('accessToken');
            return <Navigate to="/auth/signin" replace />;
        }
    } catch (error) {
        localStorage.removeItem('accessToken');
        return <Navigate to="/auth/signin" replace />;
    }

    return children;
}

export default ProtectedRoute;