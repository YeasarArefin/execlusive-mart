import jbl from "@/../../public/JBL.png";
import Image from "next/image";
export default function Promotion() {
    return (
        <section className="w-full h-auto  bg-gradient-to-r from-black to-slate-800 mt-20 rounded-3xl text-white grid grid-cols-1 md:grid-cols-2 py-6 px-8">
            <div className="flex flex-col justify-center">
                <p className="text-3xl md:text-5xl font-semibold">Enhance Your <br /> Music Experience</p>
            </div>
            <Image src={jbl} alt="promo" />
        </section>
    );
}
