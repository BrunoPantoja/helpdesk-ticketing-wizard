
export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: 'solicitante' | 'tecnico';
  departamento?: string;
  especialidades?: string[];
}

export type TicketStatus = 'aberto' | 'em_andamento' | 'concluido' | 'cancelado';

export type TicketPrioridade = 'baixa' | 'media' | 'alta' | 'urgente';

export interface Ticket {
  id: string;
  titulo: string;
  descricao: string;
  solicitanteId: string;
  tecnicoId?: string;
  status: TicketStatus;
  prioridade: TicketPrioridade;
  categoria: string;
  dataCriacao: string;
  dataAtualizacao: string;
  comentarios: Comentario[];
}

export interface Comentario {
  id: string;
  ticketId: string;
  usuarioId: string;
  texto: string;
  dataCriacao: string;
}
