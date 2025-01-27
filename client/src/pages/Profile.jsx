// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { updateSuccess, updateFailure, updateStart } from "../redux/userSlice";
// import { toast } from "react-toastify";
// import api from "../axiosConfig";
// import { FaUser, FaCamera } from "react-icons/fa";

// const Profile = () => {
//     const { currentUser, loading } = useSelector((state) => state.user);
//     const [formData, setFormData] = useState({
//         username: currentUser?.username || "",
//         password: "",
//         bio: currentUser?.bio || "",
//         profilePicture: currentUser?.profilePicture || "",
//     });
//     const [imageFile, setImageFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState(currentUser?.profilePicture);
    
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImageFile(file);
//             setImagePreview(URL.createObjectURL(file));
//         }
//     };

//     const uploadImage = async () => {
//         if (!imageFile) return null;
//         const data = new FormData();
//         data.append("file", imageFile);
//         data.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // Replace with your Cloudinary upload preset
        
//         try {
//             const response = await fetch(
//                 "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", // Replace with your Cloudinary cloud name
//                 {
//                     method: "POST",
//                     body: data,
//                 }
//             );
//             const file = await response.json();
//             return file.secure_url;
//         } catch (error) {
//             console.error("Error uploading image:", error);
//             return null;
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             dispatch(updateStart());

//             let imageUrl = formData.profilePicture;
//             if (imageFile) {
//                 imageUrl = await uploadImage();
//                 if (!imageUrl) {
//                     toast.error("Failed to upload image");
//                     return;
//                 }
//             }

//             const response = await api.put(`/api/v1/user/update/${currentUser._id}`, {
//                 ...formData,
//                 profilePicture: imageUrl,
//             });

//             dispatch(updateSuccess(response.data));
//             toast.success("Profile updated successfully!");
//         } catch (error) {
//             dispatch(updateFailure(error.response?.data?.message || "Update failed"));
//             toast.error(error.response?.data?.message || "Update failed");
//         }
//     };

//     if (!currentUser) {
//         navigate("/login");
//         return null;
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 py-8">
//             <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Profile Settings</h2>
                
//                 <div className="mb-6 text-center">
//                     <div className="relative inline-block">
//                         <img
//                             src={imagePreview || currentUser.profilePicture}
//                             alt="Profile"
//                             className="w-32 h-32 rounded-full object-cover mx-auto"
//                         />
//                         <label className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-2 cursor-pointer">
//                             <FaCamera className="text-white" />
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="hidden"
//                             />
//                         </label>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Username</label>
//                         <input
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">New Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
//                             placeholder="Leave blank to keep current password"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Bio</label>
//                         <textarea
//                             name="bio"
//                             value={formData.bio}
//                             onChange={handleChange}
//                             rows="4"
//                             className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
//                             placeholder="Tell us about yourself..."
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
//                     >
//                         {loading ? "Updating..." : "Update Profile"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Profile;






// import React, { useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FiEdit } from "react-icons/fi";
// import { FaAngleRight, FaAngleLeft, FaEllipsisV } from "react-icons/fa";
// import { AiOutlineLogout } from "react-icons/ai";
// import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
// import api from "../axiosConfig";

// const Profile = () => {
//   const { currentUser, loading } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState({
//     username: currentUser?.username || "JohnDoe",
//     password: "",
//     gmail: currentUser?.email || "johndoe@example.com",
//     bio: currentUser?.bio || "Software Developer. Passionate about coding.",
//     profilePicture: currentUser?.profilePicture || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
//     watchHistory: ["Stranger Things", "Money Heist", "Breaking Bad", "Narcos", "Stranger Things", "Money Heist", "Breaking Bad", "Narcos", "Stranger Things", "Money Heist", "Breaking Bad", "Narcos"],
//     resumeVideo: [
//       "The Witcher",
//       "Black Mirror",
//       "The Crown",
//       "Dark",
//       "Ozark",
//       "The Witcher",
//       "Black Mirror",
//       "The Crown",
//       "Dark",
//       "Ozark",
//       "The Witcher",
//       "Black Mirror",
//       "The Crown",
//     ],
//   });

