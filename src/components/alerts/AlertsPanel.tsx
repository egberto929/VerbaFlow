
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle, XCircle, Bell, Eye, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AlertsPanel = () => {
  const { toast } = useToast();

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Verba Samsung vencendo em 5 dias",
      description: "Verba de R$ 450.000 expira em 15/07/2024",
      priority: "high",
      time: "2h",
      actionable: true
    },
    {
      id: 2,
      type: "error",
      title: "ND Philips pendente há 7 dias",
      description: "R$ 89.000 aguardando aprovação financeira",
      priority: "high",
      time: "1d",
      actionable: true
    },
    {
      id: 3,
      type: "info",
      title: "Nova carta LG recebida",
      description: "Verba de 2.5% sobre compras de TV",
      priority: "medium",
      time: "3h",
      actionable: false
    },
    {
      id: 4,
      type: "success",
      title: "Meta TMCV atingida",
      description: "Tempo médio atual: 2.8 dias (meta: 3.0)",
      priority: "low",
      time: "1d",
      actionable: false
    },
    {
      id: 5,
      type: "warning",
      title: "Utilização baixa - Categoria Games",
      description: "Apenas 67% das verbas utilizadas este mês",
      priority: "medium",
      time: "4h",
      actionable: true
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleViewAlert = (alertId: number) => {
    toast({
      title: "Visualizando alerta",
      description: `Abrindo detalhes do alerta #${alertId}`,
    });
  };

  const handleResolveAlert = (alertId: number) => {
    toast({
      title: "Alerta resolvido",
      description: "O alerta foi marcado como resolvido.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Alertas e Notificações
            </CardTitle>
            <CardDescription>
              Acompanhe eventos importantes que requerem atenção
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            {alerts.filter(a => a.priority === 'high').length} críticos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start space-x-3 flex-1">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(alert.priority)}`}
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {alert.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>há {alert.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewAlert(alert.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {alert.actionable && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleResolveAlert(alert.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Resolver
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
