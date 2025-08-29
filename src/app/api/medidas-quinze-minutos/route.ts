import { NextRequest, NextResponse } from 'next/server';
import { medidasQuinzeMinutosService } from '@/services/medidas-quinze-minutos.service';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const codigoPontoMedicao = searchParams.get('codigoPontoMedicao');
        const unidadeId = searchParams.get('unidadeId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const filters: any = {};
        if (codigoPontoMedicao) {
            filters.codigoPontoMedicao = codigoPontoMedicao;
        }
        if (unidadeId) {
            filters.unidadeId = unidadeId;
        }

        const medidas = await medidasQuinzeMinutosService.findAll(
            Object.keys(filters).length > 0 ? filters : undefined,
            page,
            limit
        );

        return NextResponse.json(medidas);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar medidas de quinze minutos' },
            { status: 500 }
        );
    }
}
