"use client";

import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

import AdminProductLoader from "@/components/(admin)/products/AdminProductLoader";
import FilterAndSearch from "@/components/(admin)/products/FilterAndSearch";
import GridView from "@/components/(admin)/products/GridView";
import ListView from "@/components/(admin)/products/ListView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import { useGetProductsCountQuery, useGetProductsQuery } from "@/features/api/apiSlice";
import usePagination from "@/hooks/usePagination";
import { Product as ProductType } from "@/types/types";

export default function ProductsPage() {
    // const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showAllProductStatus, setShowAllProductStatus] = useState(true);

    const { data: pdCount } = useGetProductsCountQuery({});
    const productCount = pdCount?.data || 0;


    const { currentPage, handleItemPerPageChange, handleNextPage, handlePreviousPage, itemsPerPage, pages, setCurrentPage, setItemsPerPage } = usePagination({ totalItems: productCount });


    const [query, setQuery] = useState(`limit=${itemsPerPage}&type=${filterType}&page=${currentPage}&limit=${itemsPerPage}`);
    const { data: response, isError, isLoading, isSuccess, refetch } = useGetProductsQuery(query, {});
    const products = response?.data as ProductType[];


    // changing the query whenever the currentPage, filterType, or itemsPerPage changes
    useEffect(() => {
        setQuery(`limit=${itemsPerPage}&type=${filterType}&page=${currentPage}`);
        setShowAllProductStatus(false);
    }, [currentPage, filterType, itemsPerPage]);

    const handleProductSearch = () => {
        // Remove any existing &name= from the query
        let newQuery = query.replace(/(&)?name=[^&]*/g, "");

        // Add the new search term if it's not empty
        if (searchTerm.trim()) {
            newQuery += `&name=${encodeURIComponent(searchTerm.trim())}`;
        }
        setQuery(newQuery);
    };

    const clearFilters = () => {
        let newQuery = `limit=${itemsPerPage}&type=${filterType}&page=${currentPage}`;
        setQuery(newQuery);
        refetch();
        setSearchTerm("");
    };


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

    if (isLoading) {
        return (
            <AdminProductLoader />
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-black">Products</h1>
                    <p className="text-gray-600">Manage your product inventory</p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {/* Filters and Search */}
            <FilterAndSearch clearFilters={clearFilters} filterType={filterType} handleProductSearch={handleProductSearch} searchTerm={searchTerm} setFilterType={setFilterType} setSearchTerm={setSearchTerm} setViewMode={setViewMode} viewMode={viewMode} />


            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Products</p>
                                <p className="text-2xl font-bold text-black">{products.length}</p>
                            </div>
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Featured</p>
                                <p className="text-2xl font-bold text-black">{products.filter((p) => p.featured).length}</p>
                            </div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">On Discount</p>
                                <p className="text-2xl font-bold text-black">{products.filter((p) => p.discount > 0).length}</p>
                            </div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Current Page</p>
                                <p className="text-2xl font-bold text-black">{currentPage + " of " + pages.length}</p>
                            </div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Products Grid/List */}
            {
                viewMode === "grid" ? <GridView products={products} getTypeColor={getTypeColor} /> : <ListView products={products} getTypeColor={getTypeColor} />
            }

            {products.length === 0 && !isLoading && (
                <Card className="border-gray-200">
                    <CardContent className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                </Card>
            )}
            {/* pagination */}
            {isSuccess && <div className="flex justify-center my-20">
                <div className="flex flex-col">

                    <Pagination currentPage={currentPage} handleItemPerPageChange={handleItemPerPageChange} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} itemsPerPage={itemsPerPage} pages={pages} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} totalItems={productCount} />

                </div>
            </div>}
        </div>
    );
}