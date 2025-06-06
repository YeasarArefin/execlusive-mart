"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingIcon from "@/components/ui/loadingIcon";
import { useUpdateBrandMutation } from "@/features/api/apiSlice";
import { Brand } from "@/types/types";
import { Check, Edit } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import BrandImageUpload from "./BrandImageUpload";

const brandTypes = [
    { id: "phone", label: "Phone" },
    { id: "laptop", label: "Laptop" },
    { id: "accessory", label: "Accessory" },
];

type UpdateBrandProps = {
    brand: Brand;
};

export function UpdateBrand({ brand }: UpdateBrandProps) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(brand.image || "");
    const [formData, setFormData] = useState<Partial<Brand>>({
        _id: brand._id,
        name: brand.name,
        type: brand.type,
        image: brand.image,
    });

    const [updateBrand, { isLoading, isSuccess }] = useUpdateBrandMutation();

    useEffect(() => {
        setFormData({
            _id: brand._id,
            name: brand.name,
            type: brand.type,
            image: brand.image,
        });
        setImage(brand.image || "");
    }, [brand, open]);

    const getImage = (img: string) => {
        setImage(img);
        setFormData((prev) => ({ ...prev, image: img }));
        return img;
    };

    const handleInputChange = (field: keyof Brand, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleTypeChange = (typeId: string, checked: boolean) => {
        setFormData((prev) => {
            const currentTypes = prev.type || [];
            if (checked) {
                return { ...prev, type: [...currentTypes, typeId] };
            } else {
                return { ...prev, type: currentTypes.filter((t) => t !== typeId) };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData._id) return;
        const updatedData = { ...formData, image };
        await updateBrand(updatedData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={e => {
                    e.preventDefault();
                    setOpen(true);
                }}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Brand
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Update Brand</DialogTitle>
                    <DialogDescription>Edit the details of this brand.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Brand Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Brand Name*</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter brand name (e.g., Apple, Samsung)"
                            required
                        />
                    </div>

                    {/* Brand Types */}
                    <div className="space-y-3">
                        <Label>Product Types*</Label>
                        <p className="text-sm text-gray-600">Select the types of products this brand offers</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {brandTypes.map((type) => (
                                <div key={type.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={type.id}
                                        checked={formData.type?.includes(type.id) || false}
                                        onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                                    />
                                    <Label
                                        htmlFor={type.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {type.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {formData.type && formData.type.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.type.map((type) => (
                                    <span
                                        key={type}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                    >
                                        {brandTypes.find((t) => t.id === type)?.label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Brand Image */}
                    <div className="space-y-3">
                        <Label htmlFor="image">Brand Image*</Label>
                        <div className="space-y-3">
                            <BrandImageUpload getImage={getImage} />
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            disabled={isLoading || isSuccess}
                        >
                            {isLoading ? (
                                <div className="flex gap-x-3 items-center">
                                    <LoadingIcon /> Updating...
                                </div>
                            ) : isSuccess ? (
                                <div className="flex gap-x-3 items-center">
                                    <Check className="mr-2" /> Updated
                                </div>
                            ) : (
                                "Update Brand"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Add this export to your apiSlice.ts
// updateBrand: builder.mutation({
//     query: (data) => ({
//         url: '/brands',
//         method: 'PUT',
//         body: data
//     }),
//     invalidatesTags: ['Brands'],
// }),