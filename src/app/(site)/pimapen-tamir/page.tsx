import type { Metadata } from "next";
import PimapenTamirContent from "./PimapenTamirContent";

export const metadata: Metadata = {
    title: "Pimapen Tamir & PVC Sistemleri | Ata Yapı",
    description:
        "PVC pencere ve kapı montajı, ısıcam değişimi, fitil, kilit ve menteşe tamiri. Ata Yapı kaliteli işçilik ve hızlı servis.",
    keywords: ["pimapen tamir", "pvc pencere tamiri", "pimapen montajı", "cam değişimi"],
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/pimapen-tamir',
    },
};

export default function PimapenTamirPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Pimapen Tamir & Montaj",
                        description: "PVC pencere tamiri, fitil değişimi, cam değişimi, menteşe ve kilit tamiri.",
                        provider: {
                            "@type": "LocalBusiness",
                            name: "Ata Yapı",
                            url: "https://www.xn--atayap-u9a.site",
                        },
                        url: "https://www.xn--atayap-u9a.site/pimapen-tamir",
                    }),
                }}
            />
            <PimapenTamirContent />
        </>
    );
}
