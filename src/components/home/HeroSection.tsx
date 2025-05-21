import { HeroSlider } from "./HeroSlider";


export default async function HeroSection() {
    // const { message, success, data } = await getQuery(`${appUrl}api/categories`);
    // const categories: Category[] = data || [];
    return (
        <section className="grid grid-cols-8 mb-[80px]">
            {/* <div className="lg:pr-5 lg:pt-5 md:border-r capitalize flex flex-col gap-y-3 col-span-8 lg:col-span-1">
                {
                    categories?.map((category) => <h1 key={category._id}>{category.name}</h1>)
                }
            </div> */}

            <div className="col-span-8 lg:col-span-8">

                <HeroSlider />
            </div>
        </section>
    );
}