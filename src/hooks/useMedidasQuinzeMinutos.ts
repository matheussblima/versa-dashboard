import { useState, useCallback } from 'react';
import { MedidaQuinzeMinutosFilters, MedidaQuinzeMinutosResponse } from '@/types';
import axios from 'axios';

export function useMedidasQuinzeMinutos() {
    const [medidas, setMedidas] = useState<MedidaQuinzeMinutosResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadMedidas = useCallback(async (filters?: MedidaQuinzeMinutosFilters, page: number = 1) => {
        setLoading(true);
        setError(null);
        setCurrentPage(page);

        try {
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
            params.append('limit', '10');

            const response = await axios.get(`api/medidas-quinze-minutos?${params.toString()}`);
            setMedidas(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar medidas de quinze minutos');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadMedidasByPontoMedicao = useCallback(async (codigoPontoMedicao: string, page: number = 1) => {
        setLoading(true);
        setError(null);
        setCurrentPage(page);

        try {
            const params = new URLSearchParams();
            params.append('codigoPontoMedicao', codigoPontoMedicao);
            params.append('page', page.toString());
            params.append('limit', '10');

            const response = await axios.get(`api/medidas-quinze-minutos?${params.toString()}`);
            setMedidas(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar medidas do ponto de medição');
        } finally {
            setLoading(false);
        }
    }, []);

    const changePage = useCallback(async (page: number, filters?: MedidaQuinzeMinutosFilters) => {
        await loadMedidas(filters, page);
    }, [loadMedidas]);

    return {
        medidas,
        loading,
        error,
        currentPage,
        loadMedidas,
        loadMedidasByPontoMedicao,
        changePage,
    };
}
