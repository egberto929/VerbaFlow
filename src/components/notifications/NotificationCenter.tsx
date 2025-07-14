
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  BellRing, 
  Check, 
  X, 
  Settings, 
  Mail,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  Clock,
  DollarSign,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  category: 'verba' | 'fornecedor' | 'sistema' | 'financeiro';
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

interface NotificationRule {
  id: string;
  name: string;
  description: string;
  category: string;
  channels: string[];
  enabled: boolean;
  conditions: string[];
}

const notificationsData: Notification[] = [
  {
    id: 'NOT001',
    title: 'Verba Samsung Aprovada',
    message: 'A verba de R$ 250.000 da Samsung foi aprovada e está disponível para uso.',
    type: 'success',
    timestamp: '2024-07-11 14:30',
    read: false,
    category: 'verba',
    actions: [
      { label: 'Ver Detalhes', action: 'view' },
      { label: 'Notificar Equipe', action: 'notify' }
    ]
  },
  {
    id: 'NOT002',
    title: 'Alerta: Verba Vencendo',
    message: 'A verba da Philips (VB004) vence em 3 dias. Utilize R$ 45.000 restantes.',
    type: 'warning',
    timestamp: '2024-07-11 14:15',
    read: false,
    category: 'verba'
  },
  {
    id: 'NOT003',
    title: 'Novo Fornecedor Cadastrado',
    message: 'Sony Corporation foi adicionada como novo fornecedor.',
    type: 'info',
    timestamp: '2024-07-11 13:45',
    read: true,
    category: 'fornecedor'
  },
  {
    id: 'NOT004',
    title: 'Erro de Sincronização',
    message: 'Falha na sincronização com o sistema ERP. Dados podem estar desatualizados.',
    type: 'error',
    timestamp: '2024-07-11 13:20',
    read: false,
    category: 'sistema'
  }
];

const rulesData: NotificationRule[] = [
  {
    id: 'RULE001',
    name: 'Verbas Vencendo',
    description: 'Alerta quando verbas estão próximas do vencimento',
    category: 'Verbas',
    channels: ['email', 'push', 'sms'],
    enabled: true,
    conditions: ['Vencimento em <= 7 dias', 'Valor restante > R$ 10.000']
  },
  {
    id: 'RULE002',
    name: 'Aprovações Pendentes',
    description: 'Notifica sobre verbas aguardando aprovação',
    category: 'Workflow',
    channels: ['email', 'push'],
    enabled: true,
    conditions: ['Status = Pendente', 'Tempo > 24 horas']
  },
  {
    id: 'RULE003',
    name: 'Metas de Performance',
    description: 'Alerta quando KPIs estão fora da meta',
    category: 'Performance',
    channels: ['email'],
    enabled: false,
    conditions: ['Taxa de utilização < 90%', 'TMCV > 3.5 dias']
  }
];

export const NotificationCenter = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [rules, setRules] = useState<NotificationRule[]>(rulesData);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('notifications');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <X className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'verba': return <DollarSign className="h-4 w-4" />;
      case 'fornecedor': return <Users className="h-4 w-4" />;
      case 'sistema': return <Monitor className="h-4 w-4" />;
      case 'financeiro': return <TrendingUp className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notificações marcadas",
      description: "Todas as notificações foram marcadas como lidas.",
    });
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso.",
    });
  };

  const toggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <BellRing className="h-8 w-8 text-blue-600" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Central de Notificações</h2>
            <p className="text-muted-foreground">
              {unreadCount} notificações não lidas de {notifications.length} total
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Marcar Todas como Lidas
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Abas simplificadas */}
      <div className="flex gap-2 mb-2">
        <Button
          variant={activeTab === "notifications" ? "default" : "outline"}
          onClick={() => setActiveTab("notifications")}
        >
          Notificações
        </Button>
        <Button
          variant={activeTab === "rules" ? "default" : "outline"}
          onClick={() => setActiveTab("rules")}
        >
          Regras
        </Button>
        <Button
          variant={activeTab === "channels" ? "default" : "outline"}
          onClick={() => setActiveTab("channels")}
        >
          Canais
        </Button>
      </div>
      {activeTab === "notifications" && (
        <div className="space-y-4">
          {/* Filtros */}
          <div className="flex space-x-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas ({notifications.length})
            </Button>
            <Button 
              variant={filter === 'unread' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Não Lidas ({unreadCount})
            </Button>
            <Button 
              variant={filter === 'verba' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('verba')}
            >
              Verbas
            </Button>
            <Button 
              variant={filter === 'fornecedor' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('fornecedor')}
            >
              Fornecedores
            </Button>
            <Button 
              variant={filter === 'sistema' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('sistema')}
            >
              Sistema
            </Button>
          </div>

          {/* Lista de Notificações */}
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`${getTypeColor(notification.type)} ${!notification.read ? 'border-l-4 border-l-blue-500' : ''} hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            <div className="flex items-center space-x-1">
                              {getCategoryIcon(notification.category)}
                              <span className="capitalize">{notification.category}</span>
                            </div>
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{notification.timestamp}</span>
                          </div>
                          {notification.actions && (
                            <div className="flex space-x-2">
                              {notification.actions.map((action, index) => (
                                <Button key={index} variant="ghost" size="sm" className="text-xs h-6">
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {activeTab === "rules" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regras de Notificação</CardTitle>
              <CardDescription>Configure quando e como receber notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge variant="outline">{rule.category}</Badge>
                        <div className="flex space-x-1">
                          {rule.channels.map((channel) => (
                            <Badge key={channel} variant="secondary" className="text-xs">
                              {channel === 'email' && <Mail className="h-3 w-3 mr-1" />}
                              {channel === 'push' && <Monitor className="h-3 w-3 mr-1" />}
                              {channel === 'sms' && <Smartphone className="h-3 w-3 mr-1" />}
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                      <div className="text-xs text-muted-foreground">
                        <strong>Condições:</strong> {rule.conditions.join(' • ')}
                      </div>
                    </div>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === "channels" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notificações Ativas</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Resumo Diário</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alertas Críticos</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5" />
                <span>Push</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notificações Desktop</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sons</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Apenas Críticas</span>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>SMS</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alertas Críticos</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verbas Vencendo</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Erros de Sistema</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
