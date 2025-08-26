import { NextResponse } from 'next/server';
import { estadosService } from '@/services/estados.service';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await estadosService.findById(params.id);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar estado:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar estado' },
            { status: 500 }
        );
    }
}
