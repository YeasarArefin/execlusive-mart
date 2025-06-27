import SingleOrder from "@/components/orders/SingleOrder";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useGetOrderQuery } from "@/features/api/apiSlice";
import { Order } from "@/types/types";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { Eye } from "lucide-react";
import { useState } from "react";

export function ViewDetails({ orderId }: { orderId: string; }) {
    const [open, setOpen] = useState(false);
    const { data: orderResponse, isLoading } = useGetOrderQuery(orderId);
    const order = orderResponse?.data as Order;

    if (isLoading) return <div>Loading...</div>;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    className="flex items-center"
                    onSelect={e => {
                        e.preventDefault();
                        setOpen(true);
                    }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View details
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="p-10">
                <DialogHeader>
                    <DialogDescription>
                        <SingleOrder order={order} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

