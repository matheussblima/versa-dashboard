import { api } from '@/lib/axios';
import { PontoDeMedicao, CreatePontoDeMedicaoData, UpdatePontoDeMedicaoData } from '@/types';

export interface PontosDeMedicaoService {
    findAll(): Promise<PontoDeMedicao[]>;
    findById(id: string): Promise<PontoDeMedicao>;
    findByUnidade(unidadeId: string): Promise<PontoDeMedicao[]>;
    findAvailable(): Promise<PontoDeMedicao[]>;
    create(data: CreatePontoDeMedicaoData): Promise<PontoDeMedicao>;
    update(id: string, data: UpdatePontoDeMedicaoData): Promise<PontoDeMedicao>;
    delete(id: string): Promise<void>;
}

export const pontosDeMedicaoService: PontosDeMedicaoService = {
    async findAll(): Promise<PontoDeMedicao[]> {
        const response = await api.get('/pontos-de-medicao');
        return response.data;
    },

    async findById(id: string): Promise<PontoDeMedicao> {
        const response = await api.get(`/pontos-de-medicao/${id}`);
        return response.data;
    },

    async findByUnidade(unidadeId: string): Promise<PontoDeMedicao[]> {
        const response = await api.get(`/pontos-de-medicao/unidade/${unidadeId}`);
        return response.data;
    },

    async findAvailable(): Promise<PontoDeMedicao[]> {
        const response = await api.get('/pontos-de-medicao/available');
        return response.data;
    },

    async create(data: CreatePontoDeMedicaoData): Promise<PontoDeMedicao> {
        const response = await api.post('/pontos-de-medicao', data);
        return response.data;
    },

    async update(id: string, data: UpdatePontoDeMedicaoData): Promise<PontoDeMedicao> {
        const response = await api.patch(`/pontos-de-medicao/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/pontos-de-medicao/${id}`);
    },
};
