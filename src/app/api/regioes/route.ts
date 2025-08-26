import { NextResponse } from 'next/server';
import { regioesService } from '@/services/regioes.service';

export async function GET() {
    try {
        const data = await regioesService.findAll();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar regiões:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar regiões' },
            { status: 500 }
        );
    }
}