//   const [dropdownVisible, setDropdownVisible] = useState({});
//   const watchHistoryRef = useRef(null);
//   const resumeWatchingRef = useRef(null);
//   const [imageFile, setImageFile] = useState(null);

//   const toggleDropdown = (index, section) => {
//     setDropdownVisible((prev) => ({
//       ...prev,
//       [`${section}-${index}`]: !prev[`${section}-${index}`],
//     }));
//   };

//   const scrollHorizontally = (ref, direction) => {
//     if (ref.current) {
//       const scrollAmount = 300;
//       ref.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleDelete = (section, index) => {
//     setProfile((prev) => ({
//       ...prev,
//       [section]: prev[section].filter((_, i) => i !== index),
//     }));
//   };

//   const uploadImage = async (file) => {
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: data,
//         }
//       );
//       const result = await response.json();
//       return result.secure_url;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return null;
//     }
//   };

//   const handleProfilePicChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       const imageUrl = URL.createObjectURL(file);
//       setProfile(prev => ({
//         ...prev,
//         profilePicture: imageUrl
//       }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSaveChanges = async () => {
//     if (!currentUser?._id) {
//       toast.error("Please login to update your profile");
//       navigate("/login");
//       return;
//     }

//     try {
//       dispatch(updateStart());

//       let imageUrl = profile.profilePicture;
//       if (imageFile) {
//         const uploadedUrl = await uploadImage(imageFile);
//         if (uploadedUrl) {
//           imageUrl = uploadedUrl;
//         } else {
//           toast.error("Failed to upload image");
//           return;
//         }
//       }

//       const response = await api.put(`/api/v1/user/update/${currentUser._id}`, {
//         username: profile.username,
//         bio: profile.bio,
//         profilePicture: imageUrl,
//       });

//       dispatch(updateSuccess(response.data));
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       dispatch(updateFailure(error.response?.data?.message || "Update failed"));
//       toast.error(error.response?.data?.message || "Update failed");
//     }
//   };

//   if (!currentUser) {
//     navigate("/login");
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans overflow-y-auto">
//       {/* Profile Section */}
//       <div className="flex flex-col items-center mt-10 space-y-6">
//         <div className="relative">
//           <img
//             src={profile.profilePicture}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover border-4 border-red-600"
//           />
//           <label htmlFor="profilePicInput" className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full cursor-pointer">
//             <FiEdit className="text-white text-xl" />
//           </label>
//           <input
//             type="file"
//             id="profilePicInput"
//             onChange={handleProfilePicChange}
//             className="hidden"
//             accept="image/*"
//           />
//         </div>
//         <div className="text-center space-y-2">
//           <input
//             type="text"
//             name="username"
//             value={profile.username}
//             onChange={handleInputChange}
//             className="bg-gray-800 text-white text-lg p-2 rounded-md w-60 text-center focus:outline-none focus:ring-2 focus:ring-red-600 flex justify-center items-center"
//             placeholder="Username"
//           />
//           <input
//             type="email"
//             name="gmail"
//             value={profile.gmail}
//             onChange={handleInputChange}
//             className="bg-gray-800 text-white text-lg p-2 rounded-md w-60 text-center focus:outline-none flex justify-center items-center"
//             placeholder="Gmail"
//             disabled
//           />
//                               <div>
//                         <label className="block text-sm font-medium text-gray-700">New Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={profile.password}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
//                             placeholder="Leave blank to keep current password"
//                         />
//                     </div>
//           <textarea
//             name="bio"
//             value={profile.bio}
//             onChange={handleInputChange}
//             className="bg-gray-800 text-white text-lg p-2 rounded-md w-60 text-center focus:outline-none flex justify-center items-center"
//             placeholder="Bio"
//           />
//         </div>
//         <button 
//           className="px-6 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 disabled:opacity-50"
//           onClick={handleSaveChanges}
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>

//       {/* Watch History and Resume Watching Sections */}
//       {["Watch History", "Resume Watching"].map((section, idx) => {
//         const ref = idx === 0 ? watchHistoryRef : resumeWatchingRef;
//         const list = idx === 0 ? profile.watchHistory : profile.resumeVideo;
//         const sectionKey = idx === 0 ? "watchHistory" : "resumeVideo";

