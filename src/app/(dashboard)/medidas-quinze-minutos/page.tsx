"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { useMedidasQuinzeMinutosPage } from "@/hooks";
import {
  MedidasQuinzeMinutosList,
  MedidasQuinzeMinutosFilters,
  MedidaQuinzeMinutosDialog,
} from "@/components";
import { Zap, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MedidasQuinzeMinutosPage() {
  const {
    medidas,
    loading,
    error,
    filters,
    selectedMedida,
    viewModal,
    pontosDeMedicao,
    loadingPontos,
    handleFiltersChange,
    handleViewMedida,
    handleCloseViewModal,
  } = useMedidasQuinzeMinutosPage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Medidas de Quinze Minutos
            </h1>
            <p className="text-gray-600">
              Visualize e filtre as medidas de quinze minutos do sistema
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <MedidasQuinzeMinutosFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            pontosDeMedicao={pontosDeMedicao}
            loadingPontos={loadingPontos}
          />

          <div>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">
                  Carregando medidas...
                </span>
              </div>
            ) : (
              <MedidasQuinzeMinutosList
                medidas={medidas}
                onView={handleViewMedida}
              />
            )}
          </div>
        </div>

        <MedidaQuinzeMinutosDialog
          medida={selectedMedida || undefined}
          isOpen={viewModal.isOpen}
          onOpenChange={handleCloseViewModal}
        />
      </div>
    </DashboardLayout>
  );
}
