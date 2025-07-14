
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Percent,
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimulationResult {
  custoFinal: number;
  precoVenda: number;
  margemBruta: number;
  margemPercentual: number;
  verbasAplicadas: number;
  impostos: number;
  lucratividade: 'alta' | 'média' | 'baixa';
}

export const CostSimulator = () => {
  const { toast } = useToast();
  const [simulationData, setSimulationData] = useState({
    custoInicial: "",
    verba: "",
    tipoVerba: "percentual",
    margem: "",
    estado: "SP",
    canal: "varejo",
    categoria: "eletronicos"
  });
  
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [historico, setHistorico] = useState<Array<{
    id: string;
    produto: string;
    custoInicial: number;
    custoFinal: number;
    precoVenda: number;
    margem: number;
    data: string;
  }>>([]);

  const impostosPorEstado = {
    'SP': 0.18,
    'RJ': 0.20,
    'MG': 0.18,
    'RS': 0.17,
    'PR': 0.18,
    'SC': 0.17,
    'BA': 0.19,
    'GO': 0.17
  };

  const [openEstado, setOpenEstado] = useState(false);
  const [openCanal, setOpenCanal] = useState(false);
  const [activeTab, setActiveTab] = useState("simulador");

  useEffect(() => {
    function handleCloseAll() {
      setOpenEstado(false);
      setOpenCanal(false);
    }
    window.addEventListener('close-all-radix-portals', handleCloseAll);
    return () => window.removeEventListener('close-all-radix-portals', handleCloseAll);
  }, []);

  const handleSimulate = () => {
    const custoInicial = parseFloat(simulationData.custoInicial);
    const verba = parseFloat(simulationData.verba);
    const margemDesejada = parseFloat(simulationData.margem);

    if (!custoInicial || !verba || !margemDesejada) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Cálculo da verba aplicada
    let verbasAplicadas = 0;
    if (simulationData.tipoVerba === "percentual") {
      verbasAplicadas = custoInicial * (verba / 100);
    } else {
      verbasAplicadas = verba;
    }

    // Custo final após aplicação da verba
    const custoFinal = custoInicial - verbasAplicadas;

    // Cálculo de impostos baseado no estado
    const aliquotaImposto = impostosPorEstado[simulationData.estado as keyof typeof impostosPorEstado] || 0.18;
    const impostos = custoFinal * aliquotaImposto;

    // Preço de venda com margem desejada
    const precoVenda = custoFinal * (1 + margemDesejada / 100);

    // Margem bruta
    const margemBruta = precoVenda - custoFinal - impostos;
    const margemPercentual = (margemBruta / precoVenda) * 100;

    // Análise de lucratividade
    let lucratividade: 'alta' | 'média' | 'baixa' = 'baixa';
    if (margemPercentual >= 30) lucratividade = 'alta';
    else if (margemPercentual >= 15) lucratividade = 'média';

    const simulationResult: SimulationResult = {
      custoFinal,
      precoVenda,
      margemBruta,
      margemPercentual,
      verbasAplicadas,
      impostos,
      lucratividade
    };

    setResult(simulationResult);

    // Adicionar ao histórico
    const novoHistorico = {
      id: `SIM${Date.now()}`,
      produto: `Produto ${historico.length + 1}`,
      custoInicial,
      custoFinal,
      precoVenda,
      margem: margemPercentual,
      data: new Date().toLocaleDateString('pt-BR')
    };
    setHistorico([novoHistorico, ...historico]);

    toast({
      title: "Simulação concluída",
      description: `Margem calculada: ${margemPercentual.toFixed(2)}%`,
    });
  };

  const getLucratividade = (tipo: string) => {
    switch (tipo) {
      case 'alta':
        return { color: 'text-green-600', icon: <CheckCircle className="h-4 w-4" />, label: 'Alta' };
      case 'média':
        return { color: 'text-yellow-600', icon: <AlertCircle className="h-4 w-4" />, label: 'Média' };
      case 'baixa':
        return { color: 'text-red-600', icon: <AlertCircle className="h-4 w-4" />, label: 'Baixa' };
      default:
        return { color: 'text-gray-600', icon: <AlertCircle className="h-4 w-4" />, label: 'N/A' };
    }
  };

  const resetSimulation = () => {
    setSimulationData({
      custoInicial: "",
      verba: "",
      tipoVerba: "percentual",
      margem: "",
      estado: "SP",
      canal: "varejo",
      categoria: "eletronicos"
    });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Simulador de Custos e Preços</h2>
        <p className="text-muted-foreground">Calcule custos, preços e margens considerando verbas e impostos</p>
      </div>

      {/* Abas simplificadas */}
      <div className="flex gap-2 mb-2">
        <Button
          variant={activeTab === "simulador" ? "default" : "outline"}
          onClick={() => setActiveTab("simulador")}
        >
          Simulador
        </Button>
        <Button
          variant={activeTab === "historico" ? "default" : "outline"}
          onClick={() => setActiveTab("historico")}
        >
          Histórico
        </Button>
      </div>
      {activeTab === "simulador" && (
        <div className="space-y-6">
          {/* Formulário de Simulação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Parâmetros da Simulação</span>
              </CardTitle>
              <CardDescription>Configure os dados para calcular o preço final</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="custoInicial">Custo Inicial (R$)</Label>
                  <Input
                    id="custoInicial"
                    type="number"
                    placeholder="0,00"
                    value={simulationData.custoInicial}
                    onChange={(e) => setSimulationData({...simulationData, custoInicial: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margem">Margem Desejada (%)</Label>
                  <Input
                    id="margem"
                    type="number"
                    placeholder="0,00"
                    value={simulationData.margem}
                    onChange={(e) => setSimulationData({...simulationData, margem: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoVerba">Tipo de Verba</Label>
                  <Select
                    value={simulationData.tipoVerba}
                    onChange={(value) => setSimulationData({ ...simulationData, tipoVerba: value })}
                    options={[
                      { value: "percentual", label: "Percentual (%)" },
                      { value: "fixo", label: "Valor Fixo (R$)" },
                    ]}
                    className="min-w-[140px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verba">
                    Verba {simulationData.tipoVerba === 'percentual' ? '(%)' : '(R$)'}
                  </Label>
                  <Input
                    id="verba"
                    type="number"
                    placeholder={simulationData.tipoVerba === 'percentual' ? '0,00' : '0,00'}
                    value={simulationData.verba}
                    onChange={(e) => setSimulationData({...simulationData, verba: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select
                    value={simulationData.estado}
                    onChange={(value) => setSimulationData({ ...simulationData, estado: value })}
                    options={[
                      { value: "SP", label: "São Paulo (18%)" },
                      { value: "RJ", label: "Rio de Janeiro (20%)" },
                      { value: "MG", label: "Minas Gerais (18%)" },
                      { value: "RS", label: "Rio Grande do Sul (17%)" },
                      { value: "PR", label: "Paraná (18%)" },
                      { value: "SC", label: "Santa Catarina (17%)" },
                      { value: "BA", label: "Bahia (19%)" },
                      { value: "GO", label: "Goiás (17%)" },
                    ]}
                    className="min-w-[140px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="canal">Canal</Label>
                  <Select
                    value={simulationData.canal}
                    onChange={(value) => setSimulationData({ ...simulationData, canal: value })}
                    options={[
                      { value: "varejo", label: "Varejo" },
                      { value: "atacado", label: "Atacado" },
                    ]}
                    className="min-w-[140px]"
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleSimulate} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Simular
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resultado da Simulação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Resultado da Simulação</span>
              </CardTitle>
              <CardDescription>Análise detalhada do cálculo</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Custo Final</p>
                      <p className="text-xl font-bold text-blue-600">
                        R$ {result.custoFinal.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Preço de Venda</p>
                      <p className="text-xl font-bold text-green-600">
                        R$ {result.precoVenda.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Verbas Aplicadas:</span>
                      <span className="font-semibold">R$ {result.verbasAplicadas.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Impostos ({impostosPorEstado[simulationData.estado as keyof typeof impostosPorEstado] * 100}%):</span>
                      <span className="font-semibold">R$ {result.impostos.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Margem Bruta:</span>
                      <span className="font-semibold">R$ {result.margemBruta.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span>Margem Percentual:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">{result.margemPercentual.toFixed(2)}%</span>
                        <Badge variant="outline" className={getLucratividade(result.lucratividade).color}>
                          {getLucratividade(result.lucratividade).icon}
                          <span className="ml-1">{getLucratividade(result.lucratividade).label}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configure os parâmetros e clique em "Simular" para ver os resultados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === "historico" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Simulações</CardTitle>
              <CardDescription>Últimas simulações realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              {historico.length > 0 ? (
                <div className="space-y-4">
                  {historico.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{item.produto}</h4>
                        <p className="text-sm text-muted-foreground">Simulado em {item.data}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {item.precoVenda.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Margem: {item.margem.toFixed(2)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma simulação realizada ainda</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