//         return (
//           <div key={section} className="mt-10 px-6">
//             <h2 className="text-2xl font-bold mb-4">{section}</h2>
//             <div className="relative">
//               <button
//                 className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
//                 onClick={() => scrollHorizontally(ref, "left")}
//               >
//                 <FaAngleLeft className="text-white" />
//               </button>
//               <div
//                 className="flex space-x-4 overflow-x-scroll scrollbar-hide"
//                 ref={ref}
//               >
//                 {list.map((video, index) => (
//                   <div
//                     key={index}
//                     className="relative w-40 h-60 bg-gray-800 rounded-lg flex-shrink-0 text-center p-4"
//                   >
//                     <h3 className="text-lg font-semibold">{video}</h3>
//                     <button
//                       onClick={() => toggleDropdown(index, sectionKey)}
//                       className="absolute top-2 right-2 text-gray-400 hover:text-white"
//                     >
//                       <FaEllipsisV />
//                     </button>
//                     {dropdownVisible[`${sectionKey}-${index}`] && (
//                       <div className="absolute top-10 right-2 bg-gray-700 p-2 rounded shadow-lg">
//                         <button
//                           onClick={() => handleDelete(sectionKey, index)}
//                           className="text-sm text-white hover:underline"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <button
//                 className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
//                 onClick={() => scrollHorizontally(ref, "right")}
//               >
//                 <FaAngleRight className="text-white" />
//               </button>
//             </div>
//           </div>
//         );
//       })}

//       {/* Netflix-Themed Plan Card */}
//       <div className="flex items-center justify-center p-10 shadow-lg rounded-lg">
//         <div className="max-w-xl p-12 bg-gray-800 text-white rounded-lg shadow-lg">
//           <h5 className="mb-4 text-xl font-medium text-gray-400">
//             Standard Plan
//           </h5>
//           <div className="flex items-baseline text-white">
//             <span className="text-3xl font-semibold">$</span>
//             <span className="text-5xl font-extrabold tracking-tight">49</span>
//             <span className="ml-1 text-xl font-normal text-gray-400">
//               /month
//             </span>
//           </div>

//           <ul className="my-7 space-y-5">
//             <li className="flex space-x-3">
//               <svg
//                 className="h-5 w-5 shrink-0 text-red-600"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="text-base font-normal leading-tight text-gray-300">
//                 2 team members
//               </span>
//             </li>
//             <li className="flex space-x-3">
//               <svg
//                 className="h-5 w-5 shrink-0 text-red-600"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="text-base font-normal leading-tight text-gray-300">
//                 50 GB Cloud storage
//               </span>
//             </li>
//             <li className="flex space-x-3">
//               <svg
//                 className="h-5 w-5 shrink-0 text-red-600"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="text-base font-normal leading-tight text-gray-300">
//                 Free updates
//               </span>
//             </li>
//           </ul>
//           <button className="w-full py-3 px-5 text-base font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500">
//             Get started
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;












