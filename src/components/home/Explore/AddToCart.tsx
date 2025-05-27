import { useToast } from "@/components/ui/use-toast";
import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { ColorType, Product, ProductVariant } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { v4 as uuid } from 'uuid';

export default function AddToCart({ product, color, variant, quantity = 1 }: { product: Product, className?: string, icon?: "cart" | "cancel"; color?: ColorType, variant?: ProductVariant, quantity?: number; }) {

	const cart = useAppSelector(state => state.cart.cart) || [];
	const dispatch = useAppDispatch();
	const [addToCartApi, { isError, isLoading, isSuccess, data }] = useAddToCartApiMutation();

	const { data: session } = useSession();
	const userId = session?.user._id;
	const { toast } = useToast();

	const handleToggleCart = () => {
		const cartId = uuid();

		// Select default color and variant (first in array)
		const selectedColor: ColorType = color || product.colors[0];
		const selectedVariant: ProductVariant = variant || product.variants[0];
		const selectedImage = product.images.filter(img => img.color_name === selectedColor.color_name);


		// Prepare newProduct for cart (store selected color and variant as arrays for compatibility)
		const newProduct: Product = {
			...product,
			cartId,
			images: selectedImage,
			colors: [selectedColor],
			variants: [selectedVariant],
			cartQuantity: quantity,
		};

		const apiPayload = {
			userId,
			productId: product._id,
			cartId,
			quantity: quantity,
			color: selectedColor,
			variant: selectedVariant,
			mode: 'add'
		};

		dispatch(addToCart({ product: newProduct, quantity: 1 }));
		addToCartApi(apiPayload);
	};

	useEffect(() => {
		if (!isLoading && isSuccess) {
			toast({
				title: "Success",
				description: data?.message,
			});
		}
	}, [product._id, data, dispatch, isError, isLoading, isSuccess, toast]);

	return (
		<button onClick={handleToggleCart} className="flex border w-full justify-center items-center gap-x-2 py-[8px] rounded-lg bg-primary_red text-white">
			<IoCartOutline className="text-xl" />
			Add To Cart
		</button>
	);
}