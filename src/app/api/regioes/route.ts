import { NextResponse } from 'next/server';
import { regioesService } from '@/services/regioes.service';

export async function GET() {
    try {
        const regioes = await regioesService.findAll();
        return NextResponse.json(regioes);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar regiões' },
            { status: 500 }
        );
    }
}
