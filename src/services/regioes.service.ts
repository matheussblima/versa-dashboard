import { api } from '@/lib/axios';
import { Regiao } from '@/types';

export interface RegioesService {
    findAll(): Promise<Regiao[]>;
    findById(id: string): Promise<Regiao>;
}

export const regioesService: RegioesService = {
    async findAll(): Promise<Regiao[]> {
        const response = await api.get('/regioes');
        return response.data;
    },

    async findById(id: string): Promise<Regiao> {
        const response = await api.get(`/regioes/${id}`);
        return response.data;
    },
};
