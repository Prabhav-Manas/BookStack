import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./features/auth/pages/Signin";
import SignUp from "./features/auth/pages/Signup";
import VerifyEmail from './features/auth/pages/VerifyEmail'
import AdminDashboard from "./features/dashboard/admin/pages/AdminDashboard/AdminDashboard";
import BookList from "./features/dashboard/admin/pages/BookList/BookList.jsx";
import Header from "./shared/components/Header/Header.jsx";

function App(){
    return(
        <div className="">
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth/signin"/>}/>
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/auth/verify-email/:token" element={<VerifyEmail />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/bookList" element={<BookList />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;