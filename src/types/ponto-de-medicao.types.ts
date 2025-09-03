export interface PontoDeMedicao {
    id: string;
    codigo: string;
    descricao?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePontoDeMedicaoData {
    codigo: string;
    descricao?: string;
}

export interface UpdatePontoDeMedicaoData {
    codigo?: string;
    descricao?: string;
}
