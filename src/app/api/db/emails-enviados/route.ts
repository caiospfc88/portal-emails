import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const dados = await request.json()
    const novoEnvio = await prisma.envios.create({
        data: {
        id_email_enviado: dados.id,
        nome_destinatario: dados.nome,
        email_destino: dados.to,
        email_origem: dados.from,
        data_envio: dados.created_at,
        assunto: dados.subject,
        html: dados.html,
        ultimo_evento: dados.last_event,
        template: dados.template
        }
    })
    return NextResponse.json(novoEnvio)
}
