"use client";

import { PontoDeMedicao } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Calendar, Hash } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PontosDeMedicaoListProps {
  pontosDeMedicao: PontoDeMedicao[];
  onView: (pontoDeMedicao: PontoDeMedicao) => void;
  onEdit: (pontoDeMedicao: PontoDeMedicao) => void;
  onDelete: (id: string) => void;
}

export function PontosDeMedicaoList({
  pontosDeMedicao,
  onView,
  onEdit,
  onDelete,
}: PontosDeMedicaoListProps) {
  if (pontosDeMedicao.length === 0) {
    return (
      <div className="text-center py-12">
        <Hash className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          Nenhum ponto de medição encontrado
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Comece criando um novo ponto de medição.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pontosDeMedicao.map((pontoDeMedicao) => (
        <Card
          key={pontoDeMedicao.id}
          className="hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {pontoDeMedicao.codigo}
                </CardTitle>
                {pontoDeMedicao.descricao && (
                  <p className="text-sm text-gray-600 mt-1">
                    {pontoDeMedicao.descricao}
                  </p>
                )}
              </div>
              <Badge variant="secondary" className="ml-2">
                PM
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                Criado em{" "}
                {format(new Date(pontoDeMedicao.createdAt), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(pontoDeMedicao)}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-1" />
                Visualizar
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(pontoDeMedicao)}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(pontoDeMedicao.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
