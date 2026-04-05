import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useAuth();
    console.log('AdminRoute rendering — user:', user, 'loading:', loading, 'isAuthenticated:', isAuthenticated)

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/auth/signin" replace />;

    // If not admin redirect to user dashboard
    if (user?.role !== 'admin') return <Navigate to="/user/dashboard" replace />;

    return children;
}

export default AdminRoute;