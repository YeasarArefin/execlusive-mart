"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBrandsQuery } from "@/features/api/apiSlice";
import { ColorType, Product, ProductImageType, ProductVariant } from "@/types/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddProductButton from "./AddProductButton";
import ProductImageUpload from "./ProductImageUpload";

export function AddProduct() {
    const [open, setOpen] = useState(false);
    const initialProduct: Partial<Product> = {
        name: "",
        description: "",
        type: "phone",
        brand: "",
        discount: 0,
        featured: false,
        variants: [],
        colors: [],
        images: [],
    };
    const [formData, setFormData] = useState<Partial<Product>>(initialProduct);

    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [colors, setColors] = useState<ColorType[]>([]);

    const [variant, setVariant] = useState<ProductVariant>({ price: 0, size: "", stocks: 0, });
    const [color, setColor] = useState<ColorType>({ color_code: "#000000", color_name: "", inStock: true, });

    const [image, setImage] = useState('');
    const [images, setImages] = useState<ProductImageType[]>([]);

    useEffect(() => {
        console.log(image);
    }, [image]);



    const addVariant = (e) => {
        setVariants((prev) => [...prev, variant]);
        setVariant({ price: 0, size: "", stocks: 0 });
    };


    const addColor = () => {
        setColors((prev) => [...prev, color]);
        setImages((prev) => [...prev, { color_name: color.color_name, image }]);
        setColor({ color_code: "#000000", color_name: "", inStock: true });
    };

    const removeVariant = (index: number) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    const removeColor = (index: number) => {
        const updatedColors = colors.filter((_, i) => i !== index);
        setColors(updatedColors);
    };

    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setColor((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const productData = {
        ...formData,
        type: formData.type as "phone" | "laptop" | "accessory",
        variants: variants,
        colors: colors,
        images: images,
    };


    const handleClose = () => {
        setOpen(false);
        setFormData(initialProduct);
        setVariants([]);
        setColors([]);
        setVariant({ price: 0, size: "", stocks: 0 });
        setColor({ color_code: "#000000", color_name: "", inStock: true });
        setImage('');
        setImages([]);
    };

    const { data: brands, isLoading, isSuccess } = useGetBrandsQuery(undefined);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-4 sm:px-6 py-4 border-b relative">

                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the product details below. All fields marked with * are required.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-20">
                    <div className="space-y-6 py-4">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Product Name *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                            placeholder="Enter product name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="brand">Brand *</Label>

                                        <Select
                                            value={formData.brand}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({ ...prev, brand: value }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Brand" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    brands?.data?.length > 0 && brands.data.map((brand) => (
                                                        <SelectItem key={brand._id} value={brand.name}>
                                                            {brand.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>

                                        {/* <Input
                                            id="brand"
                                            value={formData.brand}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                                            placeholder="Enter brand name"
                                        /> */}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                        placeholder="Enter product description"
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Product Type *</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(value: "phone" | "laptop" | "accessory") =>
                                                setFormData((prev) => ({ ...prev, type: value }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="phone">Phone</SelectItem>
                                                <SelectItem value="laptop">Laptop</SelectItem>
                                                <SelectItem value="accessory">Accessory</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="discount">Discount (%)</Label>
                                        <Input
                                            id="discount"
                                            type="number"
                                            min="0"
                                            max="100"
                                            defaultValue={formData.discount}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, discount: Number(e.target.value) }))}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="featured"
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked as boolean }))}
                                    />
                                    <Label htmlFor="featured">Featured Product</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Product Variants */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                    Product Variants
                                    {/* <Button type="button" onClick={addVariant} size="sm" variant="outline">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Variant
                                    </Button> */}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {variants?.length > 0 && variants?.map((variant, index) => (

                                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                        <div className="space-y-2">
                                            <Label>Size/Storage</Label>
                                            <Input
                                                value={variant.size}
                                                placeholder="e.g., 8/128GB"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Price</Label>
                                            <Input
                                                type="number"
                                                value={variant.price}
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Stock</Label>
                                            <Input
                                                type="number"
                                                value={variant.stocks}
                                                placeholder="0"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            size="sm"
                                            variant="destructive"
                                            className="w-full sm:w-auto"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                ))}

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label>Size/Storage</Label>
                                        <Input
                                            name="size"
                                            value={variant.size}
                                            onChange={(e) => setVariant((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                            placeholder="e.g., 8/128GB"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Price</Label>
                                        <Input
                                            name="price"
                                            value={variant.price}
                                            onChange={(e) => setVariant((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                            type="number"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Stock</Label>
                                        <Input
                                            name="stocks"
                                            value={variant.stocks}
                                            onChange={(e) => setVariant((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                            type="number"
                                            placeholder="0"
                                        />
                                    </div>

                                    <Button
                                        onClick={addVariant}
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        className="w-full sm:w-auto"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>

                        {/* Colors */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                    Available Colors
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {colors?.length > 0 && colors?.map((color, index) => (
                                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                                        <div className="space-y-2">
                                            <Label>Color Name</Label>
                                            <Input
                                                value={color.color_name}
                                                placeholder="e.g., Midnight Black"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Color Code</Label>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <Input
                                                    type="color"
                                                    value={color.color_code}
                                                    className="w-full sm:w-16 h-10 p-1"
                                                />
                                                <Input
                                                    value={color.color_code}
                                                    placeholder="#000000"
                                                    className="flex-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>In Stock</Label>
                                            <div className="flex items-center h-10">
                                                <Checkbox
                                                    checked={color.inStock}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Image</Label>
                                            <Image src={images.filter(img => img.color_name === color.color_name)[0]?.image || ""} alt="Uploaded" width={50} height={50} className="rounded-md border border-gray-400" unoptimized />
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={() => removeColor(index)}
                                            size="sm"
                                            variant="destructive"
                                            className="w-full sm:w-auto"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label>Color Name</Label>
                                        <Input
                                            name="color_name"
                                            onChange={handleColor}
                                            value={color.color_name}
                                            placeholder="e.g., Midnight Black"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Color Code</Label>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <Input
                                                type="color"
                                                name="color_code"
                                                value={color.color_code}
                                                onChange={handleColor}
                                                className="w-full sm:w-16 h-10 p-1"
                                            />
                                            <Input
                                                name="color_code"
                                                value={color.color_code}
                                                onChange={handleColor}
                                                placeholder="#000000"
                                                className="flex-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 col-span-2 gap-x-4 flex justify-around">
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-center gap-y-5">
                                                <Label>In Stock</Label>

                                                <Checkbox
                                                    name="inStock"
                                                    onCheckedChange={(checked) =>
                                                        setColor((prev) => ({ ...prev, inStock: checked as boolean }))
                                                    }
                                                    checked={color.inStock}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {color.color_name && <ProductImageUpload setImage={setImage} />}
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={addColor}
                                        size="sm"
                                        variant="destructive"
                                        className="w-full sm:w-auto"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>

                <DialogFooter className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-2 w-full sm:w-auto">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <AddProductButton product={productData as Product} />
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}