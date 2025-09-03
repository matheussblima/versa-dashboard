import { useCallback, useEffect, useState } from 'react';
import { PLD, PLDFilters } from '@/types';
import { usePLD, useModal, useSelection } from './index';

export function usePLDPage() {
    const {
        plds,
        loading,
        error,
        currentPage,
        loadPLDs,
        changePage,
    } = usePLD();

    const viewModal = useModal();
    const { selectedItem: selectedPLD, setSelectedItem: setSelectedPLD } = useSelection<PLD>();
    const [filters, setFilters] = useState<PLDFilters>({});

    useEffect(() => {
        loadPLDs();
    }, [loadPLDs]);

    const handleFiltersChange = useCallback(async (newFilters: PLDFilters) => {
        setFilters(newFilters);
        await loadPLDs(newFilters, 1);
    }, [loadPLDs]);

    const handlePageChange = useCallback(async (page: number) => {
        await changePage(page, filters);
    }, [changePage, filters]);

    const handleViewPLD = useCallback((pld: PLD) => {
        setSelectedPLD(pld);
        viewModal.open();
    }, [setSelectedPLD, viewModal]);

    const handleCloseViewModal = useCallback((open: boolean) => {
        if (!open) {
            viewModal.close();
            setSelectedPLD(null);
        }
    }, [viewModal, setSelectedPLD]);

    return {
        plds,
        loading,
        error,
        currentPage,
        filters,
        selectedPLD,
        viewModal,
        handleFiltersChange,
        handlePageChange,
        handleViewPLD,
        handleCloseViewModal,
    };
}
