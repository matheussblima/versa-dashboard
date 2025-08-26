import axios from 'axios';
import { api } from '@/lib/axios';
import { SubUnidade, CreateSubUnidadeData, UpdateSubUnidadeData } from '@/types';

export class SubUnidadesService {
    static async getAll(): Promise<SubUnidade[]> {
        try {
            const response = await api.get('/subunidades');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao carregar subunidades: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao carregar subunidades');
        }
    }

    static async getById(id: string): Promise<SubUnidade> {
        try {
            const response = await api.get(`/subunidades/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Subunidade não encontrada');
                }
                throw new Error(`Erro ao buscar subunidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao buscar subunidade');
        }
    }

    static async getByUnidadeId(unidadeId: string): Promise<SubUnidade[]> {
        try {
            const response = await api.get(`/unidades/${unidadeId}/subunidades`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao carregar subunidades da unidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao carregar subunidades da unidade');
        }
    }

    static async create(data: CreateSubUnidadeData): Promise<SubUnidade> {
        try {
            const response = await api.post('/subunidades', data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao criar subunidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao criar subunidade');
        }
    }

    static async update(id: string, data: UpdateSubUnidadeData): Promise<SubUnidade> {
        try {
            const response = await api.patch(`/subunidades/${id}`, data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Subunidade não encontrada');
                }
                throw new Error(`Erro ao atualizar subunidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao atualizar subunidade');
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await api.delete(`/subunidades/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Subunidade não encontrada');
                }
                throw new Error(`Erro ao deletar subunidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao deletar subunidade');
        }
    }
}
