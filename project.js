
const project = {
  id: "1",
  title: "E-Mart",
  subtitle: "A Full-Stack E-commerce Platform",
  description: "A comprehensive e-commerce application built with the Next.js App Router. It includes features like user authentication, product and order management, a shopping cart, wishlist functionality, and is integrated with the SSLCOMMERZ payment gateway. The project features a complete admin dashboard for managing the store's products, brands, banners, and orders.",
  shortDescription: "A full-stack e-commerce application built with Next.js and TypeScript.",
  image: "/banner.png",
  gallery: [
    "/banner2.png",
    "/image.png",
    "/image2.png",
    "/signin_signup_image.jpg"
  ],
  liveUrl: "https://e-mart-live.example.com",
  githubUrl: "https://github.com/user/e_mart",
  category: "E-commerce",
  year: "2025",
  duration: "4 Months",
  team: "1 Developer",
  status: "In Progress",
  featured: true,
  technologies: [
    { name: "Next.js", category: "Framework" },
    { name: "React", category: "Library" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Runtime" },
    { name: "MongoDB", category: "Database" },
    { name: "Mongoose", category: "ODM" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "NextAuth.js", category: "Authentication" },
    { name: "SSLCOMMERZ", category: "Payment Gateway" },
    { name: "Shadcn/UI", category: "UI Library" },
    { name: "Resend", category: "Email Service" }
  ],
  features: [
    "User Authentication (Sign-up, Sign-in, Email Verification)",
    "Admin Dashboard for Management",
    "Product, Brand, and Category CRUD Operations",
    "Shopping Cart & Wishlist Functionality",
    "Coupon and Discount Management",
    "Order Processing and Status Tracking",
    "Secure Payment Gateway Integration (SSLCOMMERZ)",
    "Responsive UI for all devices",
    "API routes for all major functionalities"
  ],
  challenges: [
    {
      title: "Complex State Management",
      description: "Managing global state for user authentication, cart, and wishlist across different components and pages.",
      solution: "Implemented Redux Toolkit for centralized and predictable state management, ensuring a consistent state across the application."
    },
    {
      title: "Secure API and Route Protection",
      description: "Ensuring that sensitive API routes and admin pages are accessible only to authenticated and authorized users.",
      solution: "Utilized NextAuth.js middleware and API protectors to secure routes based on user roles and session status."
    }
  ],
  learnings: [
    "In-depth understanding of the Next.js App Router and server components.",
    "Implementing secure, full-stack authentication with NextAuth.js.",
    "Integrating third-party payment gateways in a Next.js application.",
    "Building a scalable and maintainable project structure for a large e-commerce site.",
    "Advanced state management techniques using Redux Toolkit."
  ],
  metrics: {
    codeLines: "8,000+",
    commits: "250+",
    features: "15+",
    testCoverage: "Not Measured"
  }
};
