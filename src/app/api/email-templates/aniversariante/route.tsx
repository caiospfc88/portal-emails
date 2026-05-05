import { NextRequest } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";

import AniversarianteCliente01 from "@/app/components/AniversarianteCliente01";
import AniversarianteCliente02 from "@/app/components/AniversarianteCliente02";
import { AniversarianteTemplate } from "@/app/components/AniversarianteTemplate";
import { registraEmailEnviado } from "@/app/utils/gravaHistoricoEnvio";

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
        // 1. Gera o HTML usando a sintaxe JSX (suportada graças à extensão .tsx)
        const htmlContent = await render(
          <AniversarianteTemplate firstName={nome} />,
        );

        // 2. Envia o e-mail passando a variável de HTML
        const { data, error } = await resend.emails.send({
          from: emailOrigem,
          to: [email],
          subject: assunto,
          html: htmlContent,
          scheduledAt: agendado || undefined,
        });

        if (error || !data?.id) {
          return Response.json(
            { error: "Falha ao enviar e-mail via Resend", details: error },
            { status: 502 },
          );
        }

        // 3. Grava no banco de dados, incluindo o código-fonte HTML estático
        await registraEmailEnviado({
          id: data.id,
          nome: nome,
          template: template,
          email_destino: email,
          email_origem: emailOrigem,
          assunto: assunto,
          html: htmlContent,
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
        const htmlContent = await render(
          <AniversarianteCliente01 nome={nome} />,
        );

        const { data, error } = await resend.emails.send({
          from: emailOrigem,
          to: [email],
          subject: assunto,
          html: htmlContent,
          scheduledAt: agendado || undefined,
        });

        if (error || !data?.id) {
          return Response.json(
            { error: "Falha ao enviar e-mail via Resend", details: error },
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
          html: htmlContent,
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
        const htmlContent = await render(<AniversarianteCliente02 />);

        const { data, error } = await resend.emails.send({
          from: emailOrigem,
          to: [email],
          subject: assunto,
          html: htmlContent,
          scheduledAt: agendado || undefined,
        });

        if (error || !data?.id) {
          return Response.json(
            { error: "Falha ao enviar e-mail via Resend", details: error },
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
          html: htmlContent,
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
