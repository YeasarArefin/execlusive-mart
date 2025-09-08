/** @type {import('next').NextConfig} */

let appUrl = '';
if (process.env.NODE_ENV === 'development') {
    appUrl = 'http://localhost:3000/';
}
if (process.env.NODE_ENV === 'production') {
    appUrl = 'https://exclusive-mart.vercel.app/';
}

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'adminapi.applegadgetsbd.com',
            },
            {
                protocol: 'https',
                hostname: 'fdn2.gsmarena.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co.com',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'static-00.iconduck.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: appUrl,
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;