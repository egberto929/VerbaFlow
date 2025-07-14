
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus, 
  MessageSquare,
  User,
  Calendar
} from "lucide-react";

interface HistoryItem {
  action: string;
  user: string;
  timestamp: string;
  comments?: string;
}

interface WorkflowHistoryProps {
  history: HistoryItem[];
}

export const WorkflowHistory = ({ history }: WorkflowHistoryProps) => {
  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'aprovado': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejeitado': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'em análise': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'solicitação criada': return <Plus className="h-4 w-4 text-blue-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'aprovado': return 'bg-green-50 border-green-200';
      case 'rejeitado': return 'bg-red-50 border-red-200';
      case 'em análise': return 'bg-yellow-50 border-yellow-200';
      case 'solicitação criada': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {history.map((item, index) => (
        <Card key={index} className={`${getActionColor(item.action)} transition-all hover:shadow-sm`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getActionIcon(item.action)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="font-medium">
                    {item.action}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    <span>{item.user}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {new Date(item.timestamp).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                {item.comments && (
                  <p className="text-sm text-gray-700 bg-white/50 p-2 rounded border-l-2 border-gray-300">
                    "{item.comments}"
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {history.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Nenhum histórico disponível</p>
        </div>
      )}
    </div>
  );
};
