import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const idRaw = request.nextUrl.searchParams.get("id");

  if (!idRaw) {
    return NextResponse.json(
      { error: "O ID do e-mail é obrigatório." },
      { status: 400 },
    );
  }

  // Trava de segurança contra espaços invisíveis
  const id = idRaw.trim();
  console.log("chegou aqui com id limpo: ", id);

  try {
    // Busca no banco apenas as colunas necessárias para economizar banda
    const emailEnviado = await prisma.envio.findFirst({
      where: { id_email_enviado: id },
      select: {
        html: true,
        ultimo_evento: true,
      },
    });

    if (!emailEnviado) {
      return NextResponse.json(
        { error: "E-mail não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(emailEnviado);
  } catch (error) {
    console.error("Erro ao buscar HTML/Status do e-mail:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
