# Execlusive Mart

Execlusive Mart is a full-stack e-commerce application built with Next.js, TypeScript, and Tailwind CSS. It provides a complete online shopping experience with features for both customers and administrators.

[![Build Status](https://img.shields.io/travis/com/your-username/your-repo.svg)](https://travis-ci.com/your-username/your-repo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0-brightgreen.svg)](https://semver.org)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

-   **User Authentication:** Secure sign-up, sign-in, and session management.
-   **Product Management:** Admins can add, edit, and delete products.
-   **Shopping Cart:** Users can add products to their cart and manage quantities.
-   **Checkout Process:** A seamless checkout experience with order summary and payment integration.
-   **Order Management:** Users can view their order history, and admins can manage all orders.
-   **Search and Filtering:** Users can search for products and filter them by category, brand, and price.
-   **Wishlist:** Users can add products to their wishlist for future purchase.
-   **Admin Dashboard:** A comprehensive dashboard for managing products, orders, and users.
-   **Email Notifications:** Automated email notifications for order confirmation, status updates, and more.
-   **Responsive Design:** A mobile-friendly design that works on all devices.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/execlusive-mart.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd execlusive-mart
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following variables:
    ```env
    # MongoDB Connection URI
    MONGODB_URI=your_mongodb_connection_string

    # NextAuth.js Configuration
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000

    # Email Configuration (Nodemailer)
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Usage

-   **Admin:** Access the admin dashboard at `/admin` to manage products, orders, and users.
-   **User:** Browse products, add them to the cart, and proceed to checkout.

## Configuration

-   **Tailwind CSS:** The Tailwind CSS configuration is located in `tailwind.config.ts`. You can customize the theme, colors, and other design tokens in this file.
-   **Next.js:** The Next.js configuration is located in `next.config.mjs`. You can configure server-side rendering, routing, and other Next.js features in this file.

## API Endpoints

The API endpoints are located in `src/app/api`. Each endpoint is responsible for a specific resource:

-   `/api/auth`: User authentication
-   `/api/products`: Product management
-   `/api/orders`: Order management
-   `/api/cart`: Shopping cart management
-   `/api/wishlists`: Wishlist management
-   ...and more

## Project Structure

```
.
├── .eslintrc.json
├── .gitignore
├── components.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── type.html
├── .git/
├── .vscode/
│   └── settings.json
├── emails/
│   ├── emailVerificationTemplate.tsx
│   └── statusUpdateTemplate.tsx
├── public/
│   ├── AddToCart.gif
│   ├── banner.png
│   ├── JBL.png
│   ├── next.svg
│   ├── signin_signup_image.jpg
│   └── vercel.svg
└── src/
    ├── middleware.ts
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── not-found.tsx
    │   ├── (app)/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── (auth)/
    │   │   │   ├── sign-in/
    │   │   │   ├── sign-up/
    │   │   │   └── verify/
    │   │   └── (pages)/
    │   │       ├── cart/
    │   │       ├── checkout/
    │   │       ├── orders/
    │   │       └── ...
    │   ├── admin/
    │   │   ├── layout.tsx
    │   │   ├── brands/
    │   │   ├── dashboard/
    │   │   ├── orders/
    │   │   └── products/
    │   ├── api/
    │   │   ├── auth/
    │   │   ├── banners/
    │   │   ├── brands/
    │   │   ├── cart/
    │   │   ├── categories/
    │   │   ├── coupons/
    │   │   ├── order-status/
    │   │   ├── orders/
    │   │   ├── payment/
    │   │   ├── products/
    │   │   ├── signup/
    │   │   ├── verify-code/
    │   │   └── wishlists/
    │   ├── dashboard/
    │   │   └── page.tsx
    │   └── unauthorized/
    │       └── page.tsx
    ├── components/
    │   ├── app-sidebar.tsx
    │   ├── search-form.tsx
    │   ├── version-switcher.tsx
    │   ├── (admin)/
    │   │   ├── brands/
    │   │   ├── orders/
    │   │   ├── products/
    │   │   └── ui/
    │   ├── auth/
    │   │   ├── sign-in/
    │   │   └── sign-up/
    │   ├── cart/
    │   │   ├── cart-calculation.tsx
    │   │   ├── cart-quantity-controller.tsx
    │   │   ├── cart.tsx
    │   │   ├── empty-cart.tsx
    │   │   └── single-cart.tsx
    │   ├── home/
    │   │   ├── Footer.tsx
    │   │   ├── Heading.tsx
    │   │   ├── HeroSection.tsx
    │   │   ├── HeroSlider.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── Navitems.tsx
    │   │   ├── NavSearch.tsx
    │   │   ├── TopNotification.tsx
    │   │   ├── Explore/
    │   │   ├── Features/
    │   │   └── Promotion/
    │   ├── orders/
    │   │   ├── Orders.tsx
    │   │   ├── SingleOrder.tsx
    │   │   └── SingleOrderSkeleton.tsx
    │   ├── product/
    │   │   ├── product-quantity-controller.tsx
    │   │   ├── Product.tsx
    │   │   └── ProductLoader.tsx
    │   ├── ui/
    │   │   ├── ...
    │   └── wishlists/
    │       ├── wishlist.tsx
    │       ├── wishlistLoader.tsx
    │       └── wishlists.tsx
    ├── constants/
    │   └── appUrl.ts
    ├── features/
    │   ├── api/
    │   │   └── apiSlice.ts
    │   ├── cart/
    │   │   └── cartSlice.ts
    │   └── wishlists/
    │       └── wishlistsSlice.ts
    ├── hooks/
    │   ├── use-mobile.ts
    │   ├── useDebounce.ts
    │   ├── useImageUpload.ts
    │   └── usePagination.tsx
    ├── lib/
    │   ├── ...
    ├── models/
    │   ├── ...
    ├── providers/
    │   ├── AuthProvider.tsx
    │   └── StoreProvider.tsx
    ├── schemas/
    │   ├── ...
    ├── store/
    │   └── store.ts
    └── types/
        ├── ...
```

## Screenshots

| Home Page | Sign In |
| :---: | :---: |
| ![Home Page](public/banner.png) | ![Sign In](public/signin_signup_image.jpg) |

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, please feel free to contact me at [your-email@example.com](mailto:your-email@example.com).
