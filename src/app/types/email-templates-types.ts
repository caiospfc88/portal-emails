export type DestinatarioT = {
    nome: string;
    email: string;
}

export type EmailsProps = {
    template: string;
    destinatario: DestinatarioT;
}