import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RegistraEmailEnviadoT = {
  id: string;
  nome: string;
  template: string;
  email_destino: string;
  email_origem: string;
  assunto: string;
  html: string; // Exige o HTML completo
  agendado?: string | null;
};

export const registraEmailEnviado = async (dados: RegistraEmailEnviadoT) => {
  const novoEnvio = await prisma.envio.create({
    data: {
      id_email_enviado: dados.id,
      nome: dados.nome,
      email_destino: dados.email_destino,
      email_origem: dados.email_origem,
      data_envio: new Date().toISOString(),
      assunto: dados.assunto,
      html: dados.html, // Grava o código-fonte gigante no MySQL
      ultimo_evento: "queued",
      template: dados.template,
      agendado: dados.agendado
        ? new Date(dados.agendado).toISOString()
        : undefined,
      retornar_para: "",
    },
  });

  return novoEnvio;
};
