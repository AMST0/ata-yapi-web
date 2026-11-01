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
        title: "Bayi ve Kurumsal Satış | Ata Yapı",
        description: "Giyotin cam ve cam balkon toptan ihracat ve bayilik fırsatı.",
        url: "https://www.xn--atayap-u9a.site/bayi-kurumsal",
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
