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
import { Search, X } from "lucide-react";
import { MedidaQuinzeMinutosFilters, PontoDeMedicao } from "@/types";

interface MedidasQuinzeMinutosFiltersProps {
  filters: MedidaQuinzeMinutosFilters;
  onFiltersChange: (filters: MedidaQuinzeMinutosFilters) => void;
  pontosDeMedicao: PontoDeMedicao[];
  loadingPontos?: boolean;
}

export function MedidasQuinzeMinutosFilters({
  filters,
  onFiltersChange,
  pontosDeMedicao,
  loadingPontos = false,
}: MedidasQuinzeMinutosFiltersProps) {
  const [localFilters, setLocalFilters] =
    useState<MedidaQuinzeMinutosFilters>(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: MedidaQuinzeMinutosFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ""
  );

  const handlePontoChange = (value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      codigoPontoMedicao: value === "todos" ? undefined : value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 min-w-0">
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
              <SelectTrigger className="min-w-[300px] max-w-md">
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
                      {ponto.codigo} {ponto.descricao && `- ${ponto.descricao}`}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button onClick={handleApplyFilters}>
              <Search className="w-4 h-4 mr-2" />
              Aplicar Filtros
            </Button>

            {hasActiveFilters && (
              <Button variant="outline" onClick={handleClearFilters}>
                <X className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
