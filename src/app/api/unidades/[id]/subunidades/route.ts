import { NextRequest, NextResponse } from 'next/server';
import { SubUnidadesService } from '@/services/subunidades.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const subunidades = await SubUnidadesService.getByUnidadeId(id);
        return NextResponse.json(subunidades);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar subunidades da unidade' },
            { status: 500 }
        );
    }
}
