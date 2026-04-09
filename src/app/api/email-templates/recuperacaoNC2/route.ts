import RecuperacaoNC2 from "@/app/components/RecuperacaoNC2";
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
      subject: `${nome} Tem parcelas da cota ${cota} em atraso - Groscon`,
      react: RecuperacaoNC2({
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
          template: "recuperacaoNC2",
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
