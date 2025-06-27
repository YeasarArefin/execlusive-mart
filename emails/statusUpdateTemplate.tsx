import { Tailwind } from '@react-email/components';
import { AlertCircle, Check, Clock, MapPin, Package, Truck, XCircle } from 'lucide-react';
import React from 'react';

interface OrderStatusUpdateEmailProps {
    orderData: {
        orderId: string;
        customerName: string;
        status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
        trackingNumber?: string;
        estimatedDelivery?: string;
        shippingAddress: string;
        statusUpdateDate: string;
    };
}

const OrderStatusUpdateEmail: React.FC<OrderStatusUpdateEmailProps> = ({ orderData = {
    orderId: 'asdadasddas',
    customerName: 'Yeasar Arefin',
    status: 'shipped',
    trackingNumber: 'sdadad',
    estimatedDelivery: '3 days',
    statusUpdateDate: 'dasdada'
} }) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    icon: <Clock className="w-8 h-8 text-white" />,
                    color: 'bg-amber-500',
                    title: 'Order Pending Confirmation',
                    description: 'Your order has been received and is awaiting confirmation. We\'ll update you once it\'s confirmed.',
                    bgColor: 'bg-amber-50',
                    borderColor: 'border-amber-200',
                    textColor: 'text-amber-700'
                };
            case 'processing':
                return {
                    icon: <Package className="w-8 h-8 text-white" />,
                    color: 'bg-blue-500',
                    title: 'Order is Being Processed',
                    description: 'Your order has been confirmed and is currently being prepared for shipment.',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    textColor: 'text-blue-700'
                };
            case 'shipped':
                return {
                    icon: <Truck className="w-8 h-8 text-white" />,
                    color: 'bg-orange-500',
                    title: 'Order Has Been Shipped',
                    description: 'Your order is on its way! Track your package using the details below.',
                    bgColor: 'bg-orange-50',
                    borderColor: 'border-orange-200',
                    textColor: 'text-orange-700'
                };
            case 'delivered':
                return {
                    icon: <Check className="w-8 h-8 text-white" />,
                    color: 'bg-green-500',
                    title: 'Order Delivered Successfully',
                    description: 'Your order has been delivered. We hope you love your purchase!',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200',
                    textColor: 'text-green-700'
                };
            case 'cancelled':
                return {
                    icon: <XCircle className="w-8 h-8 text-white" />,
                    color: 'bg-red-500',
                    title: 'Order Cancelled',
                    description: 'Your order has been cancelled. Any charges will be refunded within 3-5 business days.',
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200',
                    textColor: 'text-red-700'
                };
            default:
                return {
                    icon: <AlertCircle className="w-8 h-8 text-white" />,
                    color: 'bg-gray-500',
                    title: 'Order Update',
                    description: 'There has been an update to your order status.',
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-200',
                    textColor: 'text-gray-700'
                };
        }
    };

    const getProgressSteps = () => {
        const steps = [
            { key: 'pending', label: 'Pending', active: false },
            { key: 'processing', label: 'Processing', active: false },
            { key: 'shipped', label: 'Shipped', active: false },
            { key: 'delivered', label: 'Delivered', active: false }
        ];

        const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
        const currentIndex = statusOrder.indexOf(orderData.status);

        // Mark steps as active based on current status
        for (let i = 0; i <= currentIndex; i++) {
            const step = steps.find(s => s.key === statusOrder[i]);
            if (step) step.active = true;
        }

        return steps;
    };

    const statusConfig = getStatusConfig(orderData.status);
    const progressSteps = getProgressSteps();

    return (
        <Tailwind>
            <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden font-sans">
                {/* Header */}
                <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Exclusive Mart</h1>
                    </div>
                    <p className="text-gray-300 text-sm">Premium Shopping Experience</p>
                </div>

                {/* Main Content */}
                <div className="px-8 py-10">
                    {/* Status Icon & Title */}
                    <div className="text-center mb-8">
                        <div className={`w-16 h-16 ${statusConfig.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                            {statusConfig.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{statusConfig.title}</h2>
                        <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                            {statusConfig.description}
                        </p>
                    </div>

                    {/* Order Reference */}
                    <div className="text-center mb-8">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Order Number</p>
                        <div className={`inline-block ${statusConfig.bgColor} ${statusConfig.borderColor} border-2 border-dashed rounded-lg px-6 py-3`}>
                            <span className="text-xl font-mono font-bold text-gray-900 tracking-wider">
                                {orderData.orderId}
                            </span>
                        </div>
                    </div>

                    {/* Status Details Card */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Customer:</span>
                                <span className="text-sm font-semibold text-gray-900">{orderData.customerName}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Status Updated:</span>
                                <span className="text-sm font-semibold text-gray-900">{orderData.statusUpdateDate}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Current Status:</span>
                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} capitalize`}>
                                    {orderData.status}
                                </span>
                            </div>

                            {orderData.trackingNumber && orderData.status === 'shipped' && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">Tracking Number:</span>
                                    <span className="text-sm font-mono font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                                        {orderData.trackingNumber}
                                    </span>
                                </div>
                            )}

                            {orderData.estimatedDelivery && orderData.status === 'shipped' && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">Estimated Delivery:</span>
                                    <span className="text-sm font-semibold text-gray-900">{orderData.estimatedDelivery}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Shipping Address (for shipped/delivered orders) */}
                    {(orderData.status === 'shipped' || orderData.status === 'delivered') && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                        {orderData.status === 'delivered' ? 'Delivered To' : 'Delivery Address'}
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{orderData.shippingAddress}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="text-center mb-6">
                        {orderData.status === 'shipped' && orderData.trackingNumber && (
                            <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mr-4">
                                Track Your Package
                            </button>
                        )}

                        {orderData.status === 'delivered' && (
                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mr-4">
                                Leave a Review
                            </button>
                        )}

                        {orderData.status === 'pending' && (
                            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mr-4">
                                View Order Details
                            </button>
                        )}

                        {orderData.status === 'cancelled' && (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mr-4">
                                Browse Similar Items
                            </button>
                        )}
                    </div>

                    {/* Status Progress (for non-cancelled orders) */}
                    {orderData.status !== 'cancelled' && (
                        <div className="mb-8">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">Order Progress</h4>
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                {progressSteps.map((step) => (
                                    <span key={step.key} className={step.active ? 'text-green-600 font-semibold' : ''}>
                                        {step.label}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center">
                                {progressSteps.map((step, index) => (
                                    <React.Fragment key={step.key}>
                                        <div className={`w-3 h-3 rounded-full ${step.active ? 'bg-green-500' : 'bg-gray-300'
                                            }`}></div>
                                        {index < progressSteps.length - 1 && (
                                            <div className={`flex-1 h-1 ${progressSteps[index + 1].active ? 'bg-green-500' : 'bg-gray-300'
                                                }`}></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Status-specific Information */}
                    {orderData.status === 'pending' && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-amber-800 text-sm mb-1">What happens next?</h4>
                                    <p className="text-sm text-amber-700 leading-relaxed">
                                        We're reviewing your order details and payment information. You'll receive another email once your order is confirmed and moves to processing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {orderData.status === 'cancelled' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-red-800 text-sm mb-1">Refund Information</h4>
                                    <p className="text-sm text-red-700 leading-relaxed">
                                        If you were charged for this order, the refund will be processed to your original payment method within 3-5 business days. You'll receive a confirmation email once the refund is complete.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600 mb-3">
                        Need help? Contact our support team or visit your account dashboard.
                    </p>
                    <div className="flex justify-center gap-6 mb-4">
                        <button className="text-sm text-rose-600 hover:text-rose-700 font-medium">
                            Contact Support
                        </button>
                        <button className="text-sm text-rose-600 hover:text-rose-700 font-medium">
                            View Order Details
                        </button>
                        {orderData.status !== 'cancelled' && orderData.status !== 'delivered' && (
                            <button className="text-sm text-rose-600 hover:text-rose-700 font-medium">
                                Cancel Order
                            </button>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Exclusive Mart. All rights reserved.
                    </p>
                </div>
            </div>
        </Tailwind>
    );
};
export default OrderStatusUpdateEmail;