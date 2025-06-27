"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUpdateOrderStatusMutation } from "@/features/api/apiSlice";
import { CartProduct, Order } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ViewDetails } from "./ViewDetails";

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
        case "processing":
            return "bg-blue-100 text-blue-800 hover:bg-blue-100";
        case "shipped":
            return "bg-purple-100 text-purple-800 hover:bg-purple-100";
        case "delivered":
            return "bg-green-100 text-green-800 hover:bg-green-100";
        case "cancelled":
            return "bg-red-100 text-red-800 hover:bg-red-100";
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
};



export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderId",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const orderId = row.getValue("orderId") as string;
            return <div className="font-medium">{orderId || "N/A"}</div>;
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Customer
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            const email = row.original.email;
            return (
                <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-muted-foreground">{email}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "products",
        header: "Products",
        cell: ({ row }) => {
            const products = row.getValue("products") as CartProduct[];
            const totalItems = products.reduce((sum, product) => sum + product.cartQuantity, 0);
            return (
                <div>
                    <div className="font-medium">{totalItems} items</div>
                    <div className="text-sm text-muted-foreground">
                        {products
                            .slice(0, 2)
                            .map((p) => p.name)
                            .join(", ")}
                        {products.length > 2 && ` +${products.length - 2} more`}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = (row.getValue("status") as string) || "pending";
            return <Badge className={`${getStatusColor(status)} shadow-none rounded-full`}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
        },
    },
    {
        accessorKey: "paidAmount",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = row.getValue("paidAmount") as number;
            const discount = row.original.discount || 0;
            return (
                <div className="text-left">
                    <div className="font-medium">${amount?.toFixed(2) || "0.00"}</div>
                    {discount > 0 && <div className="text-sm text-green-600">-${discount.toFixed(2)} discount</div>}
                </div>
            );
        },
    },
    {
        accessorKey: "city",
        header: "Location",
        cell: ({ row }) => {
            const city = row.getValue("city") as string;
            const postCode = row.original.postCode;
            return (
                <div className="text-sm">
                    <div>{city}</div>
                    <div className="text-muted-foreground">{postCode}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "usedCoupon",
        header: "Coupon",
        cell: ({ row }) => {
            const coupon = row.getValue("usedCoupon") as string;
            return coupon ? <Badge variant="outline">{coupon}</Badge> : <span className="text-muted-foreground">None</span>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const order = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

            const handleStatusUpdate = async (newStatus: string) => {
                try {
                    await updateOrderStatus({
                        _id: order._id || "",
                        status: newStatus,
                        orderId: order.orderId,
                        email: order.email
                    }).unwrap();
                } catch (error) {
                    console.error("Error updating order status:", error);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.orderId || "")}>
                            Copy order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ViewDetails orderId={order.orderId || ""} />
                        <DropdownMenuSeparator />
                        {/* Dynamic status update buttons with mutation */}
                        {order.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate("processing")}>
                                Mark as Processing
                            </DropdownMenuItem>
                        )}

                        {order.status === "processing" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate("shipped")}>
                                Mark as Shipped
                            </DropdownMenuItem>
                        )}

                        {order.status === "shipped" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate("delivered")}>
                                Mark as Delivered
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
