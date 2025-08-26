import { useState, useCallback } from 'react';
import { PontoDeMedicao } from '@/types';
import { pontosDeMedicaoService } from '@/services';

export function usePontosDeMedicao() {
    const [pontosDeMedicao, setPontosDeMedicao] = useState<PontoDeMedicao[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadPontosDeMedicao = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await pontosDeMedicaoService.findAll();
            setPontosDeMedicao(data);
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
            const data = await pontosDeMedicaoService.findByUnidade(unidadeId);
            setPontosDeMedicao(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar pontos de medição da unidade');
        } finally {
            setLoading(false);
        }
    }, []);

    const searchPontosDeMedicaoByCcee = useCallback(async (codigoCCEE: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await pontosDeMedicaoService.searchByCcee(codigoCCEE);
            setPontosDeMedicao(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar pontos de medição na CCEE');
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
        searchPontosDeMedicaoByCcee,
    };
}
