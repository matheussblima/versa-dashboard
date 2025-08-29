import { NextRequest, NextResponse } from 'next/server';
import { SubUnidadesService } from '@/services/subunidades.service';

export async function GET() {
    try {
        const subunidades = await SubUnidadesService.getAll();
        return NextResponse.json(subunidades);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar subunidades' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const subunidade = await SubUnidadesService.create(body);
        return NextResponse.json(subunidade, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar subunidade' },
            { status: 500 }
        );
    }
}
