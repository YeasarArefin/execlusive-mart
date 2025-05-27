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

    // Use the first color and variant as the selected ones (since cart stores them as arrays of length 1)
    const selectedColor: ColorType = colors && colors[0];
    const selectedVariant: ProductVariant = variants && variants[0];
    const selectedImage: ProductImageType = images && images[0];

    // Fallbacks for price and size
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
        <div className="grid grid-cols-6 items-center justify-items-center border px-5 py-2 hover:shadow-xl duration-200 font-semibold rounded-lg">
            <div className="flex items-center col-span-2">
                <Image
                    src={selectedImage?.image || "/placeholder.png"}
                    width={80}
                    height={60}
                    alt="product_image"
                />
                <div>
                    <Link href={`/products/${_id}`} className="text-lg hover:underline">
                        {name}
                    </Link>
                    <div className="capitalize flex font-medium gap-x-2 text-[12px]">
                        <span>
                            color: {selectedColor?.color_name}
                        </span>
                        <h1>
                            size: <span className="uppercase">{size}</span>
                        </h1>
                    </div>
                </div>
            </div>
            <h1>${price}</h1>
            <CartQuantityController cartId={cartId || ''} cartQuantity={cartQuantity} />
            <h1>${subtotal}</h1>
            <Button onClick={handleRemoveFromCart} className="rounded-full hover:bg-primary_red bg-primary_red px-2.5 py-1.5">
                <RxCross2 className="text-lg " />
            </Button>
        </div>
    );
}