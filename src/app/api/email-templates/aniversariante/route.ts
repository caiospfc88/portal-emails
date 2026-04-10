import AniversarianteCliente01 from "@/app/components/AniversarianteCliente01";
import AniversarianteCliente02 from "@/app/components/AniversarianteCliente02";
import { AniversarianteTemplate } from "@/app/components/AniversarianteTemplate";
import { registraEmailEnviado } from "@/app/utils/gravaHistoricoEnvio";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const template = searchParams.get("template");
  const nome = searchParams.get("nome");
  const email = searchParams.get("email");
  const agendado = searchParams.get("agendado");

  // Validação inicial
  if (!template || !nome || !email) {
    return Response.json(
      {
        error:
          "Missing required parameters: template, nome e email são obrigatórios.",
      },
      { status: 400 },
    );
  }

  const emailOrigem = "Consórcio Groscon <groscon@consorciogroscon.com.br>";

  switch (template) {
    case "aniversarianteColaborador": {
      const assunto = "Feliz Aniversário!!!";
      try {
        const { data, error } = await resend.emails.send({
          from: emailOrigem,
          to: [email],
          subject: assunto,
          react: AniversarianteTemplate({ firstName: nome }),
          scheduledAt: agendado || undefined,
        });

        if (error || !data?.id) {
          return Response.json(
            { error: "Falha ao enviar e-mail via Resend" },
            { status: 502 },
          );
        }

        // Grava no banco com os dados que já temos
        await registraEmailEnviado({
          id: data.id,
          nome: nome,
          template: template,
          email_destino: email,
          email_origem: emailOrigem,
          assunto: assunto,
          agendado: agendado,
        });

        return Response.json(data);
      } catch (error) {
        console.error(`Erro ao processar template ${template}:`, error);
        return Response.json(
          { error: "Erro interno ao processar e salvar o envio." },
          { status: 500 },
        );
      }
    }

    case "aniversarianteCliente01": {
      const assunto = "Consórcio Groscon deseja Feliz Aniversário!!!";
      try {
        const { data, error } = await resend.emails.send({
          from: emailOrigem,
          to: [email],
          subject: assunto,
          react: AniversarianteCliente01(),
          scheduledAt: agendado || undefined,
        });

        if (error || !data?.id) {
          return Response.json(
            { error: "Falha ao enviar e-mail via Resend" },
            { status: 502 },
          );
        }

        await registraEmailEnviado({
          id: data.id,
          nome: nome,
          template: template,
          email_destino: email,
          email_origem: emailOrigem,
          assunto: assunto,
          agendado: agendado,
        });

        return Response.json(data);
      } catch (error) {
        console.error(`Erro ao processar template ${template}:`, error);
        return Response.json(
          { error: "Erro interno ao processar e salvar o envio." },
          { status: 500 },
        );
      }
    }

    case "aniversarianteCliente02": {
      const assunto = "Consórcio Groscon deseja Feliz Aniversário!!!";
      try {
        const { data, error } = await resend.emails.send({
          from: emailOrigem,
          to: [email],
          subject: assunto,
          react: AniversarianteCliente02(),
          scheduledAt: agendado || undefined,
        });

        if (error || !data?.id) {
          return Response.json(
            { error: "Falha ao enviar e-mail via Resend" },
            { status: 502 },
          );
        }

        await registraEmailEnviado({
          id: data.id,
          nome: nome,
          template: template,
          email_destino: email,
          email_origem: emailOrigem,
          assunto: assunto,
          agendado: agendado,
        });

        return Response.json(data);
      } catch (error) {
        console.error(`Erro ao processar template ${template}:`, error);
        return Response.json(
          { error: "Erro interno ao processar e salvar o envio." },
          { status: 500 },
        );
      }
    }

    default:
      return Response.json(
        { error: "Template não reconhecido no sistema." },
        { status: 400 },
      );
  }
}
