import type { Metadata } from "next";
import FiyatlandirmaContent from "./FiyatlandirmaContent";

export const metadata: Metadata = {
  title: "Fiyatlandırma 2026 | Giyotin Cam, Cam Balkon, Sineklik & Tente m² Fiyatları | Ata Yapı",
  description:
    "Giyotin cam sistemleri, ısıcamlı/katlanır cam balkon, pileli sineklik ve kasetli tente fiyat hesaplama. Doğrudan üretici fabrikasından ölçüye özel net teklif alın.",
  keywords: [
    "giyotin cam fiyatları",
    "cam balkon fiyatları",
    "cam balkon m2 fiyatı",
    "ısıcamlı cam balkon fiyatları",
    "pileli sineklik fiyatları",
    "kedi sinekliği fiyatları",
    "kasetli tente fiyatları",
    "motorlu tente fiyatları",
  ],
  alternates: {
    canonical: "https://www.xn--atayap-u9a.site/fiyatlandirma",
  },
  openGraph: {
    title: "Giyotin Cam & Cam Balkon Fiyat Hesaplama | Ata Yapı",
    description:
      "Ölçüye özel motorlu giyotin cam, cam balkon, sineklik ve tente sistemleri üretici fiyat teklifi.",
    url: "https://www.xn--atayap-u9a.site/fiyatlandirma",
    images: [
      {
        url: "/hero-balcony.png",
        width: 1200,
        height: 630,
        alt: "Ata Yapı Fiyatlandırma ve Ölçü Hesaplama",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giyotin Cam & Cam Balkon Fiyatları | Ata Yapı",
    description: "Ölçüye özel üretici fiyat teklifi ve ücretsiz keşif.",
    images: ["/hero-balcony.png"],
  },
};

export default function FiyatlandirmaPage() {
  return <FiyatlandirmaContent />;
}
