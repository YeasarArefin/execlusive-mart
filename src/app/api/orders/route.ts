import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import OrderModel from "@/models/Order";
import { Order } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Order;
        const response = await OrderModel.create(body);
        return sendResponse(true, 'order created successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/orders - error creating order", error);
        return sendResponse(false, 'error creating order', 400, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const oid = searchParams.get('oid');

        const count = searchParams.get('count');
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 10;
        const orderCount = await OrderModel.find({ email }).estimatedDocumentCount();
        const skip = (page - 1) * limit;

        if (count) {
            return sendResponse(true, 'count sent successfully', 200, orderCount);
        }

        if (email) {
            const orders = await OrderModel.find({ email }).skip(skip).limit(limit);
            return sendResponse(true, 'orders sent successfully', 200, orders);
        }

        if (oid) {
            const order = await OrderModel.findOne({ orderId: oid });
            return sendResponse(true, 'order sent successfully', 200, order);
        }

        const orders = await OrderModel.find({}).skip(skip).limit(limit);
        return sendResponse(true, 'orders sent successfully', 200, orders);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/orders - error sending orders", error);
        return sendResponse(false, 'error sending order', 400, error);
    }
}