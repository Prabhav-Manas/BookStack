import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    if (isAuthenticated) {
        // Redirect to correct dashboard based on role
        if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        return <Navigate to="/user/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;