import { NextRequest, NextResponse } from 'next/server';
import { pontosDeMedicaoService } from '@/services/pontos-de-medicao.service';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const unidadeId = searchParams.get('unidadeId');
        const codigoCCEE = searchParams.get('codigoCCEE');

        let data;

        if (unidadeId) {
            data = await pontosDeMedicaoService.findByUnidade(unidadeId);
        } else if (codigoCCEE) {
            data = await pontosDeMedicaoService.searchByCcee(codigoCCEE);
        } else {
            data = await pontosDeMedicaoService.findAll();
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar pontos de medição:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar pontos de medição' },
            { status: 500 }
        );
    }
}
