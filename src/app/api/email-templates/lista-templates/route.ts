import { NextResponse } from "next/server";

type Template = {
  id: number;
  template: string;
  titulo: string;
  categoria: string;
  descricao: string;
};

const listaTemplates: Array<Template> = [
  {
    id: 1,
    template: "aniversarianteColaborador",
    titulo: "E-mail Aniversariante colaborador",
    descricao:
      "E-mail para envio na data de aniversário dos funcionarios da administradora.",
    categoria: "aniversario",
  },
  {
    id: 2,
    template: "aniversarianteCliente01",
    titulo: "E-mail Cliente Aniversariante Modelo 1",
    descricao:
      "E-mail com tons mais claros para envio na data de aniversário dos clientes de grupos ativos, de cotas com versão 00 e situação normal.",
    categoria: "aniversario",
  },
  {
    id: 3,
    template: "aniversarianteCliente02",
    titulo: "E-mail Cliente Aniversariante Modelo 2",
    descricao:
      "E-mail com tons mais escuros para envio na data de aniversário dos clientes de grupos ativos, de cotas com versão 00 e situação normal.",
    categoria: "aniversario",
  },
  {
    id: 4,
    template: "solicitacaoDados",
    titulo: "E-mail Solicitação de Dados Cadastrais",
    descricao:
      "E-mail para solicitar aos clientes os dados cadastrais necessários para atender às normas de PLD, que estão faltando no cadastro do sistema.",
    categoria: "solicitacaoDadosCadastrais",
  },
  {
    id: 5,
    template: "recuperacaoExcluidos",
    titulo: "E-mail Para Recuperação de Excluídos",
    descricao:
      "E-mail para comunicação com consorciados excluídos, uma tratativa para recuperar a cota em questão.",
    categoria: "recuperacao",
  },
];

export async function GET() {
  return NextResponse.json(listaTemplates);
}
