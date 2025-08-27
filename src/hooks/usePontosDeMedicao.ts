import { useState, useCallback } from 'react';
import { PontoDeMedicao } from '@/types';
import axios from 'axios';

export function usePontosDeMedicao() {
    const [pontosDeMedicao, setPontosDeMedicao] = useState<PontoDeMedicao[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadPontosDeMedicao = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('api/pontos-de-medicao');
            setPontosDeMedicao(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar pontos de medição');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadPontosDeMedicaoByUnidade = useCallback(async (unidadeId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`api/pontos-de-medicao/unidade/${unidadeId}`);
            setPontosDeMedicao(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar pontos de medição da unidade');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadPontosDeMedicaoAvailable = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('api/pontos-de-medicao/available');
            setPontosDeMedicao(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar pontos de medição disponíveis');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        pontosDeMedicao,
        loading,
        error,
        loadPontosDeMedicao,
        loadPontosDeMedicaoByUnidade,
        loadPontosDeMedicaoAvailable,
    };
}
