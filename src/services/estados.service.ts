import { api } from '@/lib/axios';
import { Estado } from '@/types';

export interface EstadosService {
    findAll(): Promise<Estado[]>;
    findById(id: string): Promise<Estado>;
    findByRegiao(regiaoId: string): Promise<Estado[]>;
}

export const estadosService: EstadosService = {
    async findAll(): Promise<Estado[]> {
        const response = await api.get('/estados');
        return response.data;
    },

    async findById(id: string): Promise<Estado> {
        const response = await api.get(`/estados/${id}`);
        return response.data;
    },

    async findByRegiao(regiaoId: string): Promise<Estado[]> {
        const response = await api.get(`/estados/regiao/${regiaoId}`);
        return response.data;
    },
};
