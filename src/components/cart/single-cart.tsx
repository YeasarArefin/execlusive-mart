import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { removeFromCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { ColorType, ProductImageType, Product as ProductType, ProductVariant } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";
import CartQuantityController from "./cart-quantity-controller";

export default function SingleCart({ product }: { product: ProductType; }) {
    const {
        _id,
        images,
        cartQuantity,
        name,
        colors,
        variants,
        cartId,
    } = product || {};

    const selectedColor: ColorType = colors && colors[0];
    const selectedVariant: ProductVariant = variants && variants[0];
    const selectedImage: ProductImageType = images && images[0];

    const price = selectedVariant?.price ?? 0;
    const size = selectedVariant?.size ?? "";
    const subtotal = price * (cartQuantity ?? 1);

    const dispatch = useAppDispatch();
    const [addToCartApi] = useAddToCartApiMutation();
    const { data } = useSession();
    const { user } = data || {};
    const userId = user?._id;

    const handleRemoveFromCart = () => {
        cartId && dispatch(removeFromCart(cartId));
        addToCartApi({
            userId,
            productId: _id,
            cartId,
            quantity: 1,
            color: selectedColor,
            variant: selectedVariant,
            mode: 'remove'
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-6 items-center justify-items-center border px-4 py-4 hover:shadow-xl duration-200 font-semibold rounded-lg min-h-[120px] gap-y-4 w-full text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:col-span-2 gap-3 w-full max-w-full">
                <Image
                    src={selectedImage?.image || "/placeholder.png"}
                    width={80}
                    height={60}
                    alt="product_image"
                    unoptimized
                    className="rounded object-contain"
                />
                <div className="text-center sm:text-left space-y-1">
                    <Link href={`/products/${_id}`} className="text-lg hover:underline break-words">
                        {name}
                    </Link>
                    <div className="capitalize flex flex-wrap justify-center sm:justify-start font-medium gap-x-2 text-[12px]">
                        <span>
                            color: {selectedColor?.color_name}
                        </span>
                        <span>
                            size: <span className="uppercase">{size}</span>
                        </span>
                    </div>
                </div>
            </div>
            <h1 className="text-sm sm:text-base">${price}</h1>
            <div className="flex justify-center w-full">
                <CartQuantityController cartId={cartId || ''} cartQuantity={cartQuantity} />
            </div>
            <h1 className="text-sm sm:text-base">${subtotal}</h1>
            <div className="flex justify-center sm:justify-end w-full">
                <Button onClick={handleRemoveFromCart} className="rounded-full hover:bg-primary_red bg-primary_red px-2.5 py-1.5">
                    <RxCross2 className="text-lg" />
                </Button>
            </div>
        </div>
    );
}
