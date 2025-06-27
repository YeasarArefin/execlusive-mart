"use client";

import { Badge } from "@/components/ui/badge";
import { useGetOrderCountQuery, useGetOrdersQuery } from "@/features/api/apiSlice";
import usePagination from "@/hooks/usePagination";
import { Order } from "@/types/types";
import SingleOrder from "./SingleOrder";
import SingleOrderSkeleton from "./SingleOrderSkeleton";

interface OrderProduct {
    _id: string;
    name: string;
    price: number;
    image?: string;
    quantity?: number;
}



export default function OrdersDisplay() {
    const { data: orderCount } = useGetOrderCountQuery({});

    const { currentPage, handleItemPerPageChange, handleNextPage, handlePreviousPage, itemsPerPage, pages, setCurrentPage, setItemsPerPage, PaginationComponent } = usePagination({ totalItems: orderCount?.data || 0 });

    const { data: ordersResponse, isLoading, isError, isSuccess } = useGetOrdersQuery(`limit=${itemsPerPage}&page=${currentPage}`);
    const orders = ordersResponse?.data as Order[] || [];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">My Orders</h1>
                <Badge variant="secondary" className="text-xs bg-primary_red text-white hover:bg-primary_red">
                    {isLoading ? "Loading..." : `${orders.length} ${orders.length === 1 ? "Order" : "Orders"}`}
                </Badge>
            </div>

            <div className="grid gap-4">
                {isLoading ? (
                    // Show skeletons while loading
                    Array(3).fill(0).map((_, index) => (
                        <SingleOrderSkeleton key={index} />
                    ))
                ) : orders.length > 0 ? (
                    // Show orders if available
                    orders.map((order: Order) => (
                        <SingleOrder key={order._id} order={order} />
                    ))
                ) : (
                    // Show message if no orders
                    <div className="text-center py-8 bg-muted/30 rounded-lg">
                        <p className="text-muted-foreground">No orders found</p>
                    </div>
                )}
            </div>

            {orders.length > 0 && !isLoading && (
                <div className="mt-4 flex justify-center">
                    <PaginationComponent />
                </div>
            )}
        </div>
    );
}
