import { Button } from "@/components/ui/button";
import { useUploadProductMutation } from "@/features/api/apiSlice";
import { Product } from "@/types/types";
import { Check } from "lucide-react";

export default function AddProductButton({ product }: { product: Product; }) {

    const [uploadProduct, { isLoading, isSuccess, isError }] = useUploadProductMutation();

    return (
        <Button
            disabled={isSuccess}
            onClick={() => uploadProduct(product)}
            type="button"
            className="bg-red-600 hover:bg-red-700"
        >
            {isLoading ? (
                <>
                    <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Uploading
                </>
            ) : isSuccess ? (
                <>
                    <Check className="mr-2" />
                    Uploaded
                </>
            ) : (
                <>Add Product</>
            )}
        </Button>
    );
}
