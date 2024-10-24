import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const AniversarianteTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="aniversarianteColaborador" content="width=device-width, initial-scale=1" />
        </Head>
        <Preview>Feliz aniversário</Preview>
        <Tailwind>
          <Body 
          style={
            {backgroundImage: "url('https://consorciogroscon.com.br/novo/wp-content/uploads/conteudo-portal/baloes_fundo_azul.png')", 
            backgroundRepeat: "space"}}
          className="bg-blue-300 w-[auto] h-[970px] font-sans" 
          >
            
              <div className="h-6"></div>
              <Container style={{backgroundImage: "radial-gradient(circle, rgb(147, 197, 253),#002544)"}} className="rounded-3xl max-w-[570px] h-[895px]">
                <Container className="bg-white rounded-3xl min-w-[560px] max-w-[560px] h-[800px] ">
                  <Section className="mt-[15px]">
                    <Heading className="text-[#002544] text-[24px] font-bold text-center p-0 my-[0px] mx-0">
                      Feliz Aniversário, {" " + firstName}!!!
                    </Heading>
                    <Img 
                      src={"https://consorciogroscon.com.br/novo/wp-content/uploads/conteudo-portal/logoAniversario.gif"}
                      width="500"
                      height="500"
                      alt="Feliz Aniversário!!!"
                      className="my-0 mx-auto"
                    />
                  </Section>
                  <Section className="my-[10px] mx-[10px] static max-w-[540px]">
                  <Text className="text-[#002544] text-[25px] leading-[24px]">
                    Parabéns <strong>{firstName}</strong>,
                  </Text>
                  <Text className="text-[#002544] text-[25px] leading-[28px] text-justify">
                      A <strong>Groscon</strong> te deseja um Feliz Aniversário! Você é uma parte valiosa da nossa 
                      equipe e esperamos que esteja tão animado com o seu futuro como nós estamos. 
                      Acreditamos e contamos com você!
                  </Text>
                  </Section>
                  <Section className="bg-[#035191] w-100% rounded-b-3xl">              
                    <Column align="center" className="rounded-b-3xl">
                      <Img
                        className="rounded-b-3xl"
                        alt='Logo Horizontal' 
                        width={400} 
                        src={"https://consorciogroscon.com.br/novo/wp-content/uploads/conteudo-portal/logoHorizontal.jpg"}
                      />
                    </Column>     
                  </Section>
                </Container> 
              </Container>
          </Body>
        </Tailwind>
      </Html>  
  </div>
);

export default AniversarianteTemplate;