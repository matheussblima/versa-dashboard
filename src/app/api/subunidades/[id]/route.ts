import { NextRequest, NextResponse } from 'next/server';
import { SubUnidadesService } from '@/services/subunidades.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const subunidade = await SubUnidadesService.getById(id);
        return NextResponse.json(subunidade);
    } catch (error) {
        if (error instanceof Error && error.message === 'Subunidade não encontrada') {
            return NextResponse.json(
                { error: 'Subunidade não encontrada' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: 'Erro ao carregar subunidade' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const subunidade = await SubUnidadesService.update(id, body);
        return NextResponse.json(subunidade);
    } catch (error) {
        if (error instanceof Error && error.message === 'Subunidade não encontrada') {
            return NextResponse.json(
                { error: 'Subunidade não encontrada' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: 'Erro ao atualizar subunidade' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await SubUnidadesService.delete(id);
        return NextResponse.json({ message: 'Subunidade deletada com sucesso' });
    } catch (error) {
        if (error instanceof Error && error.message === 'Subunidade não encontrada') {
            return NextResponse.json(
                { error: 'Subunidade não encontrada' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: 'Erro ao deletar subunidade' },
            { status: 500 }
        );
    }
}
