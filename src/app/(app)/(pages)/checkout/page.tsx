'use client';

import CartCalculation from '@/components/cart/cart-calculation';
import Heading from '@/components/home/Heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLazyGetCouponQuery, usePaymentMutation } from '@/features/api/apiSlice';
import { useAppSelector } from '@/lib/hooks/hooks';
import { Coupon, PaymentData, User } from '@/types/types';
import { Building2, Mail, MapPinHouse, Phone, Signpost, User as UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
    const cart = useAppSelector((state) => state.cart.cart);
    const products = cart.map(({ _id, cartQuantity }) => ({ _id, quantity: cartQuantity }));
    const { data: session } = useSession();
    const user = session?.user as User;
    const [userGivenCouponCode, setUserGivenCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<Partial<Coupon> & { message?: string; success?: boolean; }>({});

    const [getCoupon, couponResult] = useLazyGetCouponQuery();
    const [initPayment, paymentInitResult] = usePaymentMutation();

    const addCoupon = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await getCoupon({ code: userGivenCouponCode, email: user?.email });
        if (result.data) {
            setAppliedCoupon(result.data.data);
        }
        setUserGivenCouponCode('');
    };

    const { register, handleSubmit } = useForm<PaymentData>({
        defaultValues: {
            address: "Satarkul, Badda",
            city: "Dhaka",
            phone: "01614647834",
            postCode: "2941",
        },
    });

    const onSubmit = async (form: PaymentData) => {
        try {
            const newPaymentData: PaymentData = {
                ...form,
                name: user?.name,
                email: user?.email,
            };

            if (appliedCoupon.code) {
                newPaymentData.couponCode = appliedCoupon.code;
            }

            const res = await initPayment(newPaymentData).unwrap();

            if (res.url) {
                // Replace cookies-next with native cookie set
                document.cookie = `checkout_data=${encodeURIComponent(JSON.stringify(newPaymentData))}; max-age=${60 * 60}; path=/`;

                window.location.href = res.url;
            } else {
                console.log("Payment initialization failed: " + res?.message || "Unknown error");
            }
        } catch (err: any) {
            console.error("Payment error:", err);
        }
    };

    return (
        <div>
            <Heading name='Checkout' title='Proceed to pay' />
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-5'>
                    <div className='w-full md:w-3/4 flex flex-col col-span-3 gap-3 mt-10'>
                        <div className='relative'>
                            <UserIcon className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' defaultValue={user?.name} placeholder='Name' />
                        </div>
                        <div className='relative'>
                            <Mail className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' defaultValue={user?.email} placeholder='Email' />
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
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' placeholder='Phone Number' {...register('phone')} />
                        </div>
                        <div className='relative'>
                            <Signpost className='absolute top-2 left-3' />
                            <input className='w-full border pl-12 px-4 py-2 rounded-md  outline-primary_red' placeholder='Post Code' {...register('postCode')} />
                        </div>
                    </div>
                    <div className='col-span-2 border rounded-lg'>
                        <CartCalculation appliedCoupon={appliedCoupon} />
                        <div className='px-10'>
                            <div className="flex items-center gap-x-5 mt-3">
                                <Input placeholder="Coupon" onChange={(e) => setUserGivenCouponCode(e.target.value)} disabled={couponResult.isSuccess} />
                                <Button onClick={addCoupon} disabled={couponResult.isSuccess}>
                                    {couponResult.isLoading ? 'Loading...' : 'Add'}
                                </Button>
                            </div>
                            <div className='py-2 text-red-600 text-sm'>
                                {couponResult.isError && couponResult.error && 'data' in couponResult.error &&
                                    <h1>{(couponResult.error as any).data?.message}</h1>}
                            </div>
                            <div className='pt-3 pb-5'>
                                <Button type="submit" disabled={paymentInitResult.isLoading} className='w-full'>
                                    {paymentInitResult.isLoading ? "Redirecting…" : "Proceed to Pay"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
