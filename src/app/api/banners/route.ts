import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import BannerModel from "@/models/Banner";
import { Banner } from "@/types/types";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Banner;
        const response = await BannerModel.create(body);
        return sendResponse(true, 'banner created successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/banners - error uploading banners", error);
        return sendResponse(true, 'error uploading banners', 500, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const banners = await BannerModel.find({});
        return sendResponse(true, 'banners sent successfully', 200, banners);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/banners - error sending banners", error);
        return sendResponse(true, 'error sending banners', 500, error);
    }
}

export async function DELETE(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json();
        console.log("🚀 ~ DELETE ~ Full Request Body:", body);
        const { id } = body;
        console.log("🚀 ~ DELETE ~ Received ID:", id); // Log the received ID

        // Convert the id to ObjectId
        if (!id || !Types.ObjectId.isValid(id)) {
            console.log("🚀 ~ DELETE ~ Invalid or missing ID:", id);
            return sendResponse(false, 'Invalid or missing ID format', 400, null);
        }

        const response = await BannerModel.findByIdAndDelete(new Types.ObjectId(id));
        console.log("🚀 ~ DELETE ~ Deletion Response:", response); // Log the deletion response

        if (!response) {
            console.log("🚀 ~ DELETE ~ Banner not found for ID:", id);
            return sendResponse(false, 'Banner not found', 404, null);
        }

        return sendResponse(true, 'Banner deleted successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ DELETE ~ error: /api/banners - error deleting banner", error);
        return sendResponse(false, 'Error deleting banner', 500, error);
    }
}