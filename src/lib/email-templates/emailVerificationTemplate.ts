const emailVerificationTemplate = (verificationCode: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - Exclusive Mart</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .logo-icon {
            width: 32px;
            height: 32px;
            background-color: #e11d48;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .header-subtitle {
            color: #cccccc;
            font-size: 16px;
            margin-top: 8px;
        }
        
        .content {
            padding: 50px 30px;
        }
        
        .welcome-section {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .shield-icon {
            width: 64px;
            height: 64px;
            background-color: #e11d48;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }
        
        .welcome-title {
            font-size: 28px;
            font-weight: bold;
            color: #000000;
            margin-bottom: 12px;
        }
        
        .welcome-text {
            font-size: 16px;
            color: #666666;
            line-height: 1.5;
        }
        
        .verification-section {
            background-color: #f8f9fa;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            border-left: 4px solid #e11d48;
        }
        
        .verification-title {
            font-size: 20px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 16px;
        }
        
        .verification-code {
            font-size: 36px;
            font-weight: bold;
            color: #e11d48;
            background-color: #ffffff;
            padding: 20px 30px;
            border-radius: 8px;
            border: 2px dashed #e11d48;
            display: inline-block;
            letter-spacing: 8px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }
        
        .verification-note {
            font-size: 14px;
            color: #666666;
            margin-top: 16px;
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #e11d48 0%, #be185d 100%);
            color: #ffffff;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
        }
        
        .security-note {
            background-color: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .security-title {
            font-size: 16px;
            font-weight: 600;
            color: #9a3412;
            margin-bottom: 8px;
        }
        
        .security-text {
            font-size: 14px;
            color: #9a3412;
            line-height: 1.4;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer-text {
            font-size: 14px;
            color: #666666;
            margin-bottom: 16px;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
        }
        
        .social-link {
            width: 40px;
            height: 40px;
            background-color: #e5e7eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #666666;
            transition: background-color 0.2s ease;
        }
        
        .social-link:hover {
            background-color: #e11d48;
            color: #ffffff;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                box-shadow: none;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .welcome-title {
                font-size: 24px;
            }
            
            .verification-code {
                font-size: 28px;
                letter-spacing: 4px;
                padding: 16px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">
                <div class="logo-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" x2="21" y1="6" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                </div>
                Exclusive Mart
            </div>
            <div class="header-subtitle">Premium Shopping Experience</div>
        </div>
        
        <div class="content">
            <div class="welcome-section">
                <div class="shield-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                </div>
                <h1 class="welcome-title">Verify Your Email</h1>
                <p class="welcome-text">
                    Welcome to Exclusive Mart! We're excited to have you join our community of premium shoppers. 
                    To complete your registration and secure your account, please verify your email address.
                </p>
            </div>
            
            <div class="verification-section">
                <h2 class="verification-title">Your Verification Code</h2>
                <div class="verification-code">${verificationCode}</div>
                <p class="verification-note">
                    Enter this 6-digit code in the verification field to activate your account.
                    This code will expire in 1 hour for your security.
                </p>
            </div>
            
            <div class="security-note">
                <div class="security-title">🔒 Security Notice</div>
                <p class="security-text">
                    Never share this verification code with anyone. Exclusive Mart will never ask for your 
                    verification code via phone, email, or text message. If you didn't create an account 
                    with us, please ignore this email.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                This email was sent to you because you created an account at Exclusive Mart.<br>
                If you have any questions, contact our support team.
            </p>
            <p class="footer-text" style="font-size: 12px; color: #999999; margin-top: 20px;">
                © 2024 Exclusive Mart. All rights reserved.<br>
                123 Commerce Street, Business District, City 12345
            </p>
        </div>
    </div>
</body>
</html>
`;

export default emailVerificationTemplate;