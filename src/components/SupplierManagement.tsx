
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Building, 
  Phone, 
  Mail, 
  MapPin,
  TrendingUp,
  DollarSign,
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SupplierForm } from "./SupplierForm";

interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  categoria: string;
  status: 'ativo' | 'inativo' | 'suspenso';
  verbasAtivas: number;
  valorTotal: number;
  contato: {
    responsavel: string;
    email: string;
    telefone: string;
  };
  endereco: string;
  ultimaAtualizacao: string;
}

const fornecedoresDataInitial: Fornecedor[] = [
  {
    id: 'FOR001',
    nome: 'Samsung Electronics',
    cnpj: '01.234.567/0001-89',
    categoria: 'Eletrônicos',
    status: 'ativo',
    verbasAtivas: 15,
    valorTotal: 2450000,
    contato: {
      responsavel: 'Carlos Silva',
      email: 'carlos.silva@samsung.com',
      telefone: '(11) 99999-1234'
    },
    endereco: 'São Paulo - SP',
    ultimaAtualizacao: '2024-07-10'
  },
  {
    id: 'FOR002',
    nome: 'LG Brasil',
    cnpj: '02.345.678/0001-90',
    categoria: 'Eletrodomésticos',
    status: 'ativo',
    verbasAtivas: 12,
    valorTotal: 1890000,
    contato: {
      responsavel: 'Ana Costa',
      email: 'ana.costa@lg.com',
      telefone: '(11) 98888-5678'
    },
    endereco: 'São Paulo - SP',
    ultimaAtualizacao: '2024-07-09'
  },
  {
    id: 'FOR003',
    nome: 'Sony Corporation',
    cnpj: '03.456.789/0001-01',
    categoria: 'Eletrônicos',
    status: 'ativo',
    verbasAtivas: 8,
    valorTotal: 1560000,
    contato: {
      responsavel: 'Roberto Mendes',
      email: 'roberto.mendes@sony.com',
      telefone: '(11) 97777-9012'
    },
    endereco: 'Rio de Janeiro - RJ',
    ultimaAtualizacao: '2024-07-08'
  },
  {
    id: 'FOR004',
    nome: 'Philips Healthcare',
    cnpj: '04.567.890/0001-12',
    categoria: 'Saúde e Beleza',
    status: 'ativo',
    verbasAtivas: 6,
    valorTotal: 890000,
    contato: {
      responsavel: 'Fernanda Lima',
      email: 'fernanda.lima@philips.com',
      telefone: '(11) 96666-3456'
    },
    endereco: 'Barueri - SP',
    ultimaAtualizacao: '2024-07-07'
  }
];

export const SupplierManagement = () => {
  const { toast } = useToast();
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(fornecedoresDataInitial);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [isNewSupplierOpen, setIsNewSupplierOpen] = useState(false);
  // Controlar abertura do select de categoria
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    function handleCloseAll() {
      setOpenCategory(false);
      setIsNewSupplierOpen(false);
    }
    window.addEventListener('close-all-radix-portals', handleCloseAll);
    return () => window.removeEventListener('close-all-radix-portals', handleCloseAll);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-500';
      case 'inativo': return 'bg-gray-500';
      case 'suspenso': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredFornecedores = fornecedores.filter(fornecedor => {
    const matchesSearch = fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fornecedor.cnpj.includes(searchTerm);
    const matchesCategory = selectedCategory === "todos" || fornecedor.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleAddSupplier = (novoFornecedor: Fornecedor) => {
    setFornecedores([...fornecedores, novoFornecedor]);
    setIsNewSupplierOpen(false);
  };

  const handleEditSupplier = (fornecedor: Fornecedor) => {
    toast({
      title: "Editar Fornecedor",
      description: `Editando ${fornecedor.nome}`,
    });
  };

  const handleDeleteSupplier = (id: string) => {
    setFornecedores(fornecedores.filter(f => f.id !== id));
    toast({
      title: "Fornecedor removido",
      description: "O fornecedor foi removido com sucesso.",
    });
  };

  const handleViewHistory = (fornecedor: Fornecedor) => {
    toast({
      title: "Histórico",
      description: `Visualizando histórico de ${fornecedor.nome}`,
    });
  };

  const handleViewVerbas = (fornecedor: Fornecedor) => {
    toast({
      title: "Verbas do Fornecedor",
      description: `Visualizando verbas de ${fornecedor.nome}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Fornecedores</h2>
          <p className="text-muted-foreground">Controle e relacionamento com parceiros comerciais</p>
        </div>
        <Dialog open={isNewSupplierOpen} onOpenChange={setIsNewSupplierOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Fornecedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <SupplierForm 
              onSubmit={handleAddSupplier}
              onCancel={() => setIsNewSupplierOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fornecedores Ativos</p>
                <p className="text-3xl font-bold">{fornecedores.filter(f => f.status === 'ativo').length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verbas Ativas</p>
                <p className="text-3xl font-bold">{fornecedores.reduce((acc, f) => acc + f.verbasAtivas, 0)}</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-3xl font-bold">
                  R$ {(fornecedores.reduce((acc, f) => acc + f.valorTotal, 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Média por Fornecedor</p>
                <p className="text-3xl font-bold">
                  {(fornecedores.reduce((acc, f) => acc + f.verbasAtivas, 0) / fornecedores.length).toFixed(1)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou CNPJ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={[
                { value: "todos", label: "Todas Categorias" },
                { value: "Eletrônicos", label: "Eletrônicos" },
                { value: "Eletrodomésticos", label: "Eletrodomésticos" },
                { value: "Saúde e Beleza", label: "Saúde e Beleza" },
              ]}
              placeholder="Categoria"
              className="w-full sm:w-48"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Fornecedores */}
      <div className="grid gap-4">
        {filteredFornecedores.map((fornecedor) => (
          <Card key={fornecedor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {getInitials(fornecedor.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg">{fornecedor.nome}</h3>
                      <Badge className={`${getStatusColor(fornecedor.status)} text-white`}>
                        {fornecedor.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {fornecedor.cnpj} • {fornecedor.categoria}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{fornecedor.contato.responsavel}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{fornecedor.contato.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{fornecedor.contato.telefone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex space-x-4 mb-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Verbas Ativas</p>
                      <p className="font-semibold">{fornecedor.verbasAtivas}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Total</p>
                      <p className="font-semibold">R$ {fornecedor.valorTotal.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Atualizado em {fornecedor.ultimaAtualizacao}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{fornecedor.endereco}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewHistory(fornecedor)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Histórico
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditSupplier(fornecedor)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" onClick={() => handleViewVerbas(fornecedor)}>
                    Ver Verbas
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteSupplier(fornecedor.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
