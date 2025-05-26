import Shell from "@/components/ui/shell";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Exclusive Mart",
    description: "Largest Online Store",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={`${inter.className} bg-slate-50`}>
            <Shell>
                <div className="p-6 bg-white rounded-xl shadow border border-slate-100">
                    {children}
                </div>
            </Shell>
        </div>
    );
}
