import { useState } from "react";
import api from "../axiosConfig";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("I am here");

    try {
      const response = await api.post("/api/v1/auth/signin", {
        email,
        password,
      });

      console.log(response);

      if (response.data) {
        toast.success("User Login Success");
        navigate("/dashboard");
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        background:
          "url('https://wallpapers.com/images/high/netflix-background-gs7hjuwvv2g0e9fj.webp') no-repeat center center/cover",
      }}
    >
      <div className="relative w-[350px] h-[450px]">
        <div className="absolute w-full h-full bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-black">Login</h2>
          <p className="text-white/60 text-center mb-4">Welcome back!</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center gap-2"
            >
              <FaUser /> Login
            </button>
          </form>

          <p className="text-center text-white/60 mt-4">
            Don't have an account?{" "}
            <Link to="/signup">
              <button className="text-blue-400">Sign Up</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
