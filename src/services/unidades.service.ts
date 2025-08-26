import axios from 'axios';
import { api } from '@/lib/axios';
import { Unidade, CreateUnidadeData, UpdateUnidadeData } from '@/types';

export class UnidadesService {
    static async getAll(): Promise<Unidade[]> {
        try {
            const response = await api.get('/unidades');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao carregar unidades: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao carregar unidades');
        }
    }

    static async getById(id: string): Promise<Unidade> {
        try {
            const response = await api.get(`/unidades/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Unidade não encontrada');
                }
                throw new Error(`Erro ao buscar unidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao buscar unidade');
        }
    }

    static async create(data: CreateUnidadeData): Promise<Unidade> {
        try {
            const response = await api.post('/unidades', data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao criar unidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao criar unidade');
        }
    }

    static async update(id: string, data: UpdateUnidadeData): Promise<Unidade> {
        try {
            const response = await api.patch(`/unidades/${id}`, data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Unidade não encontrada');
                }
                throw new Error(`Erro ao atualizar unidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao atualizar unidade');
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await api.delete(`/unidades/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Unidade não encontrada');
                }
                throw new Error(`Erro ao deletar unidade: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('Erro ao deletar unidade');
        }
    }
}
