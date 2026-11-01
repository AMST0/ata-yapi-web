import type { Metadata } from "next";
import IletisimContent from "./IletisimContent";

export const metadata: Metadata = {
  title: "İletişim & Ücretsiz Keşif | Ata Yapı Maltepe / İstanbul",
  description:
    "Ata Yapı ile iletişime geçin. Giyotin cam sistemleri, cam balkon, sineklik ve tente için ücretsiz keşif veya Avrupa toptan ihracat teklifi alın. ☎ +90 531 400 29 59",
  alternates: {
    canonical: "https://www.xn--atayap-u9a.site/iletisim",
  },
  openGraph: {
    title: "İletişim & Ücretsiz Keşif | Ata Yapı",
    description:
      "Maltepe/İstanbul merkez atölyemizden ücretsiz keşif ve fiyat teklifi alın. ☎ +90 531 400 29 59",
    url: "https://www.xn--atayap-u9a.site/iletisim",
    images: [
      {
        url: "/giyotin-cam-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Ata Yapı İletişim ve Ücretsiz Keşif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim & Ücretsiz Keşif | Ata Yapı",
    description: "Ücretsiz yerinde keşif ve fiyat teklifi: +90 531 400 29 59",
    images: ["/giyotin-cam-hero.jpg"],
  },
};

export default function IletisimPage() {
  return <IletisimContent />;
}
