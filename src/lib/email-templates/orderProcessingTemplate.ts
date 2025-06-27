import generateFormattedTime from "../generateFormattedTime";

const orderProcessingTemplate = (orderId) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Processing - Exclusive Mart</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Reset styles */
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
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* Header */
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
            display: inline-block;
        }

        .header-subtitle {
            color: #cccccc;
            font-size: 16px;
            margin-top: 8px;
        }

        /* Main content */
        .main-content {
            padding: 50px 30px;
            background-color: #ffffff;
        }

        .status-section {
            text-align: center;
            margin-bottom: 40px;
        }

        .status-icon {
            width: 64px;
            height: 64px;
            background-color: #3b82f6;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 25px;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .main-title {
            font-size: 28px;
            font-weight: bold;
            color: #000000;
            margin: 0 0 15px 0;
        }

        .description {
            color: #666666;
            font-size: 16px;
            line-height: 1.5;
            margin: 0 auto 40px auto;
            max-width: 450px;
        }

        /* Order number section */
        .order-number-section {
            text-align: center;
            margin-bottom: 40px;
        }

        .order-label {
            color: #000000;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 15px;
        }

        .order-number-box {
            display: inline-block;
            border: 2px dashed #3b82f6;
            border-radius: 12px;
            padding: 20px 30px;
            background-color: #dbeafe;
        }

        .order-number {
            font-size: 28px;
            font-weight: bold;
            color: #3b82f6;
            letter-spacing: 2px;
            font-family: 'Courier New', monospace;
        }        /* Status details */
        .status-details {
            background-color: #f0f7ff;
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #bfdbfe;
            gap: 10px;
        }

        .detail-row:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .detail-label {
            color: #1e40af;
            font-size: 14px;
            font-weight: 600;
            flex-shrink: 0;
        }

        .detail-value {
            color: #1e40af;
            font-size: 14px;
            font-weight: 700;
            text-align: right;
        }

        .status-badge {
            background-color: #3b82f6;
            color: #ffffff;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
        }

        /* Progress section */
        .progress-section {
            margin: 30px 0;
        }

        .progress-title {
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 20px;
        }

        .progress-steps {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .progress-step {
            font-size: 12px;
            color: #666666;
            font-weight: 500;
        }

        .progress-step.active {
            color: #3b82f6;
            font-weight: 700;
        }

        .progress-bar {
            display: flex;
            align-items: center;
            height: 4px;
        }

        .progress-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #e5e7eb;
        }

        .progress-dot.active {
            background-color: #3b82f6;
        }

        .progress-line {
            flex: 1;
            height: 2px;
            background-color: #e5e7eb;
        }

        .progress-line.active {
            background-color: #3b82f6;
        }

        /* What's next section */
        .whats-next {
            background-color: #dbeafe;
            border-left: 4px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }

        .whats-next-title {
            font-weight: 600;
            color: #1e40af;
            font-size: 16px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .whats-next-text {
            color: #1e40af;
            font-size: 14px;
            line-height: 1.5;
        }

        /* Action button */
        .action-section {
            text-align: center;
            margin: 30px 0;
        }

        .action-button {
            background-color: #3b82f6;
            color: #ffffff;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            display: inline-block;
            transition: background-color 0.2s ease;
        }

        .action-button:hover {
            background-color: #2563eb;
        }

        /* Footer */
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
        }        .footer-links {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin: 20px 0;
            text-align: center;
        }

        .footer-link {
            color: #e11d48;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            display: inline-block;
            text-align: center;
        }

        .footer-link:hover {
            text-decoration: underline;
        }

        /* Mobile responsive */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                box-shadow: none;
            }

            .header,
            .main-content,
            .footer {
                padding: 30px 20px;
            }

            .main-title {
                font-size: 24px;
            }

            .order-number {
                font-size: 24px;
                letter-spacing: 1px;
            }

            .order-number-box {
                padding: 15px 20px;
            }

            .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }

            .progress-steps {
                font-size: 10px;
            }

            .footer-links {
                flex-direction: column;
                gap: 10px;
            }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #121212 !important;
                color: #e0e0e0 !important;
            }

            .email-container {
                background-color: #1e1e1e !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
            }

            .main-content {
                background-color: #1e1e1e !important;
            }

            .main-title {
                color: #ffffff !important;
            }

            .description {
                color: #b0b0b0 !important;
            }

            .order-label {
                color: #ffffff !important;
            }

            .progress-title {
                color: #ffffff !important;
            }

            .order-number-box {
                background-color: #1e2a4a !important;
                border-color: #3b82f6 !important;
            }            .status-details {
                background-color: rgba(59, 130, 246, 0.1) !important;
                border-color: #3b82f6 !important;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2) !important;
            }

            .detail-row {
                border-bottom-color: rgba(59, 130, 246, 0.3) !important;
            }

            .detail-label,
            .detail-value {
                color: #93c5fd !important;
            }

            .status-badge {
                background-color: #2563eb !important;
                color: #ffffff !important;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
            }

            .progress-step {
                color: #b0b0b0 !important;
            }

            .progress-step.active {
                color: #60a5fa !important;
            }

            .whats-next {
                background-color: #1e2a4a !important;
                border-left-color: #3b82f6 !important;
            }

            .whats-next-title,
            .whats-next-text {
                color: #60a5fa !important;
            }

            .footer {
                background-color: #222222 !important;
                border-top-color: #3d3d3d !important;
            }

            .footer-text {
                color: #b0b0b0 !important;
            }

            .footer-link {
                color: #3b82f6 !important;
            }
        }

        /* Gmail-specific fixes */
        u + .body .gmail-fix {
            display: none;
        }

        @media only screen and (max-width: 600px) {
            .gmail-fix {
                display: none !important;
            }
        }
    </style>
