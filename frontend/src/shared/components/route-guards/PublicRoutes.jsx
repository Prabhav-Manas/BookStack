import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) return children;

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        // ✅ Token valid — redirect to dashboard
        if (!isExpired) {
            return <Navigate to="/admin/dashboard" replace />;
        }

        // ✅ Token expired — clear and show public page
        localStorage.removeItem('accessToken');
        return children;
    } catch (error) {
        localStorage.removeItem('accessToken');
        return children;
    }
}

export default PublicRoute;