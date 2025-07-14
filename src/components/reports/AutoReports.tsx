
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Calendar, 
  Send, 
  Settings, 
  Download,
  Clock,
  CheckCircle,
  Play,
  Pause,
  Mail,
  Smartphone,
  Slack,
  BarChart3,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  recipients: string[];
  nextRun: string;
  format: 'pdf' | 'excel' | 'csv';
  channels: string[];
}

const reportsData: Report[] = [
  {
    id: 'REP001',
    name: 'Relatório Executivo de Verbas',
    description: 'Resumo mensal das verbas processadas, utilizadas e pendentes',
    frequency: 'monthly',
    status: 'active',
    lastRun: '2024-07-01 08:00',
    recipients: ['diretoria@empresa.com', 'financeiro@empresa.com'],
    nextRun: '2024-08-01 08:00',
    format: 'pdf',
    channels: ['email', 'slack']
  },
  {
    id: 'REP002',
    name: 'Dashboard de Performance KPIs',
    description: 'Indicadores de performance diários do sistema',
    frequency: 'daily',
    status: 'active',
    lastRun: '2024-07-11 07:00',
    recipients: ['operacoes@empresa.com'],
    nextRun: '2024-07-12 07:00',
    format: 'excel',
    channels: ['email', 'sms']
  },
  {
    id: 'REP003',
    name: 'Análise de Fornecedores',
    description: 'Relatório semanal de performance dos fornecedores',
    frequency: 'weekly',
    status: 'active',
    lastRun: '2024-07-08 09:00',
    recipients: ['compras@empresa.com', 'comercial@empresa.com'],
    nextRun: '2024-07-15 09:00',
    format: 'pdf',
    channels: ['email']
  },
  {
    id: 'REP004',
    name: 'Auditoria e Compliance',
    description: 'Relatório trimestral de auditoria e conformidade',
    frequency: 'quarterly',
    status: 'paused',
    lastRun: '2024-04-01 10:00',
    recipients: ['auditoria@empresa.com', 'juridico@empresa.com'],
    nextRun: '2024-10-01 10:00',
    format: 'pdf',
    channels: ['email']
  }
];

export const AutoReports = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>(reportsData);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeTab, setActiveTab] = useState("reports");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'paused': return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Diário';
      case 'weekly': return 'Semanal';
      case 'monthly': return 'Mensal';
      case 'quarterly': return 'Trimestral';
      default: return frequency;
    }
  };

  const handleRunReport = (reportId: string) => {
    toast({
      title: "Relatório Executado",
      description: "O relatório foi gerado e enviado com sucesso.",
    });
  };

  const handleToggleStatus = (reportId: string) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: report.status === 'active' ? 'paused' : 'active' }
        : report
    ));
    toast({
      title: "Status Atualizado",
      description: "O status do relatório foi alterado.",
    });
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <Smartphone className="h-4 w-4" />;
      case 'slack': return <Slack className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Relatórios Automáticos</h2>
          <p className="text-muted-foreground">Geração e distribuição automatizada de relatórios</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* Abas simplificadas */}
      <div className="flex gap-2 mb-2">
        <Button
          variant={activeTab === "reports" ? "default" : "outline"}
          onClick={() => setActiveTab("reports")}
        >
          Relatórios
        </Button>
        <Button
          variant={activeTab === "schedule" ? "default" : "outline"}
          onClick={() => setActiveTab("schedule")}
        >
          Agendamentos
        </Button>
        <Button
          variant={activeTab === "analytics" ? "default" : "outline"}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </Button>
      </div>
      {activeTab === "reports" && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{report.name}</h3>
                        <Badge className={getStatusColor(report.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(report.status)}
                            <span>{report.status === 'active' ? 'Ativo' : report.status === 'paused' ? 'Pausado' : 'Erro'}</span>
                          </div>
                        </Badge>
                        <Badge variant="outline">
                          {getFrequencyText(report.frequency)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{report.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Última Execução:</span>
                          <p className="text-muted-foreground">{report.lastRun}</p>
                        </div>
                        <div>
                          <span className="font-medium">Próxima Execução:</span>
                          <p className="text-muted-foreground">{report.nextRun}</p>
                        </div>
                        <div>
                          <span className="font-medium">Formato:</span>
                          <p className="text-muted-foreground">{report.format.toUpperCase()}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium">Canais de Distribuição:</span>
                          {report.channels.map((channel) => (
                            <div key={channel} className="flex items-center space-x-1 text-sm">
                              {getChannelIcon(channel)}
                              <span className="capitalize">{channel}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Destinatários:</span> {report.recipients.join(', ')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleRunReport(report.id)}
                        disabled={report.status === 'error'}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Executar Agora
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleStatus(report.id)}
                      >
                        {report.status === 'active' ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Ativar
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "schedule" && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Execuções</CardTitle>
              <CardDescription>Próximas execuções programadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.filter(r => r.status === 'active').map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Próxima execução: {report.nextRun}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{getFrequencyText(report.frequency)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Relatórios Ativos</p>
                    <p className="text-3xl font-bold">{reports.filter(r => r.status === 'active').length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                    <p className="text-3xl font-bold">98.7%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tempo Médio</p>
                    <p className="text-3xl font-bold">2.3min</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
      )}
    </div>
  );
};
