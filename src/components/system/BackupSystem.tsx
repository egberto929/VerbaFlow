
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Download, 
  Upload, 
  RefreshCw,
  HardDrive,
  Clock,
  CheckCircle,
  AlertTriangle,
  Database,
  FileText,
  Settings,
  Play,
  Pause,
  Calendar,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Backup {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  timestamp: string;
  status: 'completed' | 'running' | 'failed' | 'scheduled';
  retention: string;
  location: string;
}

const backupsData: Backup[] = [
  {
    id: 'BKP001',
    name: 'Backup Completo Mensal',
    type: 'full',
    size: '2.4 GB',
    timestamp: '2024-07-01 02:00:00',
    status: 'completed',
    retention: '12 meses',
    location: 'AWS S3 - Backup Principal'
  },
  {
    id: 'BKP002',
    name: 'Backup Incremental Diário',
    type: 'incremental',
    size: '156 MB',
    timestamp: '2024-07-11 02:00:00',
    status: 'completed',
    retention: '30 dias',
    location: 'AWS S3 - Backup Principal'
  },
  {
    id: 'BKP003',
    name: 'Backup Emergencial',
    type: 'full',
    size: '2.3 GB',
    timestamp: '2024-07-10 14:30:00',
    status: 'completed',
    retention: '6 meses',
    location: 'Local Storage'
  },
  {
    id: 'BKP004',
    name: 'Backup Semanal',
    type: 'differential',
    size: '890 MB',
    timestamp: '2024-07-08 03:00:00',
    status: 'completed',
    retention: '3 meses',
    location: 'AWS S3 - Backup Principal'
  }
];

export const BackupSystem = () => {
  const { toast } = useToast();
  const [backups, setBackups] = useState<Backup[]>(backupsData);
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'scheduled': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <HardDrive className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-purple-100 text-purple-800';
      case 'incremental': return 'bg-blue-100 text-blue-800';
      case 'differential': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const runBackup = async (type: 'full' | 'incremental' | 'differential') => {
    setIsBackupRunning(true);
    setBackupProgress(0);
    
    // Simular progresso do backup
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackupRunning(false);
          toast({
            title: "Backup Concluído",
            description: `Backup ${type} foi executado com sucesso.`,
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const restoreBackup = (backupId: string) => {
    toast({
      title: "Restauração Iniciada",
      description: "O processo de restauração foi iniciado. Você será notificado quando concluído.",
    });
  };

  const downloadBackup = (backupId: string) => {
    toast({
      title: "Download Iniciado",
      description: "O backup está sendo preparado para download.",
    });
  };

  const deleteBackup = (backupId: string) => {
    setBackups(backups.filter(b => b.id !== backupId));
    toast({
      title: "Backup Removido",
      description: "O backup foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Sistema de Backup e Recuperação</h2>
            <p className="text-muted-foreground">Proteção e restauração de dados críticos</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
          <Button 
            size="sm"
            onClick={() => runBackup('full')}
            disabled={isBackupRunning}
          >
            <Play className="h-4 w-4 mr-2" />
            Backup Agora
          </Button>
        </div>
      </div>

      {/* Status do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Último Backup</p>
                <p className="text-2xl font-bold">11/07/24</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Backups</p>
                <p className="text-2xl font-bold">{backups.length}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Espaço Utilizado</p>
                <p className="text-2xl font-bold">6.2 GB</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                <p className="text-2xl font-bold">99.2%</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup em Progresso */}
      {isBackupRunning && (
        <Alert>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertDescription>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Executando backup...</span>
                <span>{Math.round(backupProgress)}%</span>
              </div>
              <Progress value={backupProgress} className="h-2" />
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Execute backups ou configure automatização</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => runBackup('full')}
              disabled={isBackupRunning}
            >
              <Database className="h-6 w-6" />
              <span>Backup Completo</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => runBackup('incremental')}
              disabled={isBackupRunning}
            >
              <RefreshCw className="h-6 w-6" />
              <span>Backup Incremental</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => runBackup('differential')}
              disabled={isBackupRunning}
            >
              <HardDrive className="h-6 w-6" />
              <span>Backup Diferencial</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Backups */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Backups</CardTitle>
          <CardDescription>Gerencie e restaure backups existentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(backup.status)}
                    <div>
                      <h4 className="font-medium">{backup.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{backup.timestamp}</span>
                        <span>•</span>
                        <span>{backup.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getStatusColor(backup.status)}>
                      {backup.status === 'completed' ? 'Concluído' : 
                       backup.status === 'running' ? 'Executando' : 
                       backup.status === 'failed' ? 'Falhou' : 'Agendado'}
                    </Badge>
                    <Badge className={getTypeColor(backup.type)}>
                      {backup.type === 'full' ? 'Completo' : 
                       backup.type === 'incremental' ? 'Incremental' : 'Diferencial'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadBackup(backup.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => restoreBackup(backup.id)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Restaurar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteBackup(backup.id)}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Retenção */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Política de Retenção</CardTitle>
            <CardDescription>Configure por quanto tempo manter os backups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Backups Diários</span>
                <Badge variant="outline">30 dias</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Backups Semanais</span>
                <Badge variant="outline">3 meses</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Backups Mensais</span>
                <Badge variant="outline">12 meses</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Backups Anuais</span>
                <Badge variant="outline">7 anos</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
            <CardDescription>Backups programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Backup Incremental</p>
                  <p className="text-sm text-muted-foreground">Diário às 02:00</p>
                </div>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  Em 9h
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Backup Semanal</p>
                  <p className="text-sm text-muted-foreground">Domingos às 03:00</p>
                </div>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  Em 3d
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Backup Mensal</p>
                  <p className="text-sm text-muted-foreground">1º dia do mês às 02:00</p>
                </div>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  Em 21d
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
