import { useState, useEffect } from 'react';
import { PontoDeMedicao, CreatePontoDeMedicaoData, UpdatePontoDeMedicaoData } from '@/types';
import { pontosDeMedicaoService } from '@/services/pontos-de-medicao.service';
import { useModal } from './useModal';
import { toast } from 'sonner';

export function usePontosDeMedicaoPage() {
    const [pontosDeMedicao, setPontosDeMedicao] = useState<PontoDeMedicao[]>([]);
    const [filteredPontosDeMedicao, setFilteredPontosDeMedicao] = useState<PontoDeMedicao[]>([]);
    const [selectedPontoDeMedicao, setSelectedPontoDeMedicao] = useState<PontoDeMedicao | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const createModal = useModal();
    const editModal = useModal();
    const viewModal = useModal();

    const loadPontosDeMedicao = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await pontosDeMedicaoService.findAll();
            setPontosDeMedicao(data);
            setFilteredPontosDeMedicao(data);
        } catch (err) {
            setError('Erro ao carregar pontos de medição');
            console.error('Erro ao carregar pontos de medição:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPontosDeMedicao();
    }, []);

    useEffect(() => {
        const filtered = pontosDeMedicao.filter(
            (ponto) =>
                ponto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (ponto.descricao && ponto.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredPontosDeMedicao(filtered);
    }, [searchTerm, pontosDeMedicao]);

    const handleCreateSubmit = async (data: CreatePontoDeMedicaoData) => {
        try {
            const newPontoDeMedicao = await pontosDeMedicaoService.create(data);
            setPontosDeMedicao((prev) => [...prev, newPontoDeMedicao]);
            createModal.close();
            toast.success('Ponto de medição criado com sucesso!');
        } catch (err) {
            toast.error('Erro ao criar ponto de medição');
            console.error('Erro ao criar ponto de medição:', err);
        }
    };

    const handleEditSubmit = async (data: UpdatePontoDeMedicaoData) => {
        if (!selectedPontoDeMedicao) return;

        try {
            const updatedPontoDeMedicao = await pontosDeMedicaoService.update(selectedPontoDeMedicao.id, data);
            setPontosDeMedicao((prev) =>
                prev.map((ponto) => (ponto.id === selectedPontoDeMedicao.id ? updatedPontoDeMedicao : ponto))
            );
            editModal.close();
            setSelectedPontoDeMedicao(null);
            toast.success('Ponto de medição atualizado com sucesso!');
        } catch (err) {
            toast.error('Erro ao atualizar ponto de medição');
            console.error('Erro ao atualizar ponto de medição:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await pontosDeMedicaoService.delete(id);
            setPontosDeMedicao((prev) => prev.filter((ponto) => ponto.id !== id));
            toast.success('Ponto de medição excluído com sucesso!');
        } catch (err) {
            toast.error('Erro ao excluir ponto de medição');
            console.error('Erro ao excluir ponto de medição:', err);
        }
    };

    const openCreateDialog = () => {
        createModal.open();
    };

    const openEditDialog = (pontoDeMedicao: PontoDeMedicao) => {
        setSelectedPontoDeMedicao(pontoDeMedicao);
        editModal.open();
    };

    const openViewDialog = (pontoDeMedicao: PontoDeMedicao) => {
        setSelectedPontoDeMedicao(pontoDeMedicao);
        viewModal.open();
    };

    return {
        pontosDeMedicao: filteredPontosDeMedicao,
        selectedPontoDeMedicao,
        searchTerm,
        loading,
        error,
        createModal,
        editModal,
        viewModal,
        setSearchTerm,
        handleCreateSubmit,
        handleEditSubmit,
        handleDelete,
        openCreateDialog,
        openEditDialog,
        openViewDialog,
        setSelectedPontoDeMedicao,
    };
}
