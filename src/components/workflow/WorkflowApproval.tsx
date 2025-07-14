
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  MessageSquare,
  AlertTriangle,
  FileText,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WorkflowHistory } from "./WorkflowHistory";

interface ApprovalItem {
  id: string;
  type: 'verba' | 'nd';
  title: string;
  description: string;
  value: number;
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise';
  requestedBy: string;
  requestedAt: string;
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  category: string;
  approver?: string;
  approvedAt?: string;
  comments?: string;
  attachments?: string[];
  history: Array<{
    action: string;
    user: string;
    timestamp: string;
    comments?: string;
  }>;
}

const mockApprovalItems: ApprovalItem[] = [
  {
    id: 'APR001',
    type: 'verba',
    title: 'Verba Samsung - Campanha Black Friday',
    description: 'Solicitação de aprovação para verba promocional de R$ 250.000 para campanha Black Friday',
    value: 250000,
    status: 'pendente',
    requestedBy: 'Anderson Silva',
    requestedAt: '2024-01-15T10:30:00',
    priority: 'alta',
    category: 'Eletrônicos',
    history: [
      {
        action: 'Solicitação criada',
        user: 'Anderson Silva',
        timestamp: '2024-01-15T10:30:00',
        comments: 'Verba para campanha Black Friday - Samsung'
      }
    ]
  },
  {
    id: 'APR002',
    type: 'nd',
    title: 'ND Philips - Verba Trimestral',
    description: 'Emissão de Nota de Débito para verba trimestral Philips no valor de R$ 89.000',
    value: 89000,
    status: 'em_analise',
    requestedBy: 'Maria Santos',
    requestedAt: '2024-01-14T14:20:00',
    priority: 'media',
    category: 'Eletrodomésticos',
    history: [
      {
        action: 'Solicitação criada',
        user: 'Maria Santos',
        timestamp: '2024-01-14T14:20:00'
      },
      {
        action: 'Em análise',
        user: 'João Financeiro',
        timestamp: '2024-01-14T16:45:00',
        comments: 'Iniciada análise da documentação'
      }
    ]
  },
  {
    id: 'APR003',
    type: 'verba',
    title: 'Verba LG - Lançamento Produto',
    description: 'Aprovação para verba de lançamento de nova linha de produtos LG',
    value: 180000,
    status: 'aprovado',
    requestedBy: 'Carlos Mendes',
    requestedAt: '2024-01-13T09:15:00',
    priority: 'media',
    category: 'Eletrodomésticos',
    approver: 'Diretor Comercial',
    approvedAt: '2024-01-13T15:30:00',
    comments: 'Aprovado conforme alinhamento estratégico',
    history: [
      {
        action: 'Solicitação criada',
        user: 'Carlos Mendes',
        timestamp: '2024-01-13T09:15:00'
      },
      {
        action: 'Aprovado',
        user: 'Diretor Comercial',
        timestamp: '2024-01-13T15:30:00',
        comments: 'Aprovado conforme alinhamento estratégico'
      }
    ]
  }
];

