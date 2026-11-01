import type { Metadata } from "next";
import TenteContent from "./TenteContent";

export const metadata: Metadata = {
    title: "Tente Sistemleri | Kasetli & Mafsallı & Motorlu Tente | Ata Yapı",
    description:
        "Kasetli tente, mafsallı tente ve uzaktan kumandalı motorlu tente sistemleri. UV korumalı ithal akrilik kumaşlar ve Avrupa toptan ihracat avantajı.",
    keywords: ["tente", "kasetli tente", "mafsallı tente", "motorlu tente", "tente sistemleri"],
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/tente',
    },
};

export default function TentePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Tente Sistemleri",
                        description: "Kasetli, mafsallı ve motorlu tente sistemleri montajı.",
                        provider: {
                            "@type": "LocalBusiness",
                            name: "Ata Yapı",
                            url: "https://www.xn--atayap-u9a.site",
                        },
                        url: "https://www.xn--atayap-u9a.site/tente",
                    }),
                }}
            />
            <TenteContent />
        </>
    );
}
