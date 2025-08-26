import { useState, useCallback } from 'react';
import { Regiao } from '@/types';
import { api } from '@/lib/axios';

export function useRegioes() {
    const [regioes, setRegioes] = useState<Regiao[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadRegioes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/regioes');
            setRegioes(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar regiões');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadRegiaoById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/regioes/${id}`);
            return response.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar região');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        regioes,
        loading,
        error,
        loadRegioes,
        loadRegiaoById,
    };
}
