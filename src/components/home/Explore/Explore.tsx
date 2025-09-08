import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Heading from "../Heading";
import Products from "./Products";

export default function Todays() {
    return (
        <section className="flex flex-col gap-y-10">
            <div className="flex items-center gap-x-10">
                <Heading name="Explore" title="Explore More Products" />
            </div>
            <div>
                <Products />
            </div>
            <div className="flex justify-center">
                <Link href={'/products'}>
                    <Button effect="expandIcon" icon={ArrowRightIcon} iconPlacement="right" className="bg-primary_red">
                        See All
                    </Button>
                </Link>
            </div>
        </section>
    );
}
