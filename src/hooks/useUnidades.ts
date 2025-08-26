import { useState, useCallback } from 'react';
import { Unidade, CreateUnidadeData, UpdateUnidadeData } from '@/types';
import { UnidadesService } from '@/services/unidades.service';
import { toast } from 'sonner';

interface UseUnidadesReturn {
    unidades: Unidade[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredUnidades: Unidade[];
    createUnidade: (data: CreateUnidadeData) => Promise<void>;
    updateUnidade: (id: string, data: UpdateUnidadeData) => Promise<void>;
    deleteUnidade: (id: string) => Promise<void>;
    loadUnidades: () => Promise<void>;
}

export function useUnidades(): UseUnidadesReturn {
    const [unidades, setUnidades] = useState<Unidade[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUnidades = unidades.filter(
        (unidade) =>
            unidade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unidade.codigoCCEE.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unidade.grupoEconomico.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const loadUnidades = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await UnidadesService.getAll();
            setUnidades(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar unidades';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const createUnidade = useCallback(async (data: CreateUnidadeData) => {
        setLoading(true);
        setError(null);

        try {
            const newUnidade = await UnidadesService.create(data);
            setUnidades((prev) => [...prev, newUnidade]);
            toast.success('Unidade criada com sucesso!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao criar unidade';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateUnidade = useCallback(async (id: string, data: UpdateUnidadeData) => {
        setLoading(true);
        setError(null);

        try {
            const updatedUnidade = await UnidadesService.update(id, data);
            setUnidades((prev) =>
                prev.map((unidade) =>
                    unidade.id === id ? updatedUnidade : unidade
                )
            );
            toast.success('Unidade atualizada com sucesso!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar unidade';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);


    const deleteUnidade = useCallback(async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar esta unidade?')) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await UnidadesService.delete(id);
            setUnidades((prev) => prev.filter((unidade) => unidade.id !== id));
            toast.success('Unidade deletada com sucesso!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar unidade';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        unidades,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        filteredUnidades,
        createUnidade,
        updateUnidade,
        deleteUnidade,
        loadUnidades,
    };
}
