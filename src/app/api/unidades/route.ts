import { NextRequest, NextResponse } from 'next/server';
import { UnidadesService } from '@/services/unidades.service';

export async function GET() {
    try {
        const unidades = await UnidadesService.getAll();
        return NextResponse.json(unidades);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar unidades' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const unidade = await UnidadesService.create(body);
        return NextResponse.json(unidade, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar unidade' },
            { status: 500 }
        );
    }
}
