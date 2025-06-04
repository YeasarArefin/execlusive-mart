import { Brand } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const BrandSchema: Schema<Brand> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    type: {
        type: [String],
        required: [true, 'type is required'],
        enum: ['phone', 'laptop', 'accessory'],
    },
    image: {
        type: String,
        required: [true, 'image is required']
    }
},
    {
        timestamps: true
    });

const BrandModel = mongoose.models.Brand as mongoose.Model<Brand> || mongoose.model<Brand>('Brand', BrandSchema);
export default BrandModel;