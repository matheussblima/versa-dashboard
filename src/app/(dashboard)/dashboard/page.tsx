import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { BarChart } from "@/components/dashboard/bar-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Activity,
  Target,
  BarChart3,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const statsData = [
    {
      title: "Usuários Ativos",
      value: "2,847",
      description: "Total de usuários ativos",
      icon: Users,
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: "Receita Total",
      value: "R$ 45,231",
      description: "Receita do mês atual",
      icon: DollarSign,
      trend: { value: 8.2, isPositive: true },
    },
    {
      title: "Vendas",
      value: "1,234",
      description: "Vendas realizadas",
      icon: ShoppingCart,
      trend: { value: 3.1, isPositive: false },
    },
    {
      title: "Taxa de Conversão",
      value: "3.24%",
      description: "Taxa de conversão média",
      icon: TrendingUp,
      trend: { value: 5.7, isPositive: true },
    },
  ];

  const chartData = [
    { label: "Janeiro", value: 65, color: "#86BD40" },
    { label: "Fevereiro", value: 78, color: "#00506D" },
    { label: "Março", value: 90, color: "#86BD40" },
    { label: "Abril", value: 81, color: "#00506D" },
    { label: "Maio", value: 95, color: "#86BD40" },
    { label: "Junho", value: 88, color: "#00506D" },
  ];

  const activityData = [
    {
      id: "1",
      user: {
        name: "João Silva",
        email: "joao@exemplo.com",
        avatar: "/placeholder-avatar.jpg",
      },
      action: "criou um novo projeto",
      target: "E-commerce App",
      time: "2 minutos atrás",
      status: "completed" as const,
    },
    {
      id: "2",
      user: {
        name: "Maria Santos",
        email: "maria@exemplo.com",
        avatar: "/placeholder-avatar.jpg",
      },
      action: "atualizou o perfil",
      target: "Configurações",
      time: "5 minutos atrás",
      status: "completed" as const,
    },
    {
      id: "3",
      user: {
        name: "Pedro Costa",
        email: "pedro@exemplo.com",
        avatar: "/placeholder-avatar.jpg",
      },
      action: "fez upload de arquivo",
      target: "Documentos",
      time: "10 minutos atrás",
      status: "pending" as const,
    },
    {
      id: "4",
      user: {
        name: "Ana Oliveira",
        email: "ana@exemplo.com",
        avatar: "/placeholder-avatar.jpg",
      },
      action: "deletou um item",
      target: "Inventário",
      time: "15 minutos atrás",
      status: "failed" as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das métricas e atividades do sistema.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ChartCard
            title="Vendas Mensais"
            description="Performance de vendas nos últimos 6 meses"
            className="lg:col-span-4"
          >
            <BarChart data={chartData} />
          </ChartCard>

          <div className="lg:col-span-3">
            <RecentActivity activities={activityData} />
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ChartCard
            title="Metas do Mês"
            description="Progresso das metas estabelecidas"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Meta de Vendas</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "75%" }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Novos Usuários</span>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: "90%" }}
                />
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Próximos Eventos" description="Agenda da semana">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Reunião de Equipe</p>
                  <p className="text-xs text-muted-foreground">Hoje, 14:00</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Apresentação Cliente</p>
                  <p className="text-xs text-muted-foreground">Amanhã, 10:00</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Workshop</p>
                  <p className="text-xs text-muted-foreground">Quinta, 16:00</p>
                </div>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Sistema" description="Status dos serviços">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Principal</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Banco de Dados</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cache</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-yellow-600">Lento</span>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
