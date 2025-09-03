"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import type { PLDFilters } from "@/types";

interface PLDFiltersProps {
  filters: PLDFilters;
  onFiltersChange: (filters: PLDFilters) => void;
}

export function PLDFilters({ filters, onFiltersChange }: PLDFiltersProps) {
  const [localFilters, setLocalFilters] = useState<PLDFilters>(filters);

  const handleClearFilters = () => {
    const clearedFilters: PLDFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ""
  );

  const handleSubmercadoChange = (value: string) => {
    const newFilters = {
      ...localFilters,
      codigoSubmercado: value === "todos" ? undefined : value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTipoChange = (value: string) => {
    const newFilters = {
      ...localFilters,
      tipo: value === "todos" ? undefined : value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDataInicioChange = (value: string) => {
    const newFilters = {
      ...localFilters,
      dataInicio: value || undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDataFimChange = (value: string) => {
    const newFilters = {
      ...localFilters,
      dataFim: value || undefined,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <label
                htmlFor="codigoSubmercado"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Submercado
              </label>
              <Select
                value={localFilters.codigoSubmercado || "todos"}
                onValueChange={handleSubmercadoChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um submercado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os submercados</SelectItem>
                  <SelectItem value="1">Sudeste</SelectItem>
                  <SelectItem value="2">Sul</SelectItem>
                  <SelectItem value="3">Nordeste</SelectItem>
                  <SelectItem value="4">Norte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <label
                htmlFor="tipo"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Tipo
              </label>
              <Select
                value={localFilters.tipo || "todos"}
                onValueChange={handleTipoChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="HORARIO">Horário</SelectItem>
                  <SelectItem value="SEMANAL">Semanal</SelectItem>
                  <SelectItem value="MENSAL">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <label
                htmlFor="dataInicio"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Data Início
              </label>
              <Input
                type="date"
                id="dataInicio"
                value={localFilters.dataInicio || ""}
                onChange={(e) => handleDataInicioChange(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="dataFim"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Data Fim
              </label>
              <Input
                type="date"
                id="dataFim"
                value={localFilters.dataFim || ""}
                onChange={(e) => handleDataFimChange(e.target.value)}
                className="w-full"
              />
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