</head>

<body class="body" style="background-color: #f8f9fa; color: #333333;">
    <div class="email-container" style="background-color: #ffffff;">
        <!-- Header -->
        <img src="https://i.ibb.co/0pBYyLz1/Screenshot-2025-06-13-163449.png" style="width: 100%;" />

        <!-- Main Content -->
        <div class="main-content" style="background-color: #ffffff;">
            <!-- Status Section -->
            <div class="status-section">
                <div>
                    <img src="https://i.ibb.co/mVpS4bzZ/box.png" />
                </div>
                <h2 class="main-title" style="color: #000000;">Order is Being Processed</h2>
                <p class="description" style="color: #666666;">
                    Your order has been confirmed and is currently being prepared for shipment. Our team is working to get your items ready.
                </p>
            </div>

            <!-- Order Number Section -->
            <div class="order-number-section">
                <div class="order-label" style="color: #000000;">Order Number</div>
                <div class="order-number-box" style="background-color: #dbeafe; border-color: #3b82f6;">
                    <div class="order-number" style="color: #3b82f6;">${orderId}</div>
                </div>
            </div>

            <!-- Status Details -->
            <div class="status-details" style="background-color: #dbeafe; border-color: #60a5fa;">
                <div class="detail-row">
                    <span class="detail-label" style="color: #1e40af;">Status Updated:</span>
                    <span class="detail-value" style="color: #1e40af;">${generateFormattedTime()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label" style="color: #1e40af;">Current Status:</span>
                    <span class="status-badge" style="background-color: #3b82f6; color: #ffffff;">Processing</span>
                </div>
            </div>
            <!-- What's Next Section -->
            <div class="whats-next" style="background-color: #dbeafe; border-left-color: #3b82f6;">
                <div class="whats-next-title" style="color: #1e40af;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="3" width="15" height="13"/>
                        <path d="m16 8 2 2-2 2"/>
                        <path d="m21 12-3 3-3-3"/>
                    </svg>
                    What happens next?
                </div>
                <p class="whats-next-text" style="color: #1e40af;">
                    Your order is being carefully prepared and packaged by our fulfillment team. Once ready, it will be handed over to our shipping partner. You'll receive a tracking number via email when your order ships.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer" style="background-color: #f8f9fa; border-top-color: #e5e7eb;">
            <p class="footer-text" style="color: #666666;">
                Need help? Contact our support team or visit your account dashboard.
            </p>
            <div class="footer-links">
                <a href="#" class="footer-link" style="color: #e11d48;">Contact Support</a>
                <a href="#" class="footer-link" style="color: #e11d48;">View Order Details</a>
                <a href="#" class="footer-link" style="color: #e11d48;">Cancel Order</a>
            </div>
            <p class="footer-text" style="font-size: 12px; color: #999999; margin-top: 20px;">
                © 2024 Exclusive Mart. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`;
export default orderProcessingTemplate;