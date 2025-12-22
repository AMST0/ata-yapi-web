// Quote data types and storage

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

// Mock quotes for demo
export function generateMockQuotes(): Quote[] {
    const customers = [
        { name: "Ahmet Yılmaz", phone: "0532 111 2233", address: "Maltepe, İstanbul" },
        { name: "Fatma Demir", phone: "0533 222 3344", address: "Kartal, İstanbul" },
        { name: "Mehmet Kaya", phone: "0534 333 4455", address: "Pendik, İstanbul" },
        { name: "Ayşe Çelik", phone: "0535 444 5566", address: "Kadıköy, İstanbul" },
        { name: "Ali Şahin", phone: "0536 555 6677", address: "Ataşehir, İstanbul" },
    ];

    const itemSamples = [
        { description: "Sabit doğrama altı: Isıcamlı doğrama", price: 15000 },
        { description: "Sabit doğrama üstü: Isıcamlı sürgülü sistem", price: 22000 },
        { description: "Ön cephede: 2 adet ısıcamlı giyotin sistem", price: 35000 },
        { description: "Kapılar: 2 adet ısıcamlı C60 alüminyum kapı", price: 18000 },
        { description: "Tente: 1 adet pergole tente", price: 28000 },
        { description: "28 adet aydınlatma led değişimi", price: 8000 },
        { description: "Pergole tenteye ait triger kayışları değiştirilmiştr", price: 5500 },
    ];

    const statuses: Quote["status"][] = ["draft", "sent", "accepted", "rejected"];

    return Array.from({ length: 12 }, (_, i) => {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const itemCount = Math.floor(Math.random() * 4) + 2;
        const items: QuoteItem[] = [];

        for (let j = 0; j < itemCount; j++) {
            const sample = itemSamples[Math.floor(Math.random() * itemSamples.length)];
            items.push({
                description: sample.description,
                price: sample.price + Math.floor(Math.random() * 5000),
            });
        }

        const total = items.reduce((acc, item) => acc + item.price, 0);

        return {
            id: `Q${String(i + 1).padStart(4, "0")}`,
            customerName: customer.name,
            customerPhone: customer.phone,
            projectAddress: customer.address,
            items,
            total,
            validityDays: 10,
            notes: "*Teklifin geçerlilik süresi 10 gündür.",
            createdAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
        };
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
