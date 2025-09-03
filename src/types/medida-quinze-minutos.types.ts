export interface MedidaQuinzeMinutos {
    id: string;
    codigoPontoMedicao: string;
    dataHora: Date;
    valor: number;
    unidade?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MedidaQuinzeMinutosResponse {
    data: MedidaQuinzeMinutos[];
    hasNext: boolean;
    hasPrevious: boolean;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

export interface MedidaQuinzeMinutosFilters {
    codigoPontoMedicao?: string;
    unidadeId?: string;
    dataInicio?: string;
    dataFim?: string;
}
