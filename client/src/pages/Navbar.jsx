import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FiRadio } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Modal, Button } from "flowbite-react";
import api from "../axiosConfig";
import {
    signOutStart,
    signOutSuccess,
    signOutFailure,
} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiOutlineExclamationCircle } from "react-icons/hi";


const Navbar = ({ setNavbarExpanded }) => {
        const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
    const [openModal, setOpenModal] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
    setNavbarExpanded(!isExpanded);
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
            <span className="absolute left-16 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
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
            <span className="absolute left-16 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
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
            <div className="absolute left-16 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Subscription
            </div>
          )}
        </div>

        {/* Live Stream */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
          <Link to="/createRoom" className="flex items-center gap-4 w-full">
            <FiRadio className="text-xl" />
            {isExpanded && <span className="text-base">Live Stream</span>}
          </Link>
          {!isExpanded && (
            <div className="absolute left-16 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              LiveStream
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
            <div className="absolute left-16 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
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
            <div className="absolute left-16 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              Settings
            </div>
          )}
        </div>

        {/* Log Out */}
        <div className="group flex items-center p-4 hover:bg-gray-700 relative w-full">
        <div className="flex items-center gap-4 w-full" onClick={() => setOpenModal(true)}>
          {/* <Link to="/login" className="flex items-center gap-4 w-full"> */}
            <FaSignOutAlt className="text-xl" />
            {isExpanded && <span className="text-base">Log Out</span>}
            </div>
          {/* </Link> */}
          {!isExpanded && (
            <div className="absolute left-16 bg-gray-800 text-white text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-200 z-50">
              LogOut
            </div>
          )}
          </div>
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
};

export default Navbar;
