import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Unidade, SubUnidade } from "@/types";

interface UnidadesListProps {
  unidades: Unidade[];
  onView: (unidade: Unidade) => void;
  onEdit: (unidade: Unidade) => void;
  onDelete: (id: string) => void;
  onViewSubUnidade: (subunidade: SubUnidade) => void;
  onEditSubUnidade: (subunidade: SubUnidade) => void;
  onDeleteSubUnidade: (id: string) => void;
}

export function UnidadesList({
  unidades,
  onView,
  onEdit,
  onDelete,
  onViewSubUnidade,
  onEditSubUnidade,
  onDeleteSubUnidade,
}: UnidadesListProps) {
  if (unidades.length === 0) {
    return (
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500">Nenhuma unidade encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">
          Lista de Unidades ({unidades.length})
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {unidades.map((unidade) => (
          <div key={unidade.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {unidade.nome.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {unidade.nome}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {unidade.codigoCCEE}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-sm text-gray-500">
                      Grupo: {unidade.grupoEconomico}
                    </p>
                    <p className="text-sm text-gray-500">
                      Criado em:{" "}
                      {new Date(unidade.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(unidade)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(unidade)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(unidade.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {unidade.subUnidades && unidade.subUnidades.length > 0 && (
              <div className="mt-4 ml-12">
                <div className="border-l-2 border-gray-200 pl-4">
                  <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Subunidades ({unidade.subUnidades.length})
                  </h5>
                  <div className="space-y-2">
                    {unidade.subUnidades.map(
                      (subunidade: SubUnidade, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 font-medium text-xs">
                                {subunidade.nome
                                  ? subunidade.nome.charAt(0).toUpperCase()
                                  : "S"}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {subunidade.nome}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                {subunidade.cnpj && (
                                  <span className="text-xs text-gray-500">
                                    CNPJ: {subunidade.cnpj}
                                  </span>
                                )}
                                {subunidade.estado && (
                                  <span className="text-xs text-gray-500">
                                    {subunidade.estado.sigla}
                                  </span>
                                )}
                                {subunidade.pontoDeMedicao && (
                                  <Badge variant="outline" className="text-xs">
                                    PM: {subunidade.pontoDeMedicao.codigo}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onViewSubUnidade(subunidade)}
                              className="text-gray-400 hover:text-gray-600 h-6 w-6 p-0"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEditSubUnidade(subunidade)}
                              className="text-gray-400 hover:text-blue-600 h-6 w-6 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteSubUnidade(subunidade.id)}
                              className="text-gray-400 hover:text-red-600 h-6 w-6 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {(!unidade.subUnidades || unidade.subUnidades.length === 0) && (
              <div className="mt-4 ml-12">
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400 italic">
                    Nenhuma subunidade cadastrada
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
