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

const AppLayout=()=>{
    const location=useLocation();

    const hideHeaderRoutes=['/auth/signin', '/signup', '/'];
    const showHeader=!hideHeaderRoutes.includes(location.pathname) && localStorage.getItem('accessToken');

    return(
        <div className="">
            {showHeader && <Header />}

                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route path="/" element={<Navigate to="/auth/signin"/>}/>
                    <Route path="/auth/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><SignUp/></PublicRoute>} />
                    <Route path="/auth/verify-email/:token" element={<PublicRoute><VerifyEmail /></PublicRoute>} />

                    {/* PROTECTED ROUTES */}
                    <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/admin/bookList" element={<ProtectedRoute><BookList /></ProtectedRoute>} />
                    <Route path="/admin/bookDetails/:id" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
                    
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