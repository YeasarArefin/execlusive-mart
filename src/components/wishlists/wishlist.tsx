import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import ToggleWishlist from "../home/Explore/ToggleWishlist";


export default function Wishlist({ product }: { product: Product; }) {
    const { _id, name, images, brand, variants } = product || {};
    return (
        <div key={_id} className="flex items-center gap-x-6 border p-3 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full flex-wrap items-center">
                <Link href={`/products/${_id || ""}`} className="w-[70px] h-[70px] relative">
                    <Image src={images[0]?.image} width={70} height={70} alt={images[0]?.color_name} />
                </Link>
                <h1 className="font-semibold">{name}</h1>
                <h1>{brand}</h1>
                <h1>${variants[0]?.price}</h1>
                <h1>{variants[0]?.stocks > 1 ? 'In Stock' : 'Out Of Stock'}</h1>
            </div>
            <ToggleWishlist _id={_id || ''} icon="cancel" />
        </div>
    );
}
