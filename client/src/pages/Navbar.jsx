import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import {
    FaHome,
    FaSearch,
    FaFilm,
    FaTv,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";
import "./Nav.css";
import api from "../axiosConfig";
import {
    signOutStart,
    signOutSuccess,
    signOutFailure,
} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
    const dispatch = useDispatch();

    const [isExpanded, setIsExpanded] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogout = async () => {
      setOpenModal(false)
        dispatch(signOutStart());
        const response = await api.post("/api/v1/user/signout");
        console.log(response);
        if (response.status === 200) {
            toast.success(response.data.message || "User Signout Successful");
            dispatch(signOutSuccess());
        } else {
            dispatch(signOutFailure(response.data || "Logout Failed"));
        }
    };

    return (
        <>
            {" "}
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
                        {isExpanded && (
                            <span className="link-name">Explore</span>
                        )}
                    </Link>
                    <Link to="/movies" className="nav-link">
                        <FaFilm className="icon" title="Movies" />
                        {isExpanded && (
                            <span className="link-name">Movies</span>
                        )}
                    </Link>
                    <Link to="/series" className="nav-link">
                        <FaTv className="icon" title="Series" />
                        {isExpanded && (
                            <span className="link-name">Series</span>
                        )}
                    </Link>
                    <Link to="/Subscription" className="nav-link">
          <MdSubscriptions />
          {isExpanded && <span className="link-name">Subscription</span>}
        </Link>
                    <Link to="/profile" className="nav-link">
                        <FaUser className="icon" title="Profile" />
                        {isExpanded && (
                            <span className="link-name">Profile</span>
                        )}
                    </Link>
                    <div
                        onClick={() => setOpenModal(true)}
                        className="nav-link"
                    >
                        <FaSignOutAlt className="icon" title="Logout" />
                        {isExpanded && (
                            <span className="link-name">Log Out</span>
                        )}
                    </div>
                    <Link to="/settings" className="nav-link">
                        <IoSettingsOutline className="icon" title="Settings" />
                        {isExpanded && (
                            <span className="link-name">Settings</span>
                        )}
                    </Link>
                </div>
            </nav>
         
            <Modal
                show={openModal}
                size="md"
                position="center"
                className="model_stylings"
                onClose={() => setOpenModal(false)}
            >
                <div className="bg-black/50 p-4 backdrop-blur-md">
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-white/80 " />
                            <h3 className="mb-5 text-lg font-normal text-white/80 ">
                                Are you sure you want to log out?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleLogout}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button
                                    className="bg-red-500"
                                    onClick={() => setOpenModal(false)}
                                >
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
//     <nav className={`nav-container ${isExpanded ? "expanded" : ""}`}>
//       <div className="toggle-button" onClick={toggleNavbar}>
//         <span className="menu-icon">&#9776;</span>
//       </div>
//       <div className="nav-left">
//         <Link to="/" className="nav-link">
//           <FaHome className="icon" title="Home" />
//           {isExpanded && <span className="link-name">Home</span>}
//         </Link>
//         <Link to="/search" className="nav-link">
//           <FaSearch className="icon" title="Search" />
//           {isExpanded && <span className="link-name">Explore</span>}
//         </Link>
//         <Link to="/movies" className="nav-link">
//           <FaFilm className="icon" title="Movies" />
//           {isExpanded && <span className="link-name">Movies</span>}
//         </Link>
//         <Link to="/series" className="nav-link">
//           <FaTv className="icon" title="Series" />
//           {isExpanded && <span className="link-name">Series</span>}
//         </Link>

//         <Link to="/profile" className="nav-link">
//           <FaUser className="icon" title="Profile" />
//           {isExpanded && <span className="link-name">Profile</span>}
//         </Link>
//         <Link to="/login" className="nav-link">
//           <FaSignOutAlt className="icon" title="Logout" />
//           {isExpanded && <span className="link-name">Log Out</span>}
//         </Link>
//         <Link to="/settings" className="nav-link">
//           <IoSettingsOutline className="icon" title="Settings" />
//           {isExpanded && <span className="link-name">Settings</span>}
//         </Link>
//       </div>
//     </nav>
//   );
};

export default Navbar;
