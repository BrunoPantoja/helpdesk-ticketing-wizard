
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/AppContext";
import TicketStatusBadge from "@/components/tickets/TicketStatusBadge";
import TicketPriorityBadge from "@/components/tickets/TicketPriorityBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Clock, MessageCircle, User, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TicketStatus } from "@/types";

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getTicketById, 
    getUserById, 
    getTecnicos, 
    addComentario, 
    atribuirTecnico,
    updateTicketStatus
  } = useApp();
  
  const ticket = getTicketById(id || "");
  const tecnicoAtual = ticket?.tecnicoId ? getUserById(ticket.tecnicoId) : null;
  const solicitante = ticket ? getUserById(ticket.solicitanteId) : null;
  const tecnicos = getTecnicos();
  
  const [comentario, setComentario] = useState("");
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState(tecnicoAtual?.id || "");
  const [statusSelecionado, setStatusSelecionado] = useState<TicketStatus>(ticket?.status || "aberto");
  
  if (!ticket || !solicitante) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Ticket não encontrado</h1>
          <p className="mb-4">O ticket solicitado não existe ou foi removido.</p>
          <Button onClick={() => navigate("/tickets")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Tickets
          </Button>
        </div>
      </div>
    );
  }
  
  const handleAddComentario = () => {
    if (!comentario.trim()) return;
    
    addComentario(ticket.id, "s1", comentario);
    setComentario("");
  };
  
  const handleTecnicoChange = (tecnicoId: string) => {
    setTecnicoSelecionado(tecnicoId);
    if (tecnicoId && tecnicoId !== tecnicoAtual?.id) {
      atribuirTecnico(ticket.id, tecnicoId);
    }
  };
  
  const handleStatusChange = (status: string) => {
    setStatusSelecionado(status as TicketStatus);
    updateTicketStatus(ticket.id, status as TicketStatus);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate("/tickets")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Tickets
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {ticket.titulo}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <span>Ticket #{ticket.id}</span>
                    <span>•</span>
                    <span>{ticket.categoria}</span>
                  </CardDescription>
                </div>
                <TicketStatusBadge status={ticket.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-gray-700 whitespace-pre-line">{ticket.descricao}</p>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Comentários ({ticket.comentarios.length})
                </h3>
                
                {ticket.comentarios.length > 0 ? (
                  <div className="space-y-4">
                    {ticket.comentarios.map(comentario => {
                      const autor = getUserById(comentario.usuarioId);
                      return (
                        <div key={comentario.id} className="flex space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {autor ? getInitials(autor.nome) : "??"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {autor ? autor.nome : "Usuário desconhecido"}
                              </p>
                              <span className="text-gray-400 text-sm ml-2">
                                {format(new Date(comentario.dataCriacao), "dd/MM/yyyy HH:mm")}
                              </span>
                            </div>
                            <p className="text-gray-700 mt-1">{comentario.texto}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    Ainda não há comentários neste ticket.
                  </p>
                )}
                
                <div className="mt-6">
                  <Textarea
                    placeholder="Adicione um comentário..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="mb-2"
                    rows={3}
                  />
                  <Button 
                    className="bg-support-blue hover:bg-support-darkblue"
                    onClick={handleAddComentario}
                  >
                    Adicionar Comentário
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Coluna lateral */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Detalhes do Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <Select value={statusSelecionado} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Prioridade</h4>
                <div className="mt-1">
                  <TicketPriorityBadge priority={ticket.prioridade} />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Solicitante</h4>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{solicitante.nome}</span>
                </div>
                <span className="text-xs text-gray-500 ml-6">{solicitante.email}</span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Técnico Responsável</h4>
                <Select 
                  value={tecnicoSelecionado} 
                  onValueChange={handleTecnicoChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um técnico" />
                  </SelectTrigger>
                  <SelectContent>
                    {tecnicos.map(tecnico => (
                      <SelectItem key={tecnico.id} value={tecnico.id}>
                        {tecnico.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {tecnicoAtual && (
                  <span className="text-xs text-gray-500 mt-1 block">
                    {tecnicoAtual.email}
                  </span>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Datas</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">Criado em: {format(new Date(ticket.dataCriacao), "dd/MM/yyyy HH:mm", {locale: ptBR})}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">Atualizado em: {format(new Date(ticket.dataAtualizacao), "dd/MM/yyyy HH:mm", {locale: ptBR})}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Imprimir Ticket
              </Button>
              <Button 
                className="w-full bg-support-blue hover:bg-support-darkblue" 
                onClick={() => {
                  updateTicketStatus(ticket.id, 
                    ticket.status === "concluido" ? "aberto" : "concluido"
                  );
                }}
              >
                {ticket.status === "concluido" 
                  ? "Reabrir Ticket" 
                  : "Marcar como Concluído"
                }
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;
