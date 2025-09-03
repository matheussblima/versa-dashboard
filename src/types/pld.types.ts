export interface PLD {
    id: string;
    dataHora: Date;
    submercado: string;
    codigoSubmercado: string;
    valor: number;
    moeda: string;
    tipo: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PLDResponse {
    data: PLD[];
    hasNext: boolean;
    hasPrevious: boolean;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

export interface PLDFilters {
    dataInicio?: string;
    dataFim?: string;
    codigoSubmercado?: string;
    tipo?: string;
}
