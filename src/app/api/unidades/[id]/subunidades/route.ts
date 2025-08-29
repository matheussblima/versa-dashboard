import { NextRequest, NextResponse } from 'next/server';
import { SubUnidadesService } from '@/services/subunidades.service';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const subunidades = await SubUnidadesService.getByUnidadeId(params.id);
        return NextResponse.json(subunidades);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar subunidades da unidade' },
            { status: 500 }
        );
    }
}
