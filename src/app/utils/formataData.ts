export const formatDate = (date: Date | null) => {

    if (date == null){
        return null
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export function formatToBrazilTime(dateString:string | undefined) {

    if(dateString == undefined) {
      return ""
    }
    const date = new Date(dateString);
  
    // Formatar para o fuso horário do Brasil (America/Sao_Paulo)
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',      // Deve ser "numeric" ou "2-digit"
        month: '2-digit',     // Deve ser "numeric" ou "2-digit"
        day: '2-digit',       // Deve ser "numeric" ou "2-digit"
        hour: '2-digit',      // Deve ser "numeric" ou "2-digit"
        minute: '2-digit',    // Deve ser "numeric" ou "2-digit"
        second: '2-digit',    // Deve ser "numeric" ou "2-digit"
      };
  
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  }