import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { FaAngleRight, FaAngleLeft, FaEllipsisV } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import api from "../axiosConfig";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: currentUser?.username || "JohnDoe",
    email: currentUser?.email || "John@gmail.com",
    password: "",
    bio: currentUser?.bio || "Software Developer. Passionate about coding.",
    profilePicture: currentUser?.profilePicture || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    watchHistory: ["Stranger Things", "Money Heist", "Breaking Bad", "Narcos", "Stranger Things", "Money Heist", "Breaking Bad", "Narcos", "Stranger Things", "Money Heist", "Breaking Bad", "Narcos"],
    resumeVideo: [
      "The Witcher",
      "Black Mirror",
      "The Crown",
      "Dark",
      "Ozark",
      "The Witcher",
      "Black Mirror",
      "The Crown",
      "Dark",
      "Ozark",
      "The Witcher",
      "Black Mirror",
      "The Crown",
    ],
  });

  const [dropdownVisible, setDropdownVisible] = useState({});
  const watchHistoryRef = useRef(null);
  const resumeWatchingRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const toggleDropdown = (index, section) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [`${section}-${index}`]: !prev[`${section}-${index}`],
    }));
  };

  const scrollHorizontally = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDelete = (section, index) => {
    setProfile((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({
        ...prev,
        profilePicture: imageUrl
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    if (!currentUser?._id) {
      toast.error("Please login to update your profile");
      navigate("/login");
      return;
    }

    try {
      dispatch(updateStart());

      let imageUrl = profile.profilePicture;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          toast.error("Failed to upload image");
          return;
        }
      }

      const response = await api.put(`/api/v1/user/update/${currentUser._id}`, {
        username: profile.username,
        email: profile.email,
        password: profile.password || undefined,
        bio: profile.bio,
        profilePicture: imageUrl,
      });

      dispatch(updateSuccess(response.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      dispatch(updateFailure(error.response?.data?.message || "Update failed"));
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans overflow-y-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center mt-10 space-y-6">
        <div className="relative">
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-red-600"
          />
          <label htmlFor="profilePicInput" className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full cursor-pointer">
            <FiEdit className="text-white text-xl" />
          </label>
          <input
            type="file"
            id="profilePicInput"
            onChange={handleProfilePicChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        <div className="text-center space-y-2">
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleInputChange}
            className="bg-gray-800 text-white text-lg p-2 rounded-md w-60 text-center focus:outline-none focus:ring-2 focus:ring-red-600 flex justify-center items-center"
            placeholder="Username"
          />

          <input
            type="text"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="bg-gray-800 text-white text-lg p-2 rounded-md w-60 text-center focus:outline-none focus:ring-2 focus:ring-red-600 flex justify-center items-center"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleInputChange}
            className="bg-gray-800 text-white text-lg p-2 rounded-md w-60 text-center focus:outline-none focus:ring-2 focus:ring-red-600 flex justify-center items-center"
            placeholder="New Password"
          />
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="bg-gray-800 text-white text-lg p-2 rounded-md w-60 text-center focus:outline-none flex justify-center items-center"
            placeholder="Bio"
          />
        </div>
        <button 
          className="px-6 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 disabled:opacity-50"
          onClick={handleSaveChanges}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Watch History and Resume Watching Sections */}
      {["Watch History", "Resume Watching"].map((section, idx) => {
        const ref = idx === 0 ? watchHistoryRef : resumeWatchingRef;
        const list = idx === 0 ? profile.watchHistory : profile.resumeVideo;
        const sectionKey = idx === 0 ? "watchHistory" : "resumeVideo";

        return (
          <div key={section} className="mt-10 px-6">
            <h2 className="text-2xl font-bold mb-4">{section}</h2>
            <div className="relative">
              <button
                className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
                onClick={() => scrollHorizontally(ref, "left")}
              >
                <FaAngleLeft className="text-white" />
              </button>
              <div
                className="flex space-x-4 overflow-x-scroll scrollbar-hide"
                ref={ref}
              >
                {list.map((video, index) => (
                  <div
                    key={index}
                    className="relative w-40 h-60 bg-gray-800 rounded-lg flex-shrink-0 text-center p-4"
                  >
                    <h3 className="text-lg font-semibold">{video}</h3>
                    <button
                      onClick={() => toggleDropdown(index, sectionKey)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                      <FaEllipsisV />
                    </button>
                    {dropdownVisible[`${sectionKey}-${index}`] && (
                      <div className="absolute top-10 right-2 bg-gray-700 p-2 rounded shadow-lg">
                        <button
                          onClick={() => handleDelete(sectionKey, index)}
                          className="text-sm text-white hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
                onClick={() => scrollHorizontally(ref, "right")}
              >
                <FaAngleRight className="text-white" />
              </button>
            </div>
          </div>
        );
      })}

      {/* Netflix-Themed Plan Card */}
      <div className="flex items-center justify-center p-10 shadow-lg rounded-lg">
        <div className="max-w-xl p-12 bg-gray-800 text-white rounded-lg shadow-lg">
          <h5 className="mb-4 text-xl font-medium text-gray-400">
            Standard Plan
          </h5>
          <div className="flex items-baseline text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">49</span>
            <span className="ml-1 text-xl font-normal text-gray-400">
              /month
            </span>
          </div>

          <ul className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-300">
                2 team members
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-300">
                50 GB Cloud storage
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-300">
                Free updates
              </span>
            </li>
          </ul>
          <button className="w-full py-3 px-5 text-base font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;