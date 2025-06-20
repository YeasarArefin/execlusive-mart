import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { cn } from "@/lib/utils";
import { CartApiPayload, CartProduct, ColorType, Product, ProductVariant } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { v4 as uuid } from 'uuid';

export default function AddToCart({ product, color, variant, quantity = 1, className }: { product: Product, className?: string, icon?: "cart" | "cancel"; color?: ColorType, variant?: ProductVariant, quantity?: number; }) {

	const cart = useAppSelector(state => state.cart.cart) || [];
	const dispatch = useAppDispatch();
	const [addToCartApi, { isError, isLoading, isSuccess, data }] = useAddToCartApiMutation();

	const { data: session } = useSession();
	const userId = session?.user._id;
	const { toast } = useToast();

	const handleToggleCart = () => {
		const cartId = uuid();

		// Select default color and variant (first in array)
		const selectedColor: ColorType = color || product?.colors[0];
		const selectedVariant: ProductVariant = variant || product?.variants[0];
		const selectedImage = product?.images.find(img => img?.color_name === selectedColor?.color_name);

		// Prepare CartProduct for Redux store
		const cartProduct: CartProduct = {
			_id: product._id,
			type: product.type,
			cartId,
			name: product.name,
			description: product.description,
			image: selectedImage?.image || "",
			discount: product.discount,
			featured: product.featured,
			brand: product.brand,
			cartQuantity: quantity,
			price: selectedVariant?.price || 0,
			variant: selectedVariant?.size || '',
			color: selectedColor?.color_name || "",
		};

		// Prepare CartApiPayload for API
		const apiPayload: CartApiPayload = {
			userId: userId || "",
			_id: product._id,
			cartId,
			type: product.type,
			name: product.name,
			description: product.description,
			image: selectedImage?.image || "",
			discount: product.discount,
			featured: product.featured,
			brand: product.brand,
			cartQuantity: quantity,
			price: selectedVariant?.price || 0,
			variant: selectedVariant?.size || '',
			color: selectedColor?.color_name || "",
			mode: 'add'
		};

		dispatch(addToCart({ product: cartProduct, quantity: 1 }));
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
		<Button
			effect={'shine'}
			onClick={handleToggleCart}
			className={cn(
				"flex border justify-center items-center gap-x-2 py-[8px] rounded-lg bg-primary_red text-white",
				className
			)}
		>
			<IoCartOutline className="text-xl" />
			Add To Cart
		</Button>
	);
}