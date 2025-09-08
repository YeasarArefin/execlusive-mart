import { appUrl } from "@/constants/appUrl";
import calculateTotalAmount from "@/lib/calculateTotalAmount";
import dbConnect from "@/lib/dbConnect";
import orderConfirmationTemplate from "@/lib/email-templates/orderConfirmationTemplate";
import generateOrderId from "@/lib/generateOrderId";
import sendEmail from "@/lib/sendEmail";
import sendResponse from "@/lib/sendResponse";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";
import { Order, PaymentData } from "@/types/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const transactionId = req.nextUrl.searchParams.get("trx_id");

    if (!transactionId) {
        return NextResponse.json({ message: "Transaction ID is required" }, { status: 400 });
    }

    try {
        await dbConnect();

        const checkoutDataCookie = cookies().get('checkout_data');
        if (!checkoutDataCookie?.value) {
            return NextResponse.json({ message: "Checkout data not found" }, { status: 400 });
        }

        const checkoutData = JSON.parse(checkoutDataCookie.value) as PaymentData;
        const { name, email, address, city, postCode, phone, couponCode, } = checkoutData;

        const { totalAmount, appliedCoupon, products } = await calculateTotalAmount(email, couponCode);

        const data: Order = {
            email,
            name,
            address,
            city,
            postCode,
            phone,
            orderId: generateOrderId(),
            status: 'pending',
            products: products || [],
            transactionId,
            paidAmount: totalAmount,
            usedCoupon: appliedCoupon?.code || null,
            discount: appliedCoupon?.discount || 0,
            createdAt: new Date()
        };

        const user = await UserModel.findOne({ email });
        if (!user) return sendResponse(false, 'User not found', 500);

        // If coupon was used, add to user's usedCoupons
        if (appliedCoupon) {
            user.usedCoupons.push(appliedCoupon._id);
        }

        // Create order
        await OrderModel.create(data);

        // Clear user's cart
        user.cart = [];
        await user.save();

        // Clear checkout data from cookies
        cookies().delete('checkout_data');

        const from = process.env.SMTP_EMAIL || '';
        const subject = `Exclusive Mart Order#${data.orderId} Confirmed`;
        await sendEmail(from, email, subject, orderConfirmationTemplate(data));

        return NextResponse.redirect(`${appUrl}payment-success/${transactionId}`, 302);
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ message: "Failed to create order", error }, { status: 500 });
    }
}