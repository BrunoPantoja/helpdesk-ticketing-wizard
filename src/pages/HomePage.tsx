
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TicketIcon, UserPlusIcon, FileTextIcon, BarChartIcon } from "lucide-react";
import { useApp } from "@/context/AppContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, getSolicitantes, getTecnicos } = useApp();
  
  const ticketStats = {
    total: tickets.length,
    abertos: tickets.filter(ticket => ticket.status === "aberto").length,
    emAndamento: tickets.filter(ticket => ticket.status === "em_andamento").length,
    concluidos: tickets.filter(ticket => ticket.status === "concluido").length
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Bem-vindo ao Sistema de Help Desk TI</h1>
          <p className="text-gray-500">
            Gerencie solicitações de suporte técnico de forma simples e eficiente
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-support-blue bg-opacity-10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total de Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{ticketStats.total}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tickets Abertos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{ticketStats.abertos}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{ticketStats.emAndamento}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{ticketStats.concluidos}</p>
            </CardContent>
          </Card>
        </div>

        {/* Cards de Ação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Criar Ticket</CardTitle>
              <CardDescription>
                Abra uma nova solicitação de suporte técnico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TicketIcon className="h-12 w-12 text-support-blue mx-auto" />
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-support-blue hover:bg-support-darkblue"
                onClick={() => navigate("/tickets/new")}
              >
                Novo Ticket
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Cadastrar Usuário</CardTitle>
              <CardDescription>
                Registre-se como solicitante ou técnico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserPlusIcon className="h-12 w-12 text-support-blue mx-auto" />
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-support-blue hover:bg-support-darkblue"
                onClick={() => navigate("/cadastro")}
              >
                Cadastrar
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Listar Tickets</CardTitle>
              <CardDescription>
                Visualize e gerencie todas as solicitações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileTextIcon className="h-12 w-12 text-support-blue mx-auto" />
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-support-blue hover:bg-support-darkblue"
                onClick={() => navigate("/tickets")}
              >
                Ver Tickets
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Estatísticas de Usuários */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <p className="text-3xl font-bold text-support-blue">{getSolicitantes().length}</p>
                  <p className="text-sm text-gray-500">Solicitantes</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-support-darkblue">{getTecnicos().length}</p>
                  <p className="text-sm text-gray-500">Técnicos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tickets por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <BarChartIcon className="h-20 w-20 text-gray-300" />
                <p className="text-gray-500 ml-4">Estatísticas detalhadas disponíveis em breve</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
