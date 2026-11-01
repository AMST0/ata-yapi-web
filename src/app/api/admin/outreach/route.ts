import { NextResponse } from 'next/server';

export interface OutreachContact {
    id: number;
    name: string;
    email: string;
    country: string;
    countryCode: string;
    flag: string;
    group: 'business' | 'alevi';
    category: string;
    language: 'English' | 'Turkish';
    sentDate: string;
    status: 'sent' | 'delivered';
    subject: string;
    whatsappUrl: string;
}

const contacts: OutreachContact[] = [
    {
        id: 1,
        name: "FenSon GmbH",
        email: "info@fenson.de",
        country: "Germany",
        countryCode: "DE",
        flag: "🇩🇪",
        group: "business",
        category: "Pencere, Kapı & Sineklik Sistemleri",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20FenSon%20team%2C%20following%20up%20on%20our%20wholesale%20supply%20proposal."
    },
    {
        id: 2,
        name: "ATRO Element GmbH - Arno Endress",
        email: "aendress@atro-element.de",
        country: "Germany",
        countryCode: "DE",
        flag: "🇩🇪",
        group: "business",
        category: "Cephe & Yapı Elemanları",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Arno%20Endress%2C%20following%20up%20from%20Ata%20Yapi%20regarding%20wholesale%20supply."
    },
    {
        id: 3,
        name: "SaMa Flyscreen GbR",
        email: "info@sama-flyscreen.de",
        country: "Germany",
        countryCode: "DE",
        flag: "🇩🇪",
        group: "business",
        category: "Sineklik & Böcek Koruma Sistemleri",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20SaMa%20Flyscreen%20team%2C%20contacting%20you%20from%20Ata%20Yapi%20Turkiye."
    },
    {
        id: 4,
        name: "Görmar und Sohn GmbH",
        email: "info@goermar.de",
        country: "Germany",
        countryCode: "DE",
        flag: "🇩🇪",
        group: "business",
        category: "Pencere, Güneşlik & Stor Sistemleri",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Gormar%20und%20Sohn%20team%2C%20contacting%20you%20regarding%20Ata%20Yapi%20export."
    },
    {
        id: 5,
        name: "De Raamfabriek",
        email: "info@deraamfabriek.be",
        country: "Belgium",
        countryCode: "BE",
        flag: "🇧🇪",
        group: "business",
        category: "PVC & Alüminyum Doğrama Fabrikası",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20De%20Raamfabriek%20team%2C%20following%20up%20from%20Ata%20Yapi%20Turkiye."
    },
    {
        id: 6,
        name: "Ramen Willems",
        email: "info@ramenwillems.be",
        country: "Belgium",
        countryCode: "BE",
        flag: "🇧🇪",
        group: "business",
        category: "Kış Bahçesi, Veranda & Cam Balkon",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Ramen%20Willems%2C%20contacting%20you%20from%20Ata%20Yapi%20regarding%20wholesale%20glass%20balcony."
    },
    {
        id: 7,
        name: "Kozijnenfabriek Nederland",
        email: "info@kozijnenfabrieknederland.nl",
        country: "Netherlands",
        countryCode: "NL",
        flag: "🇳🇱",
        group: "business",
        category: "Doğrama & Pencere İmalatı",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Kozijnenfabriek%20team%2C%20contacting%20you%20regarding%20wholesale%20flyscreen%20supplies."
    },
    {
        id: 8,
        name: "Vliegenraam.com",
        email: "info@vliegenraam.com",
        country: "Belgium",
        countryCode: "BE",
        flag: "🇧🇪",
        group: "business",
        category: "Özel Plise & Stor Sineklik Üreticisi",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Vliegenraam%20team%2C%20following%20up%20from%20Ata%20Yapi%20plisse%20screen%20factory."
    },
    {
        id: 9,
        name: "GZ Montage",
        email: "office@gz-montage.at",
        country: "Austria",
        countryCode: "AT",
        flag: "🇦🇹",
        group: "business",
        category: "Pencere, Kapı & Cam Montaj Firması",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20GZ%20Montage%20team%2C%20contacting%20you%20from%20Ata%20Yapi%20Turkiye."
    },
    {
        id: 10,
        name: "Immosan Fenster Türen Sonnenschutz GmbH",
        email: "office@immosan-fts.at",
        country: "Austria",
        countryCode: "AT",
        flag: "🇦🇹",
        group: "business",
        category: "Güneşlik, Tente, Kapı & Pencere",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Immosan%20team%2C%20following%20up%20on%20our%20wholesale%20supply%20proposal."
    },
    {
        id: 11,
        name: "Seiler Storen AG",
        email: "info@seilerstoren.ch",
        country: "Switzerland",
        countryCode: "CH",
        flag: "🇨🇭",
        group: "business",
        category: "Güneş Kırıcı, Panjur & Stor",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Seiler%20Storen%20team%2C%20contacting%20you%20from%20Ata%20Yapi%20Turkiye."
    },
    {
        id: 12,
        name: "Fischer Storen GmbH",
        email: "info@fischerstoren.ch",
        country: "Switzerland",
        countryCode: "CH",
        flag: "🇨🇭",
        group: "business",
        category: "Tente, Gölgelendirme & Panjur",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Fischer%20Storen%20team%2C%20contacting%20you%20from%20Ata%20Yapi%20Turkiye."
    },
    {
        id: 13,
        name: "Filtoldos",
        email: "geral@filtoldos.com",
        country: "Portugal",
        countryCode: "PT",
        flag: "🇵🇹",
        group: "business",
        category: "Tente & Dış Mekan Kapatma",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Filtoldos%20team%2C%20contacting%20you%20from%20Ata%20Yapi%20Turkiye."
    },
    {
        id: 14,
        name: "Glavas Aluminum & PVC Systems",
        email: "info@glavas-systems.gr",
        country: "Greece",
        countryCode: "GR",
        flag: "🇬🇷",
        group: "business",
        category: "Alüminyum & PVC Profil İmalatı",
        language: "English",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Wholesale Supply Partnership from Türkiye | Ata Yapı",
        whatsappUrl: "https://wa.me/905314002959?text=Hello%20Glavas%20Systems%2C%20following%20up%20on%20our%20export%20proposal."
    },
    {
        id: 15,
        name: "Alevitische Gemeinde Deutschland (AABF)",
        email: "info@aabf.de",
        country: "Germany",
        countryCode: "DE",
        flag: "🇩🇪",
        group: "alevi",
        category: "Almanya Alevi Birlikleri Federasyonu",
        language: "Turkish",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Ata Yapı | Avrupa'daki Alevi esnafıyla ticari dayanışma ve tanışma",
        whatsappUrl: "https://wa.me/905314002959?text=Merhaba%2C%20AABF%20yetkilileri%20i%C3%A7in%20Ata%20Yap%C4%B1%20hakk%C4%B1nda%20ileti%C5%9Fime%20ge%C3%A7iyorum."
    },
    {
        id: 16,
        name: "Alevilerin Sesi - Editorial / Ads",
        email: "alevilerinsesi@alevi.com",
        country: "Germany",
        countryCode: "DE",
        flag: "🇩🇪",
        group: "alevi",
        category: "Avrupa Alevi Yayın ve Basın Organı",
        language: "Turkish",
        sentDate: "2026-11-01",
        status: "delivered",
        subject: "Ata Yapı | Avrupa'daki Alevi esnafıyla ticari dayanışma ve tanışma",
        whatsappUrl: "https://wa.me/905314002959?text=Merhaba%2C%20Alevilerin%20Sesi%20reklam%20ve%20tan%C4%B1t%C4%B1m%20i%C3%A7in%20Ata%20Yap%C4%B1'dan%20yaz%C4%B1yorum."
    }
];

export async function GET() {
    return NextResponse.json({
        totalSent: contacts.length,
        countriesCount: 7,
        sender: {
            email: "atayapicambalkon@gmail.com",
            name: "Ata Yapı Cam Balkon & Sineklik",
            whatsapp: "+90 531 400 29 59",
            website: "https://www.atayapı.site",
            smtpServer: "smtp.gmail.com:587",
        },
        contacts,
    });
}
