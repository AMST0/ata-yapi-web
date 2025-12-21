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

// Generate mock data for demo
export function generateMockVisitors(): Visitor[] {
    const browsers = ["Chrome", "Safari", "Firefox", "Edge"];
    const oses = ["Windows 11", "macOS", "iOS", "Android"];
    const devices = ["Desktop", "Mobile", "Tablet"];
    const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];
    const pages = [
        { path: "/", title: "Ana Sayfa" },
        { path: "/cam-balkon", title: "Cam Balkon" },
        { path: "/sineklik", title: "Sineklik" },
        { path: "/tente", title: "Tente" },
        { path: "/fiyatlandirma", title: "Fiyatlandırma" },
        { path: "/iletisim", title: "İletişim" },
    ];

    return Array.from({ length: 25 }, (_, i) => {
        const visitCount = Math.floor(Math.random() * 5) + 1;
        const pageVisits: PageVisit[] = Array.from({ length: visitCount }, () => {
            const page = pages[Math.floor(Math.random() * pages.length)];
            return {
                path: page.path,
                title: page.title,
                timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
                duration: Math.floor(Math.random() * 300) + 10,
            };
        }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        const firstVisit = pageVisits[0]?.timestamp || new Date().toISOString();
        const lastVisit = pageVisits[pageVisits.length - 1]?.timestamp || firstVisit;

        return {
            id: `v${i + 1}`,
            ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            country: "Türkiye",
            city: cities[Math.floor(Math.random() * cities.length)],
            lat: 40.9 + Math.random() * 0.2,
            lng: 29.0 + Math.random() * 0.3,
            browser: browsers[Math.floor(Math.random() * browsers.length)],
            os: oses[Math.floor(Math.random() * oses.length)],
            device: devices[Math.floor(Math.random() * devices.length)],
            referrer: Math.random() > 0.5 ? "google.com" : "direct",
            pages: pageVisits,
            firstVisit,
            lastVisit,
        };
    });
}

export function generateMockMessages(): Message[] {
    const names = ["Ahmet Yılmaz", "Fatma Demir", "Mehmet Kaya", "Ayşe Çelik", "Ali Şahin"];
    const services = ["Cam Balkon", "Sineklik", "Tente", "Diğer"];

    return Array.from({ length: 8 }, (_, i) => ({
        id: `m${i + 1}`,
        name: names[Math.floor(Math.random() * names.length)],
        phone: `053${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        service: services[Math.floor(Math.random() * services.length)],
        message: "Merhaba, cam balkon için fiyat bilgisi almak istiyorum. Balkonumun ölçüleri yaklaşık 4 metre genişliğinde.",
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 14).toISOString(),
        read: Math.random() > 0.4,
    }));
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
