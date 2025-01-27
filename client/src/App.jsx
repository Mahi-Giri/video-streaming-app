import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
// import Upload from "./components/video/Upload";
import Profile from "./pages/Profile";
import Navbar from "./pages/Navbar";
import SubscriptionPage from "./pages/Subscription";

const App = () => {
  const [isNavbarExpanded, setNavbarExpanded] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Navbar Section */}
        <div
          className={`flex-shrink-0 h-full bg-black text-white transition-all duration-300 ${isNavbarExpanded ? "w-40" : "w-16"
            }`}
        >
          <Navbar setNavbarExpanded={setNavbarExpanded} />
        </div>

        {/* Main Content Section */}
        <div className="flex-grow bg-white transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Subscription" element={<SubscriptionPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
