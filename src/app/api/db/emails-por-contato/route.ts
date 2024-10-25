import { formatDate, formatToBrazilTime } from "@/app/utils/formataData";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = await request.nextUrl.searchParams
    const email = await searchParams.get("email")!    
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
                }
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
        return NextResponse.json({"Erro": error})
    }
}