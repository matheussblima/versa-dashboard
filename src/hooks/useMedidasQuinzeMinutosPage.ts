import { useCallback, useEffect, useState } from 'react';
import { MedidaQuinzeMinutos, MedidaQuinzeMinutosFilters } from '@/types';
import { useMedidasQuinzeMinutos, useModal, useSelection, usePontosDeMedicao } from './index';

export function useMedidasQuinzeMinutosPage() {
    const {
        medidas,
        loading,
        error,
        loadMedidas,
    } = useMedidasQuinzeMinutos();

    const {
        pontosDeMedicao,
        loading: loadingPontos,
        loadPontosDeMedicao,
    } = usePontosDeMedicao();

    const viewModal = useModal();
    const { selectedItem: selectedMedida, setSelectedItem: setSelectedMedida } = useSelection<MedidaQuinzeMinutos>();
    const [filters, setFilters] = useState<MedidaQuinzeMinutosFilters>({});

    useEffect(() => {
        loadMedidas();
        loadPontosDeMedicao();
    }, [loadMedidas, loadPontosDeMedicao]);

    const handleFiltersChange = useCallback(async (newFilters: MedidaQuinzeMinutosFilters) => {
        setFilters(newFilters);
        await loadMedidas(newFilters);
    }, [loadMedidas]);

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
        filters,
        selectedMedida,
        viewModal,
        pontosDeMedicao,
        loadingPontos,
        handleFiltersChange,
        handleViewMedida,
        handleCloseViewModal,
    };
}
