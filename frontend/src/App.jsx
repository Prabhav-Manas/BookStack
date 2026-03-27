import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./features/auth/pages/Signin";
import SignUp from "./features/auth/pages/Signup";

function App(){
    return(
        <div className="">
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/signin"/>}/>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;