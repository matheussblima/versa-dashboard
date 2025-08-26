"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Unidade, CreateUnidadeData } from "@/types";
import { toast } from "sonner";

interface UnidadeDialogProps {
  unidade?: Unidade;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateUnidadeData) => Promise<void>;
  mode: "create" | "edit" | "view";
  trigger?: React.ReactNode;
}

export function UnidadeDialog({
  unidade,
  isOpen,
  onOpenChange,
  onSubmit,
  mode,
  trigger,
}: UnidadeDialogProps) {
  const [formData, setFormData] = useState<CreateUnidadeData>({
    nome: "",
    codigoCCEE: "",
    grupoEconomico: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atualizar o formulário quando a unidade mudar
  useEffect(() => {
    if (unidade && mode === "edit") {
      setFormData({
        nome: unidade.nome,
        codigoCCEE: unidade.codigoCCEE,
        grupoEconomico: unidade.grupoEconomico,
      });
    } else if (mode === "create") {
      setFormData({
        nome: "",
        codigoCCEE: "",
        grupoEconomico: "",
      });
    }
  }, [unidade, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit?.(formData);
      onOpenChange(false);
      if (mode === "create") {
        setFormData({ nome: "", codigoCCEE: "", grupoEconomico: "" });
      }
    } catch (error) {
      toast.error(
        `Erro ao salvar unidade: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof CreateUnidadeData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Criar Nova Unidade";
      case "edit":
        return "Editar Unidade";
      case "view":
        return "Detalhes da Unidade";
      default:
        return "Unidade";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>

        {mode === "view" && unidade ? (
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Nome:</span>
              <p className="text-sm mt-1">{unidade.nome}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Código CCEE:
              </span>
              <p className="text-sm mt-1">{unidade.codigoCCEE}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Grupo Econômico:
              </span>
              <p className="text-sm mt-1">{unidade.grupoEconomico}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Subunidades:
              </span>
              <Badge variant="secondary" className="ml-2">
                {unidade.subUnidades?.length || 0}
              </Badge>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Criado em:
              </span>
              <p className="text-sm mt-1">
                {new Date(unidade.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Atualizado em:
              </span>
              <p className="text-sm mt-1">
                {new Date(unidade.updatedAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <Input
                value={formData.nome}
                onChange={(e) => updateField("nome", e.target.value)}
                placeholder="Nome da unidade"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código CCEE
              </label>
              <Input
                value={formData.codigoCCEE}
                onChange={(e) => updateField("codigoCCEE", e.target.value)}
                placeholder="Código CCEE"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grupo Econômico
              </label>
              <Input
                value={formData.grupoEconomico}
                onChange={(e) => updateField("grupoEconomico", e.target.value)}
                placeholder="Grupo Econômico"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Salvando..."
                  : mode === "create"
                  ? "Criar"
                  : "Salvar"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
