import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./features/auth/pages/Signin";
import SignUp from "./features/auth/pages/Signup";
import VerifyEmail from './features/auth/pages/VerifyEmail'
import AdminDashboard from "./features/dashboard/admin/pages/AdminDashboard/AdminDashboard";

function App(){
    return(
        <div className="">
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth/signin"/>}/>
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/auth/verify-email/:token" element={<VerifyEmail />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;