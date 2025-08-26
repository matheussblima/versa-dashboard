import { NextRequest, NextResponse } from 'next/server';

import { pontosDeMedicaoService } from '@/services/pontos-de-medicao.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ unidadeId: string }> }
) {
    try {
        const { unidadeId } = await params;
        const unidade = await pontosDeMedicaoService.findByUnidade(unidadeId);
        return NextResponse.json(unidade);
    } catch (error) {
        return NextResponse.json(
            { error: 'Ponto de medição não encontrado' },
            { status: 404 }
        );
    }
}