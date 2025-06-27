import { ObjectId } from "mongoose";


export type ProductVariant = {
    _id?: string;
    size: string;       // e.g., "8/128GB"
    price: number;
    stocks: number;
};

export type ColorType = {
    _id?: string;
    color_name: string;
    color_code: string;
    inStock: boolean;
};

export type ProductImageType = {
    _id?: string;
    color_name: string;
    image: string;
};

export type Product = {
    _id?: string,
    type: 'phone' | 'laptop' | 'accessory',
    cartId?: string,
    name: string,
    description: string,
    images: ProductImageType[];
    discount: number,
    featured: boolean,
    brand: string,
    cartQuantity: number,
    variants: ProductVariant[],
    colors: ColorType[],
};

export type CartProduct = {
    _id?: string,
    type: 'phone' | 'laptop' | 'accessory',
    cartId?: string,
    name: string,
    description: string,
    image: string;
    discount: number,
    featured: boolean,
    brand: string,
    cartQuantity: number,
    price: number,
    variant: string;
    color: string;
};

export type CartApiPayload = {
    userId: string,
    mode: 'add' | 'increase' | 'decrease' | 'remove',
    _id?: string,
    type: 'phone' | 'laptop' | 'accessory',
    cartId?: string,
    name: string,
    description: string,
    image: string;
    discount: number,
    featured: boolean,
    brand: string,
    cartQuantity: number,
    price: number,
    variant: string;
    color: string;
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
    _id?: string,
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
    cart: CartApiPayload[],
    usedCoupons: string[];
};

export type Order = {
    _id?: string,
    email: string,
    name: string,
    address: string,
    city: string,
    postCode: string,
    phone: string,
    products: CartProduct[],
    usedCoupon: string;
    paidAmount?: number;
    transactionId?: string;
    orderId?: string;
    discount?: number;
    status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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
    type: Object;
};

export type PaymentOfProduct = {
    _id: string,
    quantity: number;
};

export type PaymentData = {
    name: string;
    address: string;
    city: string;
    postCode: string;
    phone: string;
    email: string,
    couponCode?: string,
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

export interface UsePaginationProps {
    itemsPerPage: number;
    currentPage: number;
    handleItemPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    setCurrentPage: (page: number) => void;
    pages: number[];
    setItemsPerPage: (n: number) => void;
    totalItems: number;
    disabled?: boolean;
}

export type Brand = {
    _id?: string;
    name: string;
    type: string[]; // Array of 'phone' | 'laptop' | 'accessory'
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
};