import { NextRequest, NextResponse } from 'next/server';
import {
    createQuote,
    getAllQuotes,
    getQuoteById,
    updateQuote,
    updateQuoteStatus,
    deleteQuote,
    getQuoteStats
} from '@/lib/db-operations';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const stats = searchParams.get('stats');

        if (stats === 'true') {
            const quoteStats = await getQuoteStats();
            return NextResponse.json(quoteStats);
        }

        if (id) {
            const quote = await getQuoteById(parseInt(id));
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
    try {
        const data = await request.json();

        if (!data.customerName || !data.customerPhone) {
            return NextResponse.json({ error: 'Customer name and phone are required' }, { status: 400 });
        }

        const quoteNumber = `TEK-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

        const quote = await createQuote({
            quoteNumber,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            projectAddress: data.projectAddress,
            items: data.items || [],
            total: data.total || 0,
            validityDays: data.validityDays || 10,
            notes: data.notes,
            status: data.status || 'draft',
        });

        return NextResponse.json({ success: true, quote });
    } catch (error) {
        console.error('Error creating quote:', error);
        return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.id) {
            return NextResponse.json({ error: 'Quote ID is required' }, { status: 400 });
        }

        // If only status is being updated
        if (data.status && Object.keys(data).length === 2) {
            await updateQuoteStatus(data.id, data.status);
        } else {
            const { id, ...updateData } = data;
            await updateQuote(id, updateData);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating quote:', error);
        return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Quote ID is required' }, { status: 400 });
        }

        await deleteQuote(parseInt(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting quote:', error);
        return NextResponse.json({ error: 'Failed to delete quote' }, { status: 500 });
    }
}
