
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface VerbaUtilizationChartProps {
  period: string;
}

export const VerbaUtilizationChart = ({ period }: VerbaUtilizationChartProps) => {
  const utilizationData = [
    { name: 'Utilizada', value: 76.8, color: '#10b981' },
    { name: 'Disponível', value: 23.2, color: '#e5e7eb' }
  ];

  const categoryData = [
    { categoria: 'Eletrônicos', utilizada: 89, disponivel: 11, total: 4200000 },
    { categoria: 'Eletrodomésticos', utilizada: 78, disponivel: 22, total: 3800000 },
    { categoria: 'Informática', utilizada: 92, disponivel: 8, total: 2900000 },
    { categoria: 'Telefonia', utilizada: 85, disponivel: 15, total: 2100000 },
    { categoria: 'Games', utilizada: 67, disponivel: 33, total: 1500000 }
  ];

  const channelData = [
    { canal: 'Varejo', utilizacao: 82.5, meta: 85 },
    { canal: 'Atacado', utilizacao: 94.3, meta: 90 },
    { canal: 'E-commerce', utilizacao: 76.8, meta: 80 }
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Utilização Geral de Verbas</CardTitle>
            <CardDescription>Percentual de verbas utilizadas vs disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={utilizationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {utilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilização por Canal</CardTitle>
            <CardDescription>Performance vs metas por canal de venda</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="canal" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`]} />
                <Legend />
                <Bar 
                  dataKey="utilizacao" 
                  fill="#3b82f6" 
                  name="Utilização Atual"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="meta" 
                  fill="#10b981" 
                  name="Meta"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Utilização por Categoria</CardTitle>
          <CardDescription>Análise detalhada de verbas por categoria de produto</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name === 'utilizada' ? 'Utilizada' : 'Disponível'
                ]}
              />
              <Legend />
              <Bar 
                dataKey="utilizada" 
                stackId="a" 
                fill="#10b981" 
                name="Utilizada"
              />
              <Bar 
                dataKey="disponivel" 
                stackId="a" 
                fill="#e5e7eb" 
                name="Disponível"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
