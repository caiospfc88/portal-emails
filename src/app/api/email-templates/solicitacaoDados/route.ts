import SolicitacaoDados from "@/app/components/SolicitacaoDados";
import { registraEmailEnviado } from "@/app/utils/gravaHistoricoEnvio";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nome = searchParams.get("nome");
  const email = searchParams.get("email");
  const dados = searchParams.get("dadosSolicitados");
  const agendado = searchParams.get("agendado");

  if (!dados || !nome || !email) {
    return Response.json(
      { error: "Nome, Email e Dados Solicitados são obrigatórios" },
      { status: 400 },
    );
  }

  // Constantes padronizadas
  const emailOrigem = "Consórcio Groscon <groscon@consorciogroscon.com.br>";
  const assunto = "Solicitação de dados cadastrais.";
  const templateName = "solicitacaoDados";

  try {
    // 1. Dispara o e-mail
    const { data, error } = await resend.emails.send({
      from: emailOrigem,
      to: [email],
      subject: assunto,
      react: SolicitacaoDados({
        nome: nome,
        dadosSolicitados: dados,
      }),
      scheduledAt: agendado || undefined,
    });

    // Se o serviço de e-mail falhar, bloqueia aqui e avisa o front-end (Status 502)
    if (error || !data?.id) {
      return Response.json(
        { error: "Falha ao enviar e-mail via Resend", details: error },
        { status: 502 },
      );
    }

    // 2. Grava no banco com todos os dados da transação
    await registraEmailEnviado({
      id: data.id,
      nome: nome,
      template: templateName,
      email_destino: email,
      email_origem: emailOrigem,
      assunto: assunto,
      agendado: agendado,
    });

    return Response.json(data);
  } catch (error) {
    console.error(
      `Erro crítico ao processar o envio do template ${templateName}:`,
      error,
    );
    // 3. Se houver falha no Prisma, avisa o front-end (Status 500)
    return Response.json(
      {
        error:
          "Erro interno: Falha ao processar e salvar o histórico de envio.",
      },
      { status: 500 },
    );
  }
}
