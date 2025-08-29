"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCard } from "@/components/stats-card";
import { ChartCard } from "@/components/chart-card";
import { BarChart } from "@/components/bar-chart";
import { RecentActivity } from "@/components/recent-activity";
import { useMedidasQuinzeMinutos } from "@/hooks/useMedidasQuinzeMinutos";
import {
  Zap,
  TrendingUp,
  Activity,
  Target,
  BarChart3,
  Calendar,
  Gauge,
  Battery,
  Power,
  Thermometer,
} from "lucide-react";

export default function DashboardPage() {
  const { medidas, loading, loadMedidas } = useMedidasQuinzeMinutos();
  const [statsData, setStatsData] = useState([
    {
      title: "Consumo Total",
      value: "0 kWh",
      description: "Consumo do período atual",
      icon: Zap,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Potência Máxima",
      value: "0 kW",
      description: "Pico de potência registrado",
      icon: Power,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Eficiência",
      value: "0%",
      description: "Eficiência energética média",
      icon: Target,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Pontos Ativos",
      value: "0",
      description: "Pontos de medição ativos",
      icon: Activity,
      trend: { value: 0, isPositive: true },
    },
  ]);

  const [chartData, setChartData] = useState([
    { label: "00:00", value: 0, color: "#86BD40" },
    { label: "04:00", value: 0, color: "#00506D" },
    { label: "08:00", value: 0, color: "#86BD40" },
    { label: "12:00", value: 0, color: "#00506D" },
    { label: "16:00", value: 0, color: "#86BD40" },
    { label: "20:00", value: 0, color: "#00506D" },
  ]);

  const [consumoData, setConsumoData] = useState([
    { label: "Seg", value: 0, color: "#86BD40" },
    { label: "Ter", value: 0, color: "#00506D" },
    { label: "Qua", value: 0, color: "#86BD40" },
    { label: "Qui", value: 0, color: "#00506D" },
    { label: "Sex", value: 0, color: "#86BD40" },
    { label: "Sáb", value: 0, color: "#00506D" },
    { label: "Dom", value: 0, color: "#86BD40" },
  ]);

  useEffect(() => {
    loadMedidas();
  }, [loadMedidas]);

  useEffect(() => {
    if (medidas && medidas.data.length > 0) {
      // Calcular estatísticas
      const valores = medidas.data.map((m) => m.valor);
      const consumoTotal = valores.reduce((sum, valor) => sum + valor, 0);
      const potenciaMaxima = Math.max(...valores);
      const eficiencia = (
        (consumoTotal / (potenciaMaxima * medidas.data.length)) *
        100
      ).toFixed(1);

      // Agrupar por hora do dia
      const medidasPorHora = medidas.data.reduce((acc, medida) => {
        const hora = new Date(medida.dataHora).getHours();
        const horaFormatada = `${hora.toString().padStart(2, "0")}:00`;
        if (!acc[horaFormatada]) acc[horaFormatada] = [];
        acc[horaFormatada].push(medida.valor);
        return acc;
      }, {} as Record<string, number[]>);

      // Agrupar por dia da semana
      const medidasPorDia = medidas.data.reduce((acc, medida) => {
        const dia = new Date(medida.dataHora).toLocaleDateString("pt-BR", {
          weekday: "short",
        });
        if (!acc[dia]) acc[dia] = [];
        acc[dia].push(medida.valor);
        return acc;
      }, {} as Record<string, number[]>);

      // Atualizar dados dos gráficos
      const horasChartData = Object.entries(medidasPorHora)
        .map(([hora, valores]) => ({
          label: hora,
          value: Math.round(
            valores.reduce((sum, v) => sum + v, 0) / valores.length
          ),
          color: hora >= "06:00" && hora <= "18:00" ? "#86BD40" : "#00506D",
        }))
        .slice(0, 6);

      const diasChartData = Object.entries(medidasPorDia).map(
        ([dia, valores]) => ({
          label: dia,
          value: Math.round(
            valores.reduce((sum, v) => sum + v, 0) / valores.length
          ),
          color: "#86BD40",
        })
      );

      setStatsData([
        {
          title: "Consumo Total",
          value: `${consumoTotal.toFixed(1)} kWh`,
          description: "Consumo do período atual",
          icon: Zap,
          trend: { value: 12.5, isPositive: true },
        },
        {
          title: "Potência Máxima",
          value: `${potenciaMaxima.toFixed(1)} kW`,
          description: "Pico de potência registrado",
          icon: Power,
          trend: { value: 8.2, isPositive: true },
        },
        {
          title: "Eficiência",
          value: `${eficiencia}%`,
          description: "Eficiência energética média",
          icon: Target,
          trend: { value: 5.7, isPositive: true },
        },
        {
          title: "Pontos Ativos",
          value: medidas.data.length.toString(),
          description: "Medições realizadas",
          icon: Activity,
          trend: { value: 3.1, isPositive: true },
        },
      ]);

      setChartData(horasChartData);
      setConsumoData(diasChartData);
    }
  }, [medidas]);

  const activityData = [
    {
      id: "1",
      user: {
        name: "Sistema de Monitoramento",
        email: "monitor@energia.com",
        avatar: "/placeholder-avatar.jpg",
      },
      action: "registrou pico de consumo",
      target: "Ponto PM001",
      time: "2 minutos atrás",
      status: "completed" as const,
    },
    {
      id: "2",
      user: {
        name: "Alerta de Sistema",
        email: "alerta@energia.com",
        avatar: "/placeholder-avatar.jpg",
      },
      action: "detectou anomalia",
      target: "Ponto PM003",
      time: "5 minutos atrás",
      status: "pending" as const,
    },
    {
      id: "3",
      user: {
        name: "Relatório Automático",
        email: "relatorio@energia.com",
        avatar: "/placeholder-avatar.jpg",
      },
      action: "gerou relatório diário",
      target: "Consumo Energético",
      time: "10 minutos atrás",
      status: "completed" as const,
    },
    {
      id: "4",
      user: {
        name: "Manutenção Preventiva",
        email: "manutencao@energia.com",
        avatar: "/placeholder-avatar.jpg",
      },
      action: "agendou inspeção",
      target: "Equipamentos",
      time: "15 minutos atrás",
      status: "completed" as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard de Energia
          </h1>
          <p className="text-muted-foreground">
            Monitoramento em tempo real do consumo e eficiência energética.
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
            title="Consumo por Hora"
            description="Variação do consumo energético ao longo do dia"
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
            title="Consumo Semanal"
            description="Média de consumo por dia da semana"
          >
            <BarChart data={consumoData} />
          </ChartCard>

          <ChartCard
            title="Alertas e Eventos"
            description="Notificações do sistema"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Sistema Operacional</p>
                  <p className="text-xs text-muted-foreground">
                    Todos os pontos ativos
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm font-medium">Consumo Elevado</p>
                  <p className="text-xs text-muted-foreground">
                    Ponto PM002 - 15% acima
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Manutenção Programada</p>
                  <p className="text-xs text-muted-foreground">Amanhã, 08:00</p>
                </div>
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Eficiência Energética"
            description="Métricas de performance"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Fator de Potência</span>
                <span className="text-sm text-muted-foreground">0.95</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: "95%" }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">THD (Distorção)</span>
                <span className="text-sm text-muted-foreground">2.3%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: "23%" }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tensão Média</span>
                <span className="text-sm text-muted-foreground">220V</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
