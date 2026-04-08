import RecuperacaoExcluido from "@/app/components/RecuperacaoExcluido";
import { registraEmailEnviado } from "@/app/utils/gravaHistoricoEnvio";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const searchParams = await request.nextUrl.searchParams;
  const nome = await searchParams.get("nome");
  const email = await searchParams.get("email");
  const cota = await searchParams.get("grupoCotaVersao");
  const agendado = await searchParams.get("agendado");

  console.log("Params: ", nome, email, cota);

  if (!nome || !email || !cota) {
    return Response.json(
      { error: "Nome , Email e Cota são obrigatórios" },
      { status: 400 },
    );
  }

  try {
    const { data } = await resend.emails.send({
      from: "Consórcio Groscon <groscon@consorciogroscon.com.br>",
      to: [email],
      subject: `${nome} Oportunidade de Recuperação da Cota: ${cota} - Groscon`,
      react: RecuperacaoExcluido({
        nome: nome,
        cota: cota,
      }),
      scheduledAt: agendado || undefined,
    });

    if (data?.id) {
      try {
        await registraEmailEnviado({
          id: data.id,
          nome: nome,
          template: "RecuperacaoExcluido",
        });
      } catch (dbError) {
        console.error("Erro ao gravar histórico:", dbError);
      }
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
