import { NextRequest } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render"; // 1. Importa o renderizador

import RecuperacaoExcluidos from "../../../components/RecuperacaoExcluidos";
import { registraEmailEnviado } from "@/app/utils/gravaHistoricoEnvio";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nome = searchParams.get("nome");
  const email = searchParams.get("email");
  const cota = searchParams.get("grupoCotaVersao");
  const agendado = searchParams.get("agendado");

  if (!nome || !email || !cota) {
    return Response.json(
      { error: "Nome, Email e Cota são obrigatórios" },
      { status: 400 },
    );
  }

  // Constantes para manter o código limpo
  const emailOrigem = "Consórcio Groscon <groscon@consorciogroscon.com.br>";
  const assunto = `${nome} Oportunidade de Recuperação da Cota: ${cota} - Groscon`;
  const templateName = "recuperacaoExcluidos";

  try {
    // 2. Compila o componente React para uma string HTML estática
    const htmlContent = await render(
      <RecuperacaoExcluidos nome={nome} cota={cota} />,
    );

    // 3. Dispara o e-mail usando a propriedade 'html'
    const { data, error } = await resend.emails.send({
      from: emailOrigem,
      to: [email],
      subject: assunto,
      html: htmlContent,
      scheduledAt: agendado || undefined,
    });

    // Se o serviço de e-mail falhar, bloqueia aqui com erro 502 (Bad Gateway)
    if (error || !data?.id) {
      return Response.json(
        { error: "Falha ao enviar e-mail via Resend", details: error },
        { status: 502 },
      );
    }

    // 4. Grava no banco instantaneamente enviando o código-fonte (HTML)
    await registraEmailEnviado({
      id: data.id,
      nome: nome,
      template: templateName,
      email_destino: email,
      email_origem: emailOrigem,
      assunto: assunto,
      html: htmlContent, // Salva o HTML no banco
      agendado: agendado,
    });

    return Response.json(data);
  } catch (error) {
    console.error(
      `Erro crítico ao processar o envio do template ${templateName}:`,
      error,
    );
    // Se o Prisma falhar, o front-end recebe um 500 e sabe que não salvou
    return Response.json(
      {
        error:
          "Erro interno: Falha ao processar e salvar o histórico de envio.",
      },
      { status: 500 },
    );
  }
}
