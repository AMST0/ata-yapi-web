import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import sitemap from "@/app/sitemap";
import { SITE_CONTACT } from "@/lib/constants";

const INDEXNOW_KEY = "atayapi2026indexnow8f92a1c4e7b3d5";

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const entries = sitemap();
  return NextResponse.json({
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_CONTACT.siteUrl}/${INDEXNOW_KEY}.txt`,
    sitemapUrl: `${SITE_CONTACT.siteUrl}/sitemap.xml`,
    merchantFeedUrl: `${SITE_CONTACT.siteUrl}/feed/products.xml`,
    llmsTxtUrl: `${SITE_CONTACT.siteUrl}/llms.txt`,
    totalIndexableUrls: entries.length,
    urls: entries.map((e) => e.url),
  });
}

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const entries = sitemap();
    const urlList = entries.map((e) => e.url);
    const host = new URL(SITE_CONTACT.siteUrl).host;

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_CONTACT.siteUrl}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const accepted = response.status === 200 || response.status === 202;
    const responseText = await response.text().catch(() => "");

    return NextResponse.json({
      success: accepted,
      statusCode: response.status,
      submittedCount: urlList.length,
      message: accepted
        ? `${urlList.length} sayfa URL'si IndexNow ağına (Bing, Yandex, Naver, Seznam ve Yapay Zeka Arama Motorları) başarıyla bildirildi.`
        : `IndexNow yanıt kodu: ${response.status}. Not: Canlı alan adında (${host}) anahtar dosyası yayına çıktığında anında onaylanır.`,
      detail: responseText.slice(0, 300),
    });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "IndexNow isteği sırasında hata oluştu.";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

