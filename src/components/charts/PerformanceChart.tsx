
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

interface PerformanceChartProps {
  period: string;
  region: string;
}

export const PerformanceChart = ({ period, region }: PerformanceChartProps) => {
  const performanceData = [
    { month: 'Jan', verbas: 2400000, nds: 2200000, economia: 45 },
    { month: 'Fev', verbas: 2800000, nds: 2650000, economia: 52 },
    { month: 'Mar', verbas: 3200000, nds: 3100000, economia: 48 },
    { month: 'Abr', verbas: 2900000, nds: 2750000, economia: 58 },
    { month: 'Mai', verbas: 3500000, nds: 3400000, economia: 62 },
    { month: 'Jun', verbas: 3800000, nds: 3650000, economia: 67 }
  ];

  const kpiData = [
    { name: 'TMCV', atual: 3.2, meta: 2.5, unidade: 'dias' },
    { name: 'TAV', atual: 98.7, meta: 95.0, unidade: '%' },
    { name: 'IUV', atual: 94.3, meta: 90.0, unidade: '%' },
    { name: 'HCE', atual: 28, meta: 20, unidade: 'h/mês' }
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Financeira</CardTitle>
            <CardDescription>Verbas processadas vs NDs emitidas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`} />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `R$ ${(value / 1000000).toFixed(2)}M`, 
                    name === 'verbas' ? 'Verbas' : 'NDs Emitidas'
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="verbas"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Verbas"
                />
                <Area
                  type="monotone"
                  dataKey="nds"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="NDs Emitidas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horas Economizadas</CardTitle>
            <CardDescription>Tempo poupado por compradores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} horas`, 'Horas Economizadas']} />
                <Line 
                  type="monotone" 
                  dataKey="economia" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>KPIs Estratégicos</CardTitle>
          <CardDescription>Indicadores de performance vs metas estabelecidas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={kpiData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={60} />
              <Tooltip 
                formatter={(value: number, name: string, props: any) => [
                  `${value}${props.payload.unidade}`,
                  name === 'atual' ? 'Atual' : 'Meta'
                ]}
              />
              <Legend />
              <Bar 
                dataKey="atual" 
                fill="#3b82f6" 
                name="Atual"
                radius={[0, 4, 4, 0]}
              />
              <Bar 
                dataKey="meta" 
                fill="#e5e7eb" 
                name="Meta"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
