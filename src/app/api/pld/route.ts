import { NextRequest, NextResponse } from 'next/server';
import { pldService } from '@/services/pld.service';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const dataInicio = searchParams.get('dataInicio');
        const dataFim = searchParams.get('dataFim');
        const codigoSubmercado = searchParams.get('codigoSubmercado');
        const tipo = searchParams.get('tipo');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const filters: any = {};
        if (dataInicio) {
            filters.dataInicio = dataInicio;
        }
        if (dataFim) {
            filters.dataFim = dataFim;
        }
        if (codigoSubmercado) {
            filters.codigoSubmercado = codigoSubmercado;
        }
        if (tipo) {
            filters.tipo = tipo;
        }

        const plds = await pldService.findAll(
            Object.keys(filters).length > 0 ? filters : undefined,
            page,
            limit
        );

        return NextResponse.json(plds);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar PLDs' },
            { status: 500 }
        );
    }
}
