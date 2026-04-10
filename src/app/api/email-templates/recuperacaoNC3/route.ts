import RecuperacaoNC3 from "@/app/components/RecuperacaoNC3";
import { registraEmailEnviado } from "@/app/utils/gravaHistoricoEnvio";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nome = searchParams.get("nome");
  const email = searchParams.get("email");
  const cota = searchParams.get("grupoCotaVersao");
  const agendado = searchParams.get("agendado");

  console.log("Params: ", nome, email, cota);

  if (!nome || !email || !cota) {
    return Response.json(
      { error: "Nome, Email e Cota são obrigatórios" },
      { status: 400 },
    );
  }

  // Define as constantes para manter o código limpo e reaproveitável na hora de salvar
  const emailOrigem = "Consórcio Groscon <groscon@consorciogroscon.com.br>";
  const assunto = `${nome} Tem parcelas da cota ${cota} em atraso - Groscon`;
  const templateName = "recuperacaoNC3";

  try {
    // 1. Tenta enviar o e-mail
    const { data, error } = await resend.emails.send({
      from: emailOrigem,
      to: [email],
      subject: assunto,
      react: RecuperacaoNC3({
        nome: nome,
        cota: cota,
      }),
      scheduledAt: agendado || undefined,
    });

    // Se o Resend falhar por algum motivo (ex: quota excedida, erro de API)
    if (error || !data?.id) {
      return Response.json(
        { error: "Falha ao enviar e-mail via Resend", details: error },
        { status: 502 },
      );
    }

    // 2. Tenta gravar no banco passando todos os parâmetros (Evitando a condição de corrida)
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
    // 3. Se a gravação no banco falhar, o Front-end é notificado com o Status 500
    return Response.json(
      {
        error:
          "Erro interno: Falha ao processar e salvar o histórico de envio.",
      },
      { status: 500 },
    );
  }
}
