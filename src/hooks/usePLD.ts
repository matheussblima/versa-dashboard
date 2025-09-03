import { useState, useCallback } from 'react';
import { PLDFilters, PLDResponse } from '@/types';
import axios from 'axios';

export function usePLD() {
    const [plds, setPlds] = useState<PLDResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadPLDs = useCallback(async (filters?: PLDFilters, page: number = 1) => {
        setLoading(true);
        setError(null);
        setCurrentPage(page);

        try {
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
            params.append('limit', '10');

            const response = await axios.get(`api/pld?${params.toString()}`);
            setPlds(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar PLDs');
        } finally {
            setLoading(false);
        }
    }, []);

    const changePage = useCallback(async (page: number, filters?: PLDFilters) => {
        await loadPLDs(filters, page);
    }, [loadPLDs]);

    return {
        plds,
        loading,
        error,
        currentPage,
        loadPLDs,
        changePage,
    };
}
