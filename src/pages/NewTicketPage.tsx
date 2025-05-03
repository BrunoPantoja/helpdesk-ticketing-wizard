import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { categorias } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const NewTicketPage: React.FC = () => {
  const { addTicket, getSolicitantes } = useApp();
  const navigate = useNavigate();
  
  const solicitantes = getSolicitantes();
  
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    solicitanteId: "",
    categoria: "",
    prioridade: "media"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.descricao || !formData.solicitanteId || !formData.categoria) {
      toast({
        variant: "destructive",
        title: "Erro ao criar ticket",
        description: "Por favor, preencha todos os campos obrigatórios."
      });
      return;
    }
    
    const newTicket = addTicket({
      titulo: formData.titulo,
      descricao: formData.descricao,
      solicitanteId: formData.solicitanteId,
      categoria: formData.categoria,
      prioridade: formData.prioridade as any,
      status: "aberto"
    });
    
    if (newTicket && newTicket.id) {
      navigate(`/tickets/${newTicket.id}`);
    } else {
      // Fallback if no ticket was returned
      navigate('/tickets');
      toast({
        title: "Ticket criado",
        description: "O ticket foi criado com sucesso, mas houve um erro ao redirecioná-lo."
      });
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Novo Ticket</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Solicitação de Suporte</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo para abrir uma nova solicitação de suporte técnico.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título*</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Resuma seu problema em poucas palavras"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição*</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descreva detalhadamente o problema que está enfrentando"
                  rows={5}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="solicitante">Solicitante*</Label>
                  <Select
                    value={formData.solicitanteId}
                    onValueChange={(value) => handleSelectChange("solicitanteId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o solicitante" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Solicitantes</SelectLabel>
                        {solicitantes.map(solicitante => (
                          <SelectItem key={solicitante.id} value={solicitante.id}>
                            {solicitante.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria*</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => handleSelectChange("categoria", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorias</SelectLabel>
                        {categorias.map(categoria => (
                          <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select
                  value={formData.prioridade}
                  onValueChange={(value) => handleSelectChange("prioridade", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Prioridades</SelectLabel>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => navigate("/tickets")}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-support-blue hover:bg-support-darkblue">
                  Criar Ticket
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewTicketPage;
