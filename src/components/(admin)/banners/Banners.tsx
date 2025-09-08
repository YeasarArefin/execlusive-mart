"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDeleteBannerMutation, useGetBannersQuery } from "@/features/api/apiSlice";
import { Banner } from "@/types/types";
import Image from "next/image";
import banner1 from '../../../../public/banner.png';
import banner2 from '../../../../public/banner2.png';
import banner3 from '../../../../public/banner3.png';
import AddBanner from "./AddBanner";
import BannersLoading from "./BannersLoading";

export default function Banners() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isSuccess, isLoading } = useGetBannersQuery(undefined);
    const [deleteBanner] = useDeleteBannerMutation();

    useEffect(() => {
        setBanners(data?.data);
    }, [data, isSuccess]);

    const filteredBanners = useMemo(() => {
        return banners?.filter((banner) => {
            const matchesSearch = banner.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [banners, searchTerm]);

    const handleDelete = async (id: string) => {
        try {
            await deleteBanner(id).unwrap();
        } catch (error) {
            console.error("Failed to delete banner:", error);
        }
    };

    if (isLoading) {
        return (
            <BannersLoading />
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md">
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
                        <p className="text-gray-500 mt-1">Manage your banner inventory</p>
                    </div>
                    <AddBanner />
                </div>

                {/* Filters and Search */}
                <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search banners..."
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

                {/* Banners Table */}
                {/* Static preview: show banner 1, 2, 3 */}
                <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Current Hero Banners</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[banner1, banner2, banner3].map((img, idx) => (
                                <div key={idx} className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                                    <Image
                                        src={img}
                                        alt={`Banner ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={idx === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Banners Table */}
                <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Banner</th>
                                    <th className="text-right px-6 py-4 font-medium text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBanners?.map((banner) => (
                                    <tr key={banner._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                    <Image
                                                        src={banner.url || "/placeholder.svg"}
                                                        alt={banner.name}
                                                        width={48}
                                                        height={48}
                                                        className="object-contain w-full h-full p-1"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{banner.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                variant="outline"
                                                className="text-red-600 hover:bg-red-50"
                                                onClick={() => { if (banner._id) handleDelete(banner._id); }}
                                                disabled={!banner._id}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* <tbody className="divide-y divide-gray-100">
                                {filteredBanners?.map((banner) => (
                                    <tr key={banner._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                    <Image
                                                        src={banner.image || "/placeholder.svg"}
                                                        alt={banner.name}
                                                        width={48}
                                                        height={48}
                                                        className="object-contain w-full h-full p-1"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{banner.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                variant="outline"
                                                className="text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(banner._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody> */}
                        </table>
                    </div>
                </div>

                {filteredBanners?.length === 0 && !isLoading && (
                    <div className="border border-gray-100 rounded-xl p-12 text-center shadow-sm">
                        <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-50 rounded-full mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No banners found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search criteria or adding a new banner.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
