
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import TicketCard from "@/components/tickets/TicketCard";
import { TicketIcon, FilterIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Ticket, TicketStatus } from "@/types";
import { categorias } from "@/data/mockData";

const TicketsPage: React.FC = () => {
  const { getUserTickets, currentUser } = useApp();
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    status: "todos",
    categoria: "todos",
    busca: ""
  });

  const handleFiltroStatus = (value: string) => {
    setFiltros({...filtros, status: value});
  };

  const handleFiltroCategoria = (value: string) => {
    setFiltros({...filtros, categoria: value});
  };

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({...filtros, busca: e.target.value});
  };

  // Obtem apenas os tickets do usuário atual
  const userTickets = getUserTickets();
  
  const ticketsFiltrados = userTickets.filter((ticket: Ticket) => {
    // Filtrar por status
    if (filtros.status !== "todos" && ticket.status !== filtros.status) {
      return false;
    }
    
    // Filtrar por categoria
    if (filtros.categoria !== "todos" && ticket.categoria !== filtros.categoria) {
      return false;
    }
    
    // Filtrar por busca (título ou descrição)
    if (filtros.busca && !ticket.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) && 
        !ticket.descricao.toLowerCase().includes(filtros.busca.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tickets</h1>
          <p className="text-gray-500">
            {currentUser?.tipo === "solicitante" 
              ? "Visualize e gerencie seus tickets" 
              : "Gerencie os tickets atribuídos a você e tickets abertos"}
          </p>
        </div>
        <Button 
          className="bg-support-blue hover:bg-support-darkblue"
          onClick={() => navigate("/tickets/new")}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Novo Ticket
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FilterIcon className="h-4 w-4 text-gray-500" />
          <h2 className="font-medium">Filtros</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select value={filtros.status} onValueChange={handleFiltroStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={filtros.categoria} onValueChange={handleFiltroCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  <SelectItem value="todos">Todas</SelectItem>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Input 
              placeholder="Buscar por título ou descrição" 
              value={filtros.busca}
              onChange={handleBuscaChange}
            />
          </div>
        </div>
      </div>

      {/* Lista de Tickets */}
      {ticketsFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ticketsFiltrados.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <TicketIcon className="h-12 w-12 text-gray-300 mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum ticket encontrado</h3>
          <p className="mt-2 text-gray-500">
            {currentUser?.tipo === "solicitante" 
              ? "Você ainda não tem tickets. Crie um novo ticket para começar." 
              : "Não há tickets atribuídos a você ou em aberto que correspondam aos filtros selecionados."}
          </p>
          <Button 
            className="mt-4 bg-support-blue hover:bg-support-darkblue"
            onClick={() => navigate("/tickets/new")}
          >
            Criar Novo Ticket
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
