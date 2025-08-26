import { NextResponse } from 'next/server';
import { estadosService } from '@/services/estados.service';

export async function GET() {
    try {
        const data = await estadosService.findAll();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar estados' },
            { status: 500 }
        );
    }
}
