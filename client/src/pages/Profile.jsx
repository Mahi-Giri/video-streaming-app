import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit, FiEye, FiEyeOff } from "react-icons/fi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import api from "../axiosConfig";

const Profile = () => {
    const { currentUser, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const watchHistoryRef = useRef(null);
    const resumeWatchingRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        password: "",
        profilePicture: "",
    });

    const watchHistory = [
        "Stranger Things",
        "Money Heist",
        "Breaking Bad",
        "Narcos",
        "The Witcher",
        "Black Mirror",
        "The Crown",
        "Dark",
        "Ozark",
        "The Umbrella Academy",
    ];

    const resumeVideo = [
        "The Witcher",
        "Black Mirror",
        "The Crown",
        "Dark",
        "Ozark",
        "The Umbrella Academy",
        "Stranger Things",
        "Money Heist",
        "Breaking Bad",
        "Narcos",
    ];

    useEffect(() => {
        if (currentUser) {
            setProfile((prev) => ({
                ...prev,
                username: currentUser.username,
                email: currentUser.email,
                profilePicture:
                    currentUser.profilePicture ||
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
            }));
        }
    }, [currentUser]);

    const scrollHorizontally = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 300;
            ref.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const handleProfilePicChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setProfile((prev) => ({
                ...prev,
                profilePicture: imageUrl,
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
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
                const data = new FormData();
                data.append("file", imageFile);
                data.append(
                    "upload_preset",
                    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
                );

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${
                        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                    }/image/upload`,
                    {
                        method: "POST",
                        body: data,
                    }
                );
                const result = await response.json();
                imageUrl = result.secure_url;
            }

            const response = await api.put(
                `/api/v1/user/update/${currentUser._id}`,
                {
                    username: profile.username,
                    email: profile.email,
                    password: profile.password || undefined,
                    profilePicture: imageUrl,
                }
            );

            dispatch(updateSuccess(response.data));
            toast.success("Profile updated successfully!");
        } catch (error) {
            dispatch(
                updateFailure(error.response?.data?.message || "Update failed")
            );
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    if (!currentUser) {
        navigate("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans overflow-y-auto pt-16 sm:pt-20">
            {/* Profile Section */}
            <div className="flex flex-col items-center mt-10 space-y-6 px-4 sm:px-8">
                <div className="border-0 md:border border-white rounded-lg flex flex-col items-center justify-center space-y-4 p-8 md:p-16 shadow-none md:shadow-lg md:shadow-yellow-100 w-full max-w-4xl">
                    <div className="relative">
                        <img
                            src={profile.profilePicture}
                            alt="Profile"
                            className="w-28 h-28 sm:w-36 sm:h-36 md:w-36 md:h-36 lg:w-52 lg:h-52 rounded-full object-cover border-4 border-red-600"
                        />
                        <label
                            htmlFor="profilePicInput"
                            className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full cursor-pointer"
                        >
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
                            className="bg-gray-800 text-white text-lg p-2 rounded-md w-full max-w-md text-center focus:outline-none"
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="bg-gray-800 text-white text-lg p-2 rounded-md w-full max-w-md text-center focus:outline-none"
                            placeholder="Email"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={profile.password}
                                onChange={handleInputChange}
                                className="bg-gray-800 text-white text-lg p-2 rounded-md w-full max-w-md text-center focus:outline-none"
                                placeholder="New Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <FiEye /> : <FiEyeOff />}
                            </button>
                        </div>
                    </div>
                    <button
                        className="px-6 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 w-full max-w-md"
                        onClick={handleSaveChanges}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Update"}
                    </button>
                </div>
            </div>


            {[
                {
                    section: "Watch History",
                    list: watchHistory,
                    ref: watchHistoryRef,
                },
                {
                    section: "Resume Watching",
                    list: resumeVideo,
                    ref: resumeWatchingRef,
                },
            ].map(
                ({ section, list, ref }) =>
                    list.length > 0 && (
                        <div
                            key={section}
                            className="relative mt-10 px-8 sm:px-8 md:px-12"
                        >
                            <h2 className="text-white text-xl font-bold mb-4 ml-6">
                                {section}
                            </h2>
                            <div className="relative w-full overflow-hidden">
                                {list.length > 3 && (
                                    <button
                                        onClick={() =>
                                            scrollHorizontally(ref, "left")
                                        }
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full z-20 sm:left-2 md:left-6 lg:left-8"
                                    >
                                        <FaAngleLeft className="text-white" />
                                    </button>
                                )}
                                <div
                                    ref={ref}
                                    className="flex gap-4 transition-transform overflow-x-auto px-4 no-scrollbar"
                                >
                                    {list.map((item, index) => (
                                        <div
                                            key={index}
                                            className="relative w-36 h-48 sm:w-48 sm:h-72 md:w-48 md:h-72 lg:w-60 lg:h-80 bg-gray-800 rounded-lg flex-shrink-0 text-center"
                                        >
                                            <p className="text-white">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                {list.length > 3 && (
                                    <button
                                        onClick={() =>
                                            scrollHorizontally(ref, "right")
                                        }
                                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full z-30 sm:right-2 md:right-6 lg:right-8"
                                    >
                                        <FaAngleRight className="text-white" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )
            )}

            {/* Netflix-Themed Plan Card */}
            <h2 className="mt-10 px-4 sm:px-8 md:px-12 text-2xl font-bold mb-4 ml-10">
                Current Plan
            </h2>
            <div className="flex items-center justify-center p-4 sm:p-10 shadow-lg rounded-lg">
                <div className="max-w-xl p-8 sm:p-12 bg-gray-800 text-white rounded-lg shadow-lg">
                    <h5 className="mb-4 text-xl font-medium text-gray-400">
                        Standard Plan
                    </h5>
                    <div className="flex items-baseline text-white">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">
                            49
                        </span>
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
                        Upgrade Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;