import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import TopNotification from "@/components/home/TopNotification";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Exclusive Mart",
    description: "Largest Online Store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={inter.className}>
            <TopNotification />
            <Navbar />
            <div className="container">
                {children}
                <Toaster />
            </div>
            <Footer />
        </div>
    );
}
