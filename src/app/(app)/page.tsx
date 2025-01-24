import Explore from "@/components/home/Explore/Explore";
import Features from "@/components/home/Features/Features";
import HeroSection from "@/components/home/HeroSection";
import Promotion from "@/components/home/Promotion/Promotion";

export default async function Home() {

	return (
		<div>
			<HeroSection />
			<Explore />
			<Promotion />
			<Features />
		</div>
	);
}
