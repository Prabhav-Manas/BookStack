import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const UserRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/auth/signin" replace />;

    // If not user redirect to admin dashboard
    if (user?.role !== 'user') return <Navigate to="/admin/dashboard" replace />;

    return children;
}

export default UserRoute;