
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Target,
  Percent,
  Users
} from "lucide-react";

interface Verba {
  id: string;
  status: 'ativa' | 'pendente' | 'vencida' | 'utilizada';  
  valor: number;
  tipo: 'carta' | 'percentual' | 'fixo';
  utilizacao: number;
  responsavel: string;
}

interface VerbaStatsProps {
  verbas: Verba[];
}

export const VerbaStats = ({ verbas }: VerbaStatsProps) => {
  const stats = [
    {
      title: "Verbas Ativas",
      value: verbas.filter(v => v.status === 'ativa').length,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      change: "+8%"
    },
    {
      title: "Pendentes",
      value: verbas.filter(v => v.status === 'pendente').length,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      change: "-12%"
    },
    {
      title: "Vencidas",
      value: verbas.filter(v => v.status === 'vencida').length,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-50",
      change: "-25%"
    },
    {
      title: "Valor Total",
      value: `R$ ${(verbas.reduce((acc, v) => acc + (v.tipo !== 'percentual' ? v.valor : 0), 0) / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      change: "+15%"
    },
    {
      title: "Utilização Média",
      value: `${(verbas.reduce((acc, v) => acc + v.utilizacao, 0) / verbas.length).toFixed(1)}%`,
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      change: "+3%"
    },
    {
      title: "Compradores Ativos",
      value: new Set(verbas.map(v => v.responsavel)).size,
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      change: "+2"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <TrendingUp className={`h-3 w-3 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`} />
                <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
