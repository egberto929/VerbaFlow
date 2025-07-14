
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Edit, 
  Eye,
  DollarSign,
  Percent,
  FileText,
  Trash2,
  Calendar,
  User,
  MapPin,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Verba {
  id: string;
  fornecedor: string;
  tipo: 'carta' | 'percentual' | 'fixo';
  valor: number;
  status: 'ativa' | 'pendente' | 'vencida' | 'utilizada';
  dataInicio: string;
  dataFim: string;
  canal: 'varejo' | 'atacado' | 'ambos';
  utilizacao: number;
  responsavel: string;
  categoria?: string;
  regiao?: string;
  observacoes?: string;
}

interface VerbaListProps {
  verbas: Verba[];
  onEdit: (verba: Verba) => void;
  onDelete: (id: string) => void;
}

export const VerbaList = ({ verbas, onEdit, onDelete }: VerbaListProps) => {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-500';
      case 'pendente': return 'bg-yellow-500';
      case 'vencida': return 'bg-red-500';
      case 'utilizada': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'carta': return <FileText className="h-4 w-4" />;
      case 'percentual': return <Percent className="h-4 w-4" />;
      case 'fixo': return <DollarSign className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatValue = (valor: number, tipo: string) => {
    if (tipo === 'percentual') {
      return `${valor}%`;
    }
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  };

  const getDaysUntilExpiration = (dataFim: string) => {
    const today = new Date();
    const endDate = new Date(dataFim);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = (verba: Verba) => {
    toast({
      title: "Detalhes da Verba",
      description: `Visualizando ${verba.fornecedor} - ${verba.id}`,
    });
  };

  if (verbas.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Nenhuma verba encontrada</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou adicione uma nova verba
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {verbas.map((verba) => {
        const daysUntilExpiration = getDaysUntilExpiration(verba.dataFim);
        const isExpiringSoon = daysUntilExpiration <= 7 && daysUntilExpiration > 0;
        
        return (
          <Card key={verba.id} className={`hover:shadow-md transition-shadow ${
            isExpiringSoon ? 'border-yellow-200 bg-yellow-50/30' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center space-x-2">
                    {getTipoIcon(verba.tipo)}
                    <Badge variant="outline" className="font-mono">
                      {verba.id}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{verba.fornecedor}</h3>
                      {isExpiringSoon && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Expira em {daysUntilExpiration}d
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{verba.responsavel}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="h-3 w-3" />
                        <span>{verba.categoria || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{verba.regiao || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{verba.canal}</span>
                      </div>
                    </div>

                    {verba.observacoes && (
                      <p className="text-sm text-muted-foreground mb-3 italic">
                        "{verba.observacoes}"
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-4 mb-2">
                    <div>
                      <p className="font-semibold text-lg">
                        {formatValue(verba.valor, verba.tipo)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {verba.dataInicio} - {verba.dataFim}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(verba.status)} text-white`}>
                      {verba.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Utilização</span>
                    <span>{verba.utilizacao}%</span>
                  </div>
                  <Progress 
                    value={verba.utilizacao} 
                    className={`h-2 ${
                      verba.utilizacao >= 80 ? '[&>div]:bg-green-500' :
                      verba.utilizacao >= 50 ? '[&>div]:bg-yellow-500' :
                      '[&>div]:bg-red-500'
                    }`}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(verba)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEdit(verba)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => onDelete(verba.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
