import type { Metadata } from "next";
import CamBalkonContent from "./CamBalkonContent";

export const metadata: Metadata = {
    title: "Cam Balkon Sistemleri | Katlanır & Sürme & Isıcamlı | Ata Yapı",
    description:
        "Katlanır cam balkon, sürme cam balkon ve ısıcamlı balkon sistemleri. Ata Yapı fabrikasından ölçüye özel üretim, 2 yıl garanti ve Avrupa toptan ihracat.",
    keywords: ["cam balkon", "katlanır cam balkon", "sürme cam balkon", "ısı camlı cam balkon", "cam balkon sistemleri"],
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/cam-balkon',
    },
};

export default function CamBalkonPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Cam Balkon Sistemleri",
                        description: "Katlanır, sürme ve ısıcamlı cam balkon çözümleri.",
                        provider: {
                            "@type": "LocalBusiness",
                            name: "Ata Yapı",
                            url: "https://www.xn--atayap-u9a.site",
                        },
                        url: "https://www.xn--atayap-u9a.site/cam-balkon",
                    }),
                }}
            />
            <CamBalkonContent />
        </>
    );
}
