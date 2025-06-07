'use client';
import Link from "next/link";

export default function Unauthorized() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-5">
            <div className="w-full max-w-[500px] text-center space-y-6">
                {/* 403 Text with Animation */}
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-black text-gray-100">403</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Access Denied
                        </h2>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-3 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Administrator Only
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Sorry! The area you&apos;re trying to access is restricted to administrators only. You don&apos;t have sufficient permissions.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-6 py-3 text-white bg-primary_red hover:bg-red-600 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Home
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z" clipRule="evenodd" />
                        </svg>
                        Contact Admin
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="relative mt-10">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="relative">
                            <div className="w-6 h-6 bg-primary_red rounded-full flex items-center justify-center animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 w-full max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-primary_red/20 to-transparent rounded-full"></div>
                </div>

                {/* Additional Info */}
                <div className="text-sm text-gray-500 mt-4">
                    If you believe this is a mistake, please contact the administrator.
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
} 