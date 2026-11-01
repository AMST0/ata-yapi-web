// Visitor data types and mock store

export interface Visitor {
    id: string;
    ip: string;
    country: string;
    city: string;
    lat?: number;
    lng?: number;
    browser: string;
    os: string;
    device: string;
    referrer: string;
    pages: PageVisit[];
    firstVisit: string;
    lastVisit: string;
}

export interface PageVisit {
    path: string;
    title: string;
    timestamp: string;
    duration: number;
}

export interface Message {
    id: string;
    name: string;
    phone: string;
    service: string;
    message: string;
    createdAt: string;
    read: boolean;
}

// Mock generators disabled - only real data
export function generateMockVisitors(): Visitor[] {
    return [];
}

export function generateMockMessages(): Message[] {
    return [];
}

// Get statistics
export function getStats(visitors: Visitor[]) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const todayVisitors = visitors.filter(v => new Date(v.lastVisit) >= today);

    const pageViews: Record<string, number> = {};
    const browsers: Record<string, number> = {};
    const devices: Record<string, number> = {};

    visitors.forEach(v => {
        browsers[v.browser] = (browsers[v.browser] || 0) + 1;
        devices[v.device] = (devices[v.device] || 0) + 1;
        v.pages.forEach(p => {
            pageViews[p.path] = (pageViews[p.path] || 0) + 1;
        });
    });

    return {
        totalVisitors: visitors.length,
        todayVisitors: todayVisitors.length,
        totalPageViews: visitors.reduce((acc, v) => acc + v.pages.length, 0),
        avgSessionDuration: Math.round(
            visitors.reduce((acc, v) => acc + v.pages.reduce((a, p) => a + p.duration, 0), 0) / visitors.length
        ),
        pageViews,
        browsers,
        devices,
    };
}
