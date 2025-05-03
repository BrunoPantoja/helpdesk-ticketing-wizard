
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "@/types";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";
import { useApp } from "@/context/AppContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const navigate = useNavigate();
  const { getUserById } = useApp();
  
  const solicitante = getUserById(ticket.solicitanteId);
  const tecnico = ticket.tecnicoId ? getUserById(ticket.tecnicoId) : null;
  
  const formattedDate = formatDistanceToNow(new Date(ticket.dataCriacao), {
    addSuffix: true,
    locale: ptBR
  });

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{ticket.titulo}</CardTitle>
          <TicketStatusBadge status={ticket.status} />
        </div>
        <div className="text-xs text-muted-foreground">
          Ticket #{ticket.id} • Criado {formattedDate}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm mb-2 line-clamp-2">{ticket.descricao}</p>
        <div className="flex justify-between items-center mt-2">
          <div>
            <span className="text-xs text-gray-500">Solicitante: </span>
            <span className="text-sm">{solicitante?.nome}</span>
          </div>
          <TicketPriorityBadge priority={ticket.prioridade} />
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <div className="text-xs text-gray-500">
          {tecnico ? (
            <span>Técnico: {tecnico.nome}</span>
          ) : (
            <span>Não atribuído</span>
          )}
        </div>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => navigate(`/tickets/${ticket.id}`)}
        >
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
