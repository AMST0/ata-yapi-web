import { NextRequest, NextResponse } from 'next/server';
import { trackVisitor, getVisitorStats } from '@/lib/db-operations';
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const page = String(data.page || '/').slice(0, 200);

        // Do not record internal admin, quote generator, or API paths
        if (page.startsWith('/admin') || page.startsWith('/api') || page.startsWith('/teklif')) {
            return NextResponse.json({ success: true, skipped: true });
        }

        const clientIp = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown')
            .split(',')[0]
            .trim()
            .slice(0, 64);

        const rawCity = request.headers.get('x-vercel-ip-city') || request.headers.get('cf-ipcity');
        const detectedCity = data.city
            ? String(data.city).slice(0, 80)
            : rawCity
            ? decodeURIComponent(rawCity).slice(0, 80)
            : undefined;
        const detectedCountry = data.country
            ? String(data.country).slice(0, 80)
            : (request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || '')
                  .slice(0, 80) || undefined;

        const visitor = await trackVisitor({
            ip: clientIp,
            city: detectedCity,
            country: detectedCountry,
            browser: data.browser ? String(data.browser).slice(0, 48) : undefined,
            device: data.device ? String(data.device).slice(0, 32) : undefined,
            os: data.os ? String(data.os).slice(0, 48) : undefined,
            referrer: (data.referrer || request.headers.get('referer') || '').toString().slice(0, 300) || undefined,
            page,
        });

        return NextResponse.json({ success: true, visitor });
    } catch (error) {
        console.error('Error tracking visitor:', error);
        return NextResponse.json({ success: false, error: 'Failed to track visitor' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const stats = await getVisitorStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error);
        return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
    }
}
