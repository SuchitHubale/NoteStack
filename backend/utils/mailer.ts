import nodemailer from "nodemailer";

export const sendOTPEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - Notes App</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); overflow: hidden;">
              
              <!-- Header Section -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <div style="background-color: rgba(255, 255, 255, 0.15); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 36px;">🔐</span>
                  </div>
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Email Verification</h1>
                  <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 400;">Secure access to your Notes App account</p>
                </td>
              </tr>

              <!-- Content Section -->
              <tr>
                <td style="padding: 50px 40px 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px; font-weight: 600; text-align: center;">Your Verification Code</h2>
                  
                  <p style="margin: 0 0 35px 0; color: #64748b; font-size: 16px; line-height: 1.6; text-align: center;">
                    We've generated a secure verification code for you. Enter this code in the Notes App to complete your email verification.
                  </p>

                  <!-- OTP Container -->
                  <div style="text-align: center; margin: 40px 0;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px 35px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                      <span style="font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1e293b; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">
                        ${otp}
                      </span>
                    </div>
                  </div>

                  <!-- Instructions -->
                  <div style="background-color: #f1f5f9; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 30px 0;">
                    <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 16px; font-weight: 600;">📋 Instructions:</h3>
                    <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 14px; line-height: 1.5;">
                      <li>Enter this 6-digit code in the Notes App verification field</li>
                      <li>This code is valid for <strong>5 minutes only</strong></li>
                      <li>Keep this code confidential and don't share it with anyone</li>
                    </ul>
                  </div>

                  <!-- Security Notice -->
                  <div style="background-color: #fef3cd; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px; margin: 25px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <span style="font-size: 18px; margin-right: 8px;">⚠️</span>
                      <div>
                        <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">Security Notice</p>
                        <p style="margin: 5px 0 0 0; color: #b45309; font-size: 13px; line-height: 1.4;">
                          If you didn't request this verification code, please ignore this email. Your account remains secure.
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Footer Section -->
              <tr>
                <td style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: center;">
                        <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px;">
                          This is an automated message from <strong>Notes App</strong>
                        </p>
                        <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                          © 2025 Notes App. All rights reserved.<br>
                          Need help? Contact our support team.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Notes App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Email Verification Code - Notes App",
    html,
    text: `Your Notes App verification code is: ${otp}. This code will expire in 5 minutes. If you didn't request this code, please ignore this email.`, // Plain text fallback
  });
};