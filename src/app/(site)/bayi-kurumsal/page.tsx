import type { Metadata } from "next";
import BayiKurumsalContent from "./BayiKurumsalContent";

export const metadata: Metadata = {
    title: "Bayi ve Kurumsal Satış | Ata Yapı İş Ortaklığı & İhracat",
    description:
        "Ata Yapı Avrupa toptan ihracat ve bayilik ağı. Giyotin cam sistemleri, cam balkon ve sineklik toptan üretimi. Avrupa standartlarında üretim ve ihracat kasalarıyla doğrudan fabrika teslim.",
    keywords: [
        "bayi başvurusu",
        "bayilik",
        "kurumsal satış",
        "toplu alım",
        "proje bazlı satış",
        "giyotin cam bayi",
        "cam balkon bayi",
        "avrupa ihracat cam",
        "b2b cam balkon",
    ],
    alternates: {
        canonical: "https://www.xn--atayap-u9a.site/bayi-kurumsal",
    },
    openGraph: {
        title: "Bayi ve Kurumsal Satış | Ata Yapı İş Ortaklığı & İhracat",
        description: "Giyotin cam ve cam balkon toptan Avrupa ihracat ve bayilik fırsatı.",
        url: "https://www.xn--atayap-u9a.site/bayi-kurumsal",
        images: [
            {
                url: "/giyotin-cam-detail.jpg",
                width: 1200,
                height: 630,
                alt: "Ata Yapı B2B İhracat ve Bayilik",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Bayi ve Kurumsal Satış | Ata Yapı",
        description: "Demonte giyotin cam ve cam balkon toptan üretici tedariği.",
        images: ["/giyotin-cam-detail.jpg"],
    },
};

export default function BayiKurumsalPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Bayi ve Kurumsal Satış",
                        description: "Ata Yapı toptan ihracat ve kurumsal satış çözümleri.",
                        url: "https://www.xn--atayap-u9a.site/bayi-kurumsal",
                    }),
                }}
            />
            <BayiKurumsalContent />
        </>
    );
}
