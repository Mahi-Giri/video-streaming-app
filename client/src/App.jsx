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

const App = () => {
    const [isNavbarExpanded, setNavbarExpanded] = useState(false);
    return (
        <Router>
<<<<<<< HEAD
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/upload" element={<Upload />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
=======
            <Navbar setNavbarExpanded={setNavbarExpanded} />
            <div
                className={`home-container ${
                    isNavbarExpanded ? "expanded" : ""
                }`}
            >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/upload" element={<Upload />} />
                    </Route>
                </Routes>
            </div>
>>>>>>> 2130c72addd6f7d9de4e7dd1b021d0c70acd4100
        </Router>
    );
};

export default App;
