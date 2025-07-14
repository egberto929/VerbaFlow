
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Target, 
  TrendingUp, 
  DollarSign,
  Timer,
  Percent,
  Users,
  BarChart3
} from "lucide-react";

interface KPICardsProps {
  period: string;
}

export const KPICards = ({ period }: KPICardsProps) => {
  const kpis = [
    {
      id: 'tmcv',
      name: 'Tempo Médio de Ciclo da Verba (TMCV)',
      description: 'Dias desde recebimento até emissão da ND',
      atual: 3.2,
      meta: 2.5,
      unidade: 'dias',
      trend: -0.3,
      status: 'warning',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'tav',
      name: 'Taxa de Acuracidade da Verba (TAV)',
      description: 'Percentual de verbas sem divergências',
      atual: 98.7,
      meta: 95.0,
      unidade: '%',
      trend: 1.2,
      status: 'success',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'iuv',
      name: 'Índice de Utilização da Verba (IUV)',
      description: 'Verba efetivamente utilizada vs disponível',
      atual: 94.3,
      meta: 90.0,
      unidade: '%',
      trend: 2.1,
      status: 'success',
      icon: Percent,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'hce',
      name: 'Horas de Comprador Economizadas (HCE)',
      description: 'Tempo economizado em tarefas operacionais',
      atual: 28,
      meta: 20,
      unidade: 'h/mês',
      trend: 3.5,
      status: 'success',
      icon: Timer,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (atual: number, meta: number, isInverse = false) => {
    if (isInverse) {
      // Para métricas onde menor é melhor (como TMCV)
      return atual <= meta ? 100 : Math.max(0, 100 - ((atual - meta) / meta) * 100);
    }
    return Math.min(100, (atual / meta) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">KPIs Estratégicos</h3>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Período: {period === '30d' ? '30 dias' : period === '7d' ? '7 dias' : period}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const isInverse = kpi.id === 'tmcv'; // TMCV é melhor quando menor
          const progress = calculateProgress(kpi.atual, kpi.meta, isInverse);
          
          return (
            <Card key={kpi.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <Badge className={getStatusBadge(kpi.status)}>
                    {kpi.status === 'success' ? 'No alvo' : 
                     kpi.status === 'warning' ? 'Atenção' : 'Crítico'}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm leading-tight mb-1">
                      {kpi.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {kpi.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold">
                        {kpi.atual}{kpi.unidade}
                      </span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp 
                          className={`h-3 w-3 ${
                            kpi.trend > 0 ? 
                            (isInverse ? 'text-red-500' : 'text-green-500') :
                            (isInverse ? 'text-green-500' : 'text-red-500')
                          }`} 
                        />
                        <span className={`text-xs ${
                          kpi.trend > 0 ? 
                          (isInverse ? 'text-red-500' : 'text-green-500') :
                          (isInverse ? 'text-green-500' : 'text-red-500')
                        }`}>
                          {Math.abs(kpi.trend)}{kpi.unidade}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Meta: {kpi.meta}{kpi.unidade}</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <Progress 
                        value={progress} 
                        className={`h-2 ${
                          kpi.status === 'success' ? '[&>div]:bg-green-500' :
                          kpi.status === 'warning' ? '[&>div]:bg-yellow-500' :
                          '[&>div]:bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
