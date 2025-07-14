import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  FileUp, 
  Edit, 
  Eye,
  DollarSign,
  Percent,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Trash2,
  Filter,
  Download,
  Upload,
  Calendar,
  TrendingUp,
  BarChart3,
  Zap
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { VerbaForm } from "./VerbaForm";
import { VerbaList } from "./verba/VerbaList";
import { VerbaStats } from "./verba/VerbaStats";
import { VerbaFilters } from "./verba/VerbaFilters";
import { VerbaAnalytics } from "./verba/VerbaAnalytics";
import { WorkflowApproval } from "./workflow/WorkflowApproval";
import { WorkflowStats } from "./workflow/WorkflowStats";

interface Verba {
  id: string;
  fornecedor: string;
  tipo: 'carta' | 'percentual' | 'fixo';
  valor: number;
  status: 'ativa' | 'pendente' | 'vencida' | 'utilizada';
  dataInicio: string;
  dataFim: string;
  canal: 'varejo' | 'atacado' | 'ambos';
  utilizacao: number;
  responsavel: string;
  categoria?: string;
  regiao?: string;
  observacoes?: string;
  historico?: Array<{
    data: string;
    acao: string;
    responsavel: string;
    detalhes?: string;
  }>;
}

const verbasDataInitial: Verba[] = [
  {
    id: 'VB001',
    fornecedor: 'Samsung Electronics',
    tipo: 'carta',
    valor: 250000,
    status: 'ativa',
    dataInicio: '2024-01-01',
    dataFim: '2024-03-31',
    canal: 'ambos',
    utilizacao: 78,
    responsavel: 'Anderson Silva',
    categoria: 'Eletrônicos',
    regiao: 'Sul',
    observacoes: 'Verba promocional para lançamento de novos smartphones',
    historico: [
      { data: '2024-01-01', acao: 'Verba criada', responsavel: 'Anderson Silva' },
      { data: '2024-01-15', acao: 'Primeira utilização', responsavel: 'Sistema', detalhes: 'R$ 45.000 utilizados' }
    ]
  },
  {
    id: 'VB002',
    fornecedor: 'LG Brasil',
    tipo: 'percentual',
    valor: 3.5,
    status: 'ativa',
    dataInicio: '2024-02-01',
    dataFim: '2024-04-30',
    canal: 'varejo',
    utilizacao: 92,
    responsavel: 'Maria Santos',
    categoria: 'Eletrodomésticos',
    regiao: 'Sudeste',
    observacoes: 'Percentual sobre vendas de refrigeradores'
  },
  {
    id: 'VB003',
    fornecedor: 'Sony Corporation',
    tipo: 'fixo',
    valor: 15,
    status: 'pendente',
    dataInicio: '2024-03-01',
    dataFim: '2024-05-31',
    canal: 'atacado',
    utilizacao: 0,
    responsavel: 'João Pedro',
    categoria: 'Eletrônicos',
    regiao: 'Nordeste'
  },
  // ... mais verbas para demonstração
  {
    id: 'VB004',
    fornecedor: 'Philips Healthcare',
    tipo: 'carta',
    valor: 89000,
    status: 'vencida',
    dataInicio: '2023-11-01',
    dataFim: '2024-01-31',
    canal: 'varejo',
    utilizacao: 45,
    responsavel: 'Ana Costa',
    categoria: 'Saúde e Beleza',
    regiao: 'Sul'
  },
  {
    id: 'VB005',
    fornecedor: 'Electrolux',
    tipo: 'percentual',
    valor: 2.8,
    status: 'utilizada',
    dataInicio: '2023-12-01',
    dataFim: '2024-02-29',
    canal: 'ambos',
    utilizacao: 100,
    responsavel: 'Carlos Mendes',
    categoria: 'Eletrodomésticos',
    regiao: 'Centro-Oeste'
  }
];

