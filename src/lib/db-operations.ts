import { getDb } from './db';
import { visitors, messages, pageViews, NewVisitor, NewMessage } from './schema';
import { eq, desc, sql, gte } from 'drizzle-orm';

// ============ VISITORS ============

export async function createVisitor(data: NewVisitor) {
    const db = getDb();
    const result = await db.insert(visitors).values(data).returning();
    return result[0];
}

export async function getVisitorByIp(ip: string) {
    const db = getDb();
    const result = await db.select().from(visitors).where(eq(visitors.ip, ip)).limit(1);
    return result[0] || null;
}

export async function updateVisitor(id: number, data: Partial<NewVisitor>) {
    const db = getDb();
    await db.update(visitors).set({ ...data, lastVisit: new Date() }).where(eq(visitors.id, id));
}

export async function getAllVisitors(limit = 50) {
    const db = getDb();
    return db.select().from(visitors).orderBy(desc(visitors.lastVisit)).limit(limit);
}

export async function getVisitorsToday() {
    const db = getDb();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return db.select().from(visitors).where(gte(visitors.lastVisit, today));
}

export async function getVisitorCount() {
    const db = getDb();
    const result = await db.select({ count: sql<number>`count(*)` }).from(visitors);
    return result[0]?.count || 0;
}

// ============ MESSAGES ============

export async function createMessage(data: NewMessage) {
    const db = getDb();
    const result = await db.insert(messages).values(data).returning();
    return result[0];
}

export async function getAllMessages(limit = 50) {
    const db = getDb();
    return db.select().from(messages).orderBy(desc(messages.createdAt)).limit(limit);
}

export async function getUnreadMessages() {
    const db = getDb();
    return db.select().from(messages).where(eq(messages.read, false)).orderBy(desc(messages.createdAt));
}

export async function markMessageAsRead(id: number) {
    const db = getDb();
    await db.update(messages).set({ read: true }).where(eq(messages.id, id));
}

export async function getUnreadMessageCount() {
    const db = getDb();
    const result = await db.select({ count: sql<number>`count(*)` }).from(messages).where(eq(messages.read, false));
    return result[0]?.count || 0;
}

// ============ PAGE VIEWS ============

export async function recordPageView(path: string, visitorId?: number) {
    const db = getDb();
    await db.insert(pageViews).values({ path, visitorId });
}

export async function getPageViewStats() {
    const db = getDb();
    const result = await db
        .select({
            path: pageViews.path,
            count: sql<number>`count(*)`,
        })
        .from(pageViews)
        .groupBy(pageViews.path)
        .orderBy(desc(sql`count(*)`));

    return result.reduce((acc: Record<string, number>, row) => {
        acc[row.path] = row.count;
        return acc;
    }, {} as Record<string, number>);
}

export async function getTotalPageViews() {
    const db = getDb();
    const result = await db.select({ count: sql<number>`count(*)` }).from(pageViews);
    return result[0]?.count || 0;
}

// ============ ANALYTICS ============

export async function getVisitorStats() {
    const allVisitors = await getAllVisitors(1000);
    const todayVisitors = await getVisitorsToday();
    const pageViewStats = await getPageViewStats();
    const totalPageViews = await getTotalPageViews();

    const browsers: Record<string, number> = {};
    const devices: Record<string, number> = {};
    const cities: Record<string, number> = {};

    allVisitors.forEach((v) => {
        if (v.browser) browsers[v.browser] = (browsers[v.browser] || 0) + 1;
        if (v.device) devices[v.device] = (devices[v.device] || 0) + 1;
        if (v.city) cities[v.city] = (cities[v.city] || 0) + 1;
    });

    return {
        totalVisitors: allVisitors.length,
        todayVisitors: todayVisitors.length,
        totalPageViews,
        pageViews: pageViewStats,
        browsers,
        devices,
        cities,
    };
}

// ============ TRACKING ============

export async function trackVisitor(data: {
    ip: string;
    city?: string;
    country?: string;
    browser?: string;
    device?: string;
    os?: string;
    referrer?: string;
    page: string;
}) {
    try {
        let visitor = await getVisitorByIp(data.ip);

        if (visitor) {
            // Mevcut ziyaretçiyi güncelle
            const pages = [...(visitor.pages || []), data.page];
            await updateVisitor(visitor.id, {
                pages,
                visitCount: (visitor.visitCount || 0) + 1,
                city: data.city || visitor.city,
                browser: data.browser || visitor.browser,
                device: data.device || visitor.device,
            });
            visitor = { ...visitor, pages, visitCount: (visitor.visitCount || 0) + 1 };
        } else {
            // Yeni ziyaretçi oluştur
            visitor = await createVisitor({
                ip: data.ip,
                city: data.city,
                country: data.country,
                browser: data.browser,
                device: data.device,
                os: data.os,
                referrer: data.referrer,
                pages: [data.page],
            });
        }

        // Sayfa görüntülemesini kaydet
        await recordPageView(data.page, visitor?.id);

        return visitor;
    } catch (error) {
        console.error('Error tracking visitor:', error);
        return null;
    }
}
