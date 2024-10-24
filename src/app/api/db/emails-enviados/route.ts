import { formatDate, formatToBrazilTime } from "@/app/utils/formataData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

const prisma = new PrismaClient();

type Envio = {
    id: string,
    nome: string,
    to: string[],
    from: string,
    created_at: string,
    subject: string,
    html: string,
    last_event: string,
    template: string
    scheduled_at: string
    reply_to: string[]
}

export async function POST(request: NextRequest) {
    const dados: Envio = await request.json()
    const novoEnvio = await prisma.envio.create({
        data: {
        id_email_enviado: dados.id,
        nome: dados.nome,
        email_destino: dados.to[0],
        email_origem: dados.from,
        data_envio: dados.created_at.replace(' ', 'T').replace('+00', 'Z'),
        assunto: dados.subject,
        html: dados.html,
        ultimo_evento: dados.last_event,
        template: dados.template,
        agendado: dados.scheduled_at.replace(' ', 'T').replace('+00', 'Z'),
        retornar_para: dados.reply_to[0]
        }
    })
    return NextResponse.json(novoEnvio);
}

export async function GET(request: NextRequest) {
    const searchParams = await request.nextUrl.searchParams
    const dataInicial = await new Date(searchParams.get("dataInicial")!)
    const dataFinal = await new Date(searchParams.get("dataFinal")!)
    
    try {
        const result = await prisma.envio.findMany({
            where: {
                data_envio: {
                    gte: dataInicial,
                    lte: dataFinal
                }
            }
        })

        const resultWithFormattedDate = result.map(item => ({
            ...item,
            data_envio: formatDate(item.data_envio),
            agendado: formatToBrazilTime(item.agendado?.toISOString()),
          }));

        return NextResponse.json(resultWithFormattedDate)
    } catch (error) {
        return NextResponse.json({"Erro": error})
    }
}

export async function PUT(request: NextRequest) {
    const dados = await request.json()
    const result = await resend.emails.get(dados.id_email_enviado)
    try {
        const itemAtualizado = await prisma.envio.update({
            where: {
                id_email_enviado: result.data?.id,
            },
            data: {
                ultimo_evento: result.data?.last_event
            }
        })
        return NextResponse.json(itemAtualizado);
    } catch (error) {
        return NextResponse.json(error)
    }
    
}