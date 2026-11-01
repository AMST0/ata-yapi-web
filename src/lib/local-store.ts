// Local memory and file store for fallback when PostgreSQL DATABASE_URL is not configured
import { generateMockVisitors, generateMockMessages } from './visitor-store';

export interface LocalVisitor {
    id: number;
    ip: string;
    city: string | null;
    country: string | null;
    browser: string | null;
    device: string | null;
    os: string | null;
    referrer: string | null;
    pages: string[];
    firstVisit: Date;
    lastVisit: Date;
    visitCount: number;
}

export interface LocalMessage {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    service: string | null;
    message: string | null;
    read: boolean;
    createdAt: Date;
}

export interface LocalQuote {
    id: number;
    quoteNumber: string;
    customerName: string;
    customerPhone: string;
    projectAddress?: string | null;
    items?: any[];
    total: number;
    validityDays: number;
    notes?: string | null;
    status: 'draft' | 'sent' | 'accepted' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

// Global in-memory singleton
declare global {
    var __ataYapiLocalStore: {
        visitors: LocalVisitor[];
        messages: LocalMessage[];
        quotes: LocalQuote[];
        pageViews: { path: string; visitorId?: number; createdAt: Date }[];
    } | undefined;
}

function initStore() {
    if (!global.__ataYapiLocalStore) {
        const mockVisitors = generateMockVisitors().map((v, i) => ({
            id: i + 1,
            ip: v.ip,
            city: v.city,
            country: v.country,
            browser: v.browser,
            device: v.device,
            os: v.os,
            referrer: v.referrer,
            pages: v.pages.map((p) => p.path),
            firstVisit: new Date(v.firstVisit),
            lastVisit: new Date(v.lastVisit),
            visitCount: v.pages.length,
        }));

        const mockMessages = generateMockMessages().map((m, i) => ({
            id: i + 1,
            name: m.name,
            phone: m.phone,
            email: `musteri${i + 1}@gmail.com`,
            service: m.service,
            message: m.message,
            read: m.read,
            createdAt: new Date(m.createdAt),
        }));

        const mockQuotes: LocalQuote[] = [
            {
                id: 1,
                quoteNumber: 'Q0001',
                customerName: 'Kadir Karaca',
                customerPhone: '0532 555 12 34',
                projectAddress: 'Maltepe, İstanbul',
                total: 48500,
                validityDays: 15,
                status: 'accepted',
                createdAt: new Date(Date.now() - 86400000 * 3),
                updatedAt: new Date(Date.now() - 86400000 * 2),
            },
            {
                id: 2,
                quoteNumber: 'Q0002',
                customerName: 'FenSon GmbH (Almanya B2B)',
                customerPhone: '+49 176 123456',
                projectAddress: 'München, Almanya',
                total: 125000,
                validityDays: 30,
                status: 'sent',
                createdAt: new Date(Date.now() - 86400000 * 1),
                updatedAt: new Date(),
            },
            {
                id: 3,
                quoteNumber: 'Q0003',
                customerName: 'Erkan Demir',
                customerPhone: '0533 444 88 99',
                projectAddress: 'Edremit, Balıkesir',
                total: 36000,
                validityDays: 10,
                status: 'draft',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        const mockPageViews = [
            { path: '/', createdAt: new Date() },
            { path: '/giyotin-cam', createdAt: new Date() },
            { path: '/cam-balkon', createdAt: new Date() },
            { path: '/bayi-kurumsal', createdAt: new Date() },
            { path: '/sineklik', createdAt: new Date() },
            { path: '/fiyatlandirma', createdAt: new Date() },
            { path: '/iletisim', createdAt: new Date() },
        ];

        global.__ataYapiLocalStore = {
            visitors: mockVisitors,
            messages: mockMessages,
            quotes: mockQuotes,
            pageViews: mockPageViews,
        };
    }

    return global.__ataYapiLocalStore;
}

export const localStore = initStore();
