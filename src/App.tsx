import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Component, ReactNode } from "react";
import { DashboardMetrics } from "./components/DashboardMetrics";
import { VerbaManagement } from "./components/VerbaManagement";
import { SupplierManagement } from "./components/SupplierManagement";
import { KPIAnalysis } from "./components/KPIAnalysis";
import { CostSimulator } from "./components/CostSimulator";
import { AuditLog } from "./components/audit/AuditLog";
import { AutoReports } from "./components/reports/AutoReports";
import { NotificationCenter } from "./components/notifications/NotificationCenter";
import { AIAnalytics } from "./components/ai/AIAnalytics";
import { RadixPortalReset } from "@/components/ui/RadixPortalReset";

const queryClient = new QueryClient();

// ErrorBoundary para capturar erros de renderização
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: any }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    // Você pode logar o erro em um serviço externo aqui
    console.error("ErrorBoundary caught an error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, textAlign: "center" }}>
          <h1>Ocorreu um erro inesperado 😢</h1>
          <p>Por favor, recarregue a página ou entre em contato com o suporte.</p>
          <pre style={{ color: "#c00", marginTop: 16 }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppInner() {
  const location = useLocation();
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RadixPortalReset>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />}>
                <Route index element={<DashboardMetrics />} />
                <Route path="verbas" element={<VerbaManagement />} />
                <Route path="fornecedores" element={<SupplierManagement />} />
                <Route path="kpis" element={<KPIAnalysis />} />
                <Route path="simulador" element={<CostSimulator />} />
                <Route path="auditoria" element={<AuditLog />} />
                <Route path="relatorios" element={<AutoReports />} />
                <Route path="notificacoes" element={<NotificationCenter />} />
                <Route path="ia" element={<AIAnalytics />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </RadixPortalReset>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
