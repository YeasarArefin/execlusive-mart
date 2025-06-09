import calculateTotalAmount from "@/lib/calculateTotalAmount";
import generateTransactionId from "@/lib/generateTransactionId";
import { dataConfig, sslConfig } from "@/lib/sslConfig";
import { PaymentData, SSLResponse } from "@/types/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const paymentData = await request.json() as PaymentData;
        const { name, email, address, city, phone, couponCode, postCode } = paymentData;
        let transactionId = generateTransactionId();
        const { totalAmount } = await calculateTotalAmount(email, couponCode);
        console.log("🚀 ~ POST ~ totalAmount:", totalAmount);

        const data = dataConfig({
            total_amount: totalAmount,
            tran_id: transactionId,
            success_url: `http://localhost:3000/api/payment/success?trx_id=${transactionId}`,
            fail_url: `http://localhost:3000/api/payment/fail`,
            cancel_url: `http://localhost:3000/api/payment/cancel`,
            product_name: "Order from Exclusive Mart",
            product_category: "electronics",
            cus_name: name,
            cus_email: email,
            cus_add1: address,
            cus_phone: phone,
        });

        const result: SSLResponse = await sslConfig.init(data);

        if (!result.GatewayPageURL || result.status === "FAILED") {
            console.error("Payment failed:", result.failedreason);
            return NextResponse.json({ message: result.failedreason }, { status: 400 });
        } else if (result.status === "SUCCESS") {
            console.log("Payment gateway URL generated:", result.GatewayPageURL ? "yes" : "no");

            cookies().set('checkout_data', JSON.stringify({
                name,
                email,
                address,
                city,
                postCode,
                phone,
                couponCode,
                transactionId,
                finalAmount: totalAmount
            }), { maxAge: 10 * 60 });

            return NextResponse.json({ url: result.GatewayPageURL });
        }
    } catch (error) {
        console.error("Payment request error:", error);
        return NextResponse.json({ message: "Error processing payment" }, { status: 500 });
    }
}