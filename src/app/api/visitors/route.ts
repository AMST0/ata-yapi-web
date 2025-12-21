import { NextResponse } from 'next/server';
import { getAllVisitors, getVisitorsToday } from '@/lib/db-operations';

export async function GET() {
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
