import React, { useState } from "react";
import API from "../services/api";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff, Mail, ShieldCheck } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import icon from "../assets/icon.svg";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validateOtp = (otp: string) => {
    const regex = /^[0-9]{4,6}$/; // Adjust OTP length if needed
    return regex.test(otp);
  };

  const handleSendOtp = async () => {
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/send-otp", { email });
      toast.success(res.data.message || "OTP sent to your email");
      setOtpSent(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setEmailError("");
    setOtpError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!validateOtp(otp)) {
      setOtpError("Please enter a valid OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/login", { email, otp });
      const token = res.data.token;
      if (!token) {
        toast.error("No token received from server.");
        return;
      }

      toast.success("Login successful");
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen relative overflow-hidden md:overflow-auto">
      <Toaster position="top-center" />

      {/* Desktop Logo */}
      <div className="hidden md:flex absolute top-6 left-6 items-center">
        <img src={icon} alt="" />
        <span className="text-2xl font-bold text-gray-800 ml-2">HD</span>
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-start md:justify-center items-center w-full md:w-1/2 h-full p-6 pt-10 bg-white">
        <div className="w-full md:max-w-md md:p-6 bg-white">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center mb-4 md:hidden">
            <img src={icon} alt="icon" />
            <span className="text-3xl font-bold text-gray-800 ml-3">HD</span>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center lg:text-start font-inter">Sign In</h2>

          <p className="text-gray-500 mb-6 text-center lg:text-start">
            Please login to continue to your account.
          </p>

          <div className="w-full mt-10">
            {/* Email */}
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className="relative mb-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                placeholder="your@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

            {/* OTP Link */}
            <p
              onClick={!loading ? handleSendOtp : undefined}
              className="text-sm text-blue-600 mb-4 mt-2 cursor-pointer hover:underline w-fit"
            >
              {loading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
            </p>

            {/* OTP */}
            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
              OTP
            </label>
            <div className="relative mb-1">
              <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="otp"
                type={showOtp ? "text" : "password"}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={!otpSent}
                className={`pl-10 pr-10 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !otpSent ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                autoComplete="one-time-code"
                inputMode="numeric"
              />
              <button
                type="button"
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showOtp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}

            {/* Keep me logged in */}
            <div className="flex items-center mt-4 mb-6">
              <input
                id="keepLoggedIn"
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-900">
                Keep me logged in
              </label>
            </div>

            {/* Sign In */}
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded w-full flex justify-center items-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Create Account */}
            <p className="text-sm text-gray-500 mt-4 text-center">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Image */}
      <div className="hidden md:block w-1/2 h-full p-3 gap-2 ">
        <img
          src="https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-blue-stock-official-3840x2400-5630.jpg"
          alt="Login Visual"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Login;
