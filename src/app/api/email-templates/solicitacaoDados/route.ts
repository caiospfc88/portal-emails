import SolicitacaoDados from "@/app/components/SolicitacaoDados";
import { registraEmailEnviado } from "@/app/utils/gravaHistoricoEnvio";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const searchParams = await request.nextUrl.searchParams;
  const nome = await searchParams.get("nome");
  const email = await searchParams.get("email");
  const dados = await searchParams.get("dadosSolicitados");
  const agendado = await searchParams.get("agendado");
  if (!dados || !nome || !email) {
    return Response.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }
  try {
    const { data } = await resend.emails.send({
      from: "Consórcio Groscon <groscon@consorciogroscon.com.br>",
      to: [email],
      subject: "Solicitação de dados cadastrais.",
      react: SolicitacaoDados({
        nome: nome,
        dadosSolicitados: dados,
      }),
      scheduledAt: agendado || undefined,
    });
    try {
      if (data?.id) {
        await registraEmailEnviado({
          id: data.id,
          nome: nome,
          template: "SolicitacaoDados",
        });
      }
    } catch (error) {
      console.log(error);
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
