import { NextRequest } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render"; // 1. Importa o renderizador

import RecuperacaoNC2 from "@/app/components/RecuperacaoNC2";
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

  // Constantes padronizadas
  const emailOrigem = "Consórcio Groscon <groscon@consorciogroscon.com.br>";
  const assunto = `${nome} Tem parcelas da cota ${cota} em atraso - Groscon`;
  const templateName = "recuperacaoNC2";

  try {
    // 2. Compila o componente React para uma string HTML
    const htmlContent = await render(
      <RecuperacaoNC2 nome={nome} cota={cota} />,
    );

    // 3. Dispara o e-mail usando a propriedade HTML
    const { data, error } = await resend.emails.send({
      from: emailOrigem,
      to: [email],
      subject: assunto,
      html: htmlContent, // Usa a string HTML gerada
      scheduledAt: agendado || undefined,
    });

    // Se o serviço de e-mail falhar, bloqueia aqui e avisa o front-end (Status 502)
    if (error || !data?.id) {
      return Response.json(
        { error: "Falha ao enviar e-mail via Resend", details: error },
        { status: 502 },
      );
    }

    // 4. Grava no banco com todos os dados da transação, incluindo a prova em HTML
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
    // 5. Se houver falha no Prisma, avisa o front-end (Status 500)
    return Response.json(
      {
        error:
          "Erro interno: Falha ao processar e salvar o histórico de envio.",
      },
      { status: 500 },
    );
  }
}
