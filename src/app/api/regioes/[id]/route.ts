import { NextRequest, NextResponse } from 'next/server';
import { regioesService } from '@/services/regioes.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const data = await regioesService.findById(id);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar região:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar região' },
            { status: 500 }
        );
    }
}
