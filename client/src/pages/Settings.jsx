import React, { useState, } from "react";
import { FaBell, FaSave } from "react-icons/fa";
import LanguageSelector from "../components/LanguageSelector";
import useTranslation from "../hooks/useTranslation";
const Settings = () => {
    const [userData, setUserData] = useState({
        notifications: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({
            ...userData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Settings:", userData);
        alert("Settings Updated Successfully!");
    };

    return (
        <div className="p-12">
            <div className="max-w-lg mx-auto bg-gray-700  p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-white">Settings</h2>
                <div>
                    <LanguageSelector />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Notifications Toggle */}
                    <div className="flex items-center mt-3">
                        <FaBell className="text-yellow-500 mr-2" />
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={userData.notifications}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="text-white">Enable Notifications</span>
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        <FaSave className="mr-2" />
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