export const WorkflowApproval = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ApprovalItem[]>(mockApprovalItems);
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [comments, setComments] = useState("");
  const [filter, setFilter] = useState<string>("todos");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'bg-green-500';
      case 'rejeitado': return 'bg-red-500';
      case 'em_analise': return 'bg-yellow-500';
      case 'pendente': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'bg-red-100 text-red-800 border-red-300';
      case 'alta': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'baixa': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado': return <CheckCircle className="h-4 w-4" />;
      case 'rejeitado': return <XCircle className="h-4 w-4" />;
      case 'em_analise': return <Clock className="h-4 w-4" />;
      case 'pendente': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleApprove = (item: ApprovalItem) => {
    const updatedItems = items.map(i => 
      i.id === item.id 
        ? {
            ...i,
            status: 'aprovado' as const,
            approver: 'Usuário Atual',
            approvedAt: new Date().toISOString(),
            comments: comments || 'Aprovado',
            history: [
              ...i.history,
              {
                action: 'Aprovado',
                user: 'Usuário Atual',
                timestamp: new Date().toISOString(),
                comments: comments || 'Aprovado'
              }
            ]
          }
        : i
    );
    
    setItems(updatedItems);
    setComments("");
    setSelectedItem(null);
    
    toast({
      title: "Item Aprovado",
      description: `${item.title} foi aprovado com sucesso.`,
    });
  };

  const handleReject = (item: ApprovalItem) => {
    if (!comments.trim()) {
      toast({
        title: "Comentário obrigatório",
        description: "É necessário informar o motivo da rejeição.",
        variant: "destructive",
      });
      return;
    }

    const updatedItems = items.map(i => 
      i.id === item.id 
        ? {
            ...i,
            status: 'rejeitado' as const,
            approver: 'Usuário Atual',
            approvedAt: new Date().toISOString(),
            comments: comments,
            history: [
              ...i.history,
              {
                action: 'Rejeitado',
                user: 'Usuário Atual',
                timestamp: new Date().toISOString(),
                comments: comments
              }
            ]
          }
        : i
    );
    
    setItems(updatedItems);
    setComments("");
    setSelectedItem(null);
    
    toast({
      title: "Item Rejeitado",
      description: `${item.title} foi rejeitado.`,
    });
  };

  const handleStartAnalysis = (item: ApprovalItem) => {
    const updatedItems = items.map(i => 
      i.id === item.id 
        ? {
            ...i,
            status: 'em_analise' as const,
            history: [
              ...i.history,
              {
                action: 'Em análise',
                user: 'Usuário Atual',
                timestamp: new Date().toISOString(),
                comments: 'Iniciada análise do item'
              }
            ]
          }
        : i
    );
    
    setItems(updatedItems);
    
    toast({
      title: "Análise Iniciada",
      description: `Análise de ${item.title} foi iniciada.`,
    });
  };

  const filteredItems = items.filter(item => {
    if (filter === "todos") return true;
    return item.status === filter;
  });

  const pendingCount = items.filter(i => i.status === 'pendente').length;
  const analysisCount = items.filter(i => i.status === 'em_analise').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Workflow de Aprovação</h3>
          <p className="text-muted-foreground">Gerencie aprovações de verbas e NDs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {pendingCount} Pendentes
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            {analysisCount} Em Análise
          </Badge>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button 
          variant={filter === "todos" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("todos")}
        >
          Todos ({items.length})
        </Button>
        <Button 
          variant={filter === "pendente" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pendente")}
        >
          Pendentes ({pendingCount})
        </Button>
        <Button 
          variant={filter === "em_analise" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("em_analise")}
        >
          Em Análise ({analysisCount})
        </Button>
        <Button 
          variant={filter === "aprovado" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("aprovado")}
        >
          Aprovados
        </Button>
        <Button 
          variant={filter === "rejeitado" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("rejeitado")}
        >
          Rejeitados
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge variant="outline" className="font-mono">
                      {item.id}
                    </Badge>
                    <Badge className={`${getStatusColor(item.status)} text-white`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status.replace('_', ' ')}</span>
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {item.type.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-muted-foreground mb-3">{item.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{item.requestedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.requestedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3" />
                      <span>{item.category}</span>
                    </div>
                    <div className="font-semibold">
                      R$ {item.value.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Histórico
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Histórico - {item.title}</DialogTitle>
                      </DialogHeader>
                      <WorkflowHistory history={item.history} />
                    </DialogContent>
                  </Dialog>
                  
                  {item.status === 'pendente' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStartAnalysis(item)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Analisar
                    </Button>
                  )}
                  
                  {(item.status === 'pendente' || item.status === 'em_analise') && (
                    <Dialog open={selectedItem?.id === item.id} onOpenChange={(open) => {
                      if (!open) {
                        setSelectedItem(null);
                        setComments("");
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Aprovar/Rejeitar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Aprovação - {item.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Detalhes:</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <p className="font-semibold mt-2">Valor: R$ {item.value.toLocaleString('pt-BR')}</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Comentários:
                            </label>
                            <Textarea
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                              placeholder="Adicione seus comentários sobre a decisão..."
                              className="min-h-[80px]"
                            />
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleApprove(item)}
                              className="flex-1"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprovar
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleReject(item)}
                              className="flex-1"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rejeitar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhum item encontrado</h3>
            <p className="text-muted-foreground">
              Não há itens para aprovação com o filtro selecionado
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
