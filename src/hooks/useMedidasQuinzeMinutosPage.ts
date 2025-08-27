import { useCallback, useEffect, useState } from 'react';
import { MedidaQuinzeMinutos, MedidaQuinzeMinutosFilters } from '@/types';
import { useMedidasQuinzeMinutos, useModal, useSelection } from './index';

export function useMedidasQuinzeMinutosPage() {
    const {
        medidas,
        loading,
        error,
        loadMedidas,
        loadMedidasByPontoMedicao,
    } = useMedidasQuinzeMinutos();

    const viewModal = useModal();
    const { selectedItem: selectedMedida, setSelectedItem: setSelectedMedida } = useSelection<MedidaQuinzeMinutos>();
    const [filters, setFilters] = useState<MedidaQuinzeMinutosFilters>({});

    useEffect(() => {
        loadMedidas();
    }, []);

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
        handleFiltersChange,
        handleViewMedida,
        handleCloseViewModal,
    };
}
