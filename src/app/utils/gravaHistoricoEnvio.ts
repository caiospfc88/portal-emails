import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";


const resend = new Resend(process.env.RESEND_API_KEY);

const prisma = new PrismaClient();

type RegistraEmailEnviadoT ={
    id: string | undefined;
    nome: string;
    template: string;
}

export const registraEmailEnviado = async ({id,nome,template}: RegistraEmailEnviadoT) => {

    if (!id) {
        throw new Error('Para buscar as informações no Resend, é necessario o id do email enviado');
    }

    const result = await resend.emails.get(id)

    if (!result.data) {
        throw new Error('Falha na resposta do Resend');
    }
    console.log("retorno Resend: ", result.data)
    const novoEnvio = await prisma.envio.create({
        data: {
        id_email_enviado: result.data.id,
        nome: nome,
        email_destino: result.data.to[0],
        email_origem: result.data.from,
        data_envio: result.data.created_at.replace(' ', 'T').replace('+00', 'Z'),
        assunto: result.data.subject,
        html: result.data.html,
        ultimo_evento: result.data.last_event ? result.data.last_event : "undefined",
        template: template,
        agendado: result.data.scheduled_at
        ? result.data.scheduled_at.replace(' ', 'T').replace('+00', 'Z')
        : undefined,
        retornar_para: result.data.reply_to == null ? "" :  result.data.reply_to[0]
        }
        
    })
    console.log("resultado insert: ", novoEnvio)
    return novoEnvio

}