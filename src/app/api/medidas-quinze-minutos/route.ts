import { NextRequest, NextResponse } from 'next/server';
import { medidasQuinzeMinutosService } from '@/services/medidas-quinze-minutos.service';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const codigoPontoMedicao = searchParams.get('codigoPontoMedicao');

        const filters = codigoPontoMedicao ? { codigoPontoMedicao } : undefined;
        const medidas = await medidasQuinzeMinutosService.findAll(filters);

        return NextResponse.json(medidas);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar medidas de quinze minutos' },
            { status: 500 }
        );
    }
}
