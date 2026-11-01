import type { Metadata } from "next";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import CamBalkonContent from "./CamBalkonContent";

export const metadata: Metadata = buildProductMetadata("cam-balkon", {
  title: "Cam Balkon Sistemleri | Isıcamlı, Katlanır & Sürme Cam Balkon | Ata Yapı",
  description:
    "Isıcamlı cam balkon, katlanır cam balkon ve eşiksiz sürme cam balkon sistemleri. Ata Yapı fabrikasından ölçüye özel üretim, ücretsiz keşif, 2 yıl garanti ve Avrupa ihracat.",
});

export default function CamBalkonPage() {
  return (
    <>
      <ProductSeoSchema productId="cam-balkon" />
      <CamBalkonContent />
    </>
  );
}
