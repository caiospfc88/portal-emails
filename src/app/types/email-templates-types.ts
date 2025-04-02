export type DestinatarioT = {
  nome: string;
  email: string;
};

export type EmailsProps = {
  template: string;
  destinatario: DestinatarioT;
};

export type ResendEmailRetrieve = {
  object: string;
  id: string;
  to: string[];
  from: string;
  created_at: string;
  subject: string;
  bcc: string[];
  cc: string[];
  reply_to: string | null;
  last_event: string;
  html: string;
  text: string | null;
  scheduled_at: string | null;
};
