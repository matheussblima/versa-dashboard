export interface Estado {
    id: string;
    sigla: string;
    nome: string;
    createdAt: string;
    updatedAt: string;
}

export interface Regiao {
    id: string;
    sigla: string;
    nome: string;
    createdAt: string;
    updatedAt: string;
}

export interface PontoDeMedicao {
    id: string;
    codigo: string;
    descricao?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SubUnidade {
    id: string;
    nome: string;
    descricao?: string;
    estado?: Estado;
    regiao?: Regiao;
    apeRemoto?: boolean;
    apeLocal?: boolean;
    codigoI5?: string;
    codigoI0?: string;
    codigoI100?: string;
    codigoConv?: string;
    cnpj?: string;
    unidadeId: string;
    pontoDeMedicao?: PontoDeMedicao;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSubUnidadeData {
    nome: string;
    descricao?: string;
    estadoId?: string;
    regiaoId?: string;
    apeRemoto?: boolean;
    apeLocal?: boolean;
    codigoI5?: string;
    codigoI0?: string;
    codigoI100?: string;
    codigoConv?: string;
    cnpj?: string;
    unidadeId: string;
    pontoDeMedicaoId?: string;
}

export interface UpdateSubUnidadeData {
    nome?: string;
    descricao?: string;
    estadoId?: string;
    regiaoId?: string;
    apeRemoto?: boolean;
    apeLocal?: boolean;
    codigoI5?: string;
    codigoI0?: string;
    codigoI100?: string;
    codigoConv?: string;
    cnpj?: string;
    pontoDeMedicaoId?: string;
}
