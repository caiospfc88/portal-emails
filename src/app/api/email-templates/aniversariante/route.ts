import AniversarianteCliente01 from "@/app/components/AniversarianteCliente01";
import AniversarianteCliente02 from "@/app/components/AniversarianteCliente02";
import { AniversarianteTemplate } from "@/app/components/AniversarianteTemplate";
import { registraEmailEnviado } from "@/app/utils/gravaHistoricoEnvio";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const searchParams = await request.nextUrl.searchParams;
  const template = await searchParams.get("template");
  const nome = await searchParams.get("nome");
  const email = await searchParams.get("email");
  const agendado = await searchParams.get("agendado");

  if (!template || !nome || !email) {
    return Response.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  switch (template) {
    case "aniversarianteColaborador":
      try {
        const { data } = await resend.emails.send({
          from: "Consórcio Groscon <groscon@consorciogroscon.com.br>",
          to: [email],
          subject: "Feliz Aniversário!!!",
          react: AniversarianteTemplate({ firstName: nome }),
          scheduledAt: agendado || undefined,
        });
        try {
          console.log("ID email enviado:", data?.id);
          if (data?.id) {
            await registraEmailEnviado({
              id: data.id,
              nome: nome,
              template: template,
            });
          }
        } catch (error) {
          console.log(error);
        }
        return Response.json(data);
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }

    case "aniversarianteCliente01":
      try {
        const { data } = await resend.emails.send({
          from: "Consórcio Groscon <groscon@consorciogroscon.com.br>",
          to: [email],
          subject: "Consórcio Groscon deseja Feliz Aniversário!!!",
          react: AniversarianteCliente01(),
          scheduledAt: agendado || undefined,
        });
        try {
          if (data?.id) {
            await registraEmailEnviado({
              id: data.id,
              nome: nome,
              template: template,
            });
          }
        } catch (error) {
          console.log(error);
        }
        return Response.json(data);
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }

    case "aniversarianteCliente02":
      try {
        const { data } = await resend.emails.send({
          from: "Consórcio Groscon <groscon@consorciogroscon.com.br>",
          to: [email],
          subject: "Consórcio Groscon deseja Feliz Aniversário!!!",
          react: AniversarianteCliente02(),
          scheduledAt: agendado || undefined,
        });
        try {
          if (data?.id) {
            await registraEmailEnviado({
              id: data.id,
              nome: nome,
              template: template,
            });
          }
        } catch (error) {
          console.log(error);
        }
        return Response.json(data);
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }

    default:
      break;
  }
}
