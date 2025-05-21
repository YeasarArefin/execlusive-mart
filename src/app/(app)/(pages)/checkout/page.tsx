'use client';
import CartCalculation from '@/components/cart/cart-calculation';
import Heading from '@/components/home/Heading';
import { Button } from '@/components/ui/button';
import { usePaymentMutation } from '@/features/api/apiSlice';
import { useAppSelector } from '@/lib/hooks/hooks';
import { PaymentData, User } from '@/types/types';
import axios from 'axios';
import { Building2, Mail, MapPinHouse, Phone, Signpost, User as UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {

    const [loading, setLoading] = useState(false);
    const cart = useAppSelector((state) => state.cart.cart);
    const products = cart.map(({ _id, cartQuantity }) => ({ _id, quantity: cartQuantity }));
    const { data: session } = useSession();
    const user = session?.user as User;
    const router = useRouter();

    const { register, handleSubmit } = useForm<PaymentData>({
        defaultValues: {
            address: "Satarkul, Badda",
            city: "Dhaka",
            phone: "01614647834",
            postCode: "2941",
        },
    });
    const [payment, { data: response, isLoading, isError, isSuccess, error }] = usePaymentMutation();
    const onSubmit = async (form: PaymentData) => {
        setLoading(true);
        try {
            const res = await axios.post("/api/payment/request");
            if (res.data) {
                const paymentUrl = res.data.url;
                window.location.href = paymentUrl;
                console.log("Payment URL:", res.data);
            } else {
                alert("Payment initialization failed: " + res.data.message);
            }
        } catch (err: any) {
            console.error(err);
            alert("An error occurred. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <Heading name='Checkout' title='Proceed to pay' />
            </div>
            <div className="">

                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-5'>
                    <div className='w-full md:w-3/4 flex flex-col col-span-3 gap-3 mt-10'>
                        <div className='relative'>
                            <UserIcon className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' value={user?.name} defaultValue={""} placeholder='Name' />
                        </div>
                        <div className='relative'>
                            <Mail className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' value={user?.email} defaultValue={""} placeholder='Email' />
                        </div>
                        <div className='relative'>
                            <MapPinHouse className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' placeholder='Address' {...register('address')} />
                        </div>
                        <div className='relative'>
                            <Building2 className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' placeholder='City' {...register('city')} />
                        </div>
                        <div className='relative'>
                            <Phone className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' placeholder='Phone Number '{...register('phone')} />
                        </div>
                        <div className='relative'>
                            <Signpost className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' placeholder='Post Code' {...register('postCode')} />
                        </div>
                    </div>
                    <div className='col-span-2 border rounded-lg'>
                        <CartCalculation />
                        <div className='px-5 pt-3 pb-5'>
                            <Button type="submit"
                                disabled={loading} className='w-full'> {loading ? "Redirecting…" : "Proceed to Pay"}</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
