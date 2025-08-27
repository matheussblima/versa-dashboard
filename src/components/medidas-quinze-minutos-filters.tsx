"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { MedidaQuinzeMinutosFilters } from "@/types";

interface MedidasQuinzeMinutosFiltersProps {
  filters: MedidaQuinzeMinutosFilters;
  onFiltersChange: (filters: MedidaQuinzeMinutosFilters) => void;
}

export function MedidasQuinzeMinutosFilters({
  filters,
  onFiltersChange,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="codigoPontoMedicao"
            className="text-sm font-medium text-gray-700"
          >
            Código do Ponto de Medição
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="codigoPontoMedicao"
              placeholder="Ex: RSPKSCALADM01"
              value={localFilters.codigoPontoMedicao || ""}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  codigoPontoMedicao: e.target.value,
                }))
              }
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleApplyFilters} className="flex-1">
            <Search className="w-4 h-4 mr-2" />
            Aplicar Filtros
          </Button>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
