import { NextResponse } from 'next/server';
import { pontosDeMedicaoService } from '@/services/pontos-de-medicao.service';

export async function GET() {
    try {
        const data = await pontosDeMedicaoService.findAvailable();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar pontos de medição disponíveis:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar pontos de medição disponíveis' },
            { status: 500 }
        );
    }
}
