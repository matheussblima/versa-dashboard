import { useState, useEffect } from 'react';
import { PontoDeMedicao, CreatePontoDeMedicaoData, UpdatePontoDeMedicaoData } from '@/types';
import { pontosDeMedicaoService } from '@/services/pontos-de-medicao.service';
import { useModal } from './useModal';
import { toast } from 'sonner';
import { usePontosDeMedicao } from './usePontosDeMedicao';

export function usePontosDeMedicaoPage() {
    const [filteredPontosDeMedicao, setFilteredPontosDeMedicao] = useState<PontoDeMedicao[]>([]);
    const [selectedPontoDeMedicao, setSelectedPontoDeMedicao] = useState<PontoDeMedicao | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { pontosDeMedicao,
        loading,
        error,
        loadPontosDeMedicao,
        createPontosDeMedicao,
        updatePontosDeMedicao,
        deletePontosDeMedicao,
    } = usePontosDeMedicao();

    const createModal = useModal();
    const editModal = useModal();
    const viewModal = useModal();



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
            await createPontosDeMedicao(data);
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
            await updatePontosDeMedicao(selectedPontoDeMedicao.id, data);
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
            await deletePontosDeMedicao(id);
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
