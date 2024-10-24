import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";


const resend = new Resend(process.env.RESEND_API_KEY);

const prisma = new PrismaClient();

type RegistraEmailEnviadoT ={
    id: string;
    nome: string;
    template: string;
}

export const registraEmailEnviado = async ({id,nome,template}: RegistraEmailEnviadoT) => {
    const result = await resend.emails.get(id)
    const novoEnvio = await prisma.envio.create({
        data: {
        id_email_enviado: result.data?.id!,
        nome: nome,
        email_destino: result.data?.to[0]!,
        email_origem: result.data?.from!,
        data_envio: result.data?.created_at.replace(' ', 'T').replace('+00', 'Z')!,
        assunto: result.data?.subject!,
        html: result.data?.html,
        ultimo_evento: result.data?.last_event!,
        template: template,
        agendado: result.data?.scheduled_at?.replace(' ', 'T').replace('+00', 'Z'),
        retornar_para: result.data?.reply_to == null ? "" :  result.data?.reply_to[0]
        }
        
    })
    return novoEnvio

}