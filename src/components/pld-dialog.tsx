"use client";

import { PLD } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, Hash, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PLDDialogProps {
  pld?: PLD;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PLDDialog({ pld, isOpen, onOpenChange }: PLDDialogProps) {
  if (!pld) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Detalhes do PLD</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Submercado
            </span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="font-mono">
                {pld.codigoSubmercado}
              </Badge>
              <span className="text-sm font-medium">{pld.submercado}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <span className="text-sm text-gray-600">Valor</span>
                <div className="text-lg font-semibold">
                  {pld.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: pld.moeda,
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Hash className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Tipo</span>
                <div className="text-sm font-medium">
                  <Badge variant="outline">{pld.tipo}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Data e Hora</span>
                <div className="text-sm font-medium">
                  {format(new Date(pld.dataHora), "dd/MM/yyyy 'às' HH:mm", {
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
                  {format(new Date(pld.createdAt), "dd/MM/yyyy 'às' HH:mm", {
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
                  {format(new Date(pld.updatedAt), "dd/MM/yyyy 'às' HH:mm", {
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
