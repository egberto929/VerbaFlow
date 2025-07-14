
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Shield, 
  User, 
  Calendar, 
  Search, 
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle
} from "lucide-react";

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  level: 'info' | 'warning' | 'error' | 'success';
  ipAddress: string;
  userAgent: string;
}

const auditData: AuditEntry[] = [
  {
    id: 'AU001',
    timestamp: '2024-07-11 14:30:25',
    user: 'Anderson Silva',
    action: 'Aprovação de Verba',
    resource: 'VB001 - Samsung Electronics',
    details: 'Verba de R$ 250.000 aprovada para campanha Q3',
    level: 'success',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 115.0'
  },
  {
    id: 'AU002',
    timestamp: '2024-07-11 14:25:12',
    user: 'Maria Santos',
    action: 'Tentativa de Acesso Negado',
    resource: 'Relatórios Financeiros',
    details: 'Usuário tentou acessar relatórios sem permissão',
    level: 'warning',
    ipAddress: '192.168.1.105',
    userAgent: 'Firefox 116.0'
  },
  {
    id: 'AU003',
    timestamp: '2024-07-11 14:20:45',
    user: 'João Pedro',
    action: 'Criação de Fornecedor',
    resource: 'FOR005 - Nova Empresa Tech',
    details: 'Novo fornecedor cadastrado com categoria Tecnologia',
    level: 'info',
    ipAddress: '192.168.1.110',
    userAgent: 'Chrome 115.0'
  },
  {
    id: 'AU004',
    timestamp: '2024-07-11 14:15:33',
    user: 'Sistema',
    action: 'Erro de Integração',
    resource: 'API ERP',
    details: 'Falha na sincronização de dados financeiros',
    level: 'error',
    ipAddress: 'localhost',
    userAgent: 'System Process'
  }
];

export const AuditLog = () => {
  const [entries, setEntries] = useState<AuditEntry[]>(auditData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("todos");
  const [selectedUser, setSelectedUser] = useState("todos");
  const [openLevel, setOpenLevel] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  useEffect(() => {
    function handleCloseAll() {
      setOpenLevel(false);
      setOpenUser(false);
    }
    window.addEventListener('close-all-radix-portals', handleCloseAll);
    return () => window.removeEventListener('close-all-radix-portals', handleCloseAll);
  }, []);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "todos" || entry.level === selectedLevel;
    const matchesUser = selectedUser === "todos" || entry.user === selectedUser;
    return matchesSearch && matchesLevel && matchesUser;
  });

  const uniqueUsers = [...new Set(entries.map(entry => entry.user))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Log de Auditoria</h2>
          <p className="text-muted-foreground">Rastreamento completo de atividades do sistema</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Log
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Configurar Alertas
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedLevel}
              onChange={setSelectedLevel}
              options={[
                { value: 'todos', label: 'Todos os Níveis' },
                { value: 'info', label: 'Informação' },
                { value: 'success', label: 'Sucesso' },
                { value: 'warning', label: 'Aviso' },
                { value: 'error', label: 'Erro' },
              ]}
              placeholder="Nível"
              className="min-w-[140px]"
            />
            <Select
              value={selectedUser}
              onChange={setSelectedUser}
              options={[
                { value: 'todos', label: 'Todos os Usuários' },
                ...uniqueUsers.map(user => ({ value: user, label: user }))
              ]}
              placeholder="Usuário"
              className="min-w-[140px]"
            />
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs */}
      <div className="space-y-2">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    {getLevelIcon(entry.level)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getLevelColor(entry.level)}>
                        {entry.level.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{entry.action}</span>
                      <span className="text-sm text-muted-foreground">
                        por {entry.user}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{entry.details}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{entry.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{entry.ipAddress}</span>
                      </div>
                      <span>{entry.userAgent}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
