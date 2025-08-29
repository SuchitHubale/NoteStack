const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

export const setOTP = (email: string, otp: string) => {
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
  };
};

export const verifyOTP = (email: string, otp: string): boolean => {
  const record = otpStore[email];
  if (!record) return false;
  const isValid = record.otp === otp && record.expiresAt > Date.now();
  if (isValid) delete otpStore[email]; // Use once
  return isValid;
};
