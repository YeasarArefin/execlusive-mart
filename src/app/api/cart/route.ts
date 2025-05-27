import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import { Product } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

interface Request {
    userId: string,
    cartId: string,
    productId: string,
    quantity: number,
    mode: 'add' | 'increase' | 'decrease' | 'remove';
    variant: { size: string, price: number, _id: string, stocks: number; },
    color: { _id: string, color_name: string, color_code: string, inStock: boolean; },
    product: Product;
}

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const { userId, productId, cartId, quantity, variant, color, mode, product } = await request.json() as Request;

        let user = await UserModel.findById(userId);
        if (!user) return sendResponse(false, 'User not found', 404);

        const existingSameProductIndex = user.cart.findIndex((pd) => pd.cartId === cartId);
        let response;

        if (mode === 'add') {
            const product = await ProductModel.findById(productId).lean();
            if (!product) {
                return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
            }

            const selectedVariant = product.variants.find(v => v.size === variant.size);
            const selectedColor = product.colors.find(c => c.color_name === color.color_name);

            if (!selectedVariant || !selectedColor) {
                return NextResponse.json({ success: false, message: 'Invalid size or color selected' }, { status: 400 });
            }

            const existingCartItem = user.cart.find((item: any) => item.cartId === cartId);

            if (existingCartItem) {
                existingCartItem.cartQuantity += quantity;
                response = 'Quantity updated';
            } else {
                const cartItem = {
                    _id: product._id,
                    type: product.type,
                    cartId,
                    name: product.name,
                    description: product.description,
                    discount: product.discount,
                    featured: product.featured,
                    brand: product.brand,
                    cartQuantity: quantity,
                    category: product.category,
                    variants: [selectedVariant],
                    colors: [selectedColor],
                    images: product.images.filter(img => img.color_name === color.color_name),
                };

                user.cart.push(cartItem);
                response = 'Added to cart';
            }

            await user.save();
            return NextResponse.json({ success: true, message: response, cart: user.cart });
        } else if (mode === 'increase') {

            user.cart[existingSameProductIndex].cartQuantity += quantity;
            response = 'Product quantity updated successfully';

        } else if (mode === 'decrease') {

            user.cart[existingSameProductIndex].cartQuantity -= quantity;
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