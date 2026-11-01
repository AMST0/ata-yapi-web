import type { Metadata } from "next";
import ProductSeoSchema from "@/components/seo/ProductSeoSchema";
import { buildProductMetadata } from "@/lib/seo-catalog";
import PimapenTamirContent from "./PimapenTamirContent";

export const metadata: Metadata = buildProductMetadata("pimapen-tamir", {
  title: "Pimapen Tamir & PVC Pencere Fitil, Kilit, Menteşe Servisi | Ata Yapı",
  description:
    "PVC pencere ve kapı tamiri, EPDM izolasyon fitili değişimi, çift açılım dönüşümü, menteşe/kilit onarımı ve ısıcam değişimi. Maltepe ve Anadolu Yakası hızlı servis.",
});

export default function PimapenTamirPage() {
  return (
    <>
      <ProductSeoSchema productId="pimapen-tamir" />
      <PimapenTamirContent />
    </>
  );
}
