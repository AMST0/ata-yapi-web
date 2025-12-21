import { NextRequest, NextResponse } from 'next/server';
import { trackVisitor, getVisitorStats } from '@/lib/db-operations';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        const visitor = await trackVisitor({
            ip: ip.split(',')[0].trim(),
            city: data.city,
            country: data.country,
            browser: data.browser,
            device: data.device,
            os: data.os,
            referrer: data.referrer || request.headers.get('referer') || undefined,
            page: data.page || '/',
        });

        return NextResponse.json({ success: true, visitor });
    } catch (error) {
        console.error('Error tracking visitor:', error);
        return NextResponse.json({ success: false, error: 'Failed to track visitor' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const stats = await getVisitorStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error);
        return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
    }
}
