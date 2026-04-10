// src/app/utils/gravaHistoricoEnvio.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RegistraEmailEnviadoT = {
  id: string;
  nome: string;
  template: string;
  email_destino: string;
  email_origem: string;
  assunto: string;
  agendado?: string | null;
};

export const registraEmailEnviado = async (dados: RegistraEmailEnviadoT) => {
  const novoEnvio = await prisma.envio.create({
    data: {
      id_email_enviado: dados.id,
      nome: dados.nome,
      email_destino: dados.email_destino,
      email_origem: dados.email_origem,
      data_envio: new Date().toISOString(), // Usa a data/hora atual exata do servidor
      assunto: dados.assunto,
      html: "Template React", // Evite salvar HTML gigante no banco para não travar consultas futuras
      ultimo_evento: "queued", // Todo e-mail recém enviado nasce na fila
      template: dados.template,
      agendado: dados.agendado
        ? new Date(dados.agendado).toISOString()
        : undefined,
      retornar_para: "",
    },
  });

  return novoEnvio;
};
