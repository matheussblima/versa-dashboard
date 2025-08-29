"use client";

import { MedidaQuinzeMinutos, MedidaQuinzeMinutosResponse } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Zap, Hash } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MedidasQuinzeMinutosListProps {
  medidas?: MedidaQuinzeMinutosResponse;
  onView?: (medida: MedidaQuinzeMinutos) => void;
}

export function MedidasQuinzeMinutosList({
  medidas,
  onView,
}: MedidasQuinzeMinutosListProps) {
  if (!medidas?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
        <Zap className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma medida encontrada
        </h3>
        <p className="text-gray-500 text-center">
          Não há medidas de quinze minutos para exibir.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código do Ponto</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Data/Hora</TableHead>
            {onView && <TableHead className="text-right">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {medidas.data.map((medida) => (
            <TableRow key={medida.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {medida.codigoPontoMedicao}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span>{medida.valor}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{medida.unidade || "kWh"}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {format(
                      new Date(medida.dataHora),
                      "dd/MM/yyyy 'às' HH:mm",
                      {
                        locale: ptBR,
                      }
                    )}
                  </span>
                </div>
              </TableCell>
              {onView && (
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(medida)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
