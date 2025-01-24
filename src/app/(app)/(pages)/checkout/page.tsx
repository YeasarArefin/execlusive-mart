'use client';
import CartCalculation from '@/components/cart/cart-calculation';
import Heading from '@/components/home/Heading';
import { Button } from '@/components/ui/button';
import { usePaymentMutation } from '@/features/api/apiSlice';
import { useAppSelector } from '@/lib/hooks/hooks';
import { PaymentData, User } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {

    const cart = useAppSelector((state) => state.cart.cart);
    const products = cart.map(({ _id, cartQuantity }) => ({ _id, quantity: cartQuantity }));
    const { data: session } = useSession();
    const user = session?.user as User;


    const { register, handleSubmit } = useForm<PaymentData>({
        defaultValues: {
            address: "Satarkul, Badda",
            city: "Dhaka",
            phone: "01614647834",
            postCode: "2941",
        },
    });
    const [payment, { data: response, isLoading, isError, isSuccess, error }] = usePaymentMutation();
    const onSubmit = (data) => {
        const paymentData = { name: user?.name, email: user?.email, ...data, products };
        payment(paymentData);
    };

    useEffect(() => {
        console.log(response);
    }, [isSuccess, response]);

    return (
        <div>
            <div>
                <Heading name='Checkout' title='Proceed to pay' />
            </div>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-5'>
                    <div className='w-full md:w-3/4 flex flex-col col-span-3 gap-3 mt-10'>
                        <input className='w-full border px-4 py-1 rounded-md  outline-primary_red' value={user?.name || ""} />
                        <input className='w-full border px-4 py-1 rounded-md  outline-primary_red' value={user?.email || ""} />
                        <input className='w-full border px-4 py-1 rounded-md  outline-primary_red' {...register('address')} />
                        <input className='w-full border px-4 py-1 rounded-md  outline-primary_red' {...register('city')} />
                        <input className='w-full border px-4 py-1 rounded-md  outline-primary_red' {...register('phone')} />
                        <input className='w-full border px-4 py-1 rounded-md  outline-primary_red' {...register('postCode')} />
                    </div>
                    <div className='col-span-2 border rounded-lg'>
                        <CartCalculation />
                        <div className='px-5 pt-3 pb-5'>
                            <Button type="submit" className='w-full'>Proceed to Pay</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
