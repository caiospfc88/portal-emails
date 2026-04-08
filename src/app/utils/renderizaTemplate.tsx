import { render } from "@react-email/render";
import AniversarianteTemplate from "../components/AniversarianteTemplate";
import AniversarianteCliente01 from "../components/AniversarianteCliente01";
import AniversarianteCliente02 from "../components/AniversarianteCliente02";
import SolicitacaoDados from "../components/SolicitacaoDados";
import RecuperacaoExcluido from "../components/RecuperacaoExcluido";

const firstName = "Fulano Silva";
const cota = "99 / 999 - 9";

export const renderizaTemplate = (template: string) => {
  switch (template) {
    case "aniversarianteColaborador":
      const html1 = render(<AniversarianteTemplate firstName={firstName} />);
      return html1;

    case "aniversarianteCliente01":
      const html2 = render(<AniversarianteCliente01 />);
      return html2;

    case "aniversarianteCliente02":
      const html3 = render(<AniversarianteCliente02 />);
      return html3;

    case "solicitacaoDados":
      const html4 = render(
        <SolicitacaoDados
          nome={firstName}
          dadosSolicitados="Aqui estarão os dados solicitados."
        />,
      );
      return html4;

    case "recuperacaoExcluidos":
      const html5 = render(
        <RecuperacaoExcluido nome={firstName} cota={cota} />,
      );
      return html5;

    default:
      break;
  }
};
