import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  console.log("chegou aqui com id: ", id);

  if (!id) {
    return NextResponse.json(
      { error: "O ID do e-mail é obrigatório." },
      { status: 400 },
    );
  }

  try {
    // Busca no banco apenas a coluna HTML para economizar banda
    const emailEnviado = await prisma.envio.findFirst({
      where: { id_email_enviado: id },
      select: {
        html: true,
        ultimo_evento: true, // <--- ADICIONAMOS ISTO AQUI
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
    console.error("Erro ao buscar HTML do e-mail:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
