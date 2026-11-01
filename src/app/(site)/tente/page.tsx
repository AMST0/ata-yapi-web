import type { Metadata } from "next";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import TenteContent from "./TenteContent";

export const metadata: Metadata = buildProductMetadata("tente", {
  title: "Tente Sistemleri | Kasetli, Mafsallı & Motorlu Tente Fiyatları | Ata Yapı",
  description:
    "Tam kasetli tente, mafsallı tente ve uzaktan kumandalı motorlu tente sistemleri. UV korumalı solmaz ithal akrilik kumaşlar, ücretsiz keşif ve Avrupa ihracat avantajı.",
});

export default function TentePage() {
  return (
    <>
      <ProductSeoSchema productId="tente" />
      <TenteContent />
    </>
  );
}
