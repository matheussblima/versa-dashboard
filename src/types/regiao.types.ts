export interface Regiao {
    id: string;
    sigla: string;
    nome: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRegiaoData {
    sigla: string;
    nome: string;
}

export interface UpdateRegiaoData {
    sigla?: string;
    nome?: string;
}
