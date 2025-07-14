
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  Target
} from "lucide-react";

interface WorkflowStatsProps {
  totalItems: number;
  pendingItems: number;
  approvedItems: number;
  rejectedItems: number;
  analysisItems: number;
}

export const WorkflowStats = ({ 
  totalItems, 
  pendingItems, 
  approvedItems, 
  rejectedItems, 
  analysisItems 
}: WorkflowStatsProps) => {
  const approvalRate = totalItems > 0 ? (approvedItems / totalItems) * 100 : 0;
  const rejectionRate = totalItems > 0 ? (rejectedItems / totalItems) * 100 : 0;
  const avgProcessingTime = 2.3; // dias - simulado

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">
            {pendingItems} pendentes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {approvalRate.toFixed(1)}%
          </div>
          <Progress value={approvalRate} className="mt-2 h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
          <XCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {rejectionRate.toFixed(1)}%
          </div>
          <Progress value={rejectionRate} className="mt-2 h-2 [&>div]:bg-red-500" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {avgProcessingTime}d
          </div>
          <p className="text-xs text-muted-foreground">
            Tempo de processamento
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
