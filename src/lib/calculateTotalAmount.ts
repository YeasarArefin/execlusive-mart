import UserModel from "@/models/User";
import { CartProduct } from "@/types/types";
import checkCouponValidity from "./checkCouponValidity";

export default async function calculateTotalAmount(email: string, couponCode?: string) {

    const user = await UserModel.findOne({ email });
    const cart = user?.cart as CartProduct[];

    // Calculate subtotal directly using the price field from CartProduct
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const price = product.price * product.cartQuantity;
        subTotal += price;
    }

    let couponResult: any = { success: false, data: null };
    if (couponCode) {
        couponResult = await checkCouponValidity(couponCode, email);
    }

    console.log("🚀 ~ calculateTotalAmount ~ couponResult:", couponResult);

    let totalAmount;
    if (couponResult?.success && couponResult?.data && couponResult?.data?.discount > 0) {
        const calculateTotal = (subTotal + (subTotal * (7 / 100)));
        totalAmount = (calculateTotal - (calculateTotal * (couponResult?.data?.discount / 100))) + 60;
    } else {
        totalAmount = (subTotal + (subTotal * (7 / 100))) + 60;
    }

    console.log("🚀 ~ calculateTotalAmount ~ totalAmount:", totalAmount);

    return {
        totalAmount: Math.floor(totalAmount),
        products: user?.cart,
        appliedCoupon: couponResult.success && couponResult.data ? couponResult.data : null
    };
}
