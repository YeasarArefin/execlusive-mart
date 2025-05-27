import { Product } from "@/types/types";
import Image from "next/image";
import ToggleWishlist from "../home/Explore/ToggleWishlist";


export default function Wishlist({ product }: { product: Product; }) {
    const { _id, name, images, brand, variants } = product || {};
    return (
        <div key={_id} className="flex flex-wrap items-center gap-x-6 border p-3 rounded-lg">
            <Image src={images[0]?.image} width={70} height={70} alt={images[0]?.color_name} />
            <h1>{name}</h1>
            <h1>{brand}</h1>
            <h1>${variants[0]?.price}</h1>
            <h1>{variants[0]?.stocks > 1 ? 'In Stock' : 'Out Of Stock'}</h1>
            <ToggleWishlist _id={_id || ''} icon="cancel" />
        </div>
    );
}
