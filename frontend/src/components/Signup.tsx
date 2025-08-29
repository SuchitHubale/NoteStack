import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { Eye, EyeOff, Mail, Key } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import icon from "../assets/icon.svg";


const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const clearForm = () => {
    setName("");
    setDob("");
    setEmail("");
    setOtp("");
    setShowOtpInput(false);
    setShowOtp(false);
    setLoading(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!dob) newErrors.dob = "Date of Birth is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await API.post("/send-otp", { email });
      toast.success(res.data.message || "OTP sent to your email");
      setShowOtpInput(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/verify-otp", { name, dob, email, otp });
      toast.success(res.data.message || "Signup successful");
      localStorage.setItem("authToken", res.data.token);
      clearForm();
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <Toaster position="top-center" />
      <div className="hidden md:flex absolute top-6 left-6 items-center z-10">
        <img src={icon} alt="logo" />
        <span className="text-2xl font-bold text-gray-800 ml-2">HD</span>
      </div>

      <div className="flex-1 flex justify-center p-4 md:p-8 items-start md:items-center">
        <div className="w-full max-w-md md:p-6 bg-white">
          <div className="flex md:hidden justify-center items-center mb-6">
            <img src={icon} alt="logo" />
            <span className="text-3xl font-bold text-gray-800 ml-2">HD</span>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center lg:text-start">Sign up</h2>
          <p className="text-gray-500 mb-6 text-center lg:text-start">
            Sign up to enjoy the features of HD
          </p>
          <label
            htmlFor="otp"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mb-4">{errors.name}</p>
          )}
          <label
            htmlFor="otp"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            DOB
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          />
          {errors.dob && (
            <p className="text-sm text-red-500 mb-4">{errors.dob}</p>
          )}
          <label
            htmlFor="otp"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded pl-10 pr-4 py-2 w-full"
            />
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mb-4">{errors.email}</p>
          )}

          {showOtpInput && (
            <div
              className="text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4"
              onClick={handleSendOtp}
            >
              Resend OTP
            </div>
          )}

          {showOtpInput && (
            <div className="relative mb-4">
              <input
                type={showOtp ? "text" : "password"}
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded pl-10 pr-10 py-2 w-full"
                autoComplete="one-time-code"
                inputMode="numeric"
              />
              <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showOtp ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.otp && (
                <p className="text-sm text-red-500 mt-1">{errors.otp}</p>
              )}
            </div>
          )}

          {!showOtpInput ? (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded w-full flex justify-center items-center mt-4 min-h-[40px]"
            >
              {loading ? (
                <div className="flex space-x-1 justify-center items-center">
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                </div>
              ) : (
                "Get OTP"
              )}
            </button>
          ) : (
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded w-full flex justify-center items-center mt-4 min-h-[40px]"
            >
              {loading ? (
                <div className="flex space-x-1 justify-center items-center">
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          )}

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

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

export default Signup;
