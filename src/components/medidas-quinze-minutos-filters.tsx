"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MedidaQuinzeMinutosFilters, PontoDeMedicao, Unidade } from "@/types";

interface MedidasQuinzeMinutosFiltersProps {
  filters: MedidaQuinzeMinutosFilters;
  onFiltersChange: (filters: MedidaQuinzeMinutosFilters) => void;
  pontosDeMedicao: PontoDeMedicao[];
  loadingPontos?: boolean;
  unidades: Unidade[];
  loadingUnidades?: boolean;
}

export function MedidasQuinzeMinutosFilters({
  filters,
  onFiltersChange,
  pontosDeMedicao,
  loadingPontos = false,
  unidades,
  loadingUnidades = false,
}: MedidasQuinzeMinutosFiltersProps) {
  const [localFilters, setLocalFilters] =
    useState<MedidaQuinzeMinutosFilters>(filters);

  const handleClearFilters = () => {
    const clearedFilters: MedidaQuinzeMinutosFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ""
  );

  const handlePontoChange = (value: string) => {
    const newFilters = {
      ...localFilters,
      codigoPontoMedicao: value === "todos" ? undefined : value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleUnidadeChange = (value: string) => {
    const newFilters = {
      ...localFilters,
      unidadeId: value === "todos" ? undefined : value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label
                htmlFor="codigoPontoMedicao"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Ponto de Medição
              </label>
              <Select
                value={localFilters.codigoPontoMedicao || "todos"}
                onValueChange={handlePontoChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um ponto de medição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os pontos</SelectItem>
                  {loadingPontos ? (
                    <SelectItem value="loading" disabled>
                      Carregando pontos...
                    </SelectItem>
                  ) : (
                    pontosDeMedicao.map((ponto) => (
                      <SelectItem key={ponto.id} value={ponto.codigo}>
                        {ponto.codigo}{" "}
                        {ponto.descricao && `- ${ponto.descricao}`}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <label
                htmlFor="unidadeId"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Unidade
              </label>
              <Select
                value={localFilters.unidadeId || "todos"}
                onValueChange={handleUnidadeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as unidades</SelectItem>
                  {loadingUnidades ? (
                    <SelectItem value="loading" disabled>
                      Carregando unidades...
                    </SelectItem>
                  ) : (
                    unidades.map((unidade) => (
                      <SelectItem key={unidade.id} value={unidade.id}>
                        {unidade.nome} - {unidade.codigoCCEE}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full sm:w-auto"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
