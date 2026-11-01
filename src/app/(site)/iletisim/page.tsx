import type { Metadata } from "next";
import IletisimContent from "./IletisimContent";

export const metadata: Metadata = {
    title: "İletişim | Ata Yapı - Cam & Alüminyum Sistemleri İmalatı",
    description:
        "Ata Yapı ile iletişime geçin. Giyotin cam sistemleri, cam balkon, sineklik ve tente için ücretsiz keşif veya Avrupa toptan ihracat teklifi alın. ☎ +90 531 400 29 59",
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/iletisim',
    },
};

export default function IletisimPage() {
    return <IletisimContent />;
}
