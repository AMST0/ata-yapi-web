import type { Metadata } from "next";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import SineklikContent from "./SineklikContent";

export const metadata: Metadata = buildProductMetadata("sineklik", {
  title: "Sineklik Sistemleri | Pileli (Plise), Menteşeli & Kedi Sinekliği | Ata Yapı",
  description:
    "Plise (pileli) sineklik, menteşeli sineklik ve yırtılmaz çelik tüllü kedi sinekliği sistemleri. Ata Yapı imalatı, milimetrik üretim, hızlı montaj ve Avrupa ihracat.",
});

export default function SineklikPage() {
  return (
    <>
      <ProductSeoSchema productId="sineklik" />
      <SineklikContent />
    </>
  );
}
