"use client";

import { MedidaQuinzeMinutos } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Hash, Zap, Clock, Hash as HashIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MedidaQuinzeMinutosDialogProps {
  medida?: MedidaQuinzeMinutos;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MedidaQuinzeMinutosDialog({
  medida,
  isOpen,
  onOpenChange,
}: MedidaQuinzeMinutosDialogProps) {
  if (!medida) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Detalhes da Medida</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Código do Ponto de Medição
            </span>
            <Badge variant="secondary" className="font-mono">
              {medida.codigoPontoMedicao}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <HashIcon className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Valor</span>
                <div className="text-lg font-semibold">
                  {medida.valor} {medida.unidade || "kWh"}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Data e Hora</span>
                <div className="text-sm font-medium">
                  {format(new Date(medida.dataHora), "dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Criado em</span>
                <div className="text-sm font-medium">
                  {format(new Date(medida.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Atualizado em</span>
                <div className="text-sm font-medium">
                  {format(new Date(medida.updatedAt), "dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
