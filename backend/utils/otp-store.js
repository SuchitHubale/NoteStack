"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.setOTP = void 0;
const otpStore = {};
const setOTP = (email, otp) => {
    otpStore[email] = {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
    };
};
exports.setOTP = setOTP;
const verifyOTP = (email, otp) => {
    const record = otpStore[email];
    if (!record)
        return false;
    const isValid = record.otp === otp && record.expiresAt > Date.now();
    if (isValid)
        delete otpStore[email]; // Use once
    return isValid;
};
exports.verifyOTP = verifyOTP;
