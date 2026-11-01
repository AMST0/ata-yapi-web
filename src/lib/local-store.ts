// Local memory store for fallback when PostgreSQL DATABASE_URL is not configured
// ONLY REAL DATA - All mock/fake data removed per user request.

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

export interface LocalQuoteItem {
    description: string;
    price: number;
}

export interface LocalQuote {
    id: number;
    quoteNumber: string;
    customerName: string;
    customerPhone: string;
    projectAddress?: string | null;
    items?: LocalQuoteItem[];
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
        global.__ataYapiLocalStore = {
            visitors: [],
            messages: [],
            quotes: [],
            pageViews: [],
        };
    }

    return global.__ataYapiLocalStore;
}

export const localStore = initStore();
