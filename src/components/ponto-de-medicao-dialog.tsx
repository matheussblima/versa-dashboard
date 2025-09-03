"use client";

import { useState, useEffect } from "react";
import {
  PontoDeMedicao,
  CreatePontoDeMedicaoData,
  UpdatePontoDeMedicaoData,
} from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Hash, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PontoDeMedicaoDialogProps {
  pontoDeMedicao?: PontoDeMedicao;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (
    data: CreatePontoDeMedicaoData | UpdatePontoDeMedicaoData
  ) => void;
  mode: "create" | "edit" | "view";
}

export function PontoDeMedicaoDialog({
  pontoDeMedicao,
  isOpen,
  onOpenChange,
  onSubmit,
  mode,
}: PontoDeMedicaoDialogProps) {
  const [formData, setFormData] = useState<CreatePontoDeMedicaoData>({
    codigo: "",
    descricao: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pontoDeMedicao && (mode === "edit" || mode === "view")) {
      setFormData({
        codigo: pontoDeMedicao.codigo,
        descricao: pontoDeMedicao.descricao || "",
      });
    } else if (mode === "create") {
      setFormData({
        codigo: "",
        descricao: "",
      });
    }
  }, [pontoDeMedicao, mode]);

  const updateField = (
    field: keyof CreatePontoDeMedicaoData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const isViewMode = mode === "view";
  const isCreateMode = mode === "create";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            {isCreateMode && "Novo Ponto de Medição"}
            {mode === "edit" && "Editar Ponto de Medição"}
            {isViewMode && "Detalhes do Ponto de Medição"}
          </DialogTitle>
          <DialogDescription>
            {isCreateMode && "Crie um novo ponto de medição no sistema"}
            {mode === "edit" && "Edite as informações do ponto de medição"}
            {isViewMode && "Visualize os detalhes do ponto de medição"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="codigo" className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Código *
            </Label>
            <Input
              id="codigo"
              value={formData.codigo}
              onChange={(e) => updateField("codigo", e.target.value)}
              placeholder="Digite o código do ponto de medição"
              disabled={isViewMode}
              required={!isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Descrição
            </Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => updateField("descricao", e.target.value)}
              placeholder="Digite uma descrição (opcional)"
              disabled={isViewMode}
              rows={3}
            />
          </div>

          {isViewMode && pontoDeMedicao && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  Data de Criação
                </Label>
                <p className="text-sm text-gray-600">
                  {format(
                    new Date(pontoDeMedicao.createdAt),
                    "dd/MM/yyyy 'às' HH:mm",
                    { locale: ptBR }
                  )}
                </p>
              </div>

              {pontoDeMedicao.updatedAt !== pontoDeMedicao.createdAt && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    Última Atualização
                  </Label>
                  <p className="text-sm text-gray-600">
                    {format(
                      new Date(pontoDeMedicao.updatedAt),
                      "dd/MM/yyyy 'às' HH:mm",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              )}
            </div>
          )}

          {!isViewMode && (
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading || !formData.codigo.trim()}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isCreateMode ? "Criar" : "Salvar"}
              </Button>
            </DialogFooter>
          )}

          {isViewMode && (
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Fechar
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
