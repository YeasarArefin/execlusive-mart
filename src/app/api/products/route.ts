import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import ProductModel from "@/models/Product";
import { Product, QueryObject } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Product;
        const response = await ProductModel.create(body);
        return sendResponse(true, 'product uploaded successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/products - error uploading product", error);
        return sendResponse(false, 'error uploading product', 500, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const _id = searchParams.get('id');
        const count = searchParams.get('count');
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 10;
        const brand = searchParams.get('brand');
        const name = searchParams.get('name');
        const type = searchParams.get('type');
        const productsCount = await ProductModel.estimatedDocumentCount();
        const skip = (page - 1) * limit;

        const queryObject = {} as QueryObject;

        if (count) {
            return sendResponse(true, 'count sent successfully', 200, productsCount);
        }

        // Name filter (case-insensitive search)
        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }

        // Brand filter (support for multiple brands)
        if (brand) {
            const brandArray = brand.split(','); // Split the brand string into an array
            queryObject.brand = { $in: brandArray, };
        }

        if (type && type !== 'all') {
            queryObject.type = { $regex: type, $options: "i" };
        }

        if (_id) {
            const product = await ProductModel.findById(_id);
            if (product) return sendResponse(true, 'product sent successfully', 200, product);
            return sendResponse(false, 'product not found', 404);
        }

        // Fetch products with pagination, based on queryObject filters
        const products = await ProductModel.find(queryObject)
            .skip(skip)
            .limit(limit);

        return sendResponse(true, `products sent successfully - items : ${products?.length} , document count : ${productsCount}`, 200, products);
    } catch (error) {
        console.log("🚀 ~ GET ~ error: /api/products - error sending product", error);
        return sendResponse(false, 'error sending product', 500, error);
    }
}


export async function DELETE(request: NextRequest) {
    dbConnect();
    try {
        const { _id } = await request.json() as { _id: string; };
        await ProductModel.findByIdAndDelete(_id);
        return sendResponse(true, 'product deleted successfully', 200);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/products - error deleting product");
        return sendResponse(false, 'error sending product', 500, error);
    }
}

export async function PUT(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Product;
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            body._id,
            body,
            { new: true }
        );
        if (!updatedProduct) {
            return sendResponse(false, 'Product not found', 404);
        }
        return sendResponse(true, 'Product updated successfully', 200, updatedProduct);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/products - error updating product", error);
        return sendResponse(false, 'error updating product', 500, error);
    }
}