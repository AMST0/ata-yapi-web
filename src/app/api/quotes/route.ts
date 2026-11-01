import { NextRequest, NextResponse } from 'next/server';
import {
    createQuote,
    getAllQuotes,
    getQuoteById,
    updateQuote,
    updateQuoteStatus,
    deleteQuote,
    getQuoteStats,
} from '@/lib/db-operations';
import { isQuoteAuthorized, requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const stats = searchParams.get('stats');

        if (stats === 'true') {
            const quoteStats = await getQuoteStats();
            return NextResponse.json(quoteStats);
        }

        if (id) {
            const quote = await getQuoteById(parseInt(id, 10));
            if (!quote) {
                return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
            }
            return NextResponse.json(quote);
        }

        const quotes = await getAllQuotes();
        return NextResponse.json({ quotes });
    } catch (error) {
        console.error('Error getting quotes:', error);
        return NextResponse.json({ error: 'Failed to get quotes' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!isQuoteAuthorized(request)) {
        return NextResponse.json({ error: 'Unauthorized quote creation' }, { status: 401 });
    }

    try {
        const data = await request.json();

        const customerName = String(data.customerName || 'Müşteri').trim().slice(0, 140);
        const customerPhone = String(data.customerPhone || '-').trim().slice(0, 40);

        const quoteNumber = `TEK-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, '0')}`;

        const quote = await createQuote({
            quoteNumber,
            customerName,
            customerPhone,
            projectAddress: data.projectAddress ? String(data.projectAddress).slice(0, 240) : undefined,
            items: Array.isArray(data.items) ? data.items : [],
            total: Number(data.total) || 0,
            validityDays: Number(data.validityDays) || 10,
            notes: data.notes ? String(data.notes).slice(0, 1000) : undefined,
            status: data.status || 'draft',
        });

        return NextResponse.json({ success: true, quote });
    } catch (error) {
        console.error('Error creating quote:', error);
        return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const data = await request.json();

        if (!data.id) {
            return NextResponse.json({ error: 'Quote ID is required' }, { status: 400 });
        }

        if (data.status && Object.keys(data).length === 2) {
            await updateQuoteStatus(Number(data.id), data.status);
        } else {
            const { id, ...updateData } = data;
            await updateQuote(Number(id), updateData);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating quote:', error);
        return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Quote ID is required' }, { status: 400 });
        }

        await deleteQuote(parseInt(id, 10));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting quote:', error);
        return NextResponse.json({ error: 'Failed to delete quote' }, { status: 500 });
    }
}
