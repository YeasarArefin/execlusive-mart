import CouponModel from "@/models/Coupon";
import UserModel from "@/models/User";

export default async function checkCouponValidity(code: string, email: string) {
    if (!code) return { success: false, message: 'coupon is required', status: 404 };
    if (!email) return { success: false, message: 'email is required', status: 404 };

    const user = await UserModel.findOne({ email });
    if (!user) return { success: false, message: 'user not found', status: 404 };
    console.log("🚀 ~ checkCouponValidity ~ user:", user);

    const coupon = await CouponModel.findOne({ code });
    if (!coupon) return { success: false, message: 'coupon not found', status: 404 };
    const usedCoupon = user.usedCoupons.some((usedCouponId: string) => {
        return usedCouponId.toString() === coupon._id.toString();
    });

    if (usedCoupon) return { success: false, message: 'coupon already used!', status: 400 };

    const isExpired = new Date() > new Date(coupon.expiryDate);
    if (isExpired) {
        return { success: false, message: 'coupon expired', status: 400 };
    }

    return { success: true, message: 'coupon valid', status: 200, data: coupon };
}
