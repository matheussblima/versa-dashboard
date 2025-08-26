import { useCallback, useEffect } from 'react';
import { Unidade, CreateUnidadeData, SubUnidade, CreateSubUnidadeData, UpdateSubUnidadeData } from '@/types';
import { useUnidades, useForm, useModal, useSelection, useSubUnidades, usePontosDeMedicao, useRegioes, useEstados } from './index';

export function useUnidadesPage() {
    const {
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
    } = useUnidades();

    const createModal = useModal();
    const editModal = useModal();
    const viewModal = useModal();
    const subUnidadeCreateModal = useModal();
    const subUnidadeViewModal = useModal();
    const subUnidadeEditModal = useModal();

    const { selectedItem: selectedUnidade, setSelectedItem: setSelectedUnidade } = useSelection<Unidade>();
    const { selectedItem: selectedSubUnidade, setSelectedItem: setSelectedSubUnidade } = useSelection<SubUnidade>();
    const { selectedItem: parentUnidade, setSelectedItem: setParentUnidade } = useSelection<Unidade>();

    const { formData, setFormData, updateField, resetForm, isDirty: isFormDirty } = useForm<CreateUnidadeData>({
        nome: "",
        codigoCCEE: "",
        grupoEconomico: "",
    });

    const { formData: subUnidadeFormData, setFormData: setSubUnidadeFormData, updateField: updateSubUnidadeField, resetForm: resetSubUnidadeForm, isDirty: isSubUnidadeFormDirty } = useForm<CreateSubUnidadeData>({
        nome: "",
        descricao: "",
        cnpj: "",
        unidadeId: "",
        apeRemoto: false,
        apeLocal: false,
        codigoI5: "",
        codigoI0: "",
        codigoI100: "",
        codigoConv: "",
    });

    const { createSubUnidade, updateSubUnidade, deleteSubUnidade } = useSubUnidades();
    const { pontosDeMedicao, loading: loadingPontos, loadPontosDeMedicaoAvailable, loadPontosDeMedicao } = usePontosDeMedicao();
    const { regioes, loading: loadingRegioes, loadRegioes } = useRegioes();
    const { estados, loading: loadingEstados, loadEstados } = useEstados();

    const handleCreateSubmit = useCallback(async (data: CreateUnidadeData) => {
        if (!data.nome.trim()) {
            throw new Error('Nome da unidade é obrigatório');
        }

        if (!data.codigoCCEE.trim()) {
            throw new Error('Código CCEE é obrigatório');
        }

        if (!data.grupoEconomico.trim()) {
            throw new Error('Grupo Econômico é obrigatório');
        }

        const existingUnidade = unidades.find(
            u => u.codigoCCEE.toLowerCase() === data.codigoCCEE.toLowerCase()
        );

        if (existingUnidade) {
            throw new Error('Já existe uma unidade com este código CCEE');
        }

        try {
            await createUnidade(data);
            createModal.close();
            resetForm();
        } catch (error) {
            throw error;
        }
    }, [unidades, createUnidade, createModal, resetForm]);

    const handleEditSubmit = useCallback(async (data: CreateUnidadeData) => {
        if (!selectedUnidade) {
            throw new Error('Nenhuma unidade selecionada para edição');
        }

        if (!data.nome.trim()) {
            throw new Error('Nome da unidade é obrigatório');
        }

        if (!data.codigoCCEE.trim()) {
            throw new Error('Código CCEE é obrigatório');
        }

        if (!data.grupoEconomico.trim()) {
            throw new Error('Grupo Econômico é obrigatório');
        }

        const existingUnidade = unidades.find(
            u => u.codigoCCEE.toLowerCase() === data.codigoCCEE.toLowerCase() && u.id !== selectedUnidade.id
        );

        if (existingUnidade) {
            throw new Error('Já existe outra unidade com este código CCEE');
        }

        try {
            await updateUnidade(selectedUnidade.id, data);
            editModal.close();
            setSelectedUnidade(null);
            resetForm();
        } catch (error) {
            throw error;
        }
    }, [selectedUnidade, unidades, updateUnidade, editModal, setSelectedUnidade, resetForm]);

    const handleDelete = useCallback(async (id: string) => {
        const unidadeToDelete = unidades.find(u => u.id === id);

        if (!unidadeToDelete) {
            throw new Error('Unidade não encontrada');
        }

        if (unidadeToDelete.subUnidades && unidadeToDelete.subUnidades.length > 0) {
            throw new Error('Não é possível deletar uma unidade que possui subunidades');
        }

        try {
            await deleteUnidade(id);
        } catch (error) {
            throw error;
        }
    }, [unidades, deleteUnidade]);

    const openCreateDialog = useCallback(() => {
        resetForm();
        createModal.open();
    }, [resetForm, createModal]);

    const openEditDialog = useCallback((unidade: Unidade) => {
        setSelectedUnidade(unidade);
        setFormData({
            nome: unidade.nome,
            codigoCCEE: unidade.codigoCCEE,
            grupoEconomico: unidade.grupoEconomico,
        });
        editModal.open();
    }, [setSelectedUnidade, setFormData, editModal]);

    const openViewDialog = useCallback((unidade: Unidade) => {
        setSelectedUnidade(unidade);
        viewModal.open();
    }, [setSelectedUnidade, viewModal]);

    const handleSubUnidadeCreateSubmit = useCallback(async (data: CreateSubUnidadeData) => {
        if (!parentUnidade) {
            throw new Error('Nenhuma unidade selecionada para adicionar subunidade');
        }

        if (!data.nome.trim()) {
            throw new Error('Nome da subunidade é obrigatório');
        }

        try {
            const subUnidadeData = {
                ...data,
                unidadeId: parentUnidade.id,
            };
            await createSubUnidade(subUnidadeData);
            subUnidadeCreateModal.close();
            setParentUnidade(null);
            resetSubUnidadeForm();
            await loadUnidades();
        } catch (error) {
            throw error;
        }
    }, [parentUnidade, createSubUnidade, subUnidadeCreateModal, setParentUnidade, resetSubUnidadeForm, loadUnidades]);

    const handleSubUnidadeEditSubmit = useCallback(async (data: CreateSubUnidadeData) => {
        if (!selectedSubUnidade) {
            throw new Error('Nenhuma subunidade selecionada para edição');
        }

        if (!data.nome.trim()) {
            throw new Error('Nome da subunidade é obrigatório');
        }

        try {
            await updateSubUnidade(selectedSubUnidade.id, data);
            subUnidadeEditModal.close();
            setSelectedSubUnidade(null);
            resetSubUnidadeForm();
            await loadUnidades();
        } catch (error) {
            throw error;
        }
    }, [selectedSubUnidade, updateSubUnidade, subUnidadeEditModal, setSelectedSubUnidade, resetSubUnidadeForm, loadUnidades]);

    const handleSubUnidadeDelete = useCallback(async (id: string) => {
        try {
            await deleteSubUnidade(id);
            await loadUnidades();
        } catch (error) {
            throw error;
        }
    }, [deleteSubUnidade, loadUnidades]);

    const openSubUnidadeViewDialog = useCallback((subunidade: SubUnidade) => {
        setSelectedSubUnidade(subunidade);
        subUnidadeViewModal.open();
    }, [setSelectedSubUnidade, subUnidadeViewModal]);

    const openSubUnidadeCreateDialog = useCallback((unidade: Unidade) => {
        setParentUnidade(unidade);
        setSubUnidadeFormData({
            nome: "",
            descricao: "",
            cnpj: "",
            unidadeId: unidade.id,
            apeRemoto: false,
            apeLocal: false,
            codigoI5: "",
            codigoI0: "",
            codigoI100: "",
            codigoConv: "",
        });
        loadPontosDeMedicaoAvailable();
        subUnidadeCreateModal.open();
    }, [setParentUnidade, setSubUnidadeFormData, subUnidadeCreateModal, loadPontosDeMedicaoAvailable]);

    const openSubUnidadeEditDialog = useCallback((subunidade: SubUnidade) => {
        setSelectedSubUnidade(subunidade);
        setSubUnidadeFormData({
            nome: subunidade.nome,
            descricao: subunidade.descricao || "",
            cnpj: subunidade.cnpj || "",
            unidadeId: subunidade.unidadeId,
            apeRemoto: subunidade.apeRemoto || false,
            apeLocal: subunidade.apeLocal || false,
            codigoI5: subunidade.codigoI5 || "",
            codigoI0: subunidade.codigoI0 || "",
            codigoI100: subunidade.codigoI100 || "",
            codigoConv: subunidade.codigoConv || "",
            pontoDeMedicaoId: subunidade.pontoDeMedicao?.id || "",
            regiaoId: subunidade.regiao?.id || "",
            estadoId: subunidade.estado?.id || "",
        });
        loadPontosDeMedicao();
        subUnidadeEditModal.open();
    }, [setSelectedSubUnidade, setSubUnidadeFormData, subUnidadeEditModal, loadPontosDeMedicao]);

    const closeCreateDialog = useCallback(() => {
        createModal.close();
        resetForm();
    }, [createModal, resetForm]);

    const closeEditDialog = useCallback(() => {
        editModal.close();
        setSelectedUnidade(null);
        resetForm();
    }, [editModal, setSelectedUnidade, resetForm]);

    const closeViewDialog = useCallback(() => {
        viewModal.close();
        setSelectedUnidade(null);
    }, [viewModal, setSelectedUnidade]);

    const closeSubUnidadeCreateDialog = useCallback(() => {
        subUnidadeCreateModal.close();
        setParentUnidade(null);
        resetSubUnidadeForm();
    }, [subUnidadeCreateModal, setParentUnidade, resetSubUnidadeForm]);

    const closeSubUnidadeViewDialog = useCallback(() => {
        subUnidadeViewModal.close();
        setSelectedSubUnidade(null);
    }, [subUnidadeViewModal, setSelectedSubUnidade]);

    const closeSubUnidadeEditDialog = useCallback(() => {
        subUnidadeEditModal.close();
        setSelectedSubUnidade(null);
        resetSubUnidadeForm();
    }, [subUnidadeEditModal, setSelectedSubUnidade, resetSubUnidadeForm]);

    const updateFormField = useCallback(<K extends keyof CreateUnidadeData>(field: K, value: CreateUnidadeData[K]) => {
        updateField(field, value);
    }, [updateField]);

    const updateSubUnidadeFormField = useCallback(<K extends keyof CreateSubUnidadeData>(field: K, value: CreateSubUnidadeData[K]) => {
        updateSubUnidadeField(field, value);
    }, [updateSubUnidadeField]);

    useEffect(() => {
        loadUnidades();
        loadRegioes();
        loadEstados();
    }, [loadUnidades, loadRegioes, loadEstados]);


    return {
        unidades,
        loading,
        error,
        searchTerm,
        filteredUnidades,
        selectedUnidade,
        selectedSubUnidade,
        parentUnidade,
        pontosDeMedicao,
        loadingPontos,
        regioes,
        estados,
        loadingRegioes,
        loadingEstados,
        createModal,
        editModal,
        viewModal,
        subUnidadeCreateModal,
        subUnidadeViewModal,
        subUnidadeEditModal,
        formData,
        subUnidadeFormData,
        isFormDirty,
        isSubUnidadeFormDirty,
        setSearchTerm,
        handleCreateSubmit,
        handleEditSubmit,
        handleDelete,
        handleSubUnidadeCreateSubmit,
        handleSubUnidadeEditSubmit,
        handleSubUnidadeDelete,
        openCreateDialog,
        openEditDialog,
        openViewDialog,
        openSubUnidadeCreateDialog,
        openSubUnidadeViewDialog,
        openSubUnidadeEditDialog,
        closeCreateDialog,
        closeEditDialog,
        closeViewDialog,
        closeSubUnidadeCreateDialog,
        closeSubUnidadeViewDialog,
        closeSubUnidadeEditDialog,
        updateFormField,
        updateSubUnidadeFormField,
        resetForm,
        resetSubUnidadeForm,
        setSelectedUnidade,
        setSelectedSubUnidade,
        setParentUnidade,
    };
}
