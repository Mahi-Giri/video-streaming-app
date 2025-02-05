import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Navbar from "./pages/Navbar";
import Subscription from "./pages/Subscription";
import AdminRoute from "./components/AdminRoute";
import { useSelector } from "react-redux";
import Settings from "./pages/Settings";
import MovieSearch from "./pages/MovieSearch";
import VideoPlayerPage from "./components/Videoplayer";
import "./App.css";
import Streamvideo from "./components/Livestreaming/Streamvideo";
import MeetingRoom from "./components/Livestreaming/MeetingRoom";
import CreateMeeting from "./components/Livestreaming/CreateMerting";


const App = () => {
    const [isNavbarExpanded, setNavbarExpanded] = useState(false);
    const { currentUser } = useSelector((store) => store.user);
    return (
        <Router>
       <div className="flex h-screen bg-gray-100">
        {/* Navbar Section */}
        {currentUser &&
        <div
          className={`flex-shrink-0 h-full bg-black text-white transition-all duration-500 ease-in-out z-50 ${
            isNavbarExpanded ? "w-40" : "w-16"
          }`}
        >
          <Navbar setNavbarExpanded={setNavbarExpanded} />
        </div>
        }
        <div className="flex-grow bg-black transition-all duration-500 ease-in-out relative z-10">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/Subscription" element={<Subscription />}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path="/profile" element={<Profile />} />
                        {/* <Route path="/Livestreaming" element={<Livestreaming />} /> */}
                        <Route path="/Streamvideo/:meetingId" element={<Streamvideo />} />
                        <Route path="/joinRoom" element={<MeetingRoom/>}/>
                        <Route path="/createRoom" element={<CreateMeeting/>}/>

                        <Route path="/videoplayer" element={<VideoPlayerPage/>} />
                        <Route path="/search" element={<MovieSearch/>}/>
                        <Route element={<AdminRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Route>
                </Routes>
              </div>
            </div>
        </Router>
    );
};

export default App;