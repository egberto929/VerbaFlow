import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Bot,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useToast } from "@/hooks/use-toast";

interface Prediction {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'risk' | 'opportunity' | 'trend';
  timeline: string;
  recommendations: string[];
  data?: any[];
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'anomaly' | 'pattern' | 'correlation' | 'forecast';
  severity: 'critical' | 'high' | 'medium' | 'low';
  action: string;
  value: string;
}

const predictionsData: Prediction[] = [
  {
    id: 'PRED001',
    title: 'Aumento de Demanda Samsung Q4',
    description: 'Análise indica aumento de 35% na demanda por verbas Samsung no Q4',
    confidence: 87,
    impact: 'high',
    category: 'opportunity',
    timeline: '3 meses',
    recommendations: [
      'Negociar verbas adicionais com Samsung',
      'Preparar campanhas promocionais específicas',
      'Aumentar estoque de produtos Samsung'
    ],
    data: [
      { month: 'Jul', atual: 45, previsto: 45 },
      { month: 'Ago', atual: 52, previsto: 50 },
      { month: 'Set', atual: null, previsto: 58 },
      { month: 'Out', atual: null, previsto: 68 },
      { month: 'Nov', atual: null, previsto: 78 },
      { month: 'Dez', atual: null, previsto: 85 }
    ]
  },
  {
    id: 'PRED002',
    title: 'Risco de Não Utilização - Philips',
    description: 'Modelo prevê 78% de chance de subutilização da verba Philips',
    confidence: 78,
    impact: 'medium',
    category: 'risk',
    timeline: '6 semanas',
    recommendations: [
      'Ativar campanhas promocionais urgentes',
      'Renegociar prazo com fornecedor',
      'Transferir parte da verba para outros produtos'
    ]
  },
  {
    id: 'PRED003',
    title: 'Otimização de TMCV',
    description: 'IA identifica oportunidade de reduzir TMCV em 0.8 dias',
    confidence: 92,
    impact: 'medium',
    category: 'performance',
    timeline: '2 meses',
    recommendations: [
      'Automatizar aprovações de baixo valor',
      'Implementar aprovação paralela',
      'Otimizar fluxo de documentação'
    ]
  }
];

const insightsData: Insight[] = [
  {
    id: 'INS001',
    title: 'Anomalia Detectada - Verbas LG',
    description: 'Padrão atípico no uso de verbas LG nas últimas 2 semanas',
    type: 'anomaly',
    severity: 'high',
    action: 'Investigar campanhas recentes da LG',
    value: '+145% acima da média'
  },
  {
    id: 'INS002',
    title: 'Correlação Sazonal Identificada',
    description: 'Forte correlação entre Black Friday e aumento de 65% em verbas',
    type: 'pattern',
    severity: 'medium',
    action: 'Preparar estratégia para Black Friday 2024',
    value: '65% de aumento histórico'
  },
  {
    id: 'INS003',
    title: 'Previsão de Gargalos',
    description: 'Modelo indica possível gargalo no workflow de aprovação',
    type: 'forecast',
    severity: 'critical',
    action: 'Reforçar equipe de aprovação',
    value: 'Setembro 2024'
  }
];

export const AIAnalytics = () => {
  const { toast } = useToast();
  const [predictions, setPredictions] = useState<Prediction[]>(predictionsData);
  const [insights, setInsights] = useState<Insight[]>(insightsData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("predictions");

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'opportunity': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'risk': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'performance': return <Target className="h-4 w-4 text-blue-500" />;
      case 'trend': return <Activity className="h-4 w-4 text-purple-500" />;
      default: return <Brain className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    toast({
      title: "Análise Concluída",
      description: "IA analisou 12 meses de dados e gerou 3 novas previsões.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Análise Preditiva com IA</h2>
            <p className="text-muted-foreground">Insights inteligentes para tomada de decisão estratégica</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={runAnalysis}
            disabled={isAnalyzing}
          >
            <Sparkles className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-pulse' : ''}`} />
            {isAnalyzing ? 'Analisando...' : 'Executar Análise'}
          </Button>
          <Button size="sm">
            <Bot className="h-4 w-4 mr-2" />
            Configurar IA
          </Button>
        </div>
      </div>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Precisão Geral</p>
                <p className="text-3xl font-bold">94.2%</p>
              </div>
              <Target className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Oportunidades</p>
                <p className="text-3xl font-bold">7</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Riscos Detectados</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Economia Prevista</p>
                <p className="text-3xl font-bold">R$ 2.8M</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abas simplificadas */}
      <div className="flex gap-2 mb-2">
        <Button
          variant={activeTab === "predictions" ? "default" : "outline"}
          onClick={() => setActiveTab("predictions")}
        >
          Previsões
        </Button>
        <Button
          variant={activeTab === "insights" ? "default" : "outline"}
          onClick={() => setActiveTab("insights")}
        >
          Insights
        </Button>
        <Button
          variant={activeTab === "models" ? "default" : "outline"}
          onClick={() => setActiveTab("models")}
        >
          Modelos
        </Button>
      </div>
      {activeTab === "predictions" && (
        <div className="space-y-4">
          <div className="grid gap-6">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(prediction.category)}
                      <div>
                        <h3 className="font-semibold text-lg">{prediction.title}</h3>
                        <p className="text-muted-foreground">{prediction.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getImpactColor(prediction.impact)}>
                        {prediction.impact === 'high' ? 'Alto Impacto' : 
                         prediction.impact === 'medium' ? 'Médio Impacto' : 'Baixo Impacto'}
                      </Badge>
                      <Badge variant="outline">
                        {prediction.confidence}% confiança
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Recomendações da IA:</h4>
                      <ul className="space-y-2">
                        {prediction.recommendations.map((rec) => (
                          <li key={rec} className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {prediction.data && (
                      <div>
                        <h4 className="font-medium mb-3">Projeção Temporal:</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={prediction.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="atual" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                            <Area type="monotone" dataKey="previsto" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeDasharray="5 5" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Horizonte: {prediction.timeline}</span>
                      <span>Categoria: {prediction.category}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                      <Button size="sm">
                        Aplicar Ações
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {activeTab === "insights" && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getSeverityColor(insight.severity)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {insight.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium">Valor:</span> {insight.value}
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {activeTab === "models" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Modelos Ativos</CardTitle>
                <CardDescription>Algoritmos de IA em produção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Previsão de Demanda</p>
                      <p className="text-sm text-muted-foreground">Random Forest + LSTM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">96.2%</p>
                      <p className="text-xs text-muted-foreground">Precisão</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Detecção de Anomalias</p>
                      <p className="text-sm text-muted-foreground">Isolation Forest</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">91.8%</p>
                      <p className="text-xs text-muted-foreground">Precisão</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Otimização de Fluxo</p>
                      <p className="text-sm text-muted-foreground">Reinforcement Learning</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">88.5%</p>
                      <p className="text-xs text-muted-foreground">Eficiência</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance dos Modelos</CardTitle>
                <CardDescription>Métricas de qualidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Precisão Geral</span>
                      <span>94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Recall</span>
                      <span>89.7%</span>
                    </div>
                    <Progress value={89.7} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>F1-Score</span>
                      <span>91.8%</span>
                    </div>
                    <Progress value={91.8} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tempo de Resposta</span>
                      <span>1.2s</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
      )}
    </div>
  );
};