export const VerbaManagement = () => {
  const { toast } = useToast();
  const [verbas, setVerbas] = useState<Verba[]>(verbasDataInitial);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedRegion, setSelectedRegion] = useState("todos");
  const [isNewVerbaOpen, setIsNewVerbaOpen] = useState(false);
  const [editingVerba, setEditingVerba] = useState<Verba | null>(null);
  const [activeTab, setActiveTab] = useState("lista");
  // Controlar abertura dos selects
  const [openStatus, setOpenStatus] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);

  useEffect(() => {
    function handleCloseAll() {
      setOpenStatus(false);
      setOpenCategory(false);
      setOpenRegion(false);
      setIsNewVerbaOpen(false);
    }
    window.addEventListener('close-all-radix-portals', handleCloseAll);
    return () => window.removeEventListener('close-all-radix-portals', handleCloseAll);
  }, []);

  const filteredVerbas = verbas.filter(verba => {
    const matchesSearch = verba.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verba.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "todos" || verba.status === selectedStatus;
    const matchesCategory = selectedCategory === "todos" || verba.categoria === selectedCategory;
    const matchesRegion = selectedRegion === "todos" || verba.regiao === selectedRegion;
    return matchesSearch && matchesStatus && matchesCategory && matchesRegion;
  });

  const handleAddVerba = (novaVerba: Verba) => {
    const verba = {
      ...novaVerba,
      historico: [
        { data: new Date().toISOString().split('T')[0], acao: 'Verba criada', responsavel: 'Usuário Atual' }
      ]
    };
    setVerbas([...verbas, verba]);
    setIsNewVerbaOpen(false);
    toast({
      title: "Verba cadastrada",
      description: `Verba ${verba.id} foi cadastrada com sucesso.`,
    });
  };

  const handleEditVerba = (verba: Verba) => {
    setEditingVerba(verba);
  };

  const handleDeleteVerba = (id: string) => {
    setVerbas(verbas.filter(v => v.id !== id));
    toast({
      title: "Verba removida",
      description: "A verba foi removida com sucesso.",
    });
  };

  const handleUploadOCR = () => {
    toast({
      title: "Upload com IA/OCR",
      description: "Processando documento... Aguarde alguns instantes.",
    });
    
    // Simular processamento
    setTimeout(() => {
      toast({
        title: "Documento processado",
        description: "Dados extraídos com sucesso! Verifique o formulário preenchido.",
      });
    }, 3000);
  };

  const handleBulkImport = () => {
    toast({
      title: "Importação em lote",
      description: "Funcionalidade de importação em massa será implementada.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportando dados",
      description: "Gerando relatório de verbas... Download iniciará em breve.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Gerando relatório",
      description: "Relatório detalhado será enviado por email em alguns minutos.",
    });
  };

  const workflowStats = {
    totalItems: 15,
    pendingItems: 5,
    approvedItems: 8,
    rejectedItems: 1,
    analysisItems: 1
  };

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Verbas Comerciais</h2>
          <p className="text-muted-foreground">Controle centralizado e inteligente de todas as verbas</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleUploadOCR}>
            <FileUp className="h-4 w-4 mr-2" />
            Upload IA/OCR
          </Button>
          <Button variant="outline" size="sm" onClick={handleBulkImport}>
            <Upload className="h-4 w-4 mr-2" />
            Importar Lote
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isNewVerbaOpen} onOpenChange={setIsNewVerbaOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Verba
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <VerbaForm 
                onSubmit={handleAddVerba}
                onCancel={() => setIsNewVerbaOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <VerbaStats verbas={verbas} />

      {/* Tabs principais - abas simplificadas */}
      <div className="flex gap-2 mb-2">
        <Button
          variant={activeTab === "lista" ? "default" : "outline"}
          onClick={() => setActiveTab("lista")}
        >
          <FileText className="h-4 w-4 mr-2" />
          Lista de Verbas
        </Button>
        <Button
          variant={activeTab === "analytics" ? "default" : "outline"}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
        <Button
          variant={activeTab === "workflow" ? "default" : "outline"}
          onClick={() => setActiveTab("workflow")}
        >
          <Zap className="h-4 w-4 mr-2" />
          Workflow
        </Button>
      </div>
      {activeTab === "lista" && (
        <div className="space-y-4">
          <VerbaFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            openStatus={openStatus}
            setOpenStatus={setOpenStatus}
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
            openRegion={openRegion}
            setOpenRegion={setOpenRegion}
          />
          <VerbaList
            verbas={filteredVerbas}
            onEdit={handleEditVerba}
            onDelete={handleDeleteVerba}
          />
        </div>
      )}
      {activeTab === "analytics" && (
        <div className="space-y-4">
          <VerbaAnalytics verbas={verbas} />
        </div>
      )}
      {activeTab === "workflow" && (
        <div className="space-y-4">
          <WorkflowStats {...workflowStats} />
          <WorkflowApproval />
        </div>
      )}
    </div>
  );
};
