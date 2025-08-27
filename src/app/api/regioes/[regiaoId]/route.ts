import { NextRequest, NextResponse } from 'next/server';
import { estadosService } from '@/services/estados.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ regiaoId: string }> }
) {
    const { regiaoId } = await params;
    try {
        const data = await estadosService.findByRegiao(regiaoId);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar estados da região:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar estados da região' },
            { status: 500 }
        );
    }
}
