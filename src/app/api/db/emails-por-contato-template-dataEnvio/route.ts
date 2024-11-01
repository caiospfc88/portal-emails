import { formatDate, formatToBrazilTime } from "@/app/utils/formataData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email");
    const dataEnvioParam = searchParams.get("data_envio");
    const templateParam = searchParams.get("template");
    console.log("Params: ", email, dataEnvioParam, templateParam)
    if (!email) {
        return NextResponse.json({ error: "Email é um parametro obrigatório, nenhum resultado encontrado!" }, { status: 400 });
    }

    let dataInicio: Date | undefined;
    let dataFim: Date | undefined;

    // Processa o parâmetro `data_envio` para ignorar o horário
    if (dataEnvioParam) {
        dataInicio = new Date(`${dataEnvioParam}T00:00:00`);
        dataFim = new Date(`${dataEnvioParam}T23:59:59`);
        console.log("datas: ", dataInicio,dataFim)
        if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
            return NextResponse.json({ error: "Invalid data_envio format" }, { status: 400 });
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
                agendado: true
            },
            where: {
                email_destino: {
                    equals: email,
                },
                data_envio: dataInicio && dataFim ? {
                    gte: dataInicio,
                    lt: dataFim
                } : undefined,
                template: templateParam || undefined
            },
            orderBy: {
                data_envio: 'desc',  // Ordena pela data de criação em ordem decrescente
              },
        })

        const resultWithFormattedDate = result.map((item: typeof result[0]) => ({
            ...item,
            data_envio: formatDate(item.data_envio),
            agendado: item.agendado ? formatToBrazilTime(item.agendado.toISOString()) : null
        }))
        
        return NextResponse.json(resultWithFormattedDate)
    } catch (error) {
        console.error("Erro ao buscar envios:", error);
        return NextResponse.json({"Erro": error})
    }
}