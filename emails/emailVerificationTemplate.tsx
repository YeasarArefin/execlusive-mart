import { Head, Html, Tailwind } from "@react-email/components";


export default function VerificationEmail({ verificationCode = 590435 }: { verificationCode: number; }) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <body className="bg-gray-100 text-gray-800 font-sans" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>
                    <div className="max-w-xl mx-auto bg-white shadow-lg email-container" style={{ backgroundColor: '#ffffff' }}>
                        <div className="bg-black px-6 py-10 text-center" style={{ backgroundColor: '#000000' }}>
                            <div className="inline-flex items-center gap-3 text-white text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>
                                Exclusive Mart
                            </div>
                            <p className="text-gray-400 text-sm mt-2" style={{ color: '#9ca3af' }}>Premium Shopping Experience</p>
                        </div>

                        <div className="px-6 py-12">
                            <div className="text-center mb-10">
                                <h1 className="text-2xl font-bold text-black mb-3" style={{ color: '#000000' }}>Verify Your Email</h1>
                                <p className="text-gray-600 text-base" style={{ color: '#4b5563' }}>
                                    Welcome to Exclusive Mart! We&apos;re excited to have you join our
                                    community of premium shoppers. To complete your registration and
                                    secure your account, please verify your email address.
                                </p>
                            </div>

                            <div className="bg-gray-100 border-l-4 border-rose-600 rounded-xl p-6 text-center my-6" style={{ backgroundColor: '#f3f4f6', borderColor: '#e11d48' }}>
                                <h2 className="text-xl font-semibold text-black mb-4" style={{ color: '#000000' }}>
                                    Your Verification Code
                                </h2>
                                <div
                                    className="text-3xl font-bold text-rose-600 bg-white border-2 border-dashed border-rose-600 inline-block px-8 py-4 rounded-md tracking-widest font-mono my-5"
                                    style={{ color: '#e11d48', backgroundColor: '#ffffff', borderColor: '#e11d48' }}
                                >
                                    {verificationCode}
                                </div>
                                <p className="text-sm text-gray-600 mt-4" style={{ color: '#4b5563' }}>
                                    Enter this 6-digit code in the verification field to activate your
                                    account. This code will expire in 1 hour for your security.
                                </p>
                            </div>

                            <div className="bg-orange-50 border border-orange-300 rounded-lg p-5 my-8" style={{ backgroundColor: '#fff7ed', borderColor: '#fdba74' }}>
                                <div className="text-orange-800 font-semibold mb-2" style={{ color: '#9a3412' }}>🔒 Security Notice</div>
                                <p className="text-sm text-orange-800" style={{ color: '#9a3412' }}>
                                    Never share this verification code with anyone. Exclusive Mart will
                                    never ask for your verification code via phone, email, or text
                                    message. If you didn&apos;t create an account with us, please ignore
                                    this email.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-100 px-6 py-8 text-center border-t border-gray-200" style={{ backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' }}>
                            <p className="text-sm text-gray-600 mb-4" style={{ color: '#4b5563' }}>
                                This email was sent to you because you created an account at
                                Exclusive Mart.<br />If you have any questions, contact our support
                                team.
                            </p>
                            <p className="text-xs text-gray-400 mt-5" style={{ color: '#9ca3af' }}>
                                © 2024 Exclusive Mart. All rights reserved.<br />123 Commerce Street,
                                Business District, City 12345
                            </p>
                        </div>
                    </div>
                </body>
            </Html>
        </Tailwind >
    );
}
