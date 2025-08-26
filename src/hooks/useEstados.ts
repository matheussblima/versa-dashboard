import { useState, useCallback } from 'react';
import { Estado } from '@/types';
import { api } from '@/lib/axios';

export function useEstados() {
    const [estados, setEstados] = useState<Estado[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadEstados = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/estados');
            setEstados(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar estados');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadEstadosByRegiao = useCallback(async (regiaoId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/estados/regiao/${regiaoId}`);
            setEstados(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar estados da região');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadEstadoById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/estados/${id}`);
            return response.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar estado');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        estados,
        loading,
        error,
        loadEstados,
        loadEstadosByRegiao,
        loadEstadoById,
    };
}
