
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent,
  BarChart3,
  PieChart,
  Users,
  Calendar
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPie, Cell, Pie, LineChart, Line } from 'recharts';

interface Verba {
  id: string;
  fornecedor: string;
  tipo: 'carta' | 'percentual' | 'fixo';
  valor: number;
  status: 'ativa' | 'pendente' | 'vencida' | 'utilizada';
  utilizacao: number;
  responsavel: string;
  categoria?: string;
  regiao?: string;
  canal: 'varejo' | 'atacado' | 'ambos';
}

interface VerbaAnalyticsProps {
  verbas: Verba[];
}

export const VerbaAnalytics = ({ verbas }: VerbaAnalyticsProps) => {
  // Análise por categoria
  const categoryAnalysis = verbas.reduce((acc, verba) => {
    const categoria = verba.categoria || 'Outros';
    if (!acc[categoria]) {
      acc[categoria] = { total: 0, utilizacao: 0, count: 0 };
    }
    acc[categoria].count++;
    acc[categoria].utilizacao += verba.utilizacao;
    if (verba.tipo !== 'percentual') {
      acc[categoria].total += verba.valor;
    }
    return acc;
  }, {} as Record<string, { total: number; utilizacao: number; count: number }>);

  const categoryData = Object.entries(categoryAnalysis).map(([categoria, data]) => ({
    categoria,
    valor: data.total,
    utilizacao: Math.round(data.utilizacao / data.count),
    quantidade: data.count
  }));

  // Análise por fornecedor (top 5)
  const supplierAnalysis = verbas.reduce((acc, verba) => {
    if (!acc[verba.fornecedor]) {
      acc[verba.fornecedor] = { total: 0, utilizacao: 0, count: 0 };
    }
    acc[verba.fornecedor].count++;
    acc[verba.fornecedor].utilizacao += verba.utilizacao;
    if (verba.tipo !== 'percentual') {
      acc[verba.fornecedor].total += verba.valor;
    }
    return acc;
  }, {} as Record<string, { total: number; utilizacao: number; count: number }>);

  const topSuppliers = Object.entries(supplierAnalysis)
    .map(([fornecedor, data]) => ({
      fornecedor,
      valor: data.total,
      utilizacao: Math.round(data.utilizacao / data.count),
      quantidade: data.count
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5);

  // Análise por status
  const statusData = [
    { name: 'Ativas', value: verbas.filter(v => v.status === 'ativa').length, color: '#10b981' },
    { name: 'Pendentes', value: verbas.filter(v => v.status === 'pendente').length, color: '#f59e0b' },
    { name: 'Vencidas', value: verbas.filter(v => v.status === 'vencida').length, color: '#ef4444' },
    { name: 'Utilizadas', value: verbas.filter(v => v.status === 'utilizada').length, color: '#3b82f6' }
  ];

  // Análise por canal
  const canalData = [
    { 
      canal: 'Varejo', 
      quantidade: verbas.filter(v => v.canal === 'varejo').length,
      utilizacao: Math.round(verbas.filter(v => v.canal === 'varejo').reduce((acc, v) => acc + v.utilizacao, 0) / verbas.filter(v => v.canal === 'varejo').length || 0)
    },
    { 
      canal: 'Atacado', 
      quantidade: verbas.filter(v => v.canal === 'atacado').length,
      utilizacao: Math.round(verbas.filter(v => v.canal === 'atacado').reduce((acc, v) => acc + v.utilizacao, 0) / verbas.filter(v => v.canal === 'atacado').length || 0)
    },
    { 
      canal: 'Ambos', 
      quantidade: verbas.filter(v => v.canal === 'ambos').length,
      utilizacao: Math.round(verbas.filter(v => v.canal === 'ambos').reduce((acc, v) => acc + v.utilizacao, 0) / verbas.filter(v => v.canal === 'ambos').length || 0)
    }
  ];

  const utilizacaoMedia = Math.round(verbas.reduce((acc, v) => acc + v.utilizacao, 0) / verbas.length);
  const valorTotal = verbas.reduce((acc, v) => acc + (v.tipo !== 'percentual' ? v.valor : 0), 0);

  return (
    <div className="space-y-6">
      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">R$ {(valorTotal / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-muted-foreground">Valor Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Percent className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{utilizacaoMedia}%</p>
            <p className="text-sm text-muted-foreground">Utilização Média</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{new Set(verbas.map(v => v.responsavel)).size}</p>
            <p className="text-sm text-muted-foreground">Compradores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{verbas.length}</p>
            <p className="text-sm text-muted-foreground">Total de Verbas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Análise por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Performance por Categoria</CardTitle>
            <CardDescription>Valor e utilização das verbas por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" angle={-45} textAnchor="end" height={100} />
                <YAxis yAxisId="left" tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'utilizacao') return [`${value}%`, 'Utilização'];
                    return [`R$ ${(value as number / 1000000).toFixed(2)}M`, 'Valor'];
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="valor" fill="#3b82f6" name="Valor" />
                <Bar yAxisId="right" dataKey="utilizacao" fill="#10b981" name="Utilização %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Status */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
            <CardDescription>Proporção de verbas por status atual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Fornecedores</CardTitle>
            <CardDescription>Maiores valores em verbas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSuppliers.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{supplier.fornecedor}</p>
                      <p className="text-sm text-muted-foreground">
                        {supplier.quantidade} verba{supplier.quantidade !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">R$ {(supplier.valor / 1000000).toFixed(2)}M</p>
                    <p className="text-sm text-muted-foreground">{supplier.utilizacao}% utilizado</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance por Canal */}
        <Card>
          <CardHeader>
            <CardTitle>Performance por Canal</CardTitle>
            <CardDescription>Quantidade e utilização por canal de venda</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={canalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="canal" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="quantidade" fill="#8b5cf6" name="Quantidade" />
                <Bar yAxisId="right" dataKey="utilizacao" fill="#f59e0b" name="Utilização %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
