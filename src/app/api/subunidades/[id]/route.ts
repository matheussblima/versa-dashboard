import { NextRequest, NextResponse } from 'next/server';
import { SubUnidadesService } from '@/services/subunidades.service';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const subunidade = await SubUnidadesService.getById(params.id);
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

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const body = await request.json();
        const subunidade = await SubUnidadesService.update(params.id, body);
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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await SubUnidadesService.delete(params.id);
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
