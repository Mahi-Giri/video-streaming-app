import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaRegUser,
  FaGoogle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/v1/auth/signup", formData);
      console.log(response);
      toast.success(response.data.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleGoogle = () => {
    console.log("google");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        background:
          "url('https://wallpapers.com/images/high/netflix-background-gs7hjuwvv2g0e9fj.webp') no-repeat center center/cover",
      }}
    >
      <div className="relative w-[350px] h-[500px]">
        <div className="absolute w-full h-full bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-black">
            Register
          </h2>
          <p className="text-white/60 text-center mb-4">Create a new account</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaRegUser className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="User Name"
                required
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center gap-2"
            >
              <FaUser /> Register
            </button>
            {/* <OAuth /> */}
          </form>

          <p className="text-center text-white/60 mt-4">
            Already have an account?{" "}
            <Link to="/login">
              <button className="text-blue-400">Login</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
