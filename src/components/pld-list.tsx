"use client";

import { PLD, PLDResponse } from "@/types";
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
import { Eye, Calendar, DollarSign, Hash } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PLDListProps {
  plds?: PLDResponse;
  onView?: (pld: PLD) => void;
}

export function PLDList({ plds, onView }: PLDListProps) {
  if (!plds?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
        <DollarSign className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum PLD encontrado
        </h3>
        <p className="text-gray-500 text-center">Não há PLDs para exibir.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Submercado</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data/Hora</TableHead>
            {onView && <TableHead className="text-right">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {plds.data.map((pld) => (
            <TableRow key={pld.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <span>{pld.submercado}</span>
                  <Badge variant="outline" className="text-xs">
                    {pld.codigoSubmercado}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">
                    {pld.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: pld.moeda,
                    })}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{pld.tipo}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {format(new Date(pld.dataHora), "dd/MM/yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
              </TableCell>
              {onView && (
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(pld)}
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
