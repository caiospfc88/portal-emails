import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
    const searchParams = await request.nextUrl.searchParams
    const id = await searchParams.get("id")!
    const result = await resend.emails.get(id)
    return NextResponse.json(result.data)
}