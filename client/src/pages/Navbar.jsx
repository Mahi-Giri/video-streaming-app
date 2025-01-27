import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Modal, Button } from "flowbite-react";
import {
    FaHome,
    FaSearch,
    FaFilm,
    FaTv,
    FaUser,
    FaSignOutAlt,
    FaSubscript,
} from "react-icons/fa";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
// import SubscriptionPage from "./Subscription";

const Navbar = ({ setNavbarExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
    setNavbarExpanded(!isExpanded);
  };

  return (
    <nav
      className={`fixed flex flex-col h-screen bg-black text-white transition-all duration-300 ${
        isExpanded ? "w-40" : "w-16"
      }`}
    >
      <div className="cursor-pointer p-2 text-xl" onClick={toggleNavbar}>
        <span>&#9776;</span>
      </div>
      <div className="flex flex-col mt-24">
        {/* Home */}
        <div className="relative group">
          <Link to="/" className="flex items-center p-4 hover:bg-gray-700">
            <FaHome className="text-xl" />
            {isExpanded && <span className="ml-4 text-base">Home</span>}
          </Link>
          <div className="absolute top-0 left-16 hidden group-hover:block">
            <div className="relative">
              <div className="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
                Home
              </div>
              <svg
                className="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current"
                width="8"
                height="8"
              >
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>
            </div>
          </div>
        </div>
        {/* Explore */}
        <div className="relative group">
          <Link to="/search" className="flex items-center p-4 hover:bg-gray-700">
            <FaSearch className="text-xl" />
            {isExpanded && <span className="ml-4 text-base">Explore</span>}
          </Link>
          <div className="absolute top-0 left-16 hidden group-hover:block">
            <div className="relative">
              <div className="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
                Explore
              </div>
              <svg
                className="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current"
                width="8"
                height="8"
              >
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>
            </div>
          </div>
        </div>
        {/* Movies */}
        <div className="relative group">
          <Link to="/movies" className="flex items-center p-4 hover:bg-gray-700">
            <FaFilm className="text-xl" />
            {isExpanded && <span className="ml-4 text-base">Movies</span>}
          </Link>
          <div className="absolute top-0 left-10 hidden group-hover:block">
            <div className="relative">
              <div className="absolute left-10 z-0 w-20 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
                Movies
              </div>
              <svg
                className="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current"
                width="8"
                height="8"
              >
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>
            </div>
          </div>
        </div>
        {/* Series */}
        <div className="relative group">
          <Link to="/series" className="flex items-center p-4 hover:bg-gray-700">
            <FaTv className="text-xl" />
            {isExpanded && <span className="ml-4 text-base">Series</span>}
          </Link>
          <div className="absolute top-0 left-16 hidden group-hover:block">
            <div className="relative">
              <div className="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
                Series
              </div>
              <svg
                className="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current"
                width="8"
                height="8"
              >
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative group">
          <Link to="/Subscription" className="flex items-center p-4 hover:bg-gray-700">
            <MdOutlineSubscriptions className="text-xl" />
            {isExpanded && <span className="ml-4 text-base">Subscription</span>}
          </Link>
          <div className="absolute top-0 left-16 hidden group-hover:block">
            <div className="relative">
              <div className="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
                Subscribe
              </div>
              <svg
                className="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current"
                width="8"
                height="8"
              >
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>
            </div>
          </div>
        </div>
        {/* Profile */}
        <div className="relative group">
          <Link to="/profile" className="flex items-center p-4 hover:bg-gray-700">
            <FaUser className="text-xl" />
            {isExpanded && <span className="ml-4 text-base">Profile</span>}
          </Link>
          <div className="absolute top-0 left-16 hidden group-hover:block">
            <div className="relative">
              <div className="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
                Profile
              </div>
              <svg
                className="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current"
                width="8"
                height="8"
              >
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>
            </div>
          </div>
        </div>
        {/* Settings */}
        <div className="relative group">
          <Link to="/settings" className="flex items-center p-4 hover:bg-gray-700">
            <IoSettingsOutline className="text-xl" />
            {isExpanded && <span className="ml-4 text-base">Settings</span>}
          </Link>
          <div className="absolute top-0 left-16 hidden group-hover:block">
            <div className="relative">
              <div className="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
                Settings
              </div>
              <svg
                className="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current"
                width="8"
                height="8"
              >
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>
            </div>
          </div>
        </div>
        {/* Logout */}
        <div className="relative group">
          <Link to="/login" className="flex items-center p-4 hover:bg-gray-700">
            <FaSignOutAlt className="text-xl" />
            {isExpanded && <span className="ml-4 text-base">Log Out</span>}
          </Link>
          <div className="absolute top-0 left-16 hidden group-hover:block">
            <div className="relative">
              <div className="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
                Log Out
              </div>
              <svg
                className="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current"
                width="8"
                height="8"
              >
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
