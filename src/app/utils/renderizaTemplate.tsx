import { render } from "@react-email/render";
import AniversarianteTemplate from "../components/AniversarianteTemplate";
import AniversarianteCliente01 from "../components/AniversarianteCliente01";
import AniversarianteCliente02 from "../components/AniversarianteCliente02";
import SolicitacaoDados from "../components/SolicitacaoDados";
import RecuperacaoExcluido from "../components/RecuperacaoExcluidos";
import RecuperacaoNC1 from "../components/RecuperacaoNC1";
import RecuperacaoNC2 from "../components/RecuperacaoNC2";
import RecuperacaoNC3 from "../components/RecuperacaoNC3";

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

    case "recuperacaoNC1":
      const html6 = render(<RecuperacaoNC1 nome={firstName} cota={cota} />);
      return html6;

    case "recuperacaoNC2":
      const html7 = render(<RecuperacaoNC2 nome={firstName} cota={cota} />);
      return html7;

    case "recuperacaoNC3":
      const html8 = render(<RecuperacaoNC3 nome={firstName} cota={cota} />);
      return html8;

    default:
      break;
  }
};
