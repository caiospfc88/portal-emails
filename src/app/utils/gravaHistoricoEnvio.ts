import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RegistraEmailEnviadoT = {
  id: string;
  nome: string;
  template: string;
  email_destino: string;
  email_origem: string;
  assunto: string;
  html: string;
  agendado?: string | null;
};

// NOVO: Função para traduzir o texto do Resend para formato de Data Real do Banco
const converterAgendamentoParaData = (
  agendadoTexto?: string | null,
): string | undefined => {
  if (!agendadoTexto) return undefined;

  // Se já for uma data ISO válida (com 'T' e 'Z'), devolve direto
  if (agendadoTexto.includes("T")) return new Date(agendadoTexto).toISOString();

  const dataAtual = new Date();

  // Mapeia os textos vindos do Select do Front-end
  switch (agendadoTexto.toLowerCase()) {
    case "in 10 minutes":
      dataAtual.setMinutes(dataAtual.getMinutes() + 10);
      break;
    case "in 30 minutes":
      dataAtual.setMinutes(dataAtual.getMinutes() + 30);
      break;
    case "in 2 hours":
      dataAtual.setHours(dataAtual.getHours() + 2);
      break;
    case "in 24 hours":
      dataAtual.setHours(dataAtual.getHours() + 24);
      break;
    case "in 2 days":
      dataAtual.setDate(dataAtual.getDate() + 2);
      break;
    case "in 3 days":
      dataAtual.setDate(dataAtual.getDate() + 3);
      break;
    default:
      // Fallback seguro: se vier algo esquisito, tenta converter normalmente para não estourar Erro 500
      try {
        return new Date(agendadoTexto).toISOString();
      } catch (e) {
        console.error("Data de agendamento inválida:", agendadoTexto, e);
        return undefined;
      }
  }

  // Devolve o cálculo no formato perfeito para o Prisma/MySQL
  return dataAtual.toISOString();
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
      ultimo_evento: "queued", // Por padrão fica na fila
      template: dados.template,
      // Aplica o conversor seguro
      agendado: converterAgendamentoParaData(dados.agendado),
      retornar_para: "",
    },
  });

  return novoEnvio;
};
