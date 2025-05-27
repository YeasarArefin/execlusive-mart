'use client';
import { ColorType, Product as ProductType, ProductVariant } from '@/types/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import ToggleWishlist from '../home/Explore/ToggleWishlist';
import { Button } from '../ui/button';
import ProductQuantityController from './product-quantity-controller';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import AddToCart from '../home/Explore/AddToCart';

export default function Product({ product }: { product: ProductType; }) {
    const { _id, images, brand, name, category, description, discount, cartQuantity, colors, variants, type } = product || {};
    const [productQuantity, setProductQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<ColorType>(colors[0] || {});
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0] || {});

    const handleChangeImageIndex = (index) => {
        setSelectedImageIndex(index);
    };

    useEffect(() => {
        window.history.pushState(
            null,
            "",
            `?color=${selectedColor?.color_name}&size=${selectedVariant?.size}`
        );
    }, [selectedColor, selectedVariant]);

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="px-4 md:px-5 py-10 md:py-24 mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Image Section */}
                    <div className="flex flex-col lg:flex-row gap-4 lg:w-1/2 w-full">
                        <div className="flex lg:flex-col order-2 lg:order-1 gap-2 overflow-x-auto lg:overflow-visible p-2 lg:p-4">
                            {images?.map((image, idx) => (
                                <div
                                    key={image?._id}
                                    className={`min-w-[60px] sm:min-w-[80px] w-[60px] sm:w-[80px] h-[60px] sm:h-[80px] lg:w-[100px] lg:h-[100px] rounded-md cursor-pointer bg-slate-100 p-2 flex-shrink-0 ${selectedImageIndex === idx ? "border-2 border-red-500" : ""
                                        }`}
                                    onClick={() => handleChangeImageIndex(idx)}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image?.image}
                                            alt={image?.color_name || `Product image ${idx + 1}`}
                                            className="rounded-md object-cover"
                                            fill
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[425px] rounded-xl order-1 lg:order-2">
                            <div className="relative w-full h-full">
                                <InnerImageZoom
                                    zoomType="hover"
                                    src={images[selectedImageIndex]?.image}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="lg:w-1/2 w-full px-5">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest capitalize font-black">{brand}</h2>
                        <h1 className="text-gray-900 text-2xl sm:text-3xl title-font font-medium mb-2">{name}</h1>
                        <div className="mb-4">
                            <p className="leading-relaxed text-sm sm:text-base">{description}</p>
                        </div>
                        <div className="flex flex-col gap-y-4 mt-5">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold text-sm mr-2">Colors:</span>

                                {colors.length > 0 && colors?.map((color, idx) => (
                                    <div key={color._id} className="flex flex-col items-center">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span
                                                        onClick={() => { setSelectedColor(color); setSelectedImageIndex(idx); }}

                                                        className={`w-[30px] h-[30px] mr-2 rounded-full ${selectedColor.color_name === color.color_name && 'border-primary_red border-2'}`}
                                                        style={{ background: color.color_code }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent className='bg-white border  text-primary_red font-semibold shadow-md'>
                                                    <p>{color.color_name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {type === 'laptop' && <span className="font-bold text-sm mr-2 capitalize">Ram & Storage : </span>}
                                {type === 'phone' && <span className="font-bold text-sm mr-2 capitalize">Storage : </span>}
                                {variants.length > 0 && variants?.map((variant) => (
                                    <Button
                                        key={variant.size}
                                        onClick={() => setSelectedVariant(variant)}
                                        variant="outline"
                                        size="sm"
                                        className={`capitalize border-2 ${selectedVariant.size === variant.size && 'border-primary_red'}`}
                                    >
                                        {variant.size}
                                    </Button>
                                ))}
                            </div>
                            <hr className="my-4" />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex gap-x-5 items-center">
                                <h1 className="title-font font-medium text-2xl text-gray-900">
                                    <span className="font-bold">${selectedVariant.price}</span>
                                </h1>
                                <ProductQuantityController productQuantity={productQuantity} setProductQuantity={setProductQuantity} />
                            </div>
                            <div className="flex gap-x-5 items-center">
                                <AddToCart product={product} color={selectedColor} variant={selectedVariant} quantity={productQuantity} />
                                <ToggleWishlist _id={_id || ''} icon="heart" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}