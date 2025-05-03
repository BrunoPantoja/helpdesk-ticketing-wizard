
import { User, Ticket, TicketStatus, TicketPrioridade } from "../types";

// Usuários Mock
export const mockUsers: User[] = [
  {
    id: "s1",
    nome: "João Silva",
    email: "joao.silva@empresa.com",
    telefone: "(11) 99999-1111",
    tipo: "solicitante",
    departamento: "Recursos Humanos"
  },
  {
    id: "s2",
    nome: "Maria Souza",
    email: "maria.souza@empresa.com",
    telefone: "(11) 99999-2222",
    tipo: "solicitante", 
    departamento: "Financeiro"
  },
  {
    id: "t1",
    nome: "Carlos Ferreira",
    email: "carlos.ferreira@ti.com",
    telefone: "(11) 98888-1111",
    tipo: "tecnico",
    especialidades: ["Hardware", "Windows"]
  },
  {
    id: "t2",
    nome: "Ana Rodrigues",
    email: "ana.rodrigues@ti.com",
    telefone: "(11) 98888-2222",
    tipo: "tecnico",
    especialidades: ["Redes", "Servidores", "Linux"]
  }
];

// Tickets Mock
export const mockTickets: Ticket[] = [
  {
    id: "T001",
    titulo: "Computador não liga",
    descricao: "Meu computador não está ligando quando pressiono o botão power.",
    solicitanteId: "s1",
    tecnicoId: "t1",
    status: "aberto",
    prioridade: "alta",
    categoria: "Hardware",
    dataCriacao: "2023-05-01T14:30:00Z",
    dataAtualizacao: "2023-05-01T14:30:00Z",
    comentarios: [
      {
        id: "c1",
        ticketId: "T001",
        usuarioId: "s1",
        texto: "Já tentei reiniciar várias vezes, mas não funciona.",
        dataCriacao: "2023-05-01T15:00:00Z"
      }
    ]
  },
  {
    id: "T002",
    titulo: "Acesso ao sistema financeiro",
    descricao: "Preciso de acesso ao sistema financeiro para gerar relatórios.",
    solicitanteId: "s2",
    status: "aberto",
    prioridade: "media",
    categoria: "Software",
    dataCriacao: "2023-05-02T09:15:00Z",
    dataAtualizacao: "2023-05-02T09:15:00Z",
    comentarios: []
  },
  {
    id: "T003",
    titulo: "Impressora não funciona",
    descricao: "A impressora do departamento de RH não está imprimindo.",
    solicitanteId: "s1",
    tecnicoId: "t2",
    status: "em_andamento",
    prioridade: "media",
    categoria: "Hardware",
    dataCriacao: "2023-05-01T10:30:00Z",
    dataAtualizacao: "2023-05-01T13:45:00Z",
    comentarios: [
      {
        id: "c2",
        ticketId: "T003",
        usuarioId: "t2",
        texto: "Verificarei a impressora hoje à tarde.",
        dataCriacao: "2023-05-01T13:45:00Z"
      }
    ]
  }
];

// Categorias para os tickets
export const categorias = [
  "Hardware",
  "Software",
  "Rede",
  "Email",
  "Impressora",
  "Acesso/Permissões",
  "Outros"
];

// Função para gerar ID único
export const generateId = (prefix: string) => {
  return `${prefix}${new Date().getTime()}`;
};
