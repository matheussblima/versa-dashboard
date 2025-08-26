import { api } from '@/lib/axios';
import { PontoDeMedicao } from '@/types';

export interface PontosDeMedicaoService {
    findAll(): Promise<PontoDeMedicao[]>;
    findByUnidade(unidadeId: string): Promise<PontoDeMedicao[]>;
    findAvailable(): Promise<PontoDeMedicao[]>;
}

export const pontosDeMedicaoService: PontosDeMedicaoService = {
    async findAll(): Promise<PontoDeMedicao[]> {
        const response = await api.get('/pontos-de-medicao');
        return response.data;
    },

    async findByUnidade(unidadeId: string): Promise<PontoDeMedicao[]> {
        const response = await api.get(`/pontos-de-medicao/${unidadeId}`);
        return response.data;
    },

    async findAvailable(): Promise<PontoDeMedicao[]> {
        const response = await api.get('/pontos-de-medicao/available');
        return response.data;
    },
};
