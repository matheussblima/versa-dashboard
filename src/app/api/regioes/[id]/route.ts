import { NextResponse } from 'next/server';
import { regioesService } from '@/services/regioes.service';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await regioesService.findById(params.id);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar região:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar região' },
            { status: 500 }
        );
    }
}
