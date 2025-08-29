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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOTPEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const html = `
    <div style="max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7faff;">
      <h2 style="text-align: center; color: #1a73e8; margin-bottom: 8px;">🔐 One-Time Passcode</h2>
      <p style="font-size: 16px; color: #333; text-align: center;">for accessing your Note App account</p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 28px; font-weight: bold; padding: 12px 24px; background: #fff; border: 1px dashed #1a73e8; border-radius: 8px; display: inline-block; letter-spacing: 4px; color: #1a73e8;">
          ${otp}
        </span>
      </div>

      <p style="font-size: 15px; color: #555; text-align: center;">
        Enter this code in the app to verify your email. This code will expire in 5 minutes.
      </p>

      <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">
        Didn’t request this? Please ignore this email.
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

      <p style="font-size: 12px; color: #aaa; text-align: center;">
        © ${new Date().getFullYear()} Note App — Simplify your thoughts.
      </p>
    </div>
  `;
    yield transporter.sendMail({
        from: `"Note App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code - Note App",
        html,
    });
});
exports.sendOTPEmail = sendOTPEmail;
