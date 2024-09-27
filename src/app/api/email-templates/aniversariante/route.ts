
import { AniversarianteTemplate } from '@/app/components/AniversarianteTemplate';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);



export async function POST(request: NextRequest) {
    
    const searchParams = await request.nextUrl.searchParams
    const template = await searchParams.get("template")!
    const nome = await searchParams.get("nome")!
    const email = await searchParams.get("email")!
    console.log("params: ",template,nome,email)
    switch (template) {
        case 'aniversariante':
            
        try {
            const { data, error } = await resend.emails.send({
              from: 'Portal Groscon <portal-groscon@resend.dev>',
              to: ["ti@consorciogroscon.com.br"],
              subject: 'Feliz Aniversário!!!',
              react: AniversarianteTemplate({ firstName: nome }),
            });
        
            if (error) {
              console.log("error: ",error.message)
              return Response.json({ error }, { status: 500 });
            }
        
            return Response.json(data);
          } catch (error) {
            return Response.json({ error }, { status: 500 });
          }
    
        default:
            break;
    }
  
}