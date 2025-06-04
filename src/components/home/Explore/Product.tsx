'use client';
import { Product as ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";
import DiscountBadge from "./DiscountBadge";
import ToggleWishlist from "./ToggleWishlist";

export default function Product({ product }: { product: ProductType; }) {
    const { _id, name, images = [], discount, variants = [] } = product || {};
    const hasImage = images && images.length > 0 && images[0]?.image;
    const hasVariant = variants && variants.length > 0;

    return (
        <div className="w-full md:w-[300px] mx-auto border px-10 py-8 rounded-xl hover:shadow-2xl transition-all duration-150 relative">
            <Image
                src={hasImage ? images[0].image : "/placeholder.svg"}
                width={250}
                height={250}
                alt="product_pic"
            />
            <div className="flex flex-col gap-y-1">
                <Link href={`/products/${_id}`} className="font-bold hover:underline">{name}</Link>
                <h1 className="font-semibold">
                    {hasVariant ? `$${variants[0].price}` : "No price"}
                </h1>
                <DiscountBadge discount={discount} className="absolute top-3 left-3" />
                <ToggleWishlist _id={_id || ''} icon="heart" className="absolute left-1 top-16" />
                <div className="flex items-center gap-x-3">
                    {/* Ratings or reviews */}
                </div>
                <AddToCart product={product} icon="cart" />
            </div>
        </div>
    );
}

