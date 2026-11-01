import {
  buildProductBreadcrumbJsonLd,
  buildProductJsonLd,
  getCatalogProductById,
} from "@/lib/seo-catalog";

export default function ProductSeoSchema({ productId }: { productId: string }) {
  const product = getCatalogProductById(productId);
  if (!product) return null;

  const productJsonLd = buildProductJsonLd(product);
  const breadcrumbJsonLd = buildProductBreadcrumbJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
