import { NextRequest, NextResponse } from 'next/server';
import { pontosDeMedicaoService } from '@/services/pontos-de-medicao.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const pontoDeMedicao = await pontosDeMedicaoService.findById(id);
        return NextResponse.json(pontoDeMedicao);
    } catch (error) {
        console.error('Erro ao buscar ponto de medição:', error);
        return NextResponse.json(
            { error: 'Ponto de medição não encontrado' },
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
        const pontoDeMedicao = await pontosDeMedicaoService.update(id, body);
        return NextResponse.json(pontoDeMedicao);
    } catch (error) {
        console.error('Erro ao atualizar ponto de medição:', error);
        return NextResponse.json(
            { error: 'Erro ao atualizar ponto de medição' },
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
        await pontosDeMedicaoService.delete(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Erro ao deletar ponto de medição:', error);
        return NextResponse.json(
            { error: 'Erro ao deletar ponto de medição' },
            { status: 500 }
        );
    }
}
