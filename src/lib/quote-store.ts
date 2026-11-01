// Quote data types and storage
// ONLY REAL DATA

export interface QuoteItem {
    description: string;
    price: number;
}

export interface Quote {
    id: string;
    customerName: string;
    customerPhone: string;
    projectAddress: string;
    items: QuoteItem[];
    total: number;
    validityDays: number;
    notes: string;
    createdAt: string;
    status: "draft" | "sent" | "accepted" | "rejected";
}

// Mock quotes disabled - only real data
export function generateMockQuotes(): Quote[] {
    return [];
}
