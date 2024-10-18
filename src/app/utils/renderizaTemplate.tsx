import { render } from '@react-email/render';
import AniversarianteTemplate from '../components/AniversarianteTemplate';
import AniversarianteCliente01 from "../components/AniversarianteCliente01";
import AniversarianteCliente02 from '../components/AniversarianteCliente02';

const firstName = "Fulano Silva"

export const renderizaTemplate = (template: string) => {


    switch (template) {
        case 'aniversarianteColaborador':
            
            const html1 = render(<AniversarianteTemplate firstName={firstName}/>)
            return html1

        case 'aniversarianteCliente01':
            
            const html2 = render(<AniversarianteCliente01/>)
            return html2

        case 'aniversarianteCliente02':
            
            const html3 = render(<AniversarianteCliente02/>)
            return html3
  
        default:
            break;
    }

}