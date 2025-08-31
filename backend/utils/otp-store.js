const otpStore = new Map();
const OTP_EXPIRY_MINUTES = 5;

/**
 * Store OTP for a given email
 * @param {string} email - User's email address
 * @param {string} otp - One-time password
 */
const setOTP = (email, otp) => {
  const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;
  otpStore.set(email, { otp, expiresAt });
};

/**
 * Verify if the provided OTP is valid for the given email
 * @param {string} email - User's email address
 * @param {string} otp - One-time password to verify
 * @returns {boolean} - True if OTP is valid, false otherwise
 */
const verifyOTP = (email, otp) => {
  const record = otpStore.get(email);
  
  if (!record) {
    return false;
  }

  const isValid = record.otp === otp && record.expiresAt > Date.now();
  
  if (isValid) {
    otpStore.delete(email);
  } else if (record.expiresAt <= Date.now()) {
    otpStore.delete(email);
  }

  return isValid;
};

/**
 * Clean up expired OTPs from the store
 */
const cleanupExpiredOTPs = () => {
  const now = Date.now();
  for (const [email, { expiresAt }] of otpStore.entries()) {
    if (expiresAt <= now) {
      otpStore.delete(email);
    }
  }
};

// Clean up expired OTPs every hour
setInterval(cleanupExpiredOTPs, 60 * 60 * 1000);

module.exports = {
  setOTP,
  verifyOTP
};
