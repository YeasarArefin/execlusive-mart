import checkCouponValidity from "@/lib/checkCouponValidity";
import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import CouponModel from "@/models/Coupon";
import { Coupon } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Coupon;
        const response = await CouponModel.create(body);
        return sendResponse(true, 'coupon created successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/coupons - error creating coupon", error);
        return sendResponse(false, 'error creating coupon', 500, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const email = searchParams.get('email');

        if (code && email) {
            const couponResult = await checkCouponValidity(code, email);
            return sendResponse(couponResult.success, couponResult.message, couponResult.status, couponResult.data);
        }

        const coupon = await CouponModel.find({});
        return sendResponse(true, 'coupon sent successfully', 200, coupon);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/coupons - error sending coupon", error);
        return sendResponse(false, 'error sending coupon', 500, error);
    }

}