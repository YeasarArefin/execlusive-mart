import { updateTotalPrice } from "@/features/cart/cartSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useDispatch } from "react-redux";

export default function CartCalculation({ appliedCoupon }) {
    const cart = useAppSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    // Calculate subtotal directly using the price field from CartProduct
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const price = product.price * product.cartQuantity;
        subTotal += price;
    }

    let total;
    if (appliedCoupon.discount > 0) {
        const calculateTotal = (subTotal + (subTotal * (7 / 100)));
        total = (calculateTotal - (calculateTotal * (appliedCoupon.discount / 100))) + 60;
        dispatch(updateTotalPrice(total));
    } else {
        total = (subTotal + (subTotal * (7 / 100))) + 60;
        dispatch(updateTotalPrice(total));
    }

    return (
        <div className="py-6 px-10">
            <h1 className="mb-7 font-black text-2xl">Cart Total</h1>
            <div className="flex flex-col gap-y-3 font-bold">
                <div className="flex justify-between">
                    <h1>Subtotal</h1>
                    <h1 className="w-14">${subTotal}</h1>
                </div>
                <div className="flex justify-between">
                    <h1>Shipping</h1>
                    <h1 className="w-14">$60</h1>
                </div>
                <div className="flex justify-between">
                    <h1>Tax</h1>
                    <h1 className="w-14">8%</h1>
                </div>
                <div className="flex justify-between">
                    <h1>Total</h1>
                    <h1 className="w-14">${Math.floor(total)}</h1>
                </div>
                <div>
                    {
                        appliedCoupon.discount > 0 && <div className="flex justify-between">
                            <h1>Coupon</h1>
                            <h1 className="w-14">{appliedCoupon.discount}%</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}