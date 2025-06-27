import { CartProduct, Order } from '@/types/types';
import { CalendarDays, CheckCircle, Clock, CreditCard, Mail, MapPin, Package, Phone, Truck, XCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

export default function SingleOrder({ order }: { order: Order; }) {

    const getStatusIcon = (status: Order["status"]) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "processing":
                return <Package className="h-4 w-4" />;
            case "shipped":
                return <Truck className="h-4 w-4" />;
            case "delivered":
                return <CheckCircle className="h-4 w-4" />;
            case "cancelled":
                return <XCircle className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status: Order["status"]) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            case "processing":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100";
            case "shipped":
                return "bg-purple-100 text-purple-800 hover:bg-purple-100";
            case "delivered":
                return "bg-green-100 text-green-800 hover:bg-green-100";
            case "cancelled":
                return "bg-red-100 text-red-800 hover:bg-red-100";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
    };

    // Calculate subtotal from order products
    const calculateSubtotal = (products: CartProduct[]) => {
        return products.reduce((total, product) => {
            return total + (product.price * (product.cartQuantity || 1));
        }, 0);
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="space-y-1">
                        <CardTitle className="text-base">Order #{order.orderId || order._id}</CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CalendarDays className="h-3 w-3" />
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                    <Badge className={`flex items-center gap-1 text-xs ${getStatusColor(order.status || 'pending')}`}>
                        {getStatusIcon(order.status || 'pending')}
                        <span>{(order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending')}</span>
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Compact Products List */}
                <div>
                    <h4 className="font-medium mb-2 text-sm">Items ({order.products?.length || 0})</h4>
                    <div className="space-y-2">
                        {(order.products as unknown as CartProduct[] || []).map((product) => (
                            <div key={product._id} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                                <Image
                                    width={48}
                                    height={48}
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded-md bg-white border"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        ${product.price} × {product.cartQuantity || 1}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-sm">${(product.price * (product.cartQuantity || 1))}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-xs">
                    {/* Compact Shipping Info */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Shipping</h4>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span className="truncate">{order.name}</span>
                            </div>
                            <div className="flex items-start gap-1">
                                <MapPin className="h-3 w-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="truncate">{order.address}</p>
                                    <p className="text-muted-foreground">
                                        {order.city}, {order.postCode}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span className="truncate">{order.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Compact Payment Info */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Payment</h4>
                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal:</span>
                                <span>${calculateSubtotal(order.products as CartProduct[])}</span>
                            </div>
                            {order.discount && order.discount > 0 ? (
                                <div className="flex justify-between text-green-600">
                                    <span className="text-muted-foreground">Discount:</span>
                                    <span>-${order.discount}</span>
                                </div>
                            ) : ''}
                            <Separator className="my-1" />
                            <div className="flex justify-between font-medium">
                                <span>Total:</span>
                                <span>${order.paidAmount || "0"}</span>
                            </div>
                            {order.usedCoupon && <div className="text-muted-foreground">Coupon: {order.usedCoupon}</div>}
                        </div>
                    </div>


                </div>

                {/* Transaction ID */}
                {order.transactionId && (
                    <div className="flex items-center justify-center gap-2 pt-2 border-t">
                        <CreditCard className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Transaction ID: {order.transactionId}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
