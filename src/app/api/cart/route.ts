import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import { CartApiPayload, CartProduct } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const payload = await request.json() as CartApiPayload;
        const { userId, _id, cartId, mode } = payload;

        let user = await UserModel.findById(userId);
        if (!user) return sendResponse(false, 'User not found', 404);

        const existingSameProductIndex = user.cart.findIndex((pd) => pd.cartId === cartId);
        let response;

        if (mode === 'add') {
            const product = await ProductModel.findById(_id).lean();
            if (!product) {
                return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
            }

            const existingCartItem = user.cart.find((item: any) => item.cartId === cartId);

            if (existingCartItem) {
                existingCartItem.cartQuantity += payload.cartQuantity;
                response = 'Quantity updated';
            } else {
                const cartItem: CartProduct = {
                    _id: product._id.toString(),
                    type: payload.type,
                    cartId: payload.cartId,
                    name: payload.name,
                    description: payload.description,
                    image: payload.image,
                    discount: payload.discount,
                    featured: payload.featured,
                    brand: payload.brand,
                    cartQuantity: payload.cartQuantity,
                    price: payload.price,
                    variant: payload.variant,
                    color: payload.color
                };
                // @ts-ignore
                user.cart.push(cartItem);
                response = 'Added to cart';
            }

            await user.save();
            return NextResponse.json({ success: true, message: response, cart: user.cart });
        } else if (mode === 'increase') {
            user.cart[existingSameProductIndex].cartQuantity += payload.cartQuantity;
            response = 'Product quantity updated successfully';
        } else if (mode === 'decrease') {
            user.cart[existingSameProductIndex].cartQuantity -= payload.cartQuantity;
            response = 'Product quantity updated successfully';
        } else if (mode === 'remove') {
            user.cart = user.cart.filter((pd) => pd.cartId !== cartId);
            response = 'Product removed successfully';
        }

        await UserModel.findOneAndUpdate({ _id: userId }, user);
        return sendResponse(true, response, 200);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/cart - failed to update user cart", error);
        return sendResponse(false, 'Failed to update user cart', 400, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email') || '';
        const property = searchParams.get('property') || '';
        let user;
        if (property === 'true') {
            user = await UserModel.findOne({ email }).populate('cart');
        } else {
            user = await UserModel.findOne({ email });
        }
        const cart = user?.cart || [];
        return sendResponse(true, 'cart sent successfully', 200, cart);

    } catch (error) {
        return sendResponse(false, 'failed to sent cart', 400, error);
    }
}