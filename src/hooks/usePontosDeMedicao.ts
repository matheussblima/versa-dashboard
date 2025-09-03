import { useState, useCallback } from 'react';
import { CreatePontoDeMedicaoData, PontoDeMedicao, UpdatePontoDeMedicaoData } from '@/types';
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

    const createPontosDeMedicao = useCallback(async (data: CreatePontoDeMedicaoData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('api/pontos-de-medicao', data);
            setPontosDeMedicao((prev) => [...prev, response.data]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar ponto de medição');
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePontosDeMedicao = useCallback(async (id: string, data: UpdatePontoDeMedicaoData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`api/pontos-de-medicao/${id}`, data);
            setPontosDeMedicao((prev) => prev.map((ponto) => ponto.id === id ? response.data : ponto));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar ponto de medição');
        } finally {
            setLoading(false);
        }
    }, []);

    const deletePontosDeMedicao = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`api/pontos-de-medicao/${id}`);
            setPontosDeMedicao((prev) => prev.filter((ponto) => ponto.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao excluir ponto de medição');
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
        createPontosDeMedicao,
        updatePontosDeMedicao,
        deletePontosDeMedicao,
    };
}
