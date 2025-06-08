import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12 px-4 mt-40">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Exclusive Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Exclusive</h2>
                    <div className="space-y-2">
                        <h3 className="font-medium">Subscribe</h3>
                        <p className="text-sm text-gray-300">Get 10% off your first order</p>
                        <div className="flex items-center border border-white/20 rounded-lg">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-gray-500"
                            />
                            <Button size="icon" variant="ghost" className="text-white">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Support</h2>
                    <div className="space-y-2 text-sm text-gray-300">
                        <p>111 Bijoy soroni, Dhaka,</p>
                        <p>DH 1515, Bangladesh.</p>
                        <p>exclusive@gmail.com</p>
                        <p>+88015-88888-9999</p>
                    </div>
                </div>

                {/* Account Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Account</h2>
                    <nav className="space-y-2 text-sm text-gray-300">
                        <Link href="/account" className="block hover:text-white">
                            My Account
                        </Link>
                        <Link href="/login" className="block hover:text-white">
                            Login / Register
                        </Link>
                        <Link href="/cart" className="block hover:text-white">
                            Cart
                        </Link>
                        <Link href="/wishlist" className="block hover:text-white">
                            Wishlist
                        </Link>
                        <Link href="/shop" className="block hover:text-white">
                            Shop
                        </Link>
                    </nav>
                </div>

                {/* Quick Link Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Quick Link</h2>
                    <nav className="space-y-2 text-sm text-gray-300">
                        <Link href="/privacy-policy" className="block hover:text-white">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="block hover:text-white">
                            Terms Of Use
                        </Link>
                        <Link href="/faq" className="block hover:text-white">
                            FAQ
                        </Link>
                        <Link href="/contact" className="block hover:text-white">
                            Contact
                        </Link>
                    </nav>
                </div>

                {/* Download App Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Download App</h2>
                    <p className="text-sm text-gray-300">Save $3 with App New User Only</p>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full bg-black text-white border-gray-700 hover:bg-gray-900 transition-colors"
                        >
                            Google Play
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full bg-black text-white border-gray-700 hover:bg-gray-900 transition-colors"
                        >
                            App Store
                        </Button>
                    </div>
                    <div className="flex space-x-4 pt-4">
                        <Link href="#" className="text-gray-300 hover:text-white">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-white">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-white">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-white">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-sm text-gray-400">
                <p>© Copyright Rimal 2022. All right reserved</p>
            </div>
        </footer>
    );
}

