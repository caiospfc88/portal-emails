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
    reply_to: string
}

export async function POST(request: NextRequest) {
    const dados: Envio = await request.json()
    console.log("dados: ", dados)
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
        retornar_para: dados.reply_to
        }
    })
    return NextResponse.json(novoEnvio);
}

