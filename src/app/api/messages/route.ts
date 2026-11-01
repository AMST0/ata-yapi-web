import { NextRequest, NextResponse } from 'next/server';
import {
    createMessage,
    getAllMessages,
    getUnreadMessages,
    markMessageAsRead,
    deleteMessage,
    getUnreadMessageCount,
} from '@/lib/db-operations';
import { sendAdminNotification } from '@/lib/email';
import { requireAdmin } from '@/lib/admin-auth';

// Simple in-memory IP rate limit for contact submissions (max 5 per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record || now > record.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
        return true;
    }
    if (record.count >= 5) {
        return false;
    }
    record.count += 1;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        const clientIp = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown')
            .split(',')[0]
            .trim();

        if (!checkRateLimit(clientIp)) {
            return NextResponse.json(
                { error: 'Çok fazla talep gönderildi. Lütfen birkaç dakika sonra tekrar deneyin.' },
                { status: 429 }
            );
        }

        const data = await request.json();

        // Honeypot spam protection: bots fill hidden 'company_website' field
        if (data.company_website) {
            return NextResponse.json({ success: true });
        }

        const name = String(data.name || '').trim().slice(0, 120);
        const phone = String(data.phone || '').trim().slice(0, 40);
        const email = data.email ? String(data.email).trim().slice(0, 160) : undefined;
        const service = data.service ? String(data.service).trim().slice(0, 80) : undefined;
        const messageText = data.message ? String(data.message).trim().slice(0, 3000) : undefined;

        if (!name || !phone) {
            return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
        }

        const message = await createMessage({
            name,
            phone,
            email,
            service,
            message: messageText,
        });

        await sendAdminNotification('message', {
            name,
            phone,
            email,
            service,
            message: messageText,
        });

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const unreadOnly = searchParams.get('unread') === 'true';

        const messages = unreadOnly
            ? await getUnreadMessages()
            : await getAllMessages(100);

        const unreadCount = await getUnreadMessageCount();

        return NextResponse.json({ messages, unreadCount });
    } catch (error) {
        console.error('Error getting messages:', error);
        return NextResponse.json({ error: 'Failed to get messages' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const data = await request.json();
        const id = Number(data.id);

        if (!Number.isFinite(id)) {
            return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
        }

        await markMessageAsRead(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating message:', error);
        return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const id = Number(searchParams.get('id'));

        if (!Number.isFinite(id)) {
            return NextResponse.json({ error: 'Valid message ID is required' }, { status: 400 });
        }

        await deleteMessage(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
