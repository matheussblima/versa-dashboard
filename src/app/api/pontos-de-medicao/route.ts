import { NextRequest, NextResponse } from 'next/server';
import { pontosDeMedicaoService } from '@/services/pontos-de-medicao.service';

export async function GET() {
    try {
        const data = await pontosDeMedicaoService.findAll();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar pontos de medição:', error);
        return NextResponse.json(
            { error: 'Erro ao carregar pontos de medição' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = await pontosDeMedicaoService.create(body);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao criar ponto de medição:', error);
        return NextResponse.json(
            { error: 'Erro ao criar ponto de medição' },
            { status: 500 }
        );
    }
}