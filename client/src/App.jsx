import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Upload from "./components/video/Upload";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<Upload />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
