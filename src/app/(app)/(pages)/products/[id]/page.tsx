import Product from "@/components/product/Product";
import { Product as ProductType } from "@/types/types";

// // Set the revalidation strategy - 'force-cache' for static generation
// export const dynamic = 'force-static';
// export const revalidate = 3600; // Revalidate every hour

// export async function generateStaticParams() {
//     const { success, data } = await getQuery(`${appUrl}api/products`);

//     if (!success || !data) {
//         return [];
//     }

//     return data.map((product: ProductType) => ({
//         id: product._id,
//     }));
// }

export default async function Page({ params }: any) {
    const _id = params?.id as string || '';
    // const { message, success, data } = await getQuery(`${appUrl}api/products?id=${_id}`);

    // if (!success || !data) {
    //     return <div className="text-center py-10 text-red-500 font-semibold">Product not found.</div>;
    // }

    // const product: ProductType = data;

    return (
        <Product product={[] as unknown as ProductType} />
    );
}
