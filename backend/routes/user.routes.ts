import express from "express";
import {
  sendOTP,
  verifyAndRegister,
  loginWithOtp,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyAndRegister);
router.post("/login", loginWithOtp);

export default router;
