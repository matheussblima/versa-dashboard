"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { useUnidadesPage } from "@/hooks/useUnidadesPage";
import { SubUnidadeDialog, UnidadeDialog, UnidadesList } from "@/components";
import { Button } from "@/components/ui/button";
import { Plus, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function UnidadesPage() {
  const {
    searchTerm,
    filteredUnidades,
    selectedUnidade,
    selectedSubUnidade,
    parentUnidade,
    pontosDeMedicao,
    loadingPontos,
    regioes,
    estados,
    loadingRegioes,
    loadingEstados,
    loading,
    error,
    createModal,
    editModal,
    viewModal,
    subUnidadeCreateModal,
    subUnidadeViewModal,
    subUnidadeEditModal,
    setSearchTerm,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
    handleSubUnidadeCreateSubmit,
    handleSubUnidadeEditSubmit,
    handleSubUnidadeDelete,
    openCreateDialog,
    openEditDialog,
    openViewDialog,
    openSubUnidadeCreateDialog,
    openSubUnidadeViewDialog,
    openSubUnidadeEditDialog,
    setSelectedUnidade,
    setSelectedSubUnidade,
    setParentUnidade,
  } = useUnidadesPage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Unidades</h1>
            <p className="text-gray-600">Gerencie as unidades do sistema</p>
          </div>

          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Unidade
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar unidades..."
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
              <span className="ml-2 text-gray-600">Carregando unidades...</span>
            </div>
          ) : (
            <UnidadesList
              unidades={filteredUnidades}
              onView={openViewDialog}
              onEdit={openEditDialog}
              onDelete={handleDelete}
              onAddSubUnidade={openSubUnidadeCreateDialog}
              onViewSubUnidade={openSubUnidadeViewDialog}
              onEditSubUnidade={openSubUnidadeEditDialog}
              onDeleteSubUnidade={handleSubUnidadeDelete}
            />
          )}
        </div>

        <UnidadeDialog
          isOpen={createModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              createModal.close();
            }
          }}
          onSubmit={handleCreateSubmit}
          mode="create"
        />

        <UnidadeDialog
          unidade={selectedUnidade || undefined}
          isOpen={editModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              editModal.close();
              setSelectedUnidade(null);
            }
          }}
          onSubmit={handleEditSubmit}
          mode="edit"
        />

        <UnidadeDialog
          unidade={selectedUnidade || undefined}
          isOpen={viewModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              viewModal.close();
              setSelectedUnidade(null);
            }
          }}
          mode="view"
        />

        <SubUnidadeDialog
          isOpen={subUnidadeCreateModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              subUnidadeCreateModal.close();
              setParentUnidade(null);
            }
          }}
          onSubmit={handleSubUnidadeCreateSubmit}
          mode="create"
          parentUnidadeId={parentUnidade?.id}
          pontosDeMedicao={pontosDeMedicao}
          loadingPontos={loadingPontos}
          regioes={regioes}
          estados={estados}
          loadingRegioes={loadingRegioes}
          loadingEstados={loadingEstados}
        />

        <SubUnidadeDialog
          subUnidade={selectedSubUnidade || undefined}
          isOpen={subUnidadeViewModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              subUnidadeViewModal.close();
              setSelectedSubUnidade(null);
            }
          }}
          mode="view"
          regioes={regioes}
          estados={estados}
          loadingRegioes={loadingRegioes}
          loadingEstados={loadingEstados}
        />

        <SubUnidadeDialog
          subUnidade={selectedSubUnidade || undefined}
          isOpen={subUnidadeEditModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              subUnidadeEditModal.close();
              setSelectedSubUnidade(null);
            }
          }}
          onSubmit={handleSubUnidadeEditSubmit}
          mode="edit"
          pontosDeMedicao={pontosDeMedicao}
          loadingPontos={loadingPontos}
          regioes={regioes}
          estados={estados}
          loadingRegioes={loadingRegioes}
          loadingEstados={loadingEstados}
        />
      </div>
    </DashboardLayout>
  );
}
