import { useState, useCallback } from 'react';
import { MedidaQuinzeMinutos, MedidaQuinzeMinutosFilters } from '@/types';
import axios from 'axios';

export function useMedidasQuinzeMinutos() {
    const [medidas, setMedidas] = useState<MedidaQuinzeMinutos[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMedidas = useCallback(async (filters?: MedidaQuinzeMinutosFilters) => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (filters?.codigoPontoMedicao) {
                params.append('codigoPontoMedicao', filters.codigoPontoMedicao);
            }

            const response = await axios.get(`api/medidas-quinze-minutos?${params.toString()}`);
            setMedidas(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar medidas de quinze minutos');
        } finally {
            setLoading(false);
        }
    }, []);

    const loadMedidasByPontoMedicao = useCallback(async (codigoPontoMedicao: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`api/medidas-quinze-minutos?codigoPontoMedicao=${codigoPontoMedicao}`);
            setMedidas(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar medidas do ponto de medição');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        medidas,
        loading,
        error,
        loadMedidas,
        loadMedidasByPontoMedicao,
    };
}
