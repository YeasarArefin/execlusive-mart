import { HeroSlider } from "./HeroSlider";


export default async function HeroSection() {
    return (
        <section className="grid grid-cols-8 mb-[80px]">
            <div className="col-span-8 lg:col-span-8">
                <HeroSlider />
            </div>
        </section>
    );
}