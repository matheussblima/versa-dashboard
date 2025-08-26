import { SubUnidade } from './subunidade.types';

export interface Unidade {
    id: string;
    nome: string;
    codigoCCEE: string;
    grupoEconomico: string;
    subUnidades?: SubUnidade[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateUnidadeData {
    nome: string;
    codigoCCEE: string;
    grupoEconomico: string;
}

export interface UpdateUnidadeData {
    nome?: string;
    codigoCCEE?: string;
    grupoEconomico?: string;
}
