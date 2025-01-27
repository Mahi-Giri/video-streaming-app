import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Upload from "./components/video/Upload";
import Profile from "./pages/Profile";
import Navbar from "./pages/Navbar";
import "./App.css";
import Subscription from "./pages/Subscription";

const App = () => {
    const [isNavbarExpanded, setNavbarExpanded] = useState(false);
    return (
        <Router>
            <Navbar setNavbarExpanded={setNavbarExpanded} />
            <div
                className={`home-container ${isNavbarExpanded ? "expanded" : ""
                    }`}
            >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/Subscription" element={<Subscription />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/upload" element={<Upload />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
