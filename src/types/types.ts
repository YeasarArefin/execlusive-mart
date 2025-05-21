import { ObjectId } from "mongoose";

export type Product = {
    _id: string,
    cartId?: string,
    name: string,
    description: string,
    images: string[];
    price: number,
    discount: number,
    rating: number,
    reviews: [],
    stocks: number,
    featured: boolean,
    brand: string,
    cartQuantity: number,
    category: ObjectId,
    colors: string[],
    size: string[];
};

export type Category = {
    _id: string,
    name: string,
    image: string;
};

export type Banner = {
    _id?: string,
    name: string,
    url: string;
};

export type Coupon = {
    _id: string,
    name: string,
    code: string,
    expiryDate: Date,
    discount: number;
};

export type User = {
    name: string,
    email: string,
    password: string,
    verificationCode: string,
    verificationCodeExpiry: Date,
    isVerified: boolean,
    isAdmin: boolean,
    wishlists: ObjectId[],
    cart: Product[],
    usedCoupons: string[];
};

export type Order = {
    user: ObjectId,
    products: ObjectId[],
    payment: number,
    usedCoupon: string;
};

export type Review = {
    user: ObjectId,
    review: string,
};

export type SignUpFormData = {
    name: string,
    email: string,
    password: string;
};

export type SignInFormData = {
    email: string,
    password: string;
};

export type VerificationCodeFromData = {
    email: string;
    verificationCode: string;
};

export type CouponData = {
    coupon: string;
};

export type QueryObject = {
    name: Object,
    brand: Object,
    category: Object,
};

export type PaymentOfProduct = {
    _id: string,
    quantity: number;
};

export type PaymentData = {
    name: string;
    address: string | null,
    city: string | null,
    postCode: string | null,
    phone: string | null,
    email: string,
    products: PaymentOfProduct[],
    code: string,
};

export type SSLResponse = {
    status: "SUCCESS" | "FAILED" | "CANCELLED";
    failedreason: string;
    sessionkey: string;
    gw: {};
    redirectGatewayURL: string;
    directPaymentURLBank: string;
    directPaymentURLCard: string;
    directPaymentURL: string;
    redirectGatewayURLFailed: string;
    GatewayPageURL: string;
    storeBanner: string;
    storeLogo: string;
    store_name: string;
    desc: {}[];
    is_direct_pay_enable: string;
};