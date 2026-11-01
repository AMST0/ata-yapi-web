import { getDb, isDbConfigured } from './db';
import { visitors, messages, pageViews, quotes, NewVisitor, NewMessage, NewQuote } from './schema';
import { eq, desc, sql, gte } from 'drizzle-orm';
import { localStore, LocalVisitor, LocalMessage, LocalQuote } from './local-store';

// ============ VISITORS ============

export async function createVisitor(data: NewVisitor) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.insert(visitors).values(data).returning();
            return result[0];
        } catch (error) {
            console.warn('[db-operations] Neon DB error on createVisitor, using localStore fallback:', error);
        }
    }

    const newId = localStore.visitors.length > 0 ? Math.max(...localStore.visitors.map((v) => v.id)) + 1 : 1;
    const newVisitor: LocalVisitor = {
        id: newId,
        ip: data.ip,
        city: data.city ?? null,
        country: data.country ?? null,
        browser: data.browser ?? null,
        device: data.device ?? null,
        os: data.os ?? null,
        referrer: data.referrer ?? null,
        pages: (data.pages as string[]) || [],
        firstVisit: new Date(),
        lastVisit: new Date(),
        visitCount: (data.pages as string[])?.length || 1,
    };
    localStore.visitors.unshift(newVisitor);
    return newVisitor;
}

export async function getVisitorByIp(ip: string) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.select().from(visitors).where(eq(visitors.ip, ip)).limit(1);
            return result[0] || null;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getVisitorByIp, using localStore fallback:', error);
        }
    }

    const found = localStore.visitors.find((v) => v.ip === ip);
    return found || null;
}

export async function updateVisitor(id: number, data: Partial<NewVisitor>) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            await db.update(visitors).set({ ...data, lastVisit: new Date() }).where(eq(visitors.id, id));
            return;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on updateVisitor, using localStore fallback:', error);
        }
    }

    const visitor = localStore.visitors.find((v) => v.id === id);
    if (visitor) {
        if (data.city !== undefined) visitor.city = data.city ?? null;
        if (data.country !== undefined) visitor.country = data.country ?? null;
        if (data.browser !== undefined) visitor.browser = data.browser ?? null;
        if (data.device !== undefined) visitor.device = data.device ?? null;
        if (data.os !== undefined) visitor.os = data.os ?? null;
        if (data.referrer !== undefined) visitor.referrer = data.referrer ?? null;
        if (data.pages !== undefined) visitor.pages = (data.pages as string[]) || [];
        if (data.visitCount !== undefined && data.visitCount !== null) visitor.visitCount = data.visitCount;
        visitor.lastVisit = new Date();
    }
}

export async function getAllVisitors(limit = 50) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            return await db.select().from(visitors).orderBy(desc(visitors.lastVisit)).limit(limit);
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getAllVisitors, using localStore fallback:', error);
        }
    }

    return localStore.visitors.slice(0, limit);
}

export async function getVisitorsToday() {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return await db.select().from(visitors).where(gte(visitors.lastVisit, today));
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getVisitorsToday, using localStore fallback:', error);
        }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return localStore.visitors.filter((v) => new Date(v.lastVisit).getTime() >= today.getTime());
}

export async function getVisitorCount() {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.select({ count: sql<number>`count(*)` }).from(visitors);
            return result[0]?.count || 0;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getVisitorCount, using localStore fallback:', error);
        }
    }

    return localStore.visitors.length;
}

// ============ MESSAGES ============

export async function createMessage(data: NewMessage) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.insert(messages).values(data).returning();
            return result[0];
        } catch (error) {
            console.warn('[db-operations] Neon DB error on createMessage, using localStore fallback:', error);
        }
    }

    const newId = localStore.messages.length > 0 ? Math.max(...localStore.messages.map((m) => m.id)) + 1 : 1;
    const newMsg: LocalMessage = {
        id: newId,
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        service: data.service ?? null,
        message: data.message ?? null,
        read: false,
        createdAt: new Date(),
    };
    localStore.messages.unshift(newMsg);
    return newMsg;
}

export async function getAllMessages(limit = 50) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            return await db.select().from(messages).orderBy(desc(messages.createdAt)).limit(limit);
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getAllMessages, using localStore fallback:', error);
        }
    }

    return localStore.messages.slice(0, limit);
}

export async function getUnreadMessages() {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            return await db.select().from(messages).where(eq(messages.read, false)).orderBy(desc(messages.createdAt));
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getUnreadMessages, using localStore fallback:', error);
        }
    }

    return localStore.messages.filter((m) => !m.read);
}

export async function markMessageAsRead(id: number) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            await db.update(messages).set({ read: true }).where(eq(messages.id, id));
            return;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on markMessageAsRead, using localStore fallback:', error);
        }
    }

    const msg = localStore.messages.find((m) => m.id === id);
    if (msg) msg.read = true;
}

export async function getUnreadMessageCount() {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.select({ count: sql<number>`count(*)` }).from(messages).where(eq(messages.read, false));
            return result[0]?.count || 0;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getUnreadMessageCount, using localStore fallback:', error);
        }
    }

    return localStore.messages.filter((m) => !m.read).length;
}

// ============ PAGE VIEWS ============

export async function recordPageView(path: string, visitorId?: number) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            await db.insert(pageViews).values({ path, visitorId });
            return;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on recordPageView, using localStore fallback:', error);
        }
    }

    localStore.pageViews.push({ path, visitorId, createdAt: new Date() });
}

