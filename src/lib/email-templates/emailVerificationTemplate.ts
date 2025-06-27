const emailVerificationTemplate = (code: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Email Verification - Exclusive Mart</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background-color: #ffffff;
      color: #333333;
    }

    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }

    .header {
      background-color: #000000;
      padding: 30px 20px;
      text-align: center;
    }

    .logo {
      text-align: center;
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
    }

    .logo img {
      width: 32px;
      height: 32px;
    }

    .header-subtitle {
      color: #cccccc;
      font-size: 14px;
      margin-top: 8px;
    }

    .content {
      padding: 20px 0;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 20px;
    }

    .shield-icon img {
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    .welcome-title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .welcome-text {
      font-size: 14px;
      color: #666666;
      line-height: 1.5;
    }

    .verification-section {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      border-left: 4px solid #e11d48;
      margin: 20px 0;
    }

    .verification-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .verification-code {
      font-size: 28px;
      font-weight: bold;
      color: #e11d48;
      background-color: #ffffff;
      padding: 14px 20px;
      border-radius: 6px;
      border: 2px dashed #e11d48;
      display: inline-block;
      letter-spacing: 6px;
      font-family: 'Courier New', monospace;
    }

    .verification-note {
      font-size: 12px;
      color: #666666;
      margin-top: 12px;
    }

    .security-note {
      background-color: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 6px;
      padding: 16px;
      margin: 20px 0;
    }

    .security-title {
      font-size: 14px;
      font-weight: 600;
      color: #9a3412;
      margin-bottom: 6px;
    }

    .security-text {
      font-size: 12px;
      color: #9a3412;
      line-height: 1.4;
    }

    .footer {
      padding: 20px 0;
      text-align: center;
      font-size: 12px;
      color: #666666;
      border-top: 1px solid #e5e7eb;
    }

    @media (prefers-color-scheme: dark) {
      body, .email-container {
        background-color: #ffffff !important;
        color: #333333 !important;
      }
      .header, .content, .footer {
        background-color: #ffffff !important;
      }
      .logo, .welcome-title, .welcome-text, .verification-title,
      .verification-note, .security-text, .footer-text {
        color: #333333 !important;
      }
      .verification-section {
        background-color: #f8f9fa !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">
        Exclusive Mart
      </div>
      <div class="header-subtitle">Premium Shopping Experience</div>
    </div>

    <div class="content">
      <div class="welcome-section">
        <h1 class="welcome-title">Verify Your Email</h1>
        <p class="welcome-text">
          Welcome to Exclusive Mart! We're excited to have you join our community. 
          Please verify your email to complete your registration.
        </p>
      </div>

      <div class="verification-section">
        <h2 class="verification-title">Your Verification Code</h2>
        <div class="verification-code">${code}</div>
        <p class="verification-note">
          Enter this 6-digit code to activate your account. Code expires in 1 hour.
        </p>
      </div>

    </div>

    <div class="footer">
      <p>This email was sent to you because you signed up at Exclusive Mart.<br>
      Questions? Contact our support team.</p>
      <p style="font-size: 11px; color: #999999; margin-top: 10px;">
        &copy; 2024 Exclusive Mart. All rights reserved.<br>
        123 Commerce Street, Business District, City 12345
      </p>
    </div>
  </div>
</body>
</html>
`;
export default emailVerificationTemplate;