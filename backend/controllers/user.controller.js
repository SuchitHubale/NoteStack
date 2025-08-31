const User = require('../models/user.model');
const { sendOTPEmail } = require('../utils/mailer');
const { setOTP, verifyOTP } = require('../utils/otp-store');
const { generateToken } = require('../utils/jwt');

// Send OTP for signup or login
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email || !email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        setOTP(email, otp);
        
        await sendOTPEmail(email, otp);
        
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            debug: { otp } 
        });
    } catch (error) {
        console.error('Error in sendOTP controller:', {
            message: error.message,
            stack: error.stack,
            ...error
        });
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
            debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const verifyAndRegister = async (req, res) => {
    try {
        const { name, dob, email, otp } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: "You are already registered" });
        }
        
        if (!verifyOTP(email, otp)) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        
        const newUser = new User({ name, dob, email });
        await newUser.save();
        
        const token = generateToken(newUser._id);
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error in verifyAndRegister:', error);
        res.status(500).json({ 
            success: false,
            message: 'Registration failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
const loginWithOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (!verifyOTP(email, otp)) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        
        const token = generateToken(user._id);
        
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error in loginWithOtp:', error);
        res.status(500).json({ 
            success: false,
            message: 'Login failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    sendOTP,
    verifyAndRegister,
    loginWithOtp
};
