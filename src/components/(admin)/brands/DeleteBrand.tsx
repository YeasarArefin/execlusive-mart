import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteBrandMutation } from "@/features/api/apiSlice";
import { Brand } from "@/types/types";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type DeleteBrandProps = {
    brand: Brand;
};

export function DeleteBrand({ brand }: DeleteBrandProps) {
    const [open, setOpen] = useState(false);
    const [deleteBrand, { isLoading }] = useDeleteBrandMutation();

    const handleDelete = async () => {
        await deleteBrand({ id: brand._id });
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    className="text-red-600"
                    onClick={(e) => { e.preventDefault(); setOpen(true); }}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Brand
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the brand <b>{brand.name}</b> and remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}