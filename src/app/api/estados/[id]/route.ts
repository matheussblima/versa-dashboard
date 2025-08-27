import { NextRequest, NextResponse } from 'next/server';
import { estadosService } from '@/services/estados.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const data = await estadosService.findById(id);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar estado:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar estado' },
            { status: 500 }
        );
    }
}
