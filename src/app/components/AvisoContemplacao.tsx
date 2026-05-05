import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Column,
  Row,
} from "@react-email/components";
import * as React from "react";

interface ContemplacaoEmailProps {
  nome?: string;
  cota?: string;
  grupo?: string;
  dataAssembleia?: string;
  tipoBem?: "automoveis" | "caminhoes" | "imoveis";
}

// Mapeamento das imagens de acordo com o tipo do bem
const imagensContemplacao = {
  automoveis:
    "https://consorciogroscon.com.br/uploads/midias_groscon/midias_emails/Contemplacao_Automovel.png",
  caminhoes:
    "https://consorciogroscon.com.br/uploads/midias_groscon/midias_emails/Contemplacao_Caminhao.png",
  imoveis:
    "https://consorciogroscon.com.br/uploads/midias_groscon/midias_emails/Contemplacao_Imovel.png",
};

export const EmailContemplacaoGroscon = ({
  nome = "Cliente",
  cota = "000",
  grupo = "0000",
  dataAssembleia = "01/01/2000",
  tipoBem = "automoveis",
}: ContemplacaoEmailProps) => {
  const imageSrc = imagensContemplacao[tipoBem];

  return (
    <Html>
      <Head />
      <Preview>Boas notícias! Você foi contemplado! 🎉</Preview>
      <Tailwind>
        <Body className="bg-[#035191] my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] bg-white rounded-xl my-[40px] mx-auto p-[20px] max-w-[600px]">
            <Section>
              <Img
                src={imageSrc}
                width="95%"
                height="auto"
                alt="Parabéns pela Contemplação!"
                className="my-0 mx-auto rounded-t-lg"
              />
            </Section>

            <Section className="px-[20px] py-[32px]">
              <Text className="text-black text-[18px] font-bold">
                Olá, {nome}, tudo bem?
              </Text>

              <Text className="text-[#222] text-[16px] leading-[24px]">
                Temos uma excelente notícia para você!
              </Text>

              <Text className="text-[#222] text-[16px] leading-[24px] bg-[#f9f9f9] p-4 rounded-md border-l-4 border-[#004e92]">
                Sua cota <strong>{cota}</strong> do Grupo{" "}
                <strong>{grupo}</strong> foi contemplada na assembleia realizada
                em <strong>{dataAssembleia}</strong>.
              </Text>

              <Text className="text-[#222] text-[16px] leading-[24px]">
                Isso significa que você já está apto(a) a dar o próximo passo
                rumo à realização do seu objetivo! Sabemos o quanto esse momento
                é importante e queremos garantir que o processo ocorra de forma
                clara e ágil.
              </Text>

              <Hr className="my-[24px] border-[#eee]" />

              <Text className="text-[#004e92] text-[18px] font-bold">
                🚀 Próximos passos:
              </Text>

              <Text className="text-[#444] text-[15px] leading-[22px]">
                Para dar continuidade, entre em contato com nossa equipe para:
              </Text>

              <ul style={{ color: "#444", fontSize: "15px" }}>
                <li>Conferência de dados</li>
                <li>Orientações sobre documentação</li>
                <li>Liberação do crédito</li>
              </ul>

              <Text className="bg-[#fff4f4] text-[#cc0000] p-3 rounded text-[14px] font-semibold border border-[#fbd5d5]">
                ⚠️ Atenção: A falta de retorno pode ocasionar atrasos na
                liberação e andamento do processo.
              </Text>

              <Section className="mt-[32px] bg-[#f4f7fa] p-[20px] rounded-lg">
                <Text className="text-black font-bold m-0 text-center mb-2">
                  Entre em contato agora:
                </Text>
                <Row>
                  <Column align="center">
                    <Link
                      href="tel:1637075500"
                      className="text-[#004e92] text-[16px] font-bold block"
                    >
                      📞 16 3707-5500
                    </Link>
                  </Column>
                  <Column align="center">
                    <Link
                      href="mailto:atendimento@consorciogroscon.com.br"
                      className="text-[#004e92] text-[16px] font-bold block"
                    >
                      📧 E-mail: atendimento
                    </Link>
                  </Column>
                </Row>
              </Section>

              <Text className="text-[#222] text-[16px] leading-[24px] mt-[32px]">
                Parabéns por essa conquista! Estamos à disposição para ajudar.
              </Text>

              <Text className="text-[#666] text-[14px] leading-[20px] mt-[24px]">
                Atenciosamente,
                <br />
                <strong>Groscon Administradora de Consórcios</strong>
              </Text>
            </Section>

            <Hr className="border-[#eee] my-[20px]" />

            <Text className="text-[#999] text-[11px] text-center">
              Franca, São Paulo. Esta é uma mensagem oficial da Groscon.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailContemplacaoGroscon;
