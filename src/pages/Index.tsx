
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target, 
  Shield
} from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { VerbaManagement } from "@/components/VerbaManagement";
import { SupplierManagement } from "@/components/SupplierManagement";
import { KPIAnalysis } from "@/components/KPIAnalysis";
import { CostSimulator } from "@/components/CostSimulator";
import { AuditLog } from "@/components/audit/AuditLog";
import { AutoReports } from "@/components/reports/AutoReports";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { AIAnalytics } from "@/components/ai/AIAnalytics";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* O AppSidebar agora não recebe mais activeTab nem onTabChange */}
        <AppSidebar />
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VerbaFlow
                </h1>
                <p className="text-sm text-muted-foreground">
                  Ecossistema Digital Integrado para Gestão de Verbas Comerciais
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Sistema Ativo
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Versão 2.0
                </Badge>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-4 p-4 md:p-8">
            {/* O conteúdo principal agora é renderizado via Outlet do React Router */}
            <div className="rounded-lg border bg-card">
              <Outlet />
            </div>
          </div>

          {/* Sistema de Backup (Modal/Drawer separado) */}
          <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
            <Button 
              className="rounded-full w-14 h-14 shadow-lg bg-transparent hover:bg-blue-50"
              onClick={() => {
                console.log("Abrir sistema de backup");
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
                <circle cx="14" cy="14" r="12" fill="#2563eb" fillOpacity="0.15" />
                <path d="M14 4a10 10 0 1 1-7.07 2.93" stroke="#2563eb" strokeWidth="2" fill="none" />
                <path d="M14 14V4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                <circle cx="14" cy="14" r="5" fill="#2563eb" fillOpacity="0.7" />
              </svg>
            </Button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
