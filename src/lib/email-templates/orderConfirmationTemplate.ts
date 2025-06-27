import { Order } from "@/types/types";

const orderConfirmationTemplate = (orderData: Order) => `<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed - Exclusive Mart</title>
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

        /* Header styles from html1 */
        .header {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            padding: 40px 30px;
            text-align: center;
        }

        .logo {
            display: inline-flex;
            align-items: center;
            gap: 20px;
            color: #ffffff !important;
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

        /* Main content */
        .main-content {
            padding: 50px 30px;
            background-color: #ffffff;
        }

        .success-section {
            text-align: center;
            margin-bottom: 40px;
        }

        .success-icon {
            width: 64px;
            height: 64px;
            background-color: #e11d48;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 25px;
            box-shadow: 0 8px 25px rgba(225, 29, 72, 0.3);
        }

        .success-icon svg {
            width: 32px;
            height: 32px;
            fill: white;
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
            border: 2px dashed #e11d48;
            border-radius: 12px;
            padding: 20px 30px;
            background-color: #fef2f2;
        }

        .order-number {
            font-size: 28px;
            font-weight: bold;
            color: #e11d48;
            letter-spacing: 2px;
            font-family: 'Courier New', monospace;
        }

        .order-note {
            font-size: 14px;
            color: #666666;
            margin-top: 15px;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Products section */
        .products-section {
            margin-bottom: 40px;
        }

        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #000000;
            text-align: center;
            margin-bottom: 25px;
        }

        .product-item {
            display: flex;
            align-items: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 12px;
            margin-bottom: 15px;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
        }

        .product-item:last-child {
            margin-bottom: 0;
        }

        .product-item:hover {
            background-color: #f1f5f9;
            border-color: #cbd5e1;
        }

        .product-image {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
            border-radius: 8px;
            margin-right: 15px;
            flex-shrink: 0;
            border: 1px solid #e2e8f0;
        }

        .product-details {
            flex: 1;
            min-width: 0;
        }

        .product-name {
            font-weight: 600;
            color: #000000;
            font-size: 16px;
            margin-bottom: 5px;
        }

        .product-specs {
            font-size: 14px;
            color: #666666;
        }

        .product-price {
            font-weight: 700;
            color: #000000;
            font-size: 16px;
            text-align: right;
        }

        /* Order summary */
        .summary-section {
            margin-bottom: 40px;
        }

        .summary-box {
            background-color: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            border: 1px solid #e5e7eb;
            border-left: 4px solid #e11d48;
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
        }

        .summary-label {
            color: #666666;
            font-size: 15px;
        }

        .summary-value {
            font-weight: 600;
            color: #000000;
            font-size: 15px;
        }

        .discount-row .summary-label,
        .discount-row .summary-value {
            color: #059669;
        }

        .total-row {
            border-top: 2px solid #e5e7eb;
            padding-top: 15px;
            margin-top: 10px;
        }

        .total-row .summary-label {
            font-size: 18px;
            font-weight: 700;
            color: #000000;
        }

        .total-row .summary-value {
            font-size: 20px;
            font-weight: 700;
            color: #000000;
        }

        /* Shipping info */
        .shipping-section {
            margin-bottom: 40px;
        }

        .info-card {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
        }

        .info-card-title {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .info-card-content {
            font-size: 14px;
            color: #666666;
            line-height: 1.5;
        }

        /* Status notice */
        .status-notice {
            background-color: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }

        .notice-header {
            display: flex;
            align-items: flex-start;
        }

        .notice-icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            margin-top: 2px;
            fill: #9a3412;
            flex-shrink: 0;
        }

        .notice-content {
            flex: 1;
        }

        .notice-title {
            font-weight: 600;
            color: #9a3412;
            font-size: 16px;
            margin-bottom: 8px;
        }

        .notice-text {
            color: #9a3412;
            font-size: 14px;
            line-height: 1.4;
        }

        /* Transaction info */
        .transaction-section {
            text-align: center;
            margin-bottom: 40px;
        }

        .transaction-text {
            color: #666666;
            font-size: 14px;
        }

        .transaction-id {
            font-family: 'Courier New', monospace;
            color: #000000;
            font-weight: 600;
        }

        /* Footer styles from html1 */
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

            .product-item {
                flex-direction: column;
                text-align: center;
                padding: 15px;
            }

            .product-image {
                margin-right: 0;
                margin-bottom: 10px;
            }

            .product-price {
                text-align: center;
                margin-top: 10px;
            }

            .shipping-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Dark Mode Styles - Optimized for Gmail */
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

            .order-number-box {
                background-color: #2d1a1e !important;
                border-color: #e11d48 !important;
            }

            .section-title {
                color: #ffffff !important;
            }

            .product-item {
                background-color: #2a2a2a !important;
                border-color: #3d3d3d !important;
            }

            .product-item:hover {
                background-color: #323232 !important;
                border-color: #4d4d4d !important;
            }

            .product-image {
                background: linear-gradient(135deg, #2a2a2a 0%, #333333 100%) !important;
                border-color: #3d3d3d !important;
            }

            .product-name {
                color: #ffffff !important;
            }

            .product-specs {
                color: #b0b0b0 !important;
            }

            .product-price {
                color: #ffffff !important;
            }

            .summary-box {
                background-color: #2a2a2a !important;
                border-color: #3d3d3d !important;
                border-left-color: #e11d48 !important;
            }

            .summary-label {
                color: #b0b0b0 !important;
            }

            .summary-value {
                color: #ffffff !important;
            }

            .discount-row .summary-label,
            .discount-row .summary-value {
                color: #4ade80 !important;
            }

            .total-row {
                border-top-color: #3d3d3d !important;
            }

            .total-row .summary-label,
            .total-row .summary-value {
                color: #ffffff !important;
            }

            .info-card {
                background-color: #2a2a2a !important;
                border-color: #3d3d3d !important;
            }

            .info-card-title {
                color: #ffffff !important;
            }

            .info-card-content {
                color: #ffffff !important;
            }

            .status-notice {
                background-color: #2d2618 !important;
                border-color: #4d3d1a !important;
            }

            .notice-title,
            .notice-text {
                color: #f97316 !important;
            }

            .notice-icon {
                fill: #f97316 !important;
            }

            .transaction-text {
                color: #b0b0b0 !important;
            }

            .transaction-id {
                color: #ffffff !important;
            }

            .footer {
                background-color: #222222 !important;
                border-top-color: #3d3d3d !important;
            }

            .footer-text {
                color: #b0b0b0 !important;
            }

            .social-link {
                background-color: #3d3d3d !important;
                color: #b0b0b0 !important;
            }

            .social-link:hover {
                background-color: #e11d48 !important;
                color: #ffffff !important;
            }
        }
    </style>
</head>

<body style="background-color: #f8f9fa; color: #333333;">
    <div class="email-container" style="background-color: #ffffff;">
        <!-- Header from html1 - Using table for better Gmail compatibility -->
        <img src="https://i.ibb.co/0pBYyLz1/Screenshot-2025-06-13-163449.png" style="width: 100%;" />

        <!-- Main Content from html2 -->
        <div class="main-content" style="background-color: #ffffff;">
            <!-- Success Section -->
            <div class="success-section">

                <img src="https://i.ibb.co/xVdYTGV/correct.png" alt="success_tik_image"
                    style="width: 60px; height: 60px;" />

                <h2 class="main-title" style="color: #000000;">Order Confirmed!</h2>
                <p class="description" style="color: #666666;">
                    Thank you for your order, John Smith! We're excited to have you as our customer.
                    Your order has been confirmed and is being processed.
                </p>
            </div>

            <!-- Order Number Section -->
            <div class="order-number-section">
                <div class="order-label" style="color: #000000;">Your Order Number</div>
                <div class="order-number-box" style="background-color: #fef2f2; border-color: #e11d48;">
                    <div class="order-number" style="color: #e11d48;">${orderData.orderId}</div>
                </div>
                <p class="order-note" style="color: #666666;">
                    Save this order number for tracking your shipment and future reference.
                </p>
            </div>

            <!-- Products Section -->
            <div class="products-section">
                <h3 class="section-title" style="color: #000000;">Order Items</h3>

                ${orderData.products.map(product => `
                <div class="product-item" style="background-color: #f8f9fa; border-color: #e5e7eb;">
                    <div class="product-image"
                        style="background-image: url('${product.image}'); background-size: cover;"></div>
                    <div class="product-details">
                        <div class="product-name" style="color: #000000;">${product.name}</div>
                        <div class="product-specs" style="color: #666666;">Qty: ${product.cartQuantity} | Variant:
                            ${product.variant} | Color:
                            ${product.color}</div>
                    </div>
                    <div class="product-price" style="color: #000000;">$${(product.price *
        product.cartQuantity).toFixed(2)}</div>
                </div>
                `).join('')}
            </div>

            <!-- Order Summary -->
            <div class="summary-section">
                <h3 class="section-title" style="color: #000000;">Order Summary</h3>
                <div class="summary-box"
                    style="background-color: #f8f9fa; border-color: #e5e7eb; border-left-color: #e11d48;">
                    <div class="summary-row">
                        <span class="summary-label" style="color: #666666;">Subtotal : </span>
                        <span class="summary-value" style="color: #000000;">$${(orderData.paidAmount ?
        (orderData.paidAmount - 60) :
        0).toFixed(2)}</span>
                    </div>
                    ${orderData.discount && orderData.discount > 0 ? `
                    <div class="summary-row discount-row">
                        <span class="summary-label" style="color: #059669;">Discount : </span>
                        <span class="summary-value" style="color: #059669;">-$${orderData.discount.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    <div class="summary-row">
                        <span class="summary-label" style="color: #666666;">Shipping : </span>
                        <span class="summary-value" style="color: #000000;">$60.00</span>
                    </div>
                    <div class="summary-row total-row" style="border-top-color: #e5e7eb;">
                        <span class="summary-label" style="color: #000000;">Total : </span>
                        <span class="summary-value" style="color: #000000;">$${(orderData.paidAmount ||
        0).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <!-- Shipping Information -->
            <h3 class="section-title" style="color: #000000;">Shipping & Payment Information</h3>
            <div class="shipping-section">
                <div style="margin-bottom: 20px;">
                    <div class="info-card" style="background-color: #ffffff; border-color: #e5e7eb; margin-bottom: 20;">
                        <div class="info-card-title" style="color: #000000;">
                            <img src="https://img.icons8.com/ios/50/ffffff/address.png"
                                style="width: 20px; height: 20px; filter: invert(1);" class="dark-mode-icon" />
                            Shipping Address
                        </div>
                        <div class="info-card-content" style="color: #666666;">
                            ${orderData.name}<br>
                            ${orderData.address}<br>
                            ${orderData.city}, ${orderData.postCode}<br>
                            Phone: ${orderData.phone}
                        </div>
                    </div>

                    <div class="info-card" style="background-color: #ffffff; border-color: #e5e7eb;">
                        <div class="info-card-title" style="color: #000000;">
                            <img src="https://cdn-icons-png.flaticon.com/512/657/657076.png"
                                style="width: 20px; height: 20px; filter: invert(1);" class="dark-mode-icon" />
                            Payment Method
                        </div>
                        <div class="info-card-content" style="color: #666666;">
                            Transaction ID: ${orderData.transactionId}<br>
                            Amount: $${(orderData.paidAmount || 0).toFixed(2)}<br>
                            Status: Completed
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status Notice -->
            <div class="status-notice" style="background-color: #fff7ed; border-color: #fed7aa;">
                <div class="notice-header">
                    <svg class="notice-icon" viewBox="0 0 24 24" style="fill: #9a3412;">
                        <path
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div class="notice-content">
                        <div class="notice-title" style="color: #9a3412;">🔒 Order Status: ${(orderData.status ||
        'pending').charAt(0).toUpperCase() + (orderData.status || 'pending').slice(1)}</div>
                        <p class="notice-text" style="color: #9a3412;">
                            ${getStatusMessage(orderData.status || 'pending')}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Transaction Information -->
            <div class="transaction-section">
                <p class="transaction-text" style="color: #666666;">
                    Transaction ID: <span class="transaction-id"
                        style="color: #000000;">${orderData.transactionId}</span>
                </p>
            </div>
        </div>

        <!-- Footer from html1 -->
        <div class="footer" style="background-color: #f8f9fa; border-top-color: #e5e7eb;">
            <p class="footer-text" style="color: #666666;">
                This email was sent to you because you created an account at Exclusive Mart.<br>
                If you have any questions, contact our support team.
            </p>
            <p class="footer-text" style="font-size: 12px; color: #999999; margin-top: 20px;">
                © ${new Date().getFullYear()} Exclusive Mart. All rights reserved.<br>
                123 Commerce Street, Business District, City 12345
            </p>
        </div>
    </div>

    <!-- Gmail dark mode compatibility script -->
    <script type="text/javascript">
        function detectDarkMode() {
            // This script doesn't actually run in Gmail, but helps with rendering in other clients
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.style.backgroundColor = '#121212';
                document.body.style.color = '#e0e0e0';

                var container = document.querySelector('.email-container');
                if (container) container.style.backgroundColor = '#1e1e1e';

                var mainContent = document.querySelector('.main-content');
                if (mainContent) mainContent.style.backgroundColor = '#1e1e1e';

                // Make icons white in dark mode
                var darkModeIcons = document.querySelectorAll('.dark-mode-icon');
                for (var i = 0; i < darkModeIcons.length; i++) {
                    darkModeIcons[i].style.filter = 'brightness(100)';
                }
            }
        }
        detectDarkMode();
    </script>
</body>

</html>
`;


// Helper function to get status message based on order status
function getStatusMessage(status: string): string {
    switch (status) {
        case 'pending':
            return "Your order is currently being processed. We'll send you a shipping confirmation with tracking information once your order ships. This usually takes 1-2 business days.";
        case 'Shipped for Delivery':
            return "Your order has been shipped and is on its way to you! You can expect delivery in the next few days. We'll notify you once the delivery is complete.";
        case 'shipped':
            return "Your order has been shipped! You can track your package using the tracking information that was sent to your email.";
        case 'canceled':
            return "This order has been canceled. If you have any questions, please contact our customer support team.";
        default:
            return "Your order is currently being processed. We'll send you a shipping confirmation with tracking information once your order ships.";
    }
}

export default orderConfirmationTemplate;