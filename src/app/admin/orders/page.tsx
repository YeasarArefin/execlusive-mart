'use client';
import { columns } from "@/components/(admin)/orders/Columns";
import { DataTable } from "@/components/(admin)/orders/DataTable";
import { useGetOrderCountQuery, useGetOrdersQuery } from "@/features/api/apiSlice";
import usePagination from "@/hooks/usePagination";
import { Order } from "@/types/types";
import { useState } from "react";


export default function OrdersPage() {
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Order[] | null>(null);

    const { data: orderCount } = useGetOrderCountQuery({});

    const {
        currentPage,
        handleItemPerPageChange,
        handleNextPage,
        handlePreviousPage,
        itemsPerPage,
        pages,
        setCurrentPage,
        setItemsPerPage,
        PaginationComponent
    } = usePagination({
        totalItems: orderCount?.data || 0,
        disabled: isSearching
    });

    const { data: ordersResponse, isLoading, isError, isSuccess } = useGetOrdersQuery(
        `limit=${itemsPerPage}&page=${currentPage}`,
        { skip: isSearching }
    );

    const orders = ordersResponse?.data as Order[] || [];

    const handleSearch = (searchedOrders: Order[]) => {
        if (searchedOrders && searchedOrders.length > 0) {
            setIsSearching(true);
            setSearchResults(searchedOrders);
        } else if (searchedOrders && searchedOrders.length === 0) {
            setIsSearching(false);
            setSearchResults(null);
        }
    };

    // Use regular data when not searching, sample data as fallback
    const displayData = isSearching
        ? (searchResults || [])
        : (isLoading ? [] : orders);



    return (
        <div className="py-10">
            <div>
                <h1 className="text-2xl font-bold text-black">Orders</h1>
                <p className="text-gray-600">Manage your customer orders</p>
            </div>
            {isLoading ? <h1>Loading...</h1> : <DataTable
                columns={columns}
                data={displayData}
                onSearch={handleSearch}
            />}
            {!isSearching && (
                <div className="flex justify-center pt-10">
                    <PaginationComponent />
                </div>
            )}
        </div>
    );
}
