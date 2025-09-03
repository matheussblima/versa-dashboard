"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { usePLDPage } from "@/hooks";
import {
  PLDList,
  PLDFilters,
  PLDDialog,
  PaginationWrapper,
} from "@/components";
import { DollarSign, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PLDPage() {
  const {
    plds,
    loading,
    error,
    currentPage,
    filters,
    selectedPLD,
    viewModal,
    handleFiltersChange,
    handlePageChange,
    handleViewPLD,
    handleCloseViewModal,
  } = usePLDPage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              PLD - Preço de Liquidação das Diferenças
            </h1>
            <p className="text-gray-600">
              Visualize e filtre os PLDs do sistema
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <PLDFilters filters={filters} onFiltersChange={handleFiltersChange} />

          <div>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Carregando PLDs...</span>
              </div>
            ) : (
              <>
                <PLDList plds={plds} onView={handleViewPLD} />

                <div className="mt-6">
                  <PaginationWrapper
                    data={plds}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    loading={loading}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <PLDDialog
          pld={selectedPLD || undefined}
          isOpen={viewModal.isOpen}
          onOpenChange={handleCloseViewModal}
        />
      </div>
    </DashboardLayout>
  );
}
