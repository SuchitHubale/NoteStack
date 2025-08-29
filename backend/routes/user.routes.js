"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post("/send-otp", user_controller_1.sendOTP);
router.post("/verify-otp", user_controller_1.verifyAndRegister);
router.post("/login", user_controller_1.loginWithOtp);
exports.default = router;
