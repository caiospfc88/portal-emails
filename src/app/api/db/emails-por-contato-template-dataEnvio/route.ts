import { formatDate, formatToBrazilTime } from "@/app/utils/formataData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const emailRaw = searchParams.get("email");
  const dataEnvioParam = searchParams.get("data_envio");
  const templateParamRaw = searchParams.get("template");

  // 1. Validação do parâmetro obrigatório
  if (!emailRaw) {
    return NextResponse.json(
      { error: "O parâmetro 'email' é obrigatório." },
      { status: 400 },
    );
  }

  // 2. Limpeza de segurança (Evita falhas por espaços em branco)
  const email = emailRaw.trim();
  const templateParam = templateParamRaw ? templateParamRaw.trim() : undefined;

  let filtroDataEnvio = undefined;

  // 3. Monta o filtro de data com precisão e fuso horário UTC (o "Z" no final)
  if (dataEnvioParam) {
    const dataStr = dataEnvioParam.trim();
    const dataInicio = new Date(`${dataStr}T00:00:00.000Z`);
    const dataFim = new Date(`${dataStr}T23:59:59.999Z`);

    // Proteção extra: só aplica o filtro se as datas criadas forem válidas
    if (!isNaN(dataInicio.getTime()) && !isNaN(dataFim.getTime())) {
      filtroDataEnvio = {
        gte: dataInicio,
        lte: dataFim,
      };
    }
  }

  try {
    const result = await prisma.envio.findMany({
      select: {
        nome: true,
        email_destino: true,
        data_envio: true,
        assunto: true,
        ultimo_evento: true,
        template: true,
        agendado: true,
      },
      where: {
        email_destino: email,
        template: templateParam,
        data_envio: filtroDataEnvio,
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
    console.error("Erro na rota emails-por-contato-template-dataEnvio:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar validação de envio diário." },
      { status: 500 },
    );
  }
}
