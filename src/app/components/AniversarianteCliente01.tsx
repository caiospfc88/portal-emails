import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface AniversarianteClienteProps {
  nome?: string;
}

export const AniversarianteCliente01 = ({
  nome = "Fulano",
}: AniversarianteClienteProps) => (
  <Html>
    <Head />
    <Preview>Feliz aniversário, {nome}! 🎉</Preview>
    <Tailwind>
      <Body className="bg-[#035191] my-auto mx-auto font-sans px-2">
        <Container className="border bg-white border-solid border-[#eaeaea] ring-4 !ring-gray-500 rounded-xl my-[40px] mx-auto p-[25px] max-w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src="https://consorciogroscon.com.br/uploads/midias_groscon/midias_emails/FelizAniversarioGroscon.png"
              width="100%"
              height="auto"
              alt="Feliz Aniversário!"
              className="my-0 mx-auto rounded-lg shadow-sm"
            />
          </Section>

          <Section className="text-center mt-[32px] mb-[32px]">
            <Text className="text-black text-[20px] font-semibold p-0 my-[30px] mx-0">
              Olá, <strong>{nome}</strong>! 🎉
            </Text>
            <Text className="text-[#444] text-[16px] leading-[24px]">
              Hoje é um dia muito especial! Nós, da <strong>Groscon</strong>,{" "}
              queremos desejar a você um feliz aniversário.
            </Text>
            <Text className="text-[#444] text-[16px] leading-[24px]">
              Que o seu novo ciclo seja repleto de alegria, saúde e muito
              sucesso. É um orgulho fazer parte da sua jornada na conquista dos
              seus sonhos.
            </Text>
            <Text className="text-[#444] text-[16px] leading-[24px]">
              Aproveite muito o seu dia! Um grande abraço de toda a nossa
              equipe. 🎂✨
            </Text>
          </Section>

          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

          <Text className="text-[#666] text-[12px] leading-[24px] text-center">
            Este é um e-mail automático enviado pela Groscon.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default AniversarianteCliente01;
