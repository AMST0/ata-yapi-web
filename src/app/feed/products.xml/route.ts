import { NextResponse } from "next/server";
import { SEO_PRODUCT_CATALOG } from "@/lib/seo-catalog";
import { SITE_CONTACT } from "@/lib/constants";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const itemsXml = SEO_PRODUCT_CATALOG.map((product) => {
    const productUrl = `${SITE_CONTACT.siteUrl}${product.path}`;
    const imageUrl = `${SITE_CONTACT.siteUrl}${product.image}`;

    return `    <item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${product.lowPrice}.00 TRY</g:price>
      <g:brand>${escapeXml(SITE_CONTACT.companyName)}</g:brand>
      <g:mpn>${escapeXml(product.sku)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${escapeXml(product.googleCategory)}</g:google_product_category>
      <g:product_type>${escapeXml(product.category)}</g:product_type>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(SITE_CONTACT.fullCompanyName)} - Ürün Kataloğu</title>
    <link>${escapeXml(SITE_CONTACT.siteUrl)}</link>
    <description>Giyotin Cam, Isıcamlı Cam Balkon, Pileli &amp; Kedi Sinekliği, Kasetli Tente ve PVC Sistemleri Üretici Ürün Beslemesi (Google Merchant Center &amp; Instagram Mağaza Uyumlu)</description>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

