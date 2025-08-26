import { useState, useCallback } from 'react';

interface UseSelectionReturn<T> {
    selectedItem: T | null;
    setSelectedItem: (item: T | null) => void;
    clearSelection: () => void;
    isSelected: (item: T) => boolean;
}

export function useSelection<T>(itemComparator?: (a: T, b: T) => boolean): UseSelectionReturn<T> {
    const [selectedItem, setSelectedItem] = useState<T | null>(null);

    const clearSelection = useCallback(() => {
        setSelectedItem(null);
    }, []);

    const isSelected = useCallback((item: T) => {
        if (!selectedItem) return false;

        if (itemComparator) {
            return itemComparator(selectedItem, item);
        }

        return selectedItem === item;
    }, [selectedItem, itemComparator]);

    return {
        selectedItem,
        setSelectedItem,
        clearSelection,
        isSelected,
    };
}
