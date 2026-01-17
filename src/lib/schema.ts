import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

// Ziyaretçiler tablosu
export const visitors = pgTable('visitors', {
    id: serial('id').primaryKey(),
    ip: text('ip').notNull(),
    city: text('city'),
    country: text('country'),
    browser: text('browser'),
    device: text('device'),
    os: text('os'),
    referrer: text('referrer'),
    pages: jsonb('pages').$type<string[]>().default([]),
    firstVisit: timestamp('first_visit').defaultNow(),
    lastVisit: timestamp('last_visit').defaultNow(),
    visitCount: integer('visit_count').default(1),
});

// Mesajlar tablosu
export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    service: text('service'),
    message: text('message'),
    read: boolean('read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});

// Sayfa görüntüleme tablosu
export const pageViews = pgTable('page_views', {
    id: serial('id').primaryKey(),
    path: text('path').notNull(),
    visitorId: integer('visitor_id').references(() => visitors.id),
    createdAt: timestamp('created_at').defaultNow(),
});

// Analitik özet tablosu (günlük)
export const dailyStats = pgTable('daily_stats', {
    id: serial('id').primaryKey(),
    date: timestamp('date').notNull(),
    totalVisitors: integer('total_visitors').default(0),
    uniqueVisitors: integer('unique_visitors').default(0),
    pageViews: integer('page_views').default(0),
    topPages: jsonb('top_pages').$type<Record<string, number>>().default({}),
    browsers: jsonb('browsers').$type<Record<string, number>>().default({}),
    devices: jsonb('devices').$type<Record<string, number>>().default({}),
});

// Teklif kalemleri tipi
export interface QuoteItem {
    description: string;
    price: number;
}

// Teklifler tablosu
export const quotes = pgTable('quotes', {
    id: serial('id').primaryKey(),
    quoteNumber: text('quote_number').notNull().unique(),
    customerName: text('customer_name').notNull(),
    customerPhone: text('customer_phone').notNull(),
    projectAddress: text('project_address'),
    items: jsonb('items').$type<QuoteItem[]>().default([]),
    total: integer('total').default(0),
    validityDays: integer('validity_days').default(10),
    notes: text('notes'),
    status: text('status').$type<'draft' | 'sent' | 'accepted' | 'rejected'>().default('draft'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Tip exports
export type Visitor = typeof visitors.$inferSelect;
export type NewVisitor = typeof visitors.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type PageView = typeof pageViews.$inferSelect;
export type DailyStat = typeof dailyStats.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type NewQuote = typeof quotes.$inferInsert;

