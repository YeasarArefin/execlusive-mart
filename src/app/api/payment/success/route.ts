import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const trans_id = req.nextUrl.searchParams.get("trx_id");
    try {
        return NextResponse.redirect(`http://localhost:3000/payment-success/${trans_id}`, 302);
    } catch (error) {
        return new NextResponse(JSON.stringify(error));
    }
}