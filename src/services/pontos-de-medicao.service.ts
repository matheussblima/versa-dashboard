import { api } from '@/lib/axios';
import { PontoDeMedicao } from '@/types';

export interface PontosDeMedicaoService {
    findAll(): Promise<PontoDeMedicao[]>;
    findByUnidade(unidadeId: string): Promise<PontoDeMedicao[]>;
    searchByCcee(codigoCCEE: string): Promise<PontoDeMedicao[]>;
}

export const pontosDeMedicaoService: PontosDeMedicaoService = {
    async findAll(): Promise<PontoDeMedicao[]> {
        const response = await api.get('/pontos-de-medicao');
        return response.data;
    },

    async findByUnidade(unidadeId: string): Promise<PontoDeMedicao[]> {
        const response = await api.get(`/pontos-de-medicao/unidade/${unidadeId}`);
        return response.data;
    },

    async searchByCcee(codigoCCEE: string): Promise<PontoDeMedicao[]> {
        const response = await api.get(`/pontos-de-medicao/ccee/${codigoCCEE}`);
        return response.data;
    },
};
