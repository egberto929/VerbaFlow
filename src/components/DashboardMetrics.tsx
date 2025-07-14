
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Target, 
  Users,
  BarChart3,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Filter,
  Download,
  RefreshCcw,
  Bell,
  Zap,
  ShoppingCart,
  Package
} from "lucide-react";
import { Select } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PerformanceChart } from "./charts/PerformanceChart";
import { VerbaUtilizationChart } from "./charts/VerbaUtilizationChart";
import { RegionalAnalysisChart } from "./charts/RegionalAnalysisChart";
import { AlertsPanel } from "./alerts/AlertsPanel";
import { KPICards } from "./kpi/KPICards";

export const DashboardMetrics = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Controlar abertura dos selects
  const [openPeriod, setOpenPeriod] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  // Controlar tab ativo
  const [activeTab, setActiveTab] = useState("performance");

  useEffect(() => {
    function handleCloseAll() {
      setOpenPeriod(false);
      setOpenRegion(false);
      setActiveTab("performance");
    }
    window.addEventListener('close-all-radix-portals', handleCloseAll);
    return () => window.removeEventListener('close-all-radix-portals', handleCloseAll);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast({
      title: "Dados atualizados",
      description: "Dashboard atualizado com os dados mais recentes.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportando dados",
      description: "Seu relatório será gerado em instantes...",
    });
  };

  const quickStats = [
    {
      title: "Verbas Processadas Hoje",
      value: "R$ 2.847.692",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "NDs Pendentes",
      value: "47",
      change: "-8.3%",
      trend: "down",
      icon: FileCheck,
      color: "text-orange-600"
    },
    {
      title: "Fornecedores Ativos",
      value: "156",
      change: "+3.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Taxa de Conversão",
      value: "94.7%",
      change: "+1.8%",
      trend: "up",
      icon: Target,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header com controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Executivo</h2>
          <p className="text-muted-foreground">Visão completa do desempenho de verbas comerciais</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            options={[
              { value: "7d", label: "Últimos 7 dias" },
              { value: "30d", label: "Últimos 30 dias" },
              { value: "90d", label: "Últimos 90 dias" },
              { value: "ytd", label: "Ano até agora" },
            ]}
            className="min-w-[140px]"
          />
          <Select
            value={selectedRegion}
            onChange={setSelectedRegion}
            options={[
              { value: "all", label: "Todas as regiões" },
              { value: "sul", label: "Sul" },
              { value: "sudeste", label: "Sudeste" },
              { value: "norte", label: "Norte" },
              { value: "nordeste", label: "Nordeste" },
              { value: "centrooeste", label: "Centro-Oeste" },
            ]}
            className="min-w-[140px]"
          />
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <Card key={stat.title} className={`hover:shadow-md transition-shadow`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI Cards */}
      <KPICards period={selectedPeriod} />

      {/* Alertas */}
      <AlertsPanel />

      {/* Gráficos principais - abas simplificadas */}
      <div className="flex gap-2 mb-2">
        <Button
          variant={activeTab === "performance" ? "default" : "outline"}
          onClick={() => setActiveTab("performance")}
        >
          Performance
        </Button>
        <Button
          variant={activeTab === "utilization" ? "default" : "outline"}
          onClick={() => setActiveTab("utilization")}
        >
          Utilização
        </Button>
        <Button
          variant={activeTab === "regional" ? "default" : "outline"}
          onClick={() => setActiveTab("regional")}
        >
          Regional
        </Button>
      </div>
      {activeTab === "performance" && (
        <div className="space-y-4">
          <PerformanceChart period={selectedPeriod} region={selectedRegion} />
        </div>
      )}
      {activeTab === "utilization" && (
        <div className="space-y-4">
          <VerbaUtilizationChart period={selectedPeriod} />
        </div>
      )}
      {activeTab === "regional" && (
        <div className="space-y-4">
          <RegionalAnalysisChart period={selectedPeriod} />
        </div>
      )}

      {/* Resumo de atividades recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Verba Samsung aprovada", time: "2 min", status: "success" },
                { action: "ND LG emitida", time: "15 min", status: "info" },
                { action: "Alerta: Verba Philips vencendo", time: "1h", status: "warning" },
                { action: "Relatório mensal gerado", time: "2h", status: "success" },
                { action: "Nova negociação Sony iniciada", time: "3h", status: "info" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-sm">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Top Fornecedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Samsung Electronics", value: "R$ 2.450.000", percentage: 92 },
                { name: "LG Brasil", value: "R$ 1.890.000", percentage: 78 },
                { name: "Sony Corporation", value: "R$ 1.560.000", percentage: 85 },
                { name: "Philips Healthcare", value: "R$ 890.000", percentage: 67 },
                { name: "Electrolux", value: "R$ 750.000", percentage: 73 }
              ].map((supplier, index) => (
                <div key={supplier.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{supplier.name}</span>
                    <span className="text-sm text-muted-foreground">{supplier.value}</span>
                  </div>
                  <Progress value={supplier.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
