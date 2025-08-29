"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithOtp = exports.verifyAndRegister = exports.sendOTP = void 0;
const user_model_1 = require("../models/user.model");
const mailer_1 = require("../utils/mailer");
const otp_store_1 = require("../utils/otp-store");
const jwt_1 = require("../utils/jwt");
// ✅ Send OTP for signup or login
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ message: "Email is required" });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    (0, otp_store_1.setOTP)(email, otp);
    try {
        yield (0, mailer_1.sendOTPEmail)(email, otp);
        res.status(200).json({ message: "OTP sent" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to send OTP", error: err });
    }
});
exports.sendOTP = sendOTP;
// ✅ Verify OTP and register user
const verifyAndRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dob, email, otp } = req.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "You are already registered" });
    }
    if (!(0, otp_store_1.verifyOTP)(email, otp)) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const user = new user_model_1.User({ name, dob, email });
    try {
        const saved = yield user.save();
        const token = (0, jwt_1.generateToken)(saved._id.toString());
        res.status(201).json({
            message: "User registered successfully",
            user: saved,
            token,
        });
    }
    catch (err) {
        res.status(500).json({ message: "User creation failed", error: err });
    }
});
exports.verifyAndRegister = verifyAndRegister;
// ✅ Login using email + OTP
const loginWithOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({ message: "Please create an account" });
    }
    if (!(0, otp_store_1.verifyOTP)(email, otp)) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const token = (0, jwt_1.generateToken)(existingUser._id.toString());
    res.status(200).json({
        message: "Login successful",
        user: existingUser,
        token, // This must be at the top level
    });
});
exports.loginWithOtp = loginWithOtp;
