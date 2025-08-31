const express = require('express');
const { 
  sendOTP, 
  verifyAndRegister, 
  loginWithOtp 
} = require('../controllers/user.controller');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyAndRegister);
router.post('/login', loginWithOtp);

module.exports = router;
