
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  DollarSign,
  Users,
  Target,
  Calculator,
  FileCheck,
  FileText,
  Bell,
  Bot,
  Shield,
  Settings,
  Home,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { 
    title: "Dashboard", 
    key: "dashboard", 
    icon: Home, 
    color: "text-blue-600"
  },
  { 
    title: "Verbas", 
    key: "verbas", 
    icon: DollarSign, 
    color: "text-green-600"
  },
  { 
    title: "Fornecedores", 
    key: "fornecedores", 
    icon: Users, 
    color: "text-purple-600"
  },
  { 
    title: "KPIs", 
    key: "kpis", 
    icon: BarChart3, 
    color: "text-orange-600"
  },
  { 
    title: "Simulador", 
    key: "simulador", 
    icon: Calculator, 
    color: "text-teal-600"
  },
  { 
    title: "Auditoria", 
    key: "auditoria", 
    icon: FileCheck, 
    color: "text-red-600"
  },
  { 
    title: "Relatórios", 
    key: "relatorios", 
    icon: FileText, 
    color: "text-indigo-600"
  },
  { 
    title: "Notificações", 
    key: "notificacoes", 
    icon: Bell, 
    color: "text-yellow-600"
  },
  { 
    title: "IA Analytics", 
    key: "ia", 
    icon: Bot, 
    color: "text-pink-600"
  }
];

// Utilitário para fechar todos os portais Radix
function closeAllRadixPortals() {
  window.dispatchEvent(new Event('close-all-radix-portals'));
}

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  // Mapear cada key para uma rota
  const routeMap: Record<string, string> = {
    dashboard: "/",
    verbas: "/verbas",
    fornecedores: "/fornecedores",
    kpis: "/kpis",
    simulador: "/simulador",
    auditoria: "/auditoria",
    relatorios: "/relatorios",
    notificacoes: "/notificacoes",
    ia: "/ia",
  };

  // Descobrir qual key está ativa pela rota atual
  const activeKey = Object.keys(routeMap).find(
    (key) => location.pathname === routeMap[key]
  ) || "dashboard";

  return (
    <Sidebar className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="p-6 border-b border-border/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            {/* Ícone: gráfico de pizza azul, sem preto */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
              <circle cx="14" cy="14" r="12" fill="#2563eb" fillOpacity="0.15" />
              <path d="M14 4a10 10 0 1 1-7.07 2.93" stroke="#2563eb" strokeWidth="2" fill="none" />
              <path d="M14 14V4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
              <circle cx="14" cy="14" r="5" fill="#2563eb" fillOpacity="0.7" />
            </svg>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                VerbaFlow
              </h2>
              <p className="text-xs text-muted-foreground">
                Plataforma Digital
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={activeKey === item.key}
                    onClick={() => {
                      closeAllRadixPortals();
                      navigate(routeMap[item.key]);
                    }}
                    className={`
                      group h-10 w-full justify-start rounded-lg transition-all duration-200 
                      ${activeKey === item.key 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                      }
                    `}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={`h-4 w-4 shrink-0 ${
                      activeKey === item.key ? 'text-blue-600' : item.color
                    }`} />
                    {!isCollapsed && (
                      <span className="ml-3 text-sm font-medium">
                        {item.title}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40">
        {!isCollapsed ? (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge variant="outline" className="h-6 text-xs">
              v2.0.1
            </Badge>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
