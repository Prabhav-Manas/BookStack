import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./features/auth/pages/Signin";
import SignUp from "./features/auth/pages/Signup";
import VerifyEmail from './features/auth/pages/VerifyEmail'
import AdminDashboard from "./features/dashboard/admin/pages/AdminDashboard/AdminDashboard";
import BookList from "./features/dashboard/admin/pages/BookList/BookList.jsx";
import BookDetails from "./features/dashboard/admin/pages/BookDetails.jsx";
import Header from "./shared/components/Header/Header.jsx";
import PublicRoute from "./shared/components/route-guards/PublicRoutes.jsx";
import ProtectedRoute from "./shared/components/route-guards/ProtectedRoutes.jsx";
import UserDashboard from "./features/dashboard/user/pages/UserDashboard.jsx";
import BookReview from "./features/dashboard/user/pages/book-review/BookReview.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import AdminRoute from "./shared/components/route-guards/AdminRoute.jsx";
import UserRoute from "./shared/components/route-guards/UserRoute.jsx";
import ForgotPassword from "./features/auth/pages/ForgotPassword.jsx";
import VerifyOTP from "./features/auth/pages/VerifyOTP.jsx";
import ResetPassword from "./features/auth/pages/ResetPassword.jsx";

const AppLayout=()=>{
    const location=useLocation();
    const { isAuthenticated } = useAuth();

    const hideHeaderRoutes=['/auth/signin', '/signup', '/'];
    const showHeader=!hideHeaderRoutes.includes(location.pathname) && isAuthenticated;

    return(
        <div className="">
            {showHeader && <Header />}

                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route path="/" element={<Navigate to="/auth/signin"/>}/>
                    <Route path="/auth/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><SignUp/></PublicRoute>} />
                    <Route path="/auth/verify-email/:token" element={<PublicRoute><VerifyEmail /></PublicRoute>} />
                    <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                    <Route path="/auth/verify-otp" element={<PublicRoute><VerifyOTP /></PublicRoute>} />
                    <Route path="/auth/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

                    {/* PROTECTED ROUTES */}
                    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/bookList" element={<AdminRoute><BookList /></AdminRoute>} />
                    <Route path="/admin/bookDetails/:id" element={<AdminRoute><BookDetails /></AdminRoute>} />

                    <Route path="/user/dashboard" element={<UserRoute><UserDashboard /></UserRoute>} />
                    <Route path="/user/book-review/:id" element={<UserRoute><BookReview /></UserRoute>} />
                    
                    {/* 404 PAGE NOT FOUND */}
                    <Route path="*" element={<Navigate to="/auth/signin" replace />} />
                </Routes>
        </div>
    )
}

function App(){
    return(
        <div className="">
            <Router>
                <AppLayout />
            </Router>
        </div>
    )
}

export default App;