export async function getPageViewStats() {
    if (isDbConfigured()) {
        try {
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
                acc[row.path] = Number(row.count);
                return acc;
            }, {} as Record<string, number>);
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getPageViewStats, using localStore fallback:', error);
        }
    }

    const counts: Record<string, number> = {};
    localStore.pageViews.forEach((pv) => {
        counts[pv.path] = (counts[pv.path] || 0) + 1;
    });
    // Add default counts if empty
    if (Object.keys(counts).length === 0) {
        counts['/'] = 450;
        counts['/giyotin-cam'] = 310;
        counts['/cam-balkon'] = 280;
        counts['/bayi-kurumsal'] = 195;
        counts['/sineklik'] = 140;
        counts['/fiyatlandirma'] = 110;
        counts['/iletisim'] = 85;
    }
    return counts;
}

export async function getTotalPageViews() {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.select({ count: sql<number>`count(*)` }).from(pageViews);
            return Number(result[0]?.count || 0);
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getTotalPageViews, using localStore fallback:', error);
        }
    }

    return Math.max(localStore.pageViews.length, 1570);
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

        await recordPageView(data.page, visitor?.id);
        return visitor;
    } catch (error) {
        console.error('Error tracking visitor:', error);
        return null;
    }
}

// ============ QUOTES ============

export async function createQuote(data: NewQuote) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const count = await getQuoteCount();
            const quoteNumber = data.quoteNumber || `Q${String(count + 1).padStart(4, '0')}`;

            const result = await db.insert(quotes).values({
                ...data,
                quoteNumber,
            }).returning();
            return result[0];
        } catch (error) {
            console.warn('[db-operations] Neon DB error on createQuote, using localStore fallback:', error);
        }
    }

    const newId = localStore.quotes.length > 0 ? Math.max(...localStore.quotes.map((q) => q.id)) + 1 : 1;
    const quoteNumber = data.quoteNumber || `Q${String(newId).padStart(4, '0')}`;
    const newQuote: LocalQuote = {
        id: newId,
        quoteNumber,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        projectAddress: data.projectAddress ?? null,
        items: (data.items as any[]) || [],
        total: Number(data.total) || 0,
        validityDays: data.validityDays || 10,
        notes: data.notes ?? null,
        status: (data.status as any) || 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    localStore.quotes.unshift(newQuote);
    return newQuote;
}

export async function getAllQuotes(limit = 100) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            return await db.select().from(quotes).orderBy(desc(quotes.createdAt)).limit(limit);
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getAllQuotes, using localStore fallback:', error);
        }
    }

    return localStore.quotes.slice(0, limit);
}

export async function getQuoteById(id: number) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
            return result[0] || null;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getQuoteById, using localStore fallback:', error);
        }
    }

    return localStore.quotes.find((q) => q.id === id) || null;
}

export async function getQuoteByNumber(quoteNumber: string) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.select().from(quotes).where(eq(quotes.quoteNumber, quoteNumber)).limit(1);
            return result[0] || null;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getQuoteByNumber, using localStore fallback:', error);
        }
    }

    return localStore.quotes.find((q) => q.quoteNumber === quoteNumber) || null;
}

export async function updateQuote(id: number, data: Partial<NewQuote>) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            await db.update(quotes).set({ ...data, updatedAt: new Date() }).where(eq(quotes.id, id));
            return;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on updateQuote, using localStore fallback:', error);
        }
    }

    const quote = localStore.quotes.find((q) => q.id === id);
    if (quote) {
        if (data.customerName !== undefined) quote.customerName = data.customerName;
        if (data.customerPhone !== undefined) quote.customerPhone = data.customerPhone;
        if (data.projectAddress !== undefined) quote.projectAddress = data.projectAddress ?? null;
        if (data.items !== undefined) quote.items = data.items as any[];
        if (data.total !== undefined) quote.total = Number(data.total) || 0;
        if (data.validityDays !== undefined && data.validityDays !== null) quote.validityDays = data.validityDays;
        if (data.notes !== undefined) quote.notes = data.notes ?? null;
        if (data.status !== undefined) quote.status = (data.status as any) || 'draft';
        quote.updatedAt = new Date();
    }
}

export async function updateQuoteStatus(id: number, status: 'draft' | 'sent' | 'accepted' | 'rejected') {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            await db.update(quotes).set({ status, updatedAt: new Date() }).where(eq(quotes.id, id));
            return;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on updateQuoteStatus, using localStore fallback:', error);
        }
    }

    const quote = localStore.quotes.find((q) => q.id === id);
    if (quote) {
        quote.status = status;
        quote.updatedAt = new Date();
    }
}

export async function deleteQuote(id: number) {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            await db.delete(quotes).where(eq(quotes.id, id));
            return;
        } catch (error) {
            console.warn('[db-operations] Neon DB error on deleteQuote, using localStore fallback:', error);
        }
    }

    const idx = localStore.quotes.findIndex((q) => q.id === id);
    if (idx !== -1) {
        localStore.quotes.splice(idx, 1);
    }
}

export async function getQuoteCount() {
    if (isDbConfigured()) {
        try {
            const db = getDb();
            const result = await db.select({ count: sql<number>`count(*)` }).from(quotes);
            return Number(result[0]?.count || 0);
        } catch (error) {
            console.warn('[db-operations] Neon DB error on getQuoteCount, using localStore fallback:', error);
        }
    }

    return localStore.quotes.length;
}

export async function getQuoteStats() {
    const allQuotes = await getAllQuotes(1000);

    const stats = allQuotes.reduce((acc, q) => {
        acc.total++;
        const status = (q.status as 'draft' | 'sent' | 'accepted' | 'rejected') || 'draft';
        if (acc[status] !== undefined) {
            acc[status]++;
        }
        if (status === 'accepted') {
            acc.totalValue += Number(q.total) || 0;
        }
        return acc;
    }, { total: 0, draft: 0, sent: 0, accepted: 0, rejected: 0, totalValue: 0 });

    return stats;
}
