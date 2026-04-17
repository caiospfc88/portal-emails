import { formatDate, formatToBrazilTime } from "@/app/utils/formataData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // 1. Removido os 'await' desnecessários
  const searchParams = request.nextUrl.searchParams;
  const emailRaw = searchParams.get("email");

  // 2. Validação de Segurança real (Substitui o "!" perigoso)
  if (!emailRaw) {
    return NextResponse.json(
      { error: "O parâmetro 'email' é obrigatório." },
      { status: 400 },
    );
  }

  // Limpeza contra espaços invisíveis
  const email = emailRaw.trim();

  try {
    const result = await prisma.envio.findMany({
      select: {
        id_email_enviado: true, // <-- ESSENCIAL para a rota de atualizar (PUT)
        nome: true,
        email_destino: true,
        email_origem: true,
        data_envio: true,
        assunto: true,
        ultimo_evento: true,
        template: true,
        agendado: true,
        html: true, // <-- ESSENCIAL para o botão de visualizar template (TbTemplate)
      },
      where: {
        email_destino: {
          equals: email,
        },
      },
      orderBy: {
        data_envio: "desc",
      },
    });

    const resultWithFormattedDate = result.map((item) => ({
      ...item,
      data_envio: formatDate(item.data_envio),
      agendado: item.agendado
        ? formatToBrazilTime(item.agendado.toISOString())
        : null,
    }));

    return NextResponse.json(resultWithFormattedDate);
  } catch (error) {
    console.error("Erro na rota emails-por-contato:", error);
    // 3. Devolve o status 500 de forma correta
    return NextResponse.json(
      { error: "Erro interno ao buscar os e-mails do contato." },
      { status: 500 },
    );
  }
}
