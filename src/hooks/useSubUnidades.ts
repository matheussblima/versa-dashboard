import { useState, useCallback } from 'react';
import { SubUnidade, CreateSubUnidadeData, UpdateSubUnidadeData } from '@/types';
import { SubUnidadesService } from '@/services/subunidades.service';
import { toast } from 'sonner';

interface UseSubUnidadesReturn {
    loading: boolean;
    error: string | null;
    createSubUnidade: (data: CreateSubUnidadeData) => Promise<void>;
    updateSubUnidade: (id: string, data: UpdateSubUnidadeData) => Promise<void>;
    deleteSubUnidade: (id: string) => Promise<void>;
}

export function useSubUnidades(): UseSubUnidadesReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createSubUnidade = useCallback(async (data: CreateSubUnidadeData) => {
        setLoading(true);
        setError(null);

        try {
            await SubUnidadesService.create(data);
            toast.success('Subunidade criada com sucesso!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao criar subunidade';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSubUnidade = useCallback(async (id: string, data: UpdateSubUnidadeData) => {
        setLoading(true);
        setError(null);

        try {
            await SubUnidadesService.update(id, data);
            toast.success('Subunidade atualizada com sucesso!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar subunidade';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteSubUnidade = useCallback(async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar esta subunidade?')) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await SubUnidadesService.delete(id);
            toast.success('Subunidade deletada com sucesso!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar subunidade';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        createSubUnidade,
        updateSubUnidade,
        deleteSubUnidade,
    };
}
