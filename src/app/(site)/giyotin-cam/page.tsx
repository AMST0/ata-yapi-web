import type { Metadata } from "next";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import GiyotinCamContent from "./GiyotinCamContent";

export const metadata: Metadata = buildProductMetadata("giyotin-cam", {
  title: "Giyotin Cam Sistemleri | Motorlu & Kumandalı Dikey Sürgülü Cam | Ata Yapı",
  description:
    "Ata Yapı giyotin cam sistemleri — motorlu ve uzaktan kumandalı dikey sürgülü cam balkon, teras, kafe ve kış bahçesi çözümleri. Doğrudan üreticiden 2 yıl garantili montaj ve Avrupa ihracat imalatı.",
  extraKeywords: [
    "giyotin cam balkon",
    "guillotine glass systems",
    "dikey sürgülü cam",
    "giyotin cam m2 fiyatı",
  ],
});

export default function GiyotinCamPage() {
  return (
    <>
      <ProductSeoSchema productId="giyotin-cam" />
      <GiyotinCamContent />
    </>
  );
}
