import { api } from '@/lib/axios';
import { MedidaQuinzeMinutos, MedidaQuinzeMinutosFilters, MedidaQuinzeMinutosResponse } from '@/types';

export class MedidasQuinzeMinutosService {
    async findAll(
        filters?: MedidaQuinzeMinutosFilters,
        page: number = 1,
        limit: number = 10
    ): Promise<MedidaQuinzeMinutosResponse> {
        const params = new URLSearchParams();

        if (filters?.codigoPontoMedicao) {
            params.append('codigoPontoMedicao', filters.codigoPontoMedicao);
        }

        if (filters?.unidadeId) {
            params.append('unidadeId', filters.unidadeId);
        }

        if (filters?.dataInicio) {
            params.append('dataInicio', filters.dataInicio);
        }

        if (filters?.dataFim) {
            params.append('dataFim', filters.dataFim);
        }

        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const response = await api.get(`/medidas-quinze-minutos?${params.toString()}`);
        return response.data;
    }

    async findById(id: string): Promise<MedidaQuinzeMinutos> {
        const response = await api.get(`/medidas-quinze-minutos/${id}`);
        return response.data;
    }
}

export const medidasQuinzeMinutosService = new MedidasQuinzeMinutosService();
