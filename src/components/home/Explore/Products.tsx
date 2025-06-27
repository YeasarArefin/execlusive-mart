
export default async function Products() {
    // const { message, success, data } = await getQuery(`${appUrl}api/products?limit=9`);
    // const products: ProductType[] = data || [];

    // let content;
    // if (!success) {
    //     content = <Error>{message}</Error>;
    // }
    // if (success) {
    //     content = products?.map((product) => <Product key={product?._id} product={product} />);
    // }

    const content = null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">{content}</div>
    );
}
