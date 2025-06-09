import { Order } from "@/types/types";
import mongoose, { Schema } from "mongoose";
import CartProductSchema from "./CartProduct";

const OrderSchema: Schema<Order> = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    products: [CartProductSchema],
    paidAmount: {
        type: Number,
        required: true
    },
    usedCoupon: {
        type: String,
        default: '',
    },
    transactionId: {
        type: String,
        default: '',
    },
    discount: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true
    }
);

const OrderModel = mongoose.models.Order as mongoose.Model<Order> || mongoose.model<Order>('Order', OrderSchema);
export default OrderModel;