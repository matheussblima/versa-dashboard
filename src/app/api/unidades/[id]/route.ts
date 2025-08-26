import { NextRequest, NextResponse } from 'next/server';
import { UnidadesService } from '@/services/unidades.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const unidade = await UnidadesService.getById(id);
        return NextResponse.json(unidade);
    } catch (error) {
        return NextResponse.json(
            { error: 'Unidade não encontrada' },
            { status: 404 }
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
        const unidade = await UnidadesService.update(id, body);
        return NextResponse.json(unidade);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao atualizar unidade' },
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
        await UnidadesService.delete(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao deletar unidade' },
            { status: 500 }
        );
    }
}
