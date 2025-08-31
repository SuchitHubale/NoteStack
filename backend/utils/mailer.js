const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    const error = new Error('Email credentials not configured');
    error.code = 'MISSING_CREDENTIALS';
    throw error;
  }

  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    error.code = 'TRANSPORTER_ERROR';
    throw error;
  }
};

const sendOTPEmail = async (email, otp) => {
  
  if (!email || !otp) {
    const error = new Error('Email and OTP are required');
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  const transporter = createTransporter();
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - NoteStack</title>
      <style>
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          line-height: 1.6;
          color: #374151;
          background-color: #f9fafb;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #111827;
            color: #f3f4f6;
          }
          
          .email-container {
            background-color: #1f2937 !important;
            border-color: #374151 !important;
          }
          
          .header {
            background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%) !important;
          }
          
          .content {
            background-color: #1f2937 !important;
          }
          
          .otp-box {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
          }
          
          .otp-code {
            color: #f3f4f6 !important;
          }
          
          .info-box {
            background-color: #1e3a8a !important;
            border-color: #3b82f6 !important;
          }
          
          .info-text {
            color: #dbeafe !important;
          }
          
          .footer {
            background-color: #111827 !important;
            border-color: #374151 !important;
          }
          
          .footer-text {
            color: #9ca3af !important;
          }
          
          .link {
            color: #60a5fa !important;
          }
        }
        
        /* Container styles */
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }
        
        .header {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          padding: 32px 24px;
          text-align: center;
          color: white;
        }
        
        .logo {
          font-size: 32px;
          margin-bottom: 12px;
        }
        
        .header-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .header-subtitle {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .content {
          padding: 32px 24px;
          background-color: #ffffff;
        }
        
        .greeting {
          font-size: 16px;
          margin-bottom: 24px;
          color: #374151;
        }
        
        .main-text {
          font-size: 16px;
          margin-bottom: 32px;
          text-align: center;
          color: #6b7280;
        }
        
        .otp-section {
          text-align: center;
          margin: 32px 0;
        }
        
        .otp-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9ca3af;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .otp-box {
          display: inline-block;
          background-color: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px 24px;
          margin: 8px 0;
        }
        
        .otp-code {
          font-family: 'SF Mono', Monaco, Consolas, monospace;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #111827;
        }
        
        .otp-expiry {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 8px;
        }
        
        .info-box {
          background-color: #eff6ff;
          border: 1px solid #3b82f6;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
        }
        
        .info-title {
          font-size: 14px;
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 8px;
        }
        
        .info-text {
          font-size: 14px;
          color: #1e40af;
          line-height: 1.5;
        }
        
        .footer {
          background-color: #f9fafb;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        
        .footer-text {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
        }
        
        .footer-small {
          font-size: 12px;
          color: #9ca3af;
        }
        
        .link {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .link:hover {
          text-decoration: underline;
        }
        
        /* Responsive design */
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 10px;
            border-radius: 8px;
          }
          
          .header {
            padding: 24px 16px;
          }
          
          .header-title {
            font-size: 20px;
          }
          
          .content {
            padding: 24px 16px;
          }
          
          .otp-code {
            font-size: 24px;
            letter-spacing: 3px;
          }
          
          .footer {
            padding: 20px 16px;
          }
        }
      </style>
    </head>
    <body>
      <!-- Preheader text for email preview -->
      <div style="display: none; max-height: 0; overflow: hidden;">
        Your NoteStack verification code: ${otp} - Complete your email verification
      </div>
      
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <div class="logo">📝</div>
          <h1 class="header-title">NoteStack</h1>
          <p class="header-subtitle">Email Verification</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
          <p class="greeting">Hello!</p>
          
          <p class="main-text">
            Please use the verification code below to complete your email verification and access your NoteStack account.
          </p>
          
          <!-- OTP Section -->
          <div class="otp-section">
            <div class="otp-label">Verification Code</div>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <div class="otp-expiry">Expires in 5 minutes</div>
          </div>
          
          <!-- Instructions -->
          <div class="info-box">
            <div class="info-title">🔒 Security Notice</div>
            <div class="info-text">
              • This code is confidential - never share it with anyone<br>
              • NoteStack will never ask for your code via phone or email<br>
              • If you didn't request this verification, you can ignore this email
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p class="footer-text">
            <strong>NoteStack App</strong><br>
            Your secure note-taking companion
          </p>
          
          <p class="footer-small">
            Need help? Contact us at <a href="mailto:support@notestack.app" class="link">support@notestack.app</a><br>
            This email was sent to ${email}
          </p>
          
          <p class="footer-small" style="margin-top: 12px;">
            © 2025 NoteStack App. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"NoteStack App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Your NoteStack verification code',
    text: `Hello!

Your NoteStack verification code is: ${otp}

This code will expire in 5 minutes.

Steps to verify:
1. Open the NoteStack app
2. Enter the verification code: ${otp}
3. Click "Verify"

Security Note:
• Keep this code confidential
• NoteStack will never ask for your code via phone or email
• If you didn't request this, you can ignore this email

Need help? Contact us at support@notestack.app

© 2025 NoteStack App
This email was sent to ${email}`,
    html,
  };

  try {
    console.log('Sending email with options:', {
      to: mailOptions.to,
      from: mailOptions.from,
      subject: mailOptions.subject
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      timestamp: new Date().toISOString(),
      recipient: email
    };
  } catch (error) {
    console.error('Error sending email:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
      response: error.response,
      recipient: email
    });
    
    if (error.code === 'EAUTH') {
      error.message = 'Authentication failed. Please check your email credentials.';
      error.code = 'AUTH_ERROR';
    } else if (error.code === 'EENVELOPE') {
      error.message = 'Invalid email address provided.';
      error.code = 'INVALID_EMAIL';
    } else if (error.code === 'ECONNECTION') {
      error.message = 'Unable to connect to email server. Please try again.';
      error.code = 'CONNECTION_ERROR';
    } else if (error.code === 'ETIMEDOUT') {
      error.message = 'Email sending timed out. Please try again.';
      error.code = 'TIMEOUT_ERROR';
    }
    
    error.code = error.code || 'EMAIL_SEND_ERROR';
    throw error;
  }
};

module.exports = {
  sendOTPEmail,
  createTransporter
};