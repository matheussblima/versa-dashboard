"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { usePontosDeMedicaoPage } from "@/hooks/usePontosDeMedicaoPage";
import { PontosDeMedicaoList, PontoDeMedicaoDialog } from "@/components";
import { Button } from "@/components/ui/button";
import { Plus, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreatePontoDeMedicaoData, UpdatePontoDeMedicaoData } from "@/types";

export default function PontosDeMedicaoPage() {
  const {
    pontosDeMedicao,
    selectedPontoDeMedicao,
    searchTerm,
    loading,
    error,
    createModal,
    editModal,
    viewModal,
    setSearchTerm,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
    openCreateDialog,
    openEditDialog,
    openViewDialog,
    setSelectedPontoDeMedicao,
  } = usePontosDeMedicaoPage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Pontos de Medição
            </h1>
            <p className="text-gray-600">
              Gerencie os pontos de medição do sistema
            </p>
          </div>

          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Ponto de Medição
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar pontos de medição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

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
                Carregando pontos de medição...
              </span>
            </div>
          ) : (
            <PontosDeMedicaoList
              pontosDeMedicao={pontosDeMedicao}
              onView={openViewDialog}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          )}
        </div>

        <PontoDeMedicaoDialog
          isOpen={createModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              createModal.close();
            }
          }}
          onSubmit={(data) =>
            handleCreateSubmit(data as CreatePontoDeMedicaoData)
          }
          mode="create"
        />

        <PontoDeMedicaoDialog
          pontoDeMedicao={selectedPontoDeMedicao || undefined}
          isOpen={editModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              editModal.close();
              setSelectedPontoDeMedicao(null);
            }
          }}
          onSubmit={(data) =>
            handleEditSubmit(data as UpdatePontoDeMedicaoData)
          }
          mode="edit"
        />

        <PontoDeMedicaoDialog
          pontoDeMedicao={selectedPontoDeMedicao || undefined}
          isOpen={viewModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              viewModal.close();
              setSelectedPontoDeMedicao(null);
            }
          }}
          mode="view"
        />
      </div>
    </DashboardLayout>
  );
}
