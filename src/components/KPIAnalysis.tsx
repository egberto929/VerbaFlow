
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  DollarSign,
  Users,
  BarChart3,
  Download,
  Filter,
  Calendar
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from "recharts";

const tmcvData = [
  { month: 'Jan', tempo: 4.2, meta: 3.0 },
  { month: 'Fev', tempo: 3.8, meta: 3.0 },
  { month: 'Mar', tempo: 3.5, meta: 3.0 },
  { month: 'Abr', tempo: 3.2, meta: 3.0 },
  { month: 'Mai', tempo: 3.1, meta: 3.0 },
  { month: 'Jun', tempo: 3.2, meta: 3.0 },
];

const tavData = [
  { month: 'Jan', acuracidade: 94.2 },
  { month: 'Fev', acuracidade: 96.1 },
  { month: 'Mar', acuracidade: 97.3 },
  { month: 'Abr', acuracidade: 98.1 },
  { month: 'Mai', acuracidade: 98.7 },
  { month: 'Jun', acuracidade: 98.7 },
];

const iuvData = [
  { id: 1, month: 'Jan', utilizacao: 89.2, disponivel: 10.8 },
  { id: 2, month: 'Fev', utilizacao: 91.5, disponivel: 8.5 },
  { id: 3, month: 'Mar', utilizacao: 93.2, disponivel: 6.8 },
  { id: 4, month: 'Abr', utilizacao: 92.8, disponivel: 7.2 },
  { id: 5, month: 'Mai', utilizacao: 94.3, disponivel: 5.7 },
  { id: 6, month: 'Jun', utilizacao: 94.3, disponivel: 5.7 },
];

const hceData = [
  { id: 1, comprador: 'Anderson Silva', horasEconomizadas: 42, meta: 40 },
  { id: 2, comprador: 'Maria Santos', horasEconomizadas: 38, meta: 40 },
  { id: 3, comprador: 'João Pedro', horasEconomizadas: 45, meta: 40 },
  { id: 4, comprador: 'Ana Costa', horasEconomizadas: 31, meta: 40 },
];

export const KPIAnalysis = () => {
  const kpis = [
    {
      nome: "TMCV - Tempo Médio de Ciclo da Verba",
      valor: "3.2 dias",
      meta: "3.0 dias",
      tendencia: "down",
      performance: 93.3,
      impacto: "Reduz carga de trabalho burocrática dos compradores em 35%",
      status: "warning"
    },
    {
      nome: "TAV - Taxa de Acuracidade da Verba",
      valor: "98.7%",
      meta: "95.0%",
      tendencia: "up",
      performance: 103.9,
      impacto: "Evita perdas financeiras de R$ 3.9M anuais",
      status: "success"
    },
    {
      nome: "IUV - Índice de Utilização da Verba",
      valor: "94.3%",
      meta: "90.0%",
      tendencia: "up",
      performance: 104.8,
      impacto: "Maximiza ROI de verbas comerciais",
      status: "success"
    },
    {
      nome: "HCE - Horas de Comprador Economizadas",
      valor: "156h/mês",
      meta: "120h/mês",
      tendencia: "up",
      performance: 130.0,
      impacto: "Libera compradores para atividades estratégicas",
      status: "success"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (tendencia: string) => {
    return tendencia === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  console.log('iuvData', iuvData);
  console.log('hceData', hceData);
  const iuvDataValid = iuvData.filter(
    d => d.month && d.utilizacao != null && d.disponivel != null
  );
  const hceDataValid = hceData.filter(
    d => d.comprador && d.horasEconomizadas != null && d.meta != null
  );
  console.log('iuvDataValid', iuvDataValid);
  console.log('hceDataValid', hceDataValid);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Análise de KPIs</h2>
          <p className="text-muted-foreground">Indicadores de performance mensurável do VerbaFlow</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Período
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{kpi.nome}</CardTitle>
                  <CardDescription className="mt-1">{kpi.impacto}</CardDescription>
                </div>
                <Badge className={getStatusColor(kpi.status)}>
                  {kpi.performance.toFixed(1)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold">{kpi.valor}</p>
                  <p className="text-sm text-muted-foreground">Meta: {kpi.meta}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(kpi.tendencia)}
                  <span className="text-sm font-medium">
                    {kpi.performance > 100 ? '+' : ''}{(kpi.performance - 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${kpi.performance >= 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${Math.min(kpi.performance, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos Detalhados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TMCV Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Evolução TMCV</span>
            </CardTitle>
            <CardDescription>Tempo médio de ciclo das verbas por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tmcvData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tempo" stroke="#f59e0b" strokeWidth={3} name="Tempo Real" />
                <Line type="monotone" dataKey="meta" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* TAV Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Taxa de Acuracidade</span>
            </CardTitle>
            <CardDescription>Evolução da precisão no controle de verbas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={tavData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="acuracidade" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* IUV Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Índice de Utilização</span>
            </CardTitle>
            <CardDescription>Aproveitamento das verbas disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={iuvDataValid}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilizacao" fill="#3b82f6" name="Utilizada" isAnimationActive={false} />
                <Bar dataKey="disponivel" fill="#e5e7eb" name="Disponível" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* HCE by Buyer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Horas Economizadas por Comprador</span>
            </CardTitle>
            <CardDescription>Produtividade individual dos compradores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hceDataValid} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="comprador" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="horasEconomizadas" fill="#8b5cf6" name="Horas Economizadas" isAnimationActive={false} />
                <Bar dataKey="meta" fill="#e5e7eb" name="Meta" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Benefícios Estratégicos */}
      <Card>
        <CardHeader>
          <CardTitle>Benefícios Estratégicos Holísticos</CardTitle>
          <CardDescription>Impacto transformacional do Gazin VerbaFlow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900">Agilidade de Mercado</h3>
              <p className="text-sm text-blue-700 mt-1">Resposta instantânea às dinâmicas do mercado</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900">Otimização de Capital</h3>
              <p className="text-sm text-green-700 mt-1">Maximização do ROI em verbas comerciais</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900">Redução de Riscos</h3>
              <p className="text-sm text-purple-700 mt-1">Mitigação de riscos financeiros e conformidade</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-900">Empoderamento da Equipe</h3>
              <p className="text-sm text-orange-700 mt-1">Transformação em parceiros estratégicos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
