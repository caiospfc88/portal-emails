import { renderizaTemplate } from "@/app/utils/renderizaTemplate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = await request.nextUrl.searchParams
    const template = await searchParams.get("template")!

    const response = await renderizaTemplate(template)
    return NextResponse.json(response)
}