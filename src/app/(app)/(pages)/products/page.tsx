'use client';
import Product from "@/components/home/Explore/Product";
import ProductLoader from "@/components/product/ProductLoader";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { useGetBrandsQuery, useGetProductsCountQuery, useGetProductsQuery } from "@/features/api/apiSlice";
import usePagination from "@/hooks/usePagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDebounceCallback } from 'usehooks-ts';

export default function Page() {
    const router = useRouter();
    const [brandFilters, setBrandFilters] = useState<string[]>([]);
    const [typeFilters, setTypeFilters] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const searchParams = useSearchParams();

    const { data: pdCount } = useGetProductsCountQuery({});
    const productCount = pdCount?.data || 0;
    const { currentPage, handleItemPerPageChange, handleNextPage, handlePreviousPage, itemsPerPage, pages, setCurrentPage, setItemsPerPage } = usePagination({ totalItems: productCount });
    const { data: brands, isSuccess: isBrandsSuccess, isLoading: isBrandsLoading } = useGetBrandsQuery({});
    console.log(brands);

    // filtering
    const handleBrandBox = (brand: string, checked: boolean) => {
        if (checked) {
            setBrandFilters((prev) => [...prev, brand]);
        } else {
            setBrandFilters((prev) => prev.filter((filter) => filter !== brand));
        }
    };

    const handleTypeBox = (type: string, checked: boolean) => {
        if (checked) {
            setTypeFilters((prev) => [...prev, type]);
        } else {
            setTypeFilters((prev) => prev.filter((filter) => filter !== type));
        }
    };

    const debounced = useDebounceCallback(setName, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        debounced(name);
    };

    useEffect(() => {
        const brandQuery = searchParams.get('brand');
        const typeQuery = searchParams.get('type');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');

        if (brandQuery) setBrandFilters(brandQuery.split(','));
        if (typeQuery) setTypeFilters(typeQuery.split(','));
        if (page) setCurrentPage(parseInt(page));
        if (limit) setItemsPerPage(parseInt(limit));
    }, [searchParams, setCurrentPage, setItemsPerPage]);

    const brandQuery = brandFilters.length > 0 ? `brand=${brandFilters.join(',')}&` : '';
    const typeQuery = typeFilters.length > 0 ? `type=${typeFilters.join(',')}&` : '';
    let query = [brandQuery, typeQuery].filter(Boolean).join('&');

    if (name.length > 0) {
        query = query ? `${query}&name=${name}` : `name=${name}&`;
    }

    query += `page=${currentPage}&limit=${itemsPerPage}`;

    const { data: products, isLoading, isSuccess } = useGetProductsQuery(query); // Use RTK Query


    useEffect(() => {
        router.push(`?${query}`, undefined);
    }, [brandFilters, typeFilters, name, currentPage, itemsPerPage, router, query]);

    let content;
    if (isLoading) {
        content = <ProductLoader count={itemsPerPage} />;
    }
    if (!isLoading && isSuccess) {
        content = <>
            {isSuccess && <h1 className="px-4 mb-2">Items Found : <span className="text-primary_red font-semibold">{products?.data.length || 0}</span></h1>}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {isLoading && <div>Loading...</div>}
                {products?.data?.length == 0 && <h1>No Items</h1>}
                {products?.data?.length > 0 && products?.data.map(pd => <Product key={pd._id} product={pd} />)}
            </div>
            {isSuccess && <div className="flex justify-center my-20">
                <div className="flex flex-col">
                    <h1 className="text-center mb-5">Current Page : <span className="text-primary_red font-semibold">{currentPage}</span></h1>

                    <Pagination totalItems={productCount} currentPage={currentPage} handleItemPerPageChange={handleItemPerPageChange} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} itemsPerPage={itemsPerPage} pages={pages} setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} />

                </div>
            </div>}
        </>;
    }

    return (
        <div>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 lg:gap-5">
                    <div className="col-span-1">
                        <div className="mb-4">
                            <div className="relative">
                                <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Brands</h3>
                            <div className="space-y-2">
                                {
                                    isBrandsSuccess && brands?.data.map(brand => (
                                        <div key={brand._id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`brand-${brand._id}`}
                                                checked={brandFilters.includes(brand.name)}
                                                onCheckedChange={(checked) => handleBrandBox(brand.name, checked as boolean)}
                                            />
                                            <label
                                                htmlFor={`brand-${brand._id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {brand.name}
                                            </label>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Types</h3>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="type-phone"
                                        checked={typeFilters.includes('phone')}
                                        onCheckedChange={(checked) => handleTypeBox('phone', checked as boolean)}
                                    />
                                    <label
                                        htmlFor="type-phone"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Phone
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="type-laptop"
                                        checked={typeFilters.includes('laptop')}
                                        onCheckedChange={(checked) => handleTypeBox('laptop', checked as boolean)}
                                    />
                                    <label
                                        htmlFor="type-laptop"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Laptop
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="type-accessory"
                                        checked={typeFilters.includes('accessory')}
                                        onCheckedChange={(checked) => handleTypeBox('accessory', checked as boolean)}
                                    />
                                    <label
                                        htmlFor="type-accessory"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Accessory
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-span-3">
                        {content}
                    </div>

                </div>
            </div>
        </ div>
    );
};