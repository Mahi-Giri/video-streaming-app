import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invitation = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Track sidebar visibility
  const [email, setEmail] = useState(""); // Track email input
  const {meetingId}=useParams();
  console.log(meetingId)
  const [data,setData]=useState({
         email:"",
         roomId:meetingId
  })

  useEffect(() => {
    setIsSidebarVisible(true); // Automatically show the sidebar when the component mounts
  }, []);

  // Function to handle Send Invitation click
  const handleSendInvitation = async() => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const apiResponse=await fetch('http://localhost:4444/api/v1/invitation/invite',{
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify(data)
    })

    const result=await apiResponse.json();
    console.log(result);
    // if (emailRegex.test(email)) {
    //   // Valid email format
    //   toast.success("Invitation sent successfully!", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   setEmail(""); // Clear email input after sending
    // } else {
    //   // Invalid email format
    //   toast.error("Invalid email address. Please try again.", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }
  };

  return (
    <div className="relative">
      {/* Toast Container */}
      <ToastContainer />

      {/* Sidebar for Invitation */}
      <div
        className={`fixed top-0 right-0 z-40 w-full sm:w-72 bg-gray-900 text-white h-screen sm:rounded-lg shadow-2xl overflow-hidden sm:overflow-auto transition-transform duration-500 ease-in-out transform ${
          isSidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSidebarVisible(false)} // Handle the close button click
          className="absolute top-6 right-4 text-gray-400 text-2xl hover:text-white focus:outline-none"
        >
          <RxCross2 />
        </button>

        {/* Content */}
        <div className="h-full px-4 py-4 flex flex-col justify-start">
          <div className="text-center text-2xl font-bold text-red-100 mb-4">
            Send Invitation
          </div>

          {/* Email Input Field */}
          <div className="mb-4">
              <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={data.email} // Bind input value to state
              onChange={(e) =>setData((prev)=>({...prev,email:e.target.value}))} // Update state on input change
              placeholder="Enter email address"
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
              </div>

              <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
              RoomId
            </label>
            <input
              type="roomId"
              id="roomId"
              value={data.roomId} // Bind input value to state

              placeholder="Enter roomId"
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
              </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendInvitation} // Trigger Toastify on click
            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-300 transition duration-500 ease-in-out hover:text-black  focus:ring-2 focus:ring-white-500 focus:outline-none"
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
