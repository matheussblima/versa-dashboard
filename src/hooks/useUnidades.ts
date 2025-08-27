import { useState, useCallback } from 'react';
import { Unidade, CreateUnidadeData, UpdateUnidadeData } from '@/types';
import { toast } from 'sonner';
import axios from 'axios';

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
            const response = await axios.get('api/unidades');
            setUnidades(response.data);
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
            const newUnidade = await axios.post('api/unidades', data);
            setUnidades((prev) => [...prev, newUnidade.data]);
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
            const updatedUnidade = await axios.put(`api/unidades/${id}`, data);
            setUnidades((prev) =>
                prev.map((unidade) =>
                    unidade.id === id ? updatedUnidade.data : unidade
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
            await axios.delete(`api/unidades/${id}`);
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
