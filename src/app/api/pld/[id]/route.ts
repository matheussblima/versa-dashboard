import { NextRequest, NextResponse } from 'next/server';
import { pldService } from '@/services/pld.service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const pld = await pldService.findById(id);
        return NextResponse.json(pld);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar PLD' },
            { status: 500 }
        );
    }
}
