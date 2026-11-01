import { NextRequest, NextResponse } from 'next/server';
import { getAllVisitors, getVisitorsToday } from '@/lib/db-operations';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const [allVisitors, todayVisitors] = await Promise.all([
            getAllVisitors(100),
            getVisitorsToday(),
        ]);

        return NextResponse.json({
            visitors: allVisitors,
            todayCount: todayVisitors.length,
            totalCount: allVisitors.length,
        });
    } catch (error) {
        console.error('Error getting visitors:', error);
        return NextResponse.json({ error: 'Failed to get visitors' }, { status: 500 });
    }
}
