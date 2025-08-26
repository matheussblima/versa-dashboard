"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubUnidade, CreateSubUnidadeData } from "@/types";
import { toast } from "sonner";

interface SubUnidadeDialogProps {
  subUnidade?: SubUnidade;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateSubUnidadeData) => Promise<void>;
  mode: "create" | "edit" | "view";
  trigger?: React.ReactNode;
}

export function SubUnidadeDialog({
  subUnidade,
  isOpen,
  onOpenChange,
  onSubmit,
  mode,
  trigger,
}: SubUnidadeDialogProps) {
  const [formData, setFormData] = useState<CreateSubUnidadeData>({
    nome: "",
    descricao: "",
    cnpj: "",
    unidadeId: "",
    apeRemoto: false,
    apeLocal: false,
    codigoI5: "",
    codigoI0: "",
    codigoI100: "",
    codigoConv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atualizar o formulário quando a subunidade mudar
  useEffect(() => {
    if (subUnidade && mode === "edit") {
      setFormData({
        nome: subUnidade.nome,
        descricao: subUnidade.descricao || "",
        cnpj: subUnidade.cnpj || "",
        unidadeId: subUnidade.unidadeId,
        apeRemoto: subUnidade.apeRemoto || false,
        apeLocal: subUnidade.apeLocal || false,
        codigoI5: subUnidade.codigoI5 || "",
        codigoI0: subUnidade.codigoI0 || "",
        codigoI100: subUnidade.codigoI100 || "",
        codigoConv: subUnidade.codigoConv || "",
      });
    } else if (mode === "create") {
      setFormData({
        nome: "",
        descricao: "",
        cnpj: "",
        unidadeId: "",
        apeRemoto: false,
        apeLocal: false,
        codigoI5: "",
        codigoI0: "",
        codigoI100: "",
        codigoConv: "",
      });
    }
  }, [subUnidade, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit?.(formData);
      onOpenChange(false);
      if (mode === "create") {
        setFormData({
          nome: "",
          descricao: "",
          cnpj: "",
          unidadeId: formData.unidadeId,
          apeRemoto: false,
          apeLocal: false,
          codigoI5: "",
          codigoI0: "",
          codigoI100: "",
          codigoConv: "",
        });
      }
    } catch (error) {
      toast.error(
        `Erro ao salvar subunidade: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof CreateSubUnidadeData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Criar Nova Subunidade";
      case "edit":
        return "Editar Subunidade";
      case "view":
        return "Detalhes da Subunidade";
      default:
        return "Subunidade";
    }
  };

  const formatCNPJ = (cnpj: string) => {
    if (!cnpj) return "";
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>

        {mode === "view" && subUnidade ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Nome:</span>
                <p className="text-sm mt-1">{subUnidade.nome}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">CNPJ:</span>
                <p className="text-sm mt-1">
                  {subUnidade.cnpj
                    ? formatCNPJ(subUnidade.cnpj)
                    : "Não informado"}
                </p>
              </div>
            </div>

            {subUnidade.descricao && (
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Descrição:
                </span>
                <p className="text-sm mt-1">{subUnidade.descricao}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Estado:
                </span>
                <p className="text-sm mt-1">
                  {subUnidade.estado
                    ? `${subUnidade.estado.sigla} - ${subUnidade.estado.nome}`
                    : "Não informado"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Região:
                </span>
                <p className="text-sm mt-1">
                  {subUnidade.regiao
                    ? `${subUnidade.regiao.sigla} - ${subUnidade.regiao.nome}`
                    : "Não informado"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  APE Remoto:
                </span>
                <Badge
                  variant={subUnidade.apeRemoto ? "default" : "secondary"}
                  className="ml-2"
                >
                  {subUnidade.apeRemoto ? "Sim" : "Não"}
                </Badge>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  APE Local:
                </span>
                <Badge
                  variant={subUnidade.apeLocal ? "default" : "secondary"}
                  className="ml-2"
                >
                  {subUnidade.apeLocal ? "Sim" : "Não"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Código I5:
                </span>
                <p className="text-sm mt-1">
                  {subUnidade.codigoI5 || "Não informado"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Código I0:
                </span>
                <p className="text-sm mt-1">
                  {subUnidade.codigoI0 || "Não informado"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Código I100:
                </span>
                <p className="text-sm mt-1">
                  {subUnidade.codigoI100 || "Não informado"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Código Conv:
                </span>
                <p className="text-sm mt-1">
                  {subUnidade.codigoConv || "Não informado"}
                </p>
              </div>
            </div>

            {subUnidade.pontoDeMedicao && (
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Ponto de Medição:
                </span>
                <p className="text-sm mt-1">
                  {subUnidade.pontoDeMedicao.codigo} -{" "}
                  {subUnidade.pontoDeMedicao.descricao || "Sem descrição"}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Criado em:
                </span>
                <p className="text-sm mt-1">
                  {new Date(subUnidade.createdAt).toLocaleString("pt-BR")}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Atualizado em:
                </span>
                <p className="text-sm mt-1">
                  {new Date(subUnidade.updatedAt).toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <Input
                  value={formData.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                  placeholder="Nome da subunidade"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CNPJ
                </label>
                <Input
                  value={formData.cnpj}
                  onChange={(e) => updateField("cnpj", e.target.value)}
                  placeholder="00.000.000/0000-00"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <Input
                value={formData.descricao}
                onChange={(e) => updateField("descricao", e.target.value)}
                placeholder="Descrição da subunidade"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="apeRemoto"
                  checked={formData.apeRemoto}
                  onCheckedChange={(checked) =>
                    updateField("apeRemoto", checked)
                  }
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="apeRemoto"
                  className="text-sm font-medium text-gray-700"
                >
                  APE Remoto
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="apeLocal"
                  checked={formData.apeLocal}
                  onCheckedChange={(checked) =>
                    updateField("apeLocal", checked)
                  }
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="apeLocal"
                  className="text-sm font-medium text-gray-700"
                >
                  APE Local
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código I5
                </label>
                <Input
                  value={formData.codigoI5}
                  onChange={(e) => updateField("codigoI5", e.target.value)}
                  placeholder="Código I5"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código I0
                </label>
                <Input
                  value={formData.codigoI0}
                  onChange={(e) => updateField("codigoI0", e.target.value)}
                  placeholder="Código I0"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código I100
                </label>
                <Input
                  value={formData.codigoI100}
                  onChange={(e) => updateField("codigoI100", e.target.value)}
                  placeholder="Código I100"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código Conv
                </label>
                <Input
                  value={formData.codigoConv}
                  onChange={(e) => updateField("codigoConv", e.target.value)}
                  placeholder="Código Conv"
                  disabled={isSubmitting}
                />
              </div>
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
