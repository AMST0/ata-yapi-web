"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SEO_PRODUCT_CATALOG, type CatalogProduct } from "@/lib/seo-catalog";
import { SITE_CONTACT } from "@/lib/constants";

interface IndexNowInfo {
  key: string;
  keyLocation: string;
  sitemapUrl: string;
  merchantFeedUrl: string;
  llmsTxtUrl: string;
  totalIndexableUrls: number;
  urls: string[];
}

interface IndexNowResult {
  success: boolean;
  statusCode?: number;
  submittedCount?: number;
  message?: string;
  error?: string;
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const testLine = current ? `${current} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = testLine;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function AdminSeoGrowthPage() {
  const defaultProduct = SEO_PRODUCT_CATALOG[0];

  const [seoInfo, setSeoInfo] = useState<IndexNowInfo | null>(null);
  const [isSubmittingIndexNow, setIsSubmittingIndexNow] = useState(false);
  const [indexNowResult, setIndexNowResult] = useState<IndexNowResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Instagram Studio State
  const [selectedId, setSelectedId] = useState<string>(defaultProduct.id);
  const [canvasFormat, setCanvasFormat] = useState<"post" | "story">("post");
  const [captionLang, setCaptionLang] = useState<"tr" | "en">("tr");
  const [badgeText, setBadgeText] = useState<string>(defaultProduct.instagram.badgeTr);
  const [headlineText, setHeadlineText] = useState<string>(
    defaultProduct.instagram.headlineTr
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedProduct: CatalogProduct =
    SEO_PRODUCT_CATALOG.find((p) => p.id === selectedId) || defaultProduct;

  useEffect(() => {
    let cancelled = false;
    async function loadSeoInfo() {
      try {
        const res = await fetch("/api/admin/seo/indexnow", { cache: "no-store" });
        if (!res.ok) return;
        const data: IndexNowInfo = await res.json();
        if (!cancelled) {
          setSeoInfo(data);
        }
      } catch {
        // Ignore network error
      }
    }
    loadSeoInfo();
    return () => {
      cancelled = true;
    };
  }, []);

  const copyToClipboard = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleProductSelect = (newId: string) => {
    setSelectedId(newId);
    const found = SEO_PRODUCT_CATALOG.find((p) => p.id === newId);
    if (found) {
      setBadgeText(found.instagram.badgeTr);
      setHeadlineText(found.instagram.headlineTr);
    }
  };

  const handleTriggerIndexNow = async () => {
    setIsSubmittingIndexNow(true);
    setIndexNowResult(null);
    try {
      const res = await fetch("/api/admin/seo/indexnow", { method: "POST" });
      const data: IndexNowResult = await res.json();
      setIndexNowResult(data);
    } catch {
      setIndexNowResult({
        success: false,
        error: "IndexNow bağlantısı sırasında ağ hatası oluştu.",
      });
    } finally {
      setIsSubmittingIndexNow(false);
    }
  };

  const renderInstagramCanvas = useCallback(
    (img: HTMLImageElement | null) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = 1080;
      const H = canvasFormat === "post" ? 1080 : 1920;
      canvas.width = W;
      canvas.height = H;

      // Background base
      ctx.fillStyle = "#0b0f19";
      ctx.fillRect(0, 0, W, H);

      // Draw product image with cover crop
      if (img && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = W / H;
        let drawW = W;
        let drawH = H;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawH = H;
          drawW = H * imgRatio;
          offsetX = (W - drawW) / 2;
        } else {
          drawW = W;
          drawH = W / imgRatio;
          offsetY = (H - drawH) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      }

      // Architectural dark obsidian gradient overlay
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(11, 15, 25, 0.72)");
      grad.addColorStop(0.38, "rgba(11, 15, 25, 0.28)");
      grad.addColorStop(0.68, "rgba(11, 15, 25, 0.85)");
      grad.addColorStop(1, "rgba(11, 15, 25, 0.98)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const pad = 72;

      // Top Brand Header Pill
      ctx.fillStyle = "rgba(11, 15, 25, 0.82)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pad, pad, 420, 66, 16);
      ctx.fill();
      ctx.stroke();

      // Red square accent
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.roundRect(pad + 18, pad + 18, 30, 30, 7);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("ATA YAPI • ÜRETİCİ FABRİKA", pad + 62, pad + 42);

      // Top-right domain badge
      ctx.fillStyle = "rgba(220, 38, 38, 0.92)";
      ctx.beginPath();
      ctx.roundRect(W - pad - 230, pad, 230, 66, 16);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(SITE_CONTACT.siteDisplayDomain, W - pad - 185, pad + 42);

      // Bottom Content Anchor
      const bottomBase = H - (canvasFormat === "story" ? 150 : 82);

      // Contact Footer Bar
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pad, bottomBase - 96, W - pad * 2, 96, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("ÜCRETSİZ KEŞİF & WHATSAPP HATTI", pad + 30, bottomBase - 56);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText(SITE_CONTACT.phoneDisplay, pad + 30, bottomBase - 20);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "600 22px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Maltepe / İstanbul • TR & EU", W - pad - 30, bottomBase - 36);
      ctx.textAlign = "left";

      // Technical Specs Row
      const specsY = bottomBase - 148;
      const specText = selectedProduct.specs
        .slice(0, 2)
        .map((s) => `✓ ${s.value}`)
        .join("   •   ");
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "600 24px sans-serif";
      ctx.fillText(specText, pad, specsY);

      // Headline (multi-line upwards from specs)
      ctx.font = "bold 56px sans-serif";
      const headlineLines = wrapCanvasText(
        ctx,
        headlineText || selectedProduct.shortTitle,
        W - pad * 2
      ).slice(0, 3);

      const lineHeight = 68;
      const headlineStartY =
        specsY - 56 - (headlineLines.length - 1) * lineHeight;

      ctx.fillStyle = "#ffffff";
      headlineLines.forEach((line, idx) => {
        ctx.fillText(line, pad, headlineStartY + idx * lineHeight);
      });

      // Category Badge above Headline
      const badgeY = headlineStartY - 82;
      const cleanBadge = (badgeText || selectedProduct.category).toUpperCase();
      ctx.font = "bold 22px sans-serif";
      const badgeWidth = Math.min(ctx.measureText(cleanBadge).width + 48, W - pad * 2);

      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.roundRect(pad, badgeY, badgeWidth, 46, 10);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.fillText(cleanBadge, pad + 24, badgeY + 31);
    },
    [badgeText, canvasFormat, headlineText, selectedProduct]
  );

  useEffect(() => {
    let active = true;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (active) renderInstagramCanvas(img);
    };
    img.onerror = () => {
      if (active) renderInstagramCanvas(null);
    };
    img.src = selectedProduct.image;
    return () => {
      active = false;
    };
  }, [selectedProduct.image, renderInstagramCanvas]);

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `ata-yapi-${selectedProduct.id}-${canvasFormat}.png`;
    link.href = dataUrl;
    link.click();
  };

  const activeCaption =
    captionLang === "tr"
      ? `${selectedProduct.instagram.captionTr}\n\n📞 Ücretsiz Keşif & Fiyat: ${SITE_CONTACT.phoneDisplay}\n🌐 Detaylı İncele: ${SITE_CONTACT.siteUrl}${selectedProduct.path}\n\n${selectedProduct.instagram.hashtagsTr}`
      : `${selectedProduct.instagram.captionEn}\n\n📞 WhatsApp / Export: ${SITE_CONTACT.phoneDisplay}\n🌐 Specs & Quote: ${SITE_CONTACT.siteUrl}${selectedProduct.path}\n\n${selectedProduct.instagram.hashtagsEn}`;

  const sitemapUrl = seoInfo?.sitemapUrl || `${SITE_CONTACT.siteUrl}/sitemap.xml`;
  const merchantFeedUrl =
    seoInfo?.merchantFeedUrl || `${SITE_CONTACT.siteUrl}/feed/products.xml`;
  const llmsTxtUrl = seoInfo?.llmsTxtUrl || `${SITE_CONTACT.siteUrl}/llms.txt`;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>%100 ÜCRETSİZ ORGANİK ARAMA & SOSYAL MEDYA MOTORU AKTİF</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Google İlk Sayfa & Instagram Büyüme Merkezi
          </h1>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Sitedeki <strong>{SEO_PRODUCT_CATALOG.length} ürün sisteminin tamamına</strong>{" "}
            Google Zengin Ürün Şeması (Fiyat Aralığı + Stok + Teknik Özellik), Google
            Alışveriş & Instagram Mağaza XML Beslemesi ve tek tıkla IndexNow anında
            indeksleme entegre edildi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            type="button"
            onClick={handleTriggerIndexNow}
            disabled={isSubmittingIndexNow}
            className="px-5 py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:opacity-60 text-white font-semibold text-sm transition-colors shadow-lg shadow-red-950/40 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>
              {isSubmittingIndexNow
                ? "Arama Motorlarına Bildiriliyor..."
                : `Tüm Sayfaları Anında İndeksle (${seoInfo?.totalIndexableUrls || 43} URL)`}
            </span>
          </button>

          <a
            href={SITE_CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold text-center transition-colors"
          >
            Instagram Profilini Aç ({SITE_CONTACT.instagramHandle}) ↗
          </a>
        </div>
      </div>

      {indexNowResult && (
        <div
          className={`p-4 rounded-xl border text-sm ${
            indexNowResult.success
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
              : "bg-amber-500/10 border-amber-500/30 text-amber-200"
          }`}
        >
          <div className="font-semibold">
            {indexNowResult.success
              ? "✓ IndexNow Anında Bildirim Başarılı!"
              : "ℹ IndexNow Bildirim Durumu"}
          </div>
          <p className="text-xs mt-1 opacity-90">
            {indexNowResult.message || indexNowResult.error}
          </p>
        </div>
      )}

      {/* 3 Live XML / AI Feeds */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            key: "sitemap",
            badge: "GOOGLE SEARCH CONSOLE",
            title: "Dinamik XML Site Haritası",
            desc: "Tüm ürünler, alt sistemler ve 24 ilçe/şehir SEO sayfasını Google'a bildirir.",
            url: sitemapUrl,
          },
          {
            key: "merchant",
            badge: "GOOGLE ALIŞVERİŞ & INSTAGRAM MAĞAZA",
            title: "Ücretsiz Ürün Katalog XML Feed",
            desc: "16 ürünün fotoğraf, stok ve fiyatlarını Google Merchant & Meta Katalog'a ücretsiz aktarır.",
            url: merchantFeedUrl,
          },
          {
            key: "llms",
            badge: "CHATGPT • GEMINI • PERPLEXITY",
            title: "Yapay Zeka Arama Dizini (llms.txt)",
            desc: "Yapay zeka asistanlarında 'İstanbul giyotin cam / cam balkon üreticisi' önerilerinde öne çıkarır.",
            url: llmsTxtUrl,
          },
        ].map((feed) => (
          <div
            key={feed.key}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-red-500/15 text-red-300 border border-red-500/25">
                {feed.badge}
              </span>
              <h2 className="text-base font-bold text-white mt-3">{feed.title}</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{feed.desc}</p>
            </div>

            <div className="space-y-2">
              <div className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 truncate">
                {feed.url}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(feed.key, feed.url)}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedKey === feed.key ? "✓ Link Kopyalandı" : "Linki Kopyala"}
                </button>
                <a
                  href={feed.url.replace(SITE_CONTACT.siteUrl, "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Test Et ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Free Instagram Post & Story Studio */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
              ÜCRETSİZ SOSYAL MEDYA TASARIM & METİN ARACI
            </div>
            <h2 className="text-xl font-bold text-white">
              Instagram Gönderi & Story / Reels Kapak Stüdyosu
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Canva Pro veya ücretli ajans gerekmeden tüm ürünleriniz için 1080p kurumsal
              Instagram görseli ve hazır hashtag&apos;li açıklama üretin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCanvasFormat("post")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                canvasFormat === "post"
                  ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Kare Gönderi (1080×1080)
            </button>
            <button
              type="button"
              onClick={() => setCanvasFormat("story")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                canvasFormat === "story"
                  ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Story / Reels (1080×1920)
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Caption Generator */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                1. Ürün / Sistem Seçin ({SEO_PRODUCT_CATALOG.length} Sistem)
              </label>
              <select
                value={selectedId}
                onChange={(e) => handleProductSelect(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-[var(--primary)]"
              >
                {SEO_PRODUCT_CATALOG.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.category}] {p.shortTitle} ({p.lowPrice.toLocaleString("tr-TR")} ₺ -{" "}
                    {p.highPrice.toLocaleString("tr-TR")} ₺)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  2. Görsel Üst Etiket
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  3. Görsel Ana Başlık
                </label>
                <input
                  type="text"
                  value={headlineText}
                  onChange={(e) => setHeadlineText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">
                  4. Hazır Instagram Açıklaması & Keşfet Hashtag&apos;leri
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCaptionLang("tr")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      captionLang === "tr"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-slate-950 text-slate-400"
                    }`}
                  >
                    TR (Yurt İçi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCaptionLang("en")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      captionLang === "en"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-slate-950 text-slate-400"
                    }`}
                  >
                    EN (Avrupa İhracat)
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                rows={8}
                value={activeCaption}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed font-mono focus:outline-none"
              />

              <div className="flex flex-wrap gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => copyToClipboard("caption", activeCaption)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedKey === "caption"
                    ? "✓ Açıklama & Hashtag Kopyalandı!"
                    : "Açıklamayı & Hashtag'leri Kopyala"}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                >
                  ⬇ 1080p PNG Görseli İndir
                </button>
              </div>
            </div>
          </div>

          {/* Live HTML5 Canvas Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="text-xs font-mono text-slate-400 mb-2">
              Canlı Önizleme ({canvasFormat === "post" ? "1080 × 1080 px" : "1080 × 1920 px"})
            </div>
            <div className="w-full max-w-[360px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
              <canvas
                ref={canvasRef}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Zero-Budget Google Page 1 & Instagram Shop Playbook */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            0 TL Bütçeyle Google 1. Sayfa & Instagram Mağaza Aktivasyon Adımları
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Teknik altyapı sitenize %100 kuruldu. Aşağıdaki 4 resmi ücretsiz platforma
            hazır besleme linklerinizi yapıştırarak organik görünürlüğü tam kapasiteye
            çıkarabilirsiniz:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              step: "ADIM 01 • ÜCRETSİZ",
              title: "Google Search Console Kaydı",
              body: "search.google.com/search-console adresine girip alan adınızı ekleyin ve 'Site Haritaları' bölümüne yukarıdaki /sitemap.xml linkini gönderin. 16 ürününüzün tamamı fiyat aralığıyla Google'da zengin sonuç (Rich Snippet) olarak listelenir.",
              actionLabel: "Google Search Console'u Aç ↗",
              actionHref: "https://search.google.com/search-console/about",
            },
            {
              step: "ADIM 02 • ÜCRETSİZ (EN YÜKSEK MÜŞTERİ GETİRİSİ)",
              title: "Google İşletme Profili (Google Haritalar İlk 3)",
              body: "business.google.com üzerinden 'Ata Yapı Cam Balkon & Giyotin Cam' profilinize girip web sitesi olarak sitenizi ekleyin, Ürünler kısmına bu sayfadaki stüdyodan indirdiğiniz görselleri yükleyin ve müşterilerden Google yorumu isteyin.",
              actionLabel: "Google İşletme Profili'ni Aç ↗",
              actionHref: "https://www.google.com/intl/tr_tr/business/",
            },
            {
              step: "ADIM 03 • ÜCRETSİZ ÜRÜN LİSTELEME (0 TL REKLAM)",
              title: "Google Merchant Center (Alışveriş Sekmesi)",
              body: "merchants.google.com adresinde ücretsiz hesap açıp 'Ücretsiz Ürün Listelemeleri'ni seçin. Veri kaynağı olarak yukarıdaki /feed/products.xml adresini yapıştırın. 16 ürününüz reklam ücreti ödemeden Google Alışveriş ve Görseller'de fiyatlarıyla çıkar.",
              actionLabel: "Google Merchant Center'ı Aç ↗",
              actionHref: "https://www.google.com/intl/tr_tr/retail/",
            },
            {
              step: "ADIM 04 • ÜCRETSİZ INSTAGRAM ÜRÜN ETİKETLEME",
              title: "Meta Commerce (Instagram Mağaza Kataloğu)",
              body: "business.facebook.com/commerce adresinde Katalog oluşturup 'Veri Akışı (Data Feed)' kısmına aynı /feed/products.xml linkini yapıştırın. Paylaştığınız Instagram Reels ve gönderilerde ürünlerinizin üzerine doğrudan fiyat/site etiketi koyabilirsiniz.",
              actionLabel: "Meta Commerce Manager'ı Aç ↗",
              actionHref: "https://business.facebook.com/commerce",
            },
          ].map((card) => (
            <div
              key={card.step}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="text-[11px] font-mono font-bold text-emerald-400">
                  {card.step}
                </div>
                <h3 className="text-base font-bold text-white mt-1.5">{card.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{card.body}</p>
              </div>
              <a
                href={card.actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300"
              >
                <span>{card.actionLabel}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* All 16 Products SEO Audit & Rich Results Test Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">
              Ürün Bazlı Google Rich Snippet & SEO Denetim Tablosu ({SEO_PRODUCT_CATALOG.length}/
              {SEO_PRODUCT_CATALOG.length} Aktif)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Her ürün sayfasında Product Schema, Breadcrumb Schema, Canonical URL ve
              OpenGraph sosyal medya önizleme kartı aktiftir.
            </p>
          </div>
          <Link
            href="/hizmet-bolgeleri"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors shrink-0"
          >
            Hizmet Bölgeleri SEO Hub&apos;ı Gör ↗
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/70 text-slate-400 border-b border-slate-800">
                <th className="py-3.5 px-4 font-semibold">SKU / Sistem</th>
                <th className="py-3.5 px-4 font-semibold">Sayfa Adresi</th>
                <th className="py-3.5 px-4 font-semibold">Şema Fiyat Aralığı</th>
                <th className="py-3.5 px-4 font-semibold">SEO Durumu</th>
                <th className="py-3.5 px-4 font-semibold text-right">Google Test</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {SEO_PRODUCT_CATALOG.map((product) => {
                const fullProductUrl = `${SITE_CONTACT.siteUrl}${product.path}`;
                const richTestUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(
                  fullProductUrl
                )}`;
                return (
                  <tr key={product.id} className="hover:bg-slate-800/30">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{product.shortTitle}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {product.sku} • {product.keywords.length} anahtar kelime
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <Link
                        href={product.path}
                        target="_blank"
                        className="hover:text-red-400 transition-colors"
                      >
                        {product.path} ↗
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">
                      {product.lowPrice.toLocaleString("tr-TR")} ₺ –{" "}
                      {product.highPrice.toLocaleString("tr-TR")} ₺ / {product.unitLabel}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 font-semibold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Product + OG + XML
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={richTestUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
                      >
                        <span>Google Test ↗</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

