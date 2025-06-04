import Product from "@/components/product/Product";
import { appUrl } from "@/constants/appUrl";
import getQuery from "@/lib/queries/getQueries";
import { Product as ProductType } from "@/types/types";

export default async function Page({ params }: any) {
    const _id = params?.id as string || '';
    const { message, success, data } = await getQuery(`${appUrl}api/products?id=${_id}`);

    if (!success || !data) {
        return <div className="text-center py-10 text-red-500 font-semibold">Product not found.</div>;
    }

    const product: ProductType = data;

    return (
        <Product product={product} />
    );
}
