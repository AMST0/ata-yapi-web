import type { Metadata } from "next";
import SineklikContent from "./SineklikContent";

export const metadata: Metadata = {
    title: "Sineklik Sistemleri | Pileli, Menteşeli & Kedi Sinekliği | Ata Yapı",
    description:
        "Plise (pileli) sineklik, menteşeli sineklik ve yırtılmaz kedi tülü sineklik sistemleri. Ata Yapı imalatı, milimetrik üretim ve Avrupa toptan ihracat.",
    keywords: ["sineklik", "pileli sineklik", "menteşeli sineklik", "kedi sineklik", "plise sineklik"],
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/sineklik',
    },
};

export default function SineklikPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Sineklik Sistemleri",
                        description: "Pileli sineklik, menteşeli sineklik ve kedi sinekliği sistemleri.",
                        provider: {
                            "@type": "LocalBusiness",
                            name: "Ata Yapı",
                            url: "https://www.xn--atayap-u9a.site",
                        },
                        url: "https://www.xn--atayap-u9a.site/sineklik",
                    }),
                }}
            />
            <SineklikContent />
        </>
    );
}
