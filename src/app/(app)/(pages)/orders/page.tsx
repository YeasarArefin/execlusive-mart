import Heading from "@/components/home/Heading";
import OrdersDisplay from "@/components/orders/Orders";

export default function OrdersPage() {
    return <div>
        <div className="mb-10">
            <Heading name="Orders" title="Products you have ordered" />
        </div>
        <div>
            <OrdersDisplay />
        </div>
    </div>;
}
