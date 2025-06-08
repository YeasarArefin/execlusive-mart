"use client";

import { Eye, MoreVertical, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AddBrand } from "@/components/(admin)/brands/AddBrand";
import BrandsLoading from "@/components/(admin)/brands/BrandsLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useGetBrandsQuery } from "@/features/api/apiSlice";
import { Brand } from "@/types/types";
import Image from "next/image";
import { DeleteBrand } from "./DeleteBrand";
import { UpdateBrand } from "./UpdateBrand";

export default function Brands() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isSuccess, isLoading } = useGetBrandsQuery(undefined);

    useEffect(() => {
        setBrands(data?.data);
    }, [data, isSuccess]);


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
        <div className="bg-white rounded-xl shadow-md">
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
                        <p className="text-gray-500 mt-1">Manage your brand inventory</p>
                    </div>
                    <AddBrand />
                </div>

                {/* Filters and Search */}
                <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search brands..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-gray-200 focus:border-primary_red focus:ring-primary_red/20 rounded-lg"
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
                <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Brand</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Types</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Created</th>
                                    <th className="text-right px-6 py-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBrands?.map((brand) => (
                                    <tr key={brand._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                    <Image
                                                        src={brand.image || "/placeholder.svg"}
                                                        alt={brand.name}
                                                        width={48}
                                                        height={48}
                                                        className="object-contain w-full h-full p-1"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{brand.name}</p>
                                                    <p className="text-sm text-gray-500">{brand.type.length} product types</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {brand.type.map((type) => {
                                                    const getTypeColor = (type: string) => {
                                                        switch (type) {
                                                            case "phone":
                                                                return "bg-blue-50 text-blue-600 border-blue-100";
                                                            case "laptop":
                                                                return "bg-green-50 text-green-600 border-green-100";
                                                            case "accessory":
                                                                return "bg-purple-50 text-purple-600 border-purple-100";
                                                            default:
                                                                return "bg-gray-50 text-gray-600 border-gray-100";
                                                        }
                                                    };

                                                    return (
                                                        <Badge key={type} variant="outline" className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getTypeColor(type)}`}>
                                                            {type}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {brand.createdAt ? new Date(brand.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }) : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[160px] p-2">
                                                    <DropdownMenuItem className="cursor-pointer flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                                                        <Eye className="h-4 w-4 mr-2 text-gray-500" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <UpdateBrand brand={brand} />
                                                    <DeleteBrand brand={brand} />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredBrands?.length === 0 && !isLoading && (
                    <div className="border border-gray-100 rounded-xl p-12 text-center shadow-sm">
                        <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-50 rounded-full mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search criteria or adding a new brand.</p>
                    </div>
                )}
            </div>
        </div>
    );
}