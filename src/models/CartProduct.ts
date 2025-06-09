import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema({
    _id: { type: String },
    type: { type: String, enum: ['phone', 'laptop', 'accessory'] },
    cartId: { type: String },
    name: { type: String },
    description: { type: String },
    image: { type: String },
    discount: { type: Number },
    featured: { type: Boolean },
    brand: { type: String },
    cartQuantity: { type: Number },
    price: { type: Number },
    variant: { type: String },
    color: { type: String }
});

export default CartProductSchema;