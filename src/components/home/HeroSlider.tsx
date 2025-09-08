"use client";
import banner1 from '@/../public/banner.png';
import banner2 from '@/../public/banner2.png';
import banner3 from '@/../public/banner3.png';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";
export function HeroSlider() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );


    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full relative lg:pl-7 lg:pt-7"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                <CarouselItem >
                    <div className="relative h-[500px] w-full">
                        <Image
                            src={banner1}
                            alt="Banner 1"
                            fill
                            className="rounded-3xl object-cover object-center"
                            priority
                        />
                    </div>
                </CarouselItem>
                <CarouselItem >
                    <div className="relative h-[500px] w-full">
                        <Image
                            src={banner2}
                            alt="Banner 2"
                            fill
                            className="rounded-3xl object-cover object-center"
                            priority
                        />
                    </div>
                </CarouselItem>
                <CarouselItem >
                    <div className="relative h-[500px] w-full">
                        <Image
                            src={banner3}
                            alt="Banner 3"
                            fill
                            className="rounded-3xl object-cover object-center"
                            priority
                        />
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-10" />
            <CarouselNext className="absolute right-5" />
        </Carousel>
    );
}
// "use client";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useGetBannersQuery } from "@/features/api/apiSlice";
// import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";
// import * as React from "react";

// export function HeroSlider() {
//     const plugin = React.useRef(
//         Autoplay({ delay: 2000, stopOnInteraction: true })
//     );
//     const { data, isLoading } = useGetBannersQuery(undefined);
//     const banners = data?.data || [];
//     console.log("🚀 ~ HeroSlider ~ banners:", banners);

//     if (isLoading) {
//         return <div>Loading banners...</div>;
//     }

//     return (
//         <Carousel
//             plugins={[plugin.current]}
//             className="w-full relative lg:pl-7 lg:pt-7"
//             onMouseEnter={plugin.current.stop}
//             onMouseLeave={plugin.current.reset}
//         >
//             <CarouselContent>
//                 {banners.length > 0 && banners?.map((banner) => (
//                     <CarouselItem key={banner._id}>
//                         <Image src={banner?.url} alt={banner.name} width={1400} height={500} className="rounded-3xl" />
//                     </CarouselItem>
//                 ))}
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-10" />
//             <CarouselNext className="absolute right-5" />
//         </Carousel>
//     );
// }
