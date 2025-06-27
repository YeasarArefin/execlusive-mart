import dbConnect from "@/lib/dbConnect";
import orderProcessingTemplate from "@/lib/email-templates/orderProcessingTemplate";
import sendEmail from "@/lib/sendEmail";
import sendResponse from "@/lib/sendResponse";
import OrderModel from "@/models/Order";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as { _id: string, orderId: string, email: string, status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"; };
        const { status, _id, orderId, email } = body;
        const orderOfUser = await OrderModel.findByIdAndUpdate(
            _id,
            { $set: { status } },
            { new: true }
        );

        if (!orderOfUser) {
            return sendResponse(false, 'order not found', 404, null);
        }
        const from = process.env.SMTP_EMAIL || '';
        let subject;
        if (status == 'processing') {
            subject = `Exclusive Mart Order#${orderId} Status Updated to Processing`;
            await sendEmail(from, email, subject, orderProcessingTemplate(orderId));
        }
        return sendResponse(true, 'order status updated successfully', 200, orderOfUser);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/orders - error creating order", error);
        return sendResponse(false, 'error creating order', 400, error);
    }
}