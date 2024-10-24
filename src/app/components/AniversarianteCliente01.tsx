import {
  Body,
  Head,
  Html,
  Img,
  Preview,
  Tailwind,
} from "@react-email/components";
import * as React from 'react';

export const AniversarianteCliente01 = () => (
  <div>
    <Html>
        <Head />
        <Preview>Feliz aniversário</Preview>
        <Tailwind>
          <Body className="w-[1000] h-[900] font-sans" >
            <div className="flex justify">
              <Img 
              alt='Logo Horizontal' 
              width={850}
              height={765} 
              src={"https://consorciogroscon.com.br/novo/wp-content/uploads/conteudo-portal/Email_Aniversário_Groscon_01.jpg"}
              />
            </div>
          </Body>
        </Tailwind>
      </Html> 
  </div>
);

export default AniversarianteCliente01;