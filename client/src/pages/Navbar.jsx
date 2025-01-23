import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaFilm, FaTv, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import "./Nav.css";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`nav-container ${isExpanded ? "expanded" : ""}`}>
      <div className="toggle-button" onClick={toggleNavbar}>
        <span className="menu-icon">&#9776;</span>
      </div>
      <div className="nav-left">
        <Link to="/" className="nav-link">
          <FaHome className="icon" title="Home" />
          {isExpanded && <span className="link-name">Home</span>}
        </Link>
        <Link to="/search" className="nav-link">
          <FaSearch className="icon" title="Search" />
          {isExpanded && <span className="link-name">Explore</span>}
        </Link>
        <Link to="/movies" className="nav-link">
          <FaFilm className="icon" title="Movies" />
          {isExpanded && <span className="link-name">Movies</span>}
        </Link>
        <Link to="/series" className="nav-link">
          <FaTv className="icon" title="Series" />
          {isExpanded && <span className="link-name">Series</span>}
        </Link>
        <Link to="/profile" className="nav-link">
          <FaUser className="icon" title="Profile" />
          {isExpanded && <span className="link-name">Profile</span>}
        </Link>
        <Link to="/login" className="nav-link">
          <FaSignOutAlt className="icon" title="Logout" />
          {isExpanded && <span className="link-name">Log Out</span>}
        </Link>
        <Link to="/settings" className="nav-link">
          <IoSettingsOutline className="icon" title="Settings" />
          {isExpanded && <span className="link-name">Settings</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
