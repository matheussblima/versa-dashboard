"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { useUnidadesPage } from "@/hooks/useUnidadesPage";
import { SubUnidadeDialog, UnidadeDialog, UnidadesList } from "@/components";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function UnidadesPage() {
  const {
    searchTerm,
    filteredUnidades,
    selectedUnidade,
    selectedSubUnidade,
    createModal,
    editModal,
    viewModal,
    subUnidadeViewModal,
    subUnidadeEditModal,
    setSearchTerm,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
    handleSubUnidadeEditSubmit,
    handleSubUnidadeDelete,
    openCreateDialog,
    openEditDialog,
    openViewDialog,
    openSubUnidadeViewDialog,
    openSubUnidadeEditDialog,
  } = useUnidadesPage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Unidades</h1>
            <p className="text-gray-600">Gerencie as unidades do sistema</p>
          </div>

          <UnidadeDialog
            isOpen={createModal.isOpen}
            onOpenChange={createModal.toggle}
            onSubmit={handleCreateSubmit}
            mode="create"
            trigger={
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Unidade
              </Button>
            }
          />
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

        <UnidadesList
          unidades={filteredUnidades}
          onView={openViewDialog}
          onEdit={openEditDialog}
          onDelete={handleDelete}
          onViewSubUnidade={openSubUnidadeViewDialog}
          onEditSubUnidade={openSubUnidadeEditDialog}
          onDeleteSubUnidade={handleSubUnidadeDelete}
        />

        <UnidadeDialog
          unidade={selectedUnidade || undefined}
          isOpen={editModal.isOpen}
          onOpenChange={editModal.toggle}
          onSubmit={handleEditSubmit}
          mode="edit"
        />

        <UnidadeDialog
          unidade={selectedUnidade || undefined}
          isOpen={viewModal.isOpen}
          onOpenChange={viewModal.toggle}
          mode="view"
        />

        <SubUnidadeDialog
          subUnidade={selectedSubUnidade || undefined}
          isOpen={subUnidadeViewModal.isOpen}
          onOpenChange={subUnidadeViewModal.toggle}
          mode="view"
        />

        <SubUnidadeDialog
          subUnidade={selectedSubUnidade || undefined}
          isOpen={subUnidadeEditModal.isOpen}
          onOpenChange={subUnidadeEditModal.toggle}
          onSubmit={handleSubUnidadeEditSubmit}
          mode="edit"
        />
      </div>
    </DashboardLayout>
  );
}
