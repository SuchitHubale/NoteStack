import { Request, Response } from "express";
import { User } from "../models/user.model";
import { sendOTPEmail } from "../utils/mailer";
import { setOTP, verifyOTP } from "../utils/otp-store";
import { generateToken } from "../utils/jwt";

// ✅ Send OTP for signup or login
export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  setOTP(email, otp);

  try {
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err });
  }
};

// ✅ Verify OTP and register user
export const verifyAndRegister = async (req: Request, res: Response) => {
  const { name, dob, email, otp } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "You are already registered" });
  }

  if (!verifyOTP(email, otp)) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const user = new User({ name, dob, email });

  try {
    const saved = await user.save();
    const token = generateToken(saved._id.toString());
    res.status(201).json({
      message: "User registered successfully",
      user: saved,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "User creation failed", error: err });
  }
};

// ✅ Login using email + OTP
export const loginWithOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "Please create an account" });
  }

  if (!verifyOTP(email, otp)) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const token = generateToken(existingUser._id.toString());
  res.status(200).json({
    message: "Login successful",
    user: existingUser,
    token, // This must be at the top level
  });
};

