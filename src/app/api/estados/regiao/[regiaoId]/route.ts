import { NextResponse } from 'next/server';
import { estadosService } from '@/services/estados.service';

export async function GET(
    request: Request,
    { params }: { params: { regiaoId: string } }
) {
    try {
        const data = await estadosService.findByRegiao(params.regiaoId);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar estados da região:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar estados da região' },
            { status: 500 }
        );
    }
}
