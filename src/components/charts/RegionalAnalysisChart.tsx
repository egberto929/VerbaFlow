
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ComposedChart, Area } from 'recharts';

interface RegionalAnalysisChartProps {
  period: string;
}

export const RegionalAnalysisChart = ({ period }: RegionalAnalysisChartProps) => {
  const regionalData = [
    {
      regiao: 'Sul',
      verbas: 1850000,
      nds: 1720000,
      utilizacao: 93.0,
      fornecedores: 45,
      crescimento: 12.5
    },
    {
      regiao: 'Sudeste',
      verbas: 2400000,
      nds: 2180000,
      utilizacao: 90.8,
      fornecedores: 62,
      crescimento: 8.3
    },
    {
      regiao: 'Nordeste',
      verbas: 1200000,
      nds: 1050000,
      utilizacao: 87.5,
      fornecedores: 28,
      crescimento: 15.2
    },
    {
      regiao: 'Centro-Oeste',
      verbas: 890000,
      nds: 780000,
      utilizacao: 87.6,
      fornecedores: 19,
      crescimento: 18.7
    },
    {
      regiao: 'Norte',
      verbas: 580000,
      nds: 495000,
      utilizacao: 85.3,
      fornecedores: 12,
      crescimento: 22.1
    }
  ];

  const monthlyRegionalData = [
    { mes: 'Jan', sul: 1650000, sudeste: 2100000, nordeste: 980000, centrooeste: 750000, norte: 420000 },
    { mes: 'Fev', sul: 1720000, sudeste: 2200000, nordeste: 1050000, centrooeste: 780000, norte: 450000 },
    { mes: 'Mar', sul: 1850000, sudeste: 2400000, nordeste: 1200000, centrooeste: 890000, norte: 580000 },
    { mes: 'Abr', sul: 1780000, sudeste: 2300000, nordeste: 1150000, centrooeste: 850000, norte: 560000 },
    { mes: 'Mai', sul: 1920000, sudeste: 2550000, nordeste: 1280000, centrooeste: 920000, norte: 610000 },
    { mes: 'Jun', sul: 2050000, sudeste: 2700000, nordeste: 1350000, centrooeste: 980000, norte: 650000 }
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Regional</CardTitle>
            <CardDescription>Verbas processadas e utilização por região</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="regiao" />
                <YAxis yAxisId="left" tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`} />
                <YAxis yAxisId="right" orientation="right" domain={[80, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'utilizacao') return [`${value}%`, 'Utilização'];
                    return [`R$ ${(value / 1000000).toFixed(2)}M`, name === 'verbas' ? 'Verbas' : 'NDs Emitidas'];
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="verbas" fill="#3b82f6" name="Verbas" />
                <Bar yAxisId="left" dataKey="nds" fill="#10b981" name="NDs Emitidas" />
                <Line yAxisId="right" type="monotone" dataKey="utilizacao" stroke="#f59e0b" strokeWidth={3} name="Utilização %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crescimento Regional</CardTitle>
            <CardDescription>Taxa de crescimento e número de fornecedores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="regiao" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'crescimento' ? `${value}%` : `${value}`,
                    name === 'crescimento' ? 'Crescimento' : 'Fornecedores'
                  ]}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="fornecedores" fill="#8b5cf6" name="Fornecedores" />
                <Line yAxisId="right" type="monotone" dataKey="crescimento" stroke="#ef4444" strokeWidth={3} name="Crescimento %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução Mensal por Região</CardTitle>
          <CardDescription>Acompanhamento do volume de verbas ao longo dos meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyRegionalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value: number) => `R$ ${(value / 1000000).toFixed(2)}M`} />
              <Legend />
              <Line type="monotone" dataKey="sul" stroke="#3b82f6" strokeWidth={2} name="Sul" />
              <Line type="monotone" dataKey="sudeste" stroke="#10b981" strokeWidth={2} name="Sudeste" />
              <Line type="monotone" dataKey="nordeste" stroke="#f59e0b" strokeWidth={2} name="Nordeste" />
              <Line type="monotone" dataKey="centrooeste" stroke="#8b5cf6" strokeWidth={2} name="Centro-Oeste" />
              <Line type="monotone" dataKey="norte" stroke="#ef4444" strokeWidth={2} name="Norte" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
