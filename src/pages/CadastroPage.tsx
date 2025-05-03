
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { UserIcon, UserPlusIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const CadastroPage: React.FC = () => {
  const { addUser } = useApp();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("solicitante");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    departamento: "",
    especialidades: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let userData: any = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      tipo: activeTab as "solicitante" | "tecnico"
    };

    if (activeTab === "solicitante") {
      userData.departamento = formData.departamento;
    } else {
      userData.especialidades = formData.especialidades.split(",").map(item => item.trim());
    }

    if (!userData.nome || !userData.email || !userData.telefone) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos obrigatórios."
      });
      return;
    }

    addUser(userData);

    // Reset form
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      departamento: "",
      especialidades: ""
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cadastro de Usuários</h1>
        
        <Tabs defaultValue="solicitante" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="solicitante" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Solicitante
            </TabsTrigger>
            <TabsTrigger value="tecnico" className="flex items-center gap-2">
              <UserPlusIcon className="h-4 w-4" />
              Técnico
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "solicitante" 
                    ? "Cadastro de Solicitante" 
                    : "Cadastro de Técnico"
                  }
                </CardTitle>
                <CardDescription>
                  {activeTab === "solicitante"
                    ? "Cadastre-se para solicitar suporte técnico"
                    : "Cadastre-se como técnico para atender solicitações"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo*</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu.email@empresa.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone*</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        placeholder="(99) 99999-9999"
                      />
                    </div>
                    
                    {activeTab === "solicitante" ? (
                      <div className="space-y-2">
                        <Label htmlFor="departamento">Departamento</Label>
                        <Select
                          value={formData.departamento}
                          onValueChange={(value) => handleSelectChange("departamento", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TI">TI</SelectItem>
                            <SelectItem value="RH">Recursos Humanos</SelectItem>
                            <SelectItem value="Financeiro">Financeiro</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Operações">Operações</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="especialidades">Especialidades</Label>
                        <Input
                          id="especialidades"
                          name="especialidades"
                          value={formData.especialidades}
                          onChange={handleInputChange}
                          placeholder="Hardware, Redes, Windows (separados por vírgula)"
                        />
                      </div>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-support-blue hover:bg-support-darkblue">
                    Cadastrar {activeTab === "solicitante" ? "Solicitante" : "Técnico"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default CadastroPage;
