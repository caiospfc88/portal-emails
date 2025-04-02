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
} from "@react-email/components";

interface SolicitacaoDadosProps {
  nome: string;
  dadosSolicitados: string;
}

export const SolicitacaoDados: React.FC<Readonly<SolicitacaoDadosProps>> = ({
  nome,
  dadosSolicitados,
}) => {
  const whatsappNumero = "551637075500"; // Substitua pelo número desejado
  const mensagem = encodeURIComponent(
    `Olá, preciso de ajuda com meu cadastro. Preciso atualizar: ${dadosSolicitados}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumero}?text=${mensagem}`;

  return (
    <Html>
      <Head />
      <Preview>Precisamos completar seu cadastro - Consórcio Groscon</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[24px] max-w-[600px]">
            <Section
              style={{
                backgroundColor: "#035191",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              <Img
                src={
                  "https://consorciogroscon.com.br/novo/wp-content/uploads/conteudo-portal/logoHorizontal.jpg"
                }
                alt="Logo Consórcio Groscon"
                width="200"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Section>
            <Section>
              <Heading className="text-[24px] font-bold text-gray-800 m-0 mb-[16px] mt-[15px]">
                Precisamos atualizar seu cadastro
              </Heading>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Olá, {nome}
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Esperamos que esteja tudo bem. Identificamos que alguns dados
                importantes estão incompletos em seu cadastro no Consórcio
                Groscon, o que pode afetar a qualidade dos nossos serviços para
                você.
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Para garantir que possamos oferecer o melhor atendimento e
                manter você informado sobre oportunidades exclusivas, precisamos
                que você atualize suas informações.
              </Text>

              <Section className="bg-gray-50 p-[16px] rounded-[8px] mb-[24px]">
                <Text className="text-[16px] font-bold text-gray-700 m-0 mb-[8px]">
                  Dados que precisam ser atualizados:
                </Text>
                <Text className="text-[16px] font-bold text-gray-700 m-0 mb-[8px]">
                  {dadosSolicitados}
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Para atualizar seus dados, entre em contato pelo telefone (16)
                3707-5500 e forneça as informações solicitadas. Nosso atendente
                confirmará sua identidade antes de prosseguir.
              </Text>

              <Section className="flex items-center mt-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    width="40"
                    height="40"
                    style={{ display: "block" }}
                  />
                </a>
                <Text className="text-[16px] text-gray-600 ml-4">
                  Clique no ícone para falar conosco via WhatsApp.
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Caso tenha qualquer dificuldade, nossa equipe de atendimento
                está à disposição para ajudar, também, através do telefone (16)
                3707-5500 ou pelo e-mail atendimento@consorciogroscon.com.br.
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[8px]">
                Agradecemos sua atenção e colaboração.
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Atenciosamente,
                <br />
                Equipe Consórcio Groscon
              </Text>

              <Hr className="border border-solid border-gray-200 my-[24px]" />

              <Text className="text-[14px] text-gray-500 mb-[8px]">
                Este é um e-mail oficial do Consórcio Groscon.
              </Text>
            </Section>

            <Section className="mt-[32px]">
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

export default SolicitacaoDados;
