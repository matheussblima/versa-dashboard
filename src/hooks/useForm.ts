import { useState, useCallback } from 'react';

interface UseFormReturn<T> {
    formData: T;
    setFormData: (data: T) => void;
    updateField: <K extends keyof T>(field: K, value: T[K]) => void;
    resetForm: () => void;
    isDirty: boolean;
    originalData: T;
}

export function useForm<T extends Record<string, any>>(
    initialData: T
): UseFormReturn<T> {
    const [formData, setFormData] = useState<T>(initialData);
    const [originalData] = useState<T>(initialData);

    const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(originalData);
    }, [originalData]);

    const isDirty = JSON.stringify(formData) !== JSON.stringify(originalData);

    return {
        formData,
        setFormData,
        updateField,
        resetForm,
        isDirty,
        originalData,
    };
}
