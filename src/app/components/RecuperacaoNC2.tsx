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

interface RecuperacaoNC2Props {
  nome: string;
  cota: string;
}

export const RecuperacaoExcluido: React.FC<Readonly<RecuperacaoNC2Props>> = ({
  nome,
  cota,
}) => {
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
                src="http://consorciogroscon.com.br/uploads/midias_groscon/midias_emails/logoHorizontal_temp.jpg"
                alt="Logo Consórcio Groscon"
                width="200"
                className="mx-auto block"
              />
            </Section>

            <Section>
              <Heading className="text-[22px] font-bold text-gray-600 mb-[16px] mt-[20px]">
                Prezado(a) {nome},
              </Heading>

              <Text className="text-[16px] text-gray-600 leading-[24px]">
                Esperamos que esteja bem.
              </Text>

              <Text className="text-[16px] text-gray-600 leading-[24px]">
                Identificamos que há parcela(s) da sua cota <b>({cota})</b> de
                consórcio junto à Groscon em aberto até a presente data. Sabemos
                que imprevistos acontecem, porém é importante destacar que a
                ausência de pagamento pode acarretar no cancelamento da sua
                cota.
                <br />
                <br />
                Nosso objetivo é ajudá-lo(a) a manter seu consórcio ativo. Por
                isso, contamos com opções de acordo para facilitar a
                regularização dos valores em aberto. <br />
                <br />
                Ressaltamos que, para participar das assembleias do seu
                consórcio, é necessário que todas as parcelas estejam
                devidamente em dia. <br />
                <br />
                Caso deseje, podemos encaminhar o boleto atualizado por este
                canal ou apresentar as melhores condições de negociação.
              </Text>

              <Text className="text-[16px] text-gray-600 leading-[24px] font-semibold">
                Se o pagamento já tiver sido realizado, por favor, desconsidere
                este e-mail
              </Text>

              <Text className="text-[16px] text-gray-600 leading-[24px]">
                Caso contrário, pedimos que entre em contato conosco por meio
                dos nossos canais de atendimento:
              </Text>

              <Section className="text-center mb-[20px]">
                <Link
                  href={whatsappLink}
                  className="text-[#035191] font-bold text-[16px] underline"
                >
                  Contato/WhatsApp (16) 3707-5504
                </Link>
              </Section>

              <Text className="text-[16px] text-gray-600 leading-[24px] font-semibold">
                Estamos à disposição para auxiliá-lo(a).
              </Text>

              <Text className="text-[16px] text-gray-600 leading-[24px] font-semibold">
                Atenciosamente,
              </Text>

              <Hr className="border-gray-200 my-[20px]" />

              {/* Assinatura Personalizada em Tabela */}
              <Section>
                <Row>
                  <Column width="100">
                    <Img
                      src="http://consorciogroscon.com.br/uploads/midias_groscon/assinatura/gif_assinatura_36anos.gif"
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
                        src="http://consorciogroscon.com.br/uploads/midias_groscon/assinatura/selos_D4sign_paperless.png"
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
