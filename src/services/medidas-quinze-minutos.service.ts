import { api } from '@/lib/axios';
import { MedidaQuinzeMinutos, MedidaQuinzeMinutosFilters } from '@/types';

export class MedidasQuinzeMinutosService {
    async findAll(filters?: MedidaQuinzeMinutosFilters): Promise<MedidaQuinzeMinutos[]> {
        const params = new URLSearchParams();

        if (filters?.codigoPontoMedicao) {
            params.append('codigoPontoMedicao', filters.codigoPontoMedicao);
        }

        if (filters?.unidadeId) {
            params.append('unidadeId', filters.unidadeId);
        }

        const response = await api.get(`/medidas-quinze-minutos?${params.toString()}`);
        return response.data;
    }

    async findById(id: string): Promise<MedidaQuinzeMinutos> {
        const response = await api.get(`/medidas-quinze-minutos/${id}`);
        return response.data;
    }
}

export const medidasQuinzeMinutosService = new MedidasQuinzeMinutosService();
