import type { Metadata } from "next";
import FiyatlandirmaContent from "./FiyatlandirmaContent";

export const metadata: Metadata = {
    title: "Fiyatlandırma | Ata Yapı - Giyotin Cam & Cam Balkon Fiyatları",
    description:
        "Giyotin cam sistemleri, cam balkon, sineklik ve tente fiyat teklifleri. Ölçüye özel üretim ile projenize özel net fiyatlandırma ve Avrupa toptan ihracat fiyatları.",
    keywords: ["giyotin cam fiyatları", "cam balkon fiyatları", "sineklik fiyatları", "tente fiyatları", "cam balkon m2 fiyat"],
    alternates: {
        canonical: 'https://www.xn--atayap-u9a.site/fiyatlandirma',
    },
};

export default function FiyatlandirmaPage() {
    return <FiyatlandirmaContent />;
}
