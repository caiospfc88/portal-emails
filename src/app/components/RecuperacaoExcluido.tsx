import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Link,
  Column,
  Row,
} from "@react-email/components";

interface RecuperacaoExcluidoProps {
  nome: string;
  cota: string;
}

export const RecuperacaoExcluido: React.FC<
  Readonly<RecuperacaoExcluidoProps>
> = ({ nome, cota }) => {
  const whatsappLink = "https://wa.me/551637075504";

  return (
    <Html>
      <Head />
      <Preview>
        Oportunidade para regularizar sua cota - Consórcio Groscon
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[24px] max-w-[600px]">
            {/* Header com Logo */}
            <Section className="bg-[#035191] text-center py-[20px]">
              <Img
                src="https://consorciogroscon.com.br/novo/wp-content/uploads/conteudo-portal/logoHorizontal.jpg"
                alt="Logo Consórcio Groscon"
                width="200"
                className="mx-auto block"
              />
            </Section>

            <Section>
              <Heading className="text-[22px] font-bold text-gray-800 mb-[16px] mt-[20px]">
                Prezado(a) {nome},
              </Heading>

              <Text className="text-[16px] text-gray-600 leading-[24px]">
                Esperamos que esteja bem.
              </Text>

              <Text className="text-[16px] text-gray-600 leading-[24px]">
                Identificamos que sua cota <b>({cota})</b> de consórcio junto à
                Groscon foi cancelada devido à existência de parcelas em aberto.
                Sabemos que imprevistos podem acontecer, e queremos reforçar que
                estamos à disposição para ajudá-lo(a) a dar continuidade ao seu
                projeto.
              </Text>

              <Text className="text-[16px] text-gray-600 leading-[24px]">
                Pensando nisso, preparamos condições especiais, personalizadas
                para o seu momento, com o objetivo de facilitar a regularização
                da sua cota.
              </Text>

              <Text className="text-[16px] text-gray-600 leading-[24px] font-semibold">
                Não desista do seu plano. Entre em contato conosco para que
                possamos, juntos, encontrar a melhor solução financeira para
                você.
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[20px]">
                Será um prazer atendê-lo(a).
              </Text>

              <Section className="text-center mb-[20px]">
                <Link
                  href={whatsappLink}
                  className="text-[#035191] font-bold text-[16px] underline"
                >
                  Contato/WhatsApp (16) 3707-5504
                </Link>
              </Section>

              {/* Imagem Promocional */}
              <Section className="mb-[30px]">
                <Img
                  src="https://consorciogroscon.com.br/novo/wp-content/uploads/conteudo-portal/imagem_email_recuperacao.png"
                  alt="Recuperação de Cota"
                  width="552"
                  className="rounded-[8px] w-full h-auto"
                />
              </Section>

              <Hr className="border-gray-200 my-[20px]" />

              {/* Assinatura Personalizada em Tabela */}
              <Section>
                <Row>
                  <Column width="100">
                    <Img
                      src="http://consorciogroscon.com.br/imagens/Groscon.gif"
                      width="95"
                      alt="GROSCON"
                    />
                  </Column>
                  <Column>
                    <Text className="m-0 text-[13px] leading-[15px] font-bold text-[#2b4d89]">
                      CONSÓRCIO NACIONAL GROSCON <br />
                      Matriz Franca/ SP <br />
                      Recuperação de cotas <br />
                      Walter Junior <br />
                      (16) 3707-5504 / (16) 3707-5500
                    </Text>
                  </Column>
                  <Column align="right">
                    <Link href="https://secure.d4sign.com.br/gopaperless/sustentabilidade/41dd6cd7-80a2-4875-a3aa-c34328f06fd3/Cons%C3%B3rcio-Groscon.html">
                      <Img
                        src="https://www.consorciogroscon.com.br/novo/wp-content/uploads/2023/10/selos_2022_empresa-pt-200px.png"
                        width="150"
                        alt="D4Sign"
                      />
                    </Link>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-[24px]" />
            </Section>

            <Section>
              <Text className="text-[12px] text-gray-400 m-0">
                Groscon Administradora de Consórcios LTDA - CNPJ
                26.228.270/0001-48
              </Text>
              <Text className="text-[12px] text-gray-400 m-0">
                Rua São Sebastião do Paraíso, 1035 - Franca, SP - CEP 14405-010
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RecuperacaoExcluido;
