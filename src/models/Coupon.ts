import { Coupon } from "@/types/types";
import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    code: {
        type: String,
        required: [true, 'code is required']
    },
    expiryDate: {
        type: Date,
        required: [true, 'expiry date is required']
    },
    discount: {
        type: Number,
        required: [true, 'discount is required']
    }

},
    {
        timestamps: true
    }
);

const CouponModel = mongoose.models.Coupon as mongoose.Model<Coupon> || mongoose.model<Coupon>('Coupon', BannerSchema);
export default CouponModel;