export interface MedidaQuinzeMinutos {
    id: string;
    codigoPontoMedicao: string;
    dataHora: Date;
    valor: number;
    unidade?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MedidaQuinzeMinutosFilters {
    codigoPontoMedicao?: string;
}
