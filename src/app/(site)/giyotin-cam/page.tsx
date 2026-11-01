import type { Metadata } from "next";
import GiyotinCamContent from "./GiyotinCamContent";

export const metadata: Metadata = {
    title: "Giyotin Cam Sistemleri | Motorlu & Manuel Dikey Sürgülü Cam | Ata Yapı",
    description:
        "Ata Yapı giyotin cam sistemleri — motorlu ve manuel dikey sürgülü cam balkon, teras, kafe ve kış bahçesi çözümleri. Türkiye geneli ve Avrupa toptan ihracat imalatı, 2 yıl garanti.",
    keywords: [
        "giyotin cam",
        "giyotin cam balkon",
        "giyotin cam sistemi",
        "motorlu giyotin sistem",
        "giyotin cam fiyatları",
        "dikey sürgülü cam",
        "guillotine glass systems",
    ],
    alternates: {
        canonical: "https://www.xn--atayap-u9a.site/giyotin-cam",
    },
    openGraph: {
        title: "Giyotin Cam Sistemleri | Ata Yapı",
        description:
            "Giyotin cam sistemleri ile mekanlarınızı modern, şık ve fonksiyonel alanlara dönüştürün. Motorlu dikey sürgülü cam paneller ile %100 açıklık.",
        url: "https://www.xn--atayap-u9a.site/giyotin-cam",
        images: [
            {
                url: "/giyotin-cam-hero.png",
                width: 1200,
                height: 630,
                alt: "Ata Yapı Giyotin Cam Sistemleri",
            },
        ],
    },
};

export default function GiyotinCamPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Giyotin Cam Sistemleri",
                        description: "Motorlu ve manuel dikey sürgülü cam balkon, teras ve kafe çözümleri.",
                        provider: {
                            "@type": "LocalBusiness",
                            name: "Ata Yapı",
                            url: "https://www.xn--atayap-u9a.site",
                        },
                        url: "https://www.xn--atayap-u9a.site/giyotin-cam",
                        image: "https://www.xn--atayap-u9a.site/giyotin-cam-hero.png",
                    }),
                }}
            />
            <GiyotinCamContent />
        </>
    );
}
