export interface Estado {
    id: string;
    sigla: string;
    nome: string;
    regiaoId: string;
    regiao?: {
        id: string;
        sigla: string;
        nome: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface CreateEstadoData {
    sigla: string;
    nome: string;
    regiaoId: string;
}

export interface UpdateEstadoData {
    sigla?: string;
    nome?: string;
    regiaoId?: string;
}
