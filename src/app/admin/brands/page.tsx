"use client";

import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AddBrand } from "@/components/(admin)/brands/AddBrand";
import BrandsLoading from "@/components/(admin)/brands/BrandsLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Brand } from "@/types/types";
import Image from "next/image";

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // const { data, isSuccess, isLoading } = useGetBrandsQuery(undefined);

    const isSuccess = false;
    const isLoading = false;

    useEffect(() => {
        setBrands([]);
        // setBrands(data?.data);
    }, [isSuccess]);


    const filteredBrands = useMemo(() => {
        return brands?.filter((brand) => {
            const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [brands, searchTerm]);

    if (isLoading) {
        return (
            <BrandsLoading />
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border-gray-200">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Brands</h1>
                        <p className="text-gray-600">Manage your brand inventory</p>
                    </div>
                    <AddBrand />
                </div>

                {/* Filters and Search */}
                <Card className="border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search brands..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-gray-200 focus:border-red-300 focus:ring-red-200"
                                />
                            </div>
                            {searchTerm && (
                                <Button
                                    variant="outline"
                                    onClick={() => setSearchTerm("")}
                                    className="border-gray-200 hover:bg-gray-50"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Brands Table */}
                <Card className="border-gray-200">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200 bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-medium text-gray-900">Brand</th>
                                        <th className="text-left p-4 font-medium text-gray-900">Types</th>
                                        <th className="text-left p-4 font-medium text-gray-900">Created</th>
                                        <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBrands?.map((brand) => (
                                        <tr key={brand._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={brand.image || "/placeholder.svg"}
                                                            alt={brand.name}
                                                            width={48}
                                                            height={48}
                                                            className="object-contain w-full h-full p-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-black">{brand.name}</p>
                                                        <p className="text-sm text-gray-600">{brand.type.length} product types</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {brand.type.map((type) => {
                                                        const getTypeColor = (type: string) => {
                                                            switch (type) {
                                                                case "phone":
                                                                    return "bg-blue-100 text-blue-800 border-blue-200";
                                                                case "laptop":
                                                                    return "bg-green-100 text-green-800 border-green-200";
                                                                case "accessory":
                                                                    return "bg-purple-100 text-purple-800 border-purple-200";
                                                                default:
                                                                    return "bg-gray-100 text-gray-800 border-gray-200";
                                                            }
                                                        };

                                                        return (
                                                            <Badge key={type} variant="outline" className={getTypeColor(type)}>
                                                                {type}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-900">
                                                {brand.createdAt ? new Date(brand.createdAt).toLocaleDateString() : "N/A"}
                                            </td>
                                            <td className="p-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <div className="flex flex-col gap-0.5">
                                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                            </div>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit Brand
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete Brand
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {filteredBrands?.length === 0 && !isLoading && (
                    <Card className="border-gray-200">
                        <CardContent className="p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <Search className="h-12 w-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                            <p className="text-gray-600">Try adjusting your search criteria.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
