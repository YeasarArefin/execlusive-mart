# Exclusive Mart: Full-Stack E-Commerce Platform

Exclusive Mart is a feature-rich, full-stack e-commerce platform built with modern web technologies. It provides a seamless and interactive shopping experience for users and a comprehensive dashboard for administrators to manage the store.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://example.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://example.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## Tech Stack

This project is built with a modern and robust technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (v14)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching & Caching:** [TanStack Query](https://tanstack.com/query/latest)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Email:** [Nodemailer](https://nodemailer.com/) & [React Email](https://react.email/)
- **Payment Gateway:** [SSLCommerz](https://www.sslcommerz.com/)

## Features

- **Complete User Authentication:** Secure user registration, login, and session management.
- **Comprehensive Admin Dashboard:** Manage products, orders, categories, brands, and view store analytics.
- **Full Product Management:** Admins can create, read, update, and delete products.
- **Advanced Shopping Cart:** Add/remove items, update quantities, and view cart totals.
- **Wishlist Functionality:** Users can save products for later.
- **Dynamic Product & Category Pages:** Browse products by category, brand, or search query.
- **Seamless Checkout Process:** Multi-step checkout with shipping information and payment integration.
- **Order Tracking:** Users can view their order history and check the status of their orders.
- **Email Notifications:** Automated emails for order confirmation, status updates, and account verification.
- **Coupon & Discount System:** Apply coupon codes for discounts on purchases.
- **Fully Responsive Design:** Optimized for a great user experience on both desktop and mobile devices.

## Installation Guide

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/exclusive-mart.git
    cd exclusive-mart
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following environment variables. Replace the placeholder values with your actual credentials.
    ```env
    # MongoDB Connection String
    MONGODB_URI=your_mongodb_connection_string

    # NextAuth Configuration
    NEXTAUTH_SECRET=your_super_secret_key_for_nextauth
    NEXTAUTH_URL=http://localhost:3000

    # Email (Nodemailer) Configuration
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password

    # SSLCommerz Payment Gateway
    STORE_ID=your_sslcommerz_store_id
    STORE_PASSWORD=your_sslcommerz_store_password
    IS_LIVE=false # Set to true for production
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:3000`.

## Usage Instructions

- **Access the application:** Open your browser and navigate to `http://localhost:3000`.
- **Admin Panel:** To access the admin dashboard, navigate to `http://localhost:3000/admin`. You will need to log in with an admin account.
- **API Routes:** API endpoints are located in the `src/app/api/` directory. You can test them using tools like Postman or by interacting with the frontend.

```javascript
// Example: Fetching products from the API
async function getProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  console.log(data);
}
```

## Configuration

All primary configurations are managed through the `.env.local` file. Ensure you have set all the required variables as mentioned in the **Installation Guide** before running the application.

## API Documentation

The API is built using Next.js API Routes. Each file in `src/app/api/` corresponds to an API endpoint.

- `GET /api/products`: Fetches all products.
- `POST /api/products`: Creates a new product (Admin only).
- `GET /api/orders`: Fetches orders for the logged-in user.
- `POST /api/auth/sign-in`: Handles user login.
- `POST /api/auth/sign-up`: Handles user registration.

*For detailed information on each endpoint, please refer to the source code in the `/src/app/api` directory.*

## Screenshots / Demo

*Placeholder for application screenshots and demos.*

**Home Page**
![Home Page](https://via.placeholder.com/800x400.png?text=Home+Page+Screenshot)

**Admin Dashboard**
![Admin Dashboard](https://via.placeholder.com/800x400.png?text=Admin+Dashboard+Screenshot)

**Product Page**
![Product Page](https://via.placeholder.com/800x400.png?text=Product+Page+Screenshot)

## Contact & Support

For any questions, feedback, or support, please feel free to reach out:

- **Email:** [yeasararefin007@gmail.com](mailto:yeasararefin007@gmail.com)
- **Portfolio:** [yeasararefin.vercel.app](https://yeasararefin.vercel.app)
