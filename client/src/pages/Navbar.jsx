import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FiRadio } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ setNavbarExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
    setNavbarExpanded(!isExpanded);
  };

  return (
    <nav
      className={`fixed flex flex-col h-full bg-black text-white transition-all ease-in-out z-50 ${
        isExpanded ? "w-40" : "w-16"
      } items-start`}
    >
      <div className="cursor-pointer p-4 text-xl" onClick={toggleNavbar}>
        <GiHamburgerMenu />
      </div>
      <div className="flex flex-col mt-20 w-full">

        {/* Home */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
          <Link to="/" className="flex items-center gap-4 w-full">
            <FaHome className="text-xl" />
            {isExpanded && <span className="text-base">Home</span>}
          </Link>
          {!isExpanded && (
            <span className="absolute top-10 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Home
            </span>
          )}
        </div>

        {/* Explore */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
          <Link to="/search" className="flex items-center gap-4 w-full">
            <FaSearch className="text-xl" />
            {isExpanded && <span className="text-base">Explore</span>}
          </Link>
          {!isExpanded && (
            <span className="absolute top-10 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Explore
            </span>
          )}
        </div>

        {/* Subscription */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
          <Link to="/Subscription" className="flex items-center gap-4 w-full">
            <MdOutlineSubscriptions className="text-xl" />
            {isExpanded && <span className="text-base">Subscription</span>}
          </Link>
          {!isExpanded && (
            <div className="absolute top-10 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Subscription
            </div>
          )}
        </div>

        {/* Live Stream */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
          <Link to="/Live" className="flex items-center gap-4 w-full">
            <FiRadio className="text-xl" />
            {isExpanded && <span className="text-base">Live Stream</span>}
          </Link>
          {!isExpanded && (
            <div className="absolute top-10 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Live Stream
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
          <Link to="/profile" className="flex items-center gap-4 w-full">
            <FaUser className="text-xl" />
            {isExpanded && <span className="text-base">Profile</span>}
          </Link>
          {!isExpanded && (
            <div className="absolute top-10 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Profile
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
          <Link to="/settings" className="flex items-center gap-4 w-full">
            <IoSettingsOutline className="text-xl" />
            {isExpanded && <span className="text-base">Settings</span>}
          </Link>
          {!isExpanded && (
            <div className="absolute top-10 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Settings
            </div>
          )}
        </div>

        {/* Log Out */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
          <Link to="/login" className="flex items-center gap-4 w-full">
            <FaSignOutAlt className="text-xl" />
            {isExpanded && <span className="text-base">Log Out</span>}
          </Link>
          {!isExpanded && (
            <div className="absolute top-10 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Log Out
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
