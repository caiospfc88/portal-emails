import { formatDate, formatToBrazilTime } from "@/app/utils/formataData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const dataEnvioParam = searchParams.get("data_envio");
  const templateParam = searchParams.get("template");

  // === COLOQUE ISSO AQUI ===
  console.log("===================================");
  console.log("🔍 BUSCANDO NO BANCO:");
  console.log("E-mail:", email);
  console.log("Template:", templateParam);
  console.log("Data (String do Front):", dataEnvioParam);
  console.log("===================================");

  if (!email) {
    return NextResponse.json(
      {
        error: "Email é um parametro obrigatório, nenhum resultado encontrado!",
      },
      { status: 400 },
    );
  }

  let filtroDataEnvio = undefined;

  // Monta o filtro de data com precisão e fuso horário UTC (o "Z" no final)
  if (dataEnvioParam) {
    const dataInicio = new Date(`${dataEnvioParam}T00:00:00.000Z`);
    const dataFim = new Date(`${dataEnvioParam}T23:59:59.999Z`);

    filtroDataEnvio = {
      gte: dataInicio,
      lte: dataFim,
    };
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
        email_destino: {
          equals: email,
        },
        template: templateParam || undefined,
        // Usa o filtro construído acima
        data_envio: filtroDataEnvio,
      },
      orderBy: {
        data_envio: "desc",
      },
    });

    const resultWithFormattedDate = result.map((item: (typeof result)[0]) => ({
      ...item,
      data_envio: formatDate(item.data_envio),
      agendado: item.agendado
        ? formatToBrazilTime(item.agendado.toISOString())
        : null,
    }));

    return NextResponse.json(resultWithFormattedDate);
  } catch (error) {
    console.error("Erro ao buscar envios:", error);
    return NextResponse.json({ Erro: error }, { status: 500 });
  }
}
