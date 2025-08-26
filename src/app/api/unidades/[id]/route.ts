import { NextRequest, NextResponse } from 'next/server';
import { UnidadesService } from '@/services/unidades.service';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const unidade = await UnidadesService.getById(params.id);
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
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const unidade = await UnidadesService.update(params.id, body);
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
    { params }: { params: { id: string } }
) {
    try {
        await UnidadesService.delete(params.id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao deletar unidade' },
            { status: 500 }
        );
    }
}
