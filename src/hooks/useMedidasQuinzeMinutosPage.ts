import { useCallback, useEffect, useState } from 'react';
import { MedidaQuinzeMinutos, MedidaQuinzeMinutosFilters } from '@/types';
import { useMedidasQuinzeMinutos, useModal, useSelection, usePontosDeMedicao, useUnidades } from './index';

export function useMedidasQuinzeMinutosPage() {
    const {
        medidas,
        loading,
        error,
        currentPage,
        loadMedidas,
        changePage,
    } = useMedidasQuinzeMinutos();

    const {
        pontosDeMedicao,
        loading: loadingPontos,
        loadPontosDeMedicao,
    } = usePontosDeMedicao();

    const {
        unidades,
        loading: loadingUnidades,
        loadUnidades,
    } = useUnidades();

    const viewModal = useModal();
    const { selectedItem: selectedMedida, setSelectedItem: setSelectedMedida } = useSelection<MedidaQuinzeMinutos>();
    const [filters, setFilters] = useState<MedidaQuinzeMinutosFilters>({});

    useEffect(() => {
        loadMedidas();
        loadPontosDeMedicao();
        loadUnidades();
    }, [loadMedidas, loadPontosDeMedicao, loadUnidades]);

    const handleFiltersChange = useCallback(async (newFilters: MedidaQuinzeMinutosFilters) => {
        setFilters(newFilters);
        await loadMedidas(newFilters, 1); // Reset para página 1 quando filtros mudarem
    }, [loadMedidas]);

    const handlePageChange = useCallback(async (page: number) => {
        await changePage(page, filters);
    }, [changePage, filters]);

    const handleViewMedida = useCallback((medida: MedidaQuinzeMinutos) => {
        setSelectedMedida(medida);
        viewModal.open();
    }, [setSelectedMedida, viewModal]);

    const handleCloseViewModal = useCallback((open: boolean) => {
        if (!open) {
            viewModal.close();
            setSelectedMedida(null);
        }
    }, [viewModal, setSelectedMedida]);

    return {
        medidas,
        loading,
        error,
        currentPage,
        filters,
        selectedMedida,
        viewModal,
        pontosDeMedicao,
        loadingPontos,
        unidades,
        loadingUnidades,
        handleFiltersChange,
        handlePageChange,
        handleViewMedida,
        handleCloseViewModal,
    };
}
