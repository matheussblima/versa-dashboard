"use client";

import { MedidaQuinzeMinutos } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Zap, Hash } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MedidasQuinzeMinutosListProps {
  medidas: MedidaQuinzeMinutos[];
  onView?: (medida: MedidaQuinzeMinutos) => void;
}

export function MedidasQuinzeMinutosList({
  medidas,
  onView,
}: MedidasQuinzeMinutosListProps) {
  if (medidas.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Zap className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma medida encontrada
          </h3>
          <p className="text-gray-500 text-center">
            Não há medidas de quinze minutos para exibir.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {medidas.map((medida) => (
        <Card key={medida.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {medida.codigoPontoMedicao}
              </CardTitle>
              <Badge variant="secondary">{medida.unidade || "kWh"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Valor: <span className="font-medium">{medida.valor}</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {format(new Date(medida.dataHora), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </span>
            </div>

            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(medida)}
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
