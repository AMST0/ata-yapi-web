import { NextRequest, NextResponse } from 'next/server';
import { createMessage, getAllMessages, getUnreadMessages, markMessageAsRead, getUnreadMessageCount } from '@/lib/db-operations';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.name || !data.phone) {
            return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
        }

        const message = await createMessage({
            name: data.name,
            phone: data.phone,
            email: data.email,
            service: data.service,
            message: data.message,
        });

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const unreadOnly = searchParams.get('unread') === 'true';

        const messages = unreadOnly
            ? await getUnreadMessages()
            : await getAllMessages();

        const unreadCount = await getUnreadMessageCount();

        return NextResponse.json({ messages, unreadCount });
    } catch (error) {
        console.error('Error getting messages:', error);
        return NextResponse.json({ error: 'Failed to get messages' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.id) {
            return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
        }

        await markMessageAsRead(data.id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating message:', error);
        return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
}
