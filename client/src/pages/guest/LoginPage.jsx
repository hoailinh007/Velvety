import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in and redirect
  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const roleName = localStorage.getItem("roleName") || sessionStorage.getItem("roleName");
    console.log("roleName from localStorage:", roleName);
    console.log("authToken from localStorage:", token);

    if (token) {
      let redirectUrl = "/";
      if (roleName === "Manager") redirectUrl = "/dashboard";
      else if (roleName === "Staff") redirectUrl = "/view-booking";
      else if (roleName === "Consultant") redirectUrl = "/home";
      else if (roleName === "Admin") redirectUrl = "/staff-management";
      else if (roleName === "Customer") redirectUrl = "/about";

      navigate(redirectUrl);
    }
  }, [navigate]);

  // Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, message, user } = response.data;
      const { roleName } = user;

      setSuccess(message || "Login successful!");

      // Store token based on Remember Me option
      if (rememberMe) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("roleName", roleName);
        localStorage.setItem("rememberedEmail", email);
      } else {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("roleName", roleName);
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect based on user roleName
      let redirectUrl = "/";
      if (roleName === "Manager") redirectUrl = "/dashboard";
      else if (roleName === "Staff") redirectUrl = "/view-booking";
      else if (roleName === "Consultant") redirectUrl = "/home";
      else if (roleName === "Admin") redirectUrl = "/staff-management";
      else if (roleName === "Customer") redirectUrl = "/about";

      navigate(redirectUrl);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container w-full h-screen bg-[#f9faef] relative mx-auto">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100%-121px)] relative">
        <div className="absolute h-screen inset-0 bg-[url(/images/login.png)] bg-cover bg-center bg-no-repeat opacity-50 z-0" />
        <div className="relative z-10 w-full max-w-[400px] bg-white bg-opacity-90 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-center text-2xl font-bold text-[#c86c79] uppercase mb-6 md:mb-8">
            Login
          </h2>
          {error && <div className="text-center text-red-500 mb-4">{error}</div>}
          {success && <div className="text-center text-green-500 mb-4">{success}</div>}

          <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <a href="/forgot-password" className="text-[#c86c79] hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[50px] text-white font-bold rounded-lg shadow transition duration-300
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#c86c79] hover:bg-[#b25668]'}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-8 text-gray-700">
            <span>Don’t have an account?</span>{" "}
            <a href="/register" className="font-bold text-[#c86c79] hover:underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
