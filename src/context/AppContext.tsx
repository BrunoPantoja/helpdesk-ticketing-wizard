
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Ticket, TicketStatus, TicketPrioridade } from "../types";
import { mockUsers, mockTickets, generateId } from "../data/mockData";
import { toast } from "@/components/ui/use-toast";

interface AppContextType {
  users: User[];
  tickets: Ticket[];
  addUser: (user: Omit<User, "id">) => void;
  addTicket: (ticket: Omit<Ticket, "id" | "dataCriacao" | "dataAtualizacao" | "comentarios">) => Ticket;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  addComentario: (ticketId: string, usuarioId: string, texto: string) => void;
  atribuirTecnico: (ticketId: string, tecnicoId: string) => void;
  getSolicitantes: () => User[];
  getTecnicos: () => User[];
  getTicketById: (id: string) => Ticket | undefined;
  getUserById: (id: string) => User | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const addUser = (user: Omit<User, "id">) => {
    const prefix = user.tipo === "solicitante" ? "s" : "t";
    const newUser = { ...user, id: generateId(prefix) };
    setUsers([...users, newUser as User]);
    toast({
      title: "Usuário adicionado com sucesso",
      description: `${user.nome} foi cadastrado como ${user.tipo === "solicitante" ? "solicitante" : "técnico"}.`
    });
  };

  const addTicket = (ticket: Omit<Ticket, "id" | "dataCriacao" | "dataAtualizacao" | "comentarios">): Ticket => {
    const now = new Date().toISOString();
    const newTicket: Ticket = {
      ...ticket,
      id: generateId("T"),
      dataCriacao: now,
      dataAtualizacao: now,
      comentarios: []
    };
    setTickets([...tickets, newTicket]);
    toast({
      title: "Ticket criado com sucesso",
      description: `Ticket #${newTicket.id} foi aberto e está aguardando atendimento.`
    });
    return newTicket;
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus) => {
    setTickets(
      tickets.map(ticket => 
        ticket.id === ticketId
          ? { ...ticket, status, dataAtualizacao: new Date().toISOString() }
          : ticket
      )
    );
    toast({
      title: "Status atualizado",
      description: `O ticket #${ticketId} foi atualizado para ${status}.`
    });
  };

  const addComentario = (ticketId: string, usuarioId: string, texto: string) => {
    const now = new Date().toISOString();
    setTickets(
      tickets.map(ticket => 
        ticket.id === ticketId
          ? { 
              ...ticket, 
              dataAtualizacao: now,
              comentarios: [
                ...ticket.comentarios,
                {
                  id: generateId("c"),
                  ticketId,
                  usuarioId,
                  texto,
                  dataCriacao: now
                }
              ]
            }
          : ticket
      )
    );
  };

  const atribuirTecnico = (ticketId: string, tecnicoId: string) => {
    setTickets(
      tickets.map(ticket => 
        ticket.id === ticketId
          ? { 
              ...ticket, 
              tecnicoId,
              status: "em_andamento" as TicketStatus,
              dataAtualizacao: new Date().toISOString()
            }
          : ticket
      )
    );
    toast({
      title: "Técnico atribuído",
      description: `Um técnico foi atribuído ao ticket #${ticketId}.`
    });
  };

  const getSolicitantes = () => users.filter(user => user.tipo === "solicitante");
  const getTecnicos = () => users.filter(user => user.tipo === "tecnico");

  const getTicketById = (id: string) => tickets.find(ticket => ticket.id === id);
  const getUserById = (id: string) => users.find(user => user.id === id);

  return (
    <AppContext.Provider 
      value={{ 
        users, 
        tickets, 
        addUser, 
        addTicket, 
        updateTicketStatus,
        addComentario,
        atribuirTecnico,
        getSolicitantes,
        getTecnicos,
        getTicketById,
        getUserById
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
};
