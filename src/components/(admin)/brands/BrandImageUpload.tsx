import { Input } from "@/components/ui/input";
import LoadingIcon from "@/components/ui/loadingIcon";
import useImageUpload from "@/hooks/useImageUpload";
import Image from "next/image";

export default function BrandImageUpload({ getImage }: { getImage?: (url: string) => string; }) {

    const { isLoading, imageUrl, setImageFile } = useImageUpload();

    if (imageUrl.length && getImage) {
        getImage(imageUrl);
    }

    return (
        <div className="flex items-center gap-x-5">
            {isLoading && <LoadingIcon />}
            {!isLoading && imageUrl && <Image src={imageUrl} width={50} height={50} unoptimized alt="image" />}
            <Input type="file" id="file" placeholder="File" accept="image/*" onChange={setImageFile} />
        </div>
    );
}
