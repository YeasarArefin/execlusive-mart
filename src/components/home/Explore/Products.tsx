import Error from "@/components/ui/error";
import { appUrl } from "@/constants/appUrl";
import getQuery from "@/lib/queries/getQueries";
import { ApiResponse } from "@/types/ApiResponse";
import { Product as ProductType } from "@/types/types";
import Product from "./Product";


export async function getProducts(): Promise<ApiResponse> {
    try {
        const response = await fetch(`${appUrl}api/products?limit=9`);
        return response.json();
    } catch (error) {
        // Return fallback data during build time
        return {
            success: true,
            message: "Fallback data used",
            data: []
        };
    }
}

export default async function Products() {
    try {
        const { message, success, data } = await getQuery(`${appUrl}api/products?limit=9`);
        const products: ProductType[] = data || [];

        if (!success) {
            return <Error>{message}</Error>;
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
                {products?.map((product) => (
                    <Product key={product?._id} product={product} />
                ))}
            </div>
        );
    } catch (error) {
        // Return empty grid during build time
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
                {/* Products will be loaded client-side */}
            </div>
        );
    }
}
