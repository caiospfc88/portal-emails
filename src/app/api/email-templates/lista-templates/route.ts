import { NextResponse } from "next/server";

type Template = {
    id: number;
    template: string;
    titulo: string;
    descricao: string;
}

const listaTemplates: Array<Template> = [
    {
        id: 1,
        template: "aniversarianteColaborador",
        titulo: "E-mail Aniversariante colaborador",
        descricao: "E-mail para envio na data de aniversário dos funcionarios da administradora."
    },
    {
        id: 2,
        template: "aniversarianteCliente01",
        titulo: "E-mail Cliente Aniversariante Modelo 1",
        descricao: "E-mail com tons mais claros para envio na data de aniversário dos clientes de grupos ativos, de cotas com versão 00 e situação normal."
    },
    {
        id: 3,
        template: "aniversarianteCliente02",
        titulo: "E-mail Cliente Aniversariante Modelo 2",
        descricao: "E-mail com tons mais escuros para envio na data de aniversário dos clientes de grupos ativos, de cotas com versão 00 e situação normal."
    }
]

export async function GET() {
    
    return NextResponse.json(listaTemplates)
}