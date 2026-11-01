import { NextRequest, NextResponse } from 'next/server';
import { processDueScheduledOutreachJobs } from '@/lib/outreach-schedule-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
    }

    try {
        const result = await processDueScheduledOutreachJobs();
        return NextResponse.json({
            success: true,
            checkedAtUtc: new Date().toISOString(),
            ...result,
        });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Cron outreach processing failed';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}

