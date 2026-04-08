import { renderizaTemplate } from "@/app/utils/renderizaTemplate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = await request.nextUrl.searchParams;
  const template = await searchParams.get("template")!;

  if (!template) {
    return NextResponse.json(
      { error: "Parâmetro template é obrigatório" },
      { status: 400 },
    );
  }

  const response = await renderizaTemplate(template);

  // Retorna erro 404 se a função renderizaTemplate retornar vazio (caiu no default)
  if (!response) {
    return NextResponse.json(
      { error: "Template não encontrado" },
      { status: 404 },
    );
  }
  return NextResponse.json(response);
}
