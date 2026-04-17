import { formatDate, formatToBrazilTime } from "@/app/utils/formataData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

type Envio = {
  id: string;
  nome: string;
  to: string[];
  from: string;
  created_at: string;
  subject: string;
  html: string;
  last_event: string;
  template: string;
  scheduled_at?: string | null; // Marcado como opcional
  reply_to?: string[] | null;
};

export async function POST(request: NextRequest) {
  try {
    const dados: Envio = await request.json();

    const novoEnvio = await prisma.envio.create({
      data: {
        id_email_enviado: dados.id,
        nome: dados.nome,
        email_destino: dados.to[0],
        email_origem: dados.from,
        // Garantia contra falhas se a data não vier no formato esperado
        data_envio: dados.created_at
          ? dados.created_at.replace(" ", "T").replace("+00", "Z")
          : new Date().toISOString(),
        assunto: dados.subject,
        html: dados.html,
        ultimo_evento: dados.last_event,
        template: dados.template,
        // PERIGO 2 RESOLVIDO: Só aplica o replace se scheduled_at existir
        agendado: dados.scheduled_at
          ? dados.scheduled_at.replace(" ", "T").replace("+00", "Z")
          : null,
        retornar_para:
          dados.reply_to && dados.reply_to.length > 0 ? dados.reply_to[0] : "",
      },
    });
    return NextResponse.json(novoEnvio);
  } catch (error) {
    console.error("Erro no POST emails-enviados:", error);
    return NextResponse.json(
      { Erro: "Falha ao gravar envio" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams; // Removido o await desnecessário
  const paramInicial = searchParams.get("dataInicial");
  const paramFinal = searchParams.get("dataFinal");

  if (!paramInicial || !paramFinal) {
    return NextResponse.json(
      { error: "Parâmetros de data são obrigatórios" },
      { status: 400 },
    );
  }

  // PERIGO 1 RESOLVIDO: Crava o fuso horário UTC (T00:00:00.000Z) para pegar o dia inteiro exato
  const dataInicial = new Date(`${paramInicial}T00:00:00.000Z`);
  const dataFinal = new Date(`${paramFinal}T23:59:59.999Z`);

  try {
    const result = await prisma.envio.findMany({
      where: {
        data_envio: {
          gte: dataInicial,
          lte: dataFinal,
        },
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
    console.error("Erro no GET emails-enviados:", error);
    return NextResponse.json({ Erro: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const dados = await request.json();

    if (!dados.id_email_enviado) {
      return NextResponse.json(
        { error: "ID do email é obrigatório" },
        { status: 400 },
      );
    }

    const result = await resend.emails.get(dados.id_email_enviado);

    // PERIGO 3 RESOLVIDO: Trava de segurança para ver se o Resend achou o e-mail
    if (result.error || !result.data) {
      return NextResponse.json(
        { error: "E-mail não encontrado no Resend" },
        { status: 404 },
      );
    }

    const itemAtualizado = await prisma.envio.update({
      where: {
        id_email_enviado: result.data.id,
      },
      data: {
        ultimo_evento: result.data.last_event,
      },
    });

    return NextResponse.json(itemAtualizado);
  } catch (error) {
    console.error("Erro no PUT emails-enviados:", error);
    return NextResponse.json({ Erro: error }, { status: 500 });
  }
}
