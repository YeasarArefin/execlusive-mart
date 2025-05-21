import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Page({ params }) {
    const transactionId = params.trx_id as string;
    return (
        <div className="mt-10 bg-white flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>

                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>

                <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Transaction ID</span>
                        <span className="font-medium">{transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Payment Amount:</span>
                        <span className="font-medium">$800.00</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link
                        href="/products"
                        className="block w-full py-3 px-4 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        href="/account/orders"
                        className="block w-full py-3 px-4 bg-[#111827] text-white rounded-md font-medium hover:bg-black transition-colors"
                    >
                        View Order Details
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">A confirmation email has been sent to your registered email address.</p>
                <p className="text-sm text-gray-500 mt-1">If you have any questions, please contact our support team.</p>
            </div>
        </div>
    );
}
