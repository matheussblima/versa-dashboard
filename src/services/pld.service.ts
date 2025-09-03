import { api } from '@/lib/axios';
import { PLD, PLDFilters, PLDResponse } from '@/types';

export class PLDService {
    async findAll(
        filters?: PLDFilters,
        page: number = 1,
        limit: number = 10
    ): Promise<PLDResponse> {
        const params = new URLSearchParams();

        if (filters?.dataInicio) {
            params.append('dataInicio', filters.dataInicio);
        }

        if (filters?.dataFim) {
            params.append('dataFim', filters.dataFim);
        }

        if (filters?.codigoSubmercado) {
            params.append('codigoSubmercado', filters.codigoSubmercado);
        }

        if (filters?.tipo) {
            params.append('tipo', filters.tipo);
        }

        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const response = await api.get(`/pld?${params.toString()}`);
        return response.data;
    }

    async findById(id: string): Promise<PLD> {
        const response = await api.get(`/pld/${id}`);
        return response.data;
    }
}

export const pldService = new PLDService();
