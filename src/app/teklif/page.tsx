"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/ArchitecturalIcons";
import { SITE_CONTACT } from "@/lib/constants";
import {
  formatLetterheadDate,
  formatTurkishCurrency,
  generateAtaYapiQuotePdf,
} from "@/lib/pdf-quote";

interface QuoteFormItem {
  id: string;
  description: string;
  price: string;
}

const ACCESS_PIN = process.env.NEXT_PUBLIC_QUOTE_PIN || "1234";

const HEADER_PRESETS = [
  "CAM BALKON SİSTEMLERİ",
  "GİYOTİN CAM & CAM BALKON SİSTEMLERİ",
  "TENTE & GÖLGELENDİRME SİSTEMLERİ",
  "MİMARİ CAM & ALÜMİNYUM SİSTEMLERİ",
];

const QUICK_ITEM_SNIPPETS = [
  "1 adet motorlu giyotin cam sistemi imalatı ve montajı.",
  "1 adet ısıcamlı katlanır cam balkon sistemi imalatı ve montajı.",
  "1 adet motorlu pergola / kasetli tente imalatı ve montajı.",
  "Plise (pileli) sineklik sistemleri imalatı ve montajı.",
  "Sabit alüminyum doğrama ve kompozit panel kapatma uygulaması yapılması.",
];

export default function TeklifPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Letterhead & Document State
  const [headerTitle, setHeaderTitle] = useState("CAM BALKON SİSTEMLERİ");
  const [dateText, setDateText] = useState(() => formatLetterheadDate());
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [introText, setIntroText] = useState("");
  const [sectionTitle, setSectionTitle] = useState(
    "YAPILACAK İŞLER VE UYGULAMA DETAYLARI;"
  );
  const [items, setItems] = useState<QuoteFormItem[]>([
    { id: "1", description: "", price: "" },
  ]);
  const [manualPackageTotal, setManualPackageTotal] = useState("");
  const [vatLabel, setVatLabel] = useState<"+ KDV" | "KDV Dahil" | "">("+ KDV");
  const [showItemPrices, setShowItemPrices] = useState(true);
  const [showSignatureBlock, setShowSignatureBlock] = useState(true);
  const [notes, setNotes] = useState("*Teklifimizin geçerlilik süresi 10 gündür.");
  const [validityDays, setValidityDays] = useState(10);

  const [isGenerating, setIsGenerating] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsappTargetPhone, setWhatsappTargetPhone] = useState("");
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        if (sessionStorage.getItem("quote_auth") === "true") {
          setIsAuthenticated(true);
          setIsAuthChecked(true);
          return;
        }
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            sessionStorage.setItem("quote_auth", "true");
          }
        }
      } catch {
        // Fallback to PIN prompt
      } finally {
        setIsAuthChecked(true);
      }
    };
    checkAccess();
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ACCESS_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("quote_auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const itemsSum = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9]/g, "")) || 0;
    return acc + price;
  }, 0);

  const manualTotalNum =
    parseFloat(manualPackageTotal.replace(/[^0-9]/g, "")) || 0;

  const effectiveTotal = manualTotalNum > 0 ? manualTotalNum : itemsSum;

  const addItem = (prefill = "") => {
    if (
      prefill &&
      items.length === 1 &&
      items[0].description.trim() === "" &&
      items[0].price.trim() === ""
    ) {
      setItems([{ ...items[0], description: prefill }]);
      return;
    }
    setItems([
      ...items,
      { id: `${Date.now()}-${Math.random()}`, description: prefill, price: "" },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (
    id: string,
    field: "description" | "price",
    value: string
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const saveToDatabase = async (): Promise<string | undefined> => {
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-quote-pin": pinInput || ACCESS_PIN,
        },
        body: JSON.stringify({
          customerName: customerName.trim() || "Müşteri",
          customerPhone,
          projectAddress,
          items: items
            .filter((i) => i.description.trim().length > 0)
            .map((i) => ({
              description: i.description.trim(),
              price: parseFloat(i.price.replace(/[^0-9]/g, "")) || 0,
            })),
          total: effectiveTotal,
          validityDays,
          notes,
          status: "draft",
        }),
      });

      if (!res.ok) throw new Error("Failed to save quote");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2800);
      const saved = await res.json();
      return saved?.quote?.quoteNumber;
    } catch (err) {
      console.error("Error saving quote:", err);
      return undefined;
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const quoteNumber = await saveToDatabase();
      const { blob } = await generateAtaYapiQuotePdf({
        quoteNumber,
        headerTitle,
        dateText,
        customerName,
        customerPhone,
        projectAddress,
        introText,
        sectionTitle,
        items: items.map((i) => ({
          description: i.description,
          price: parseFloat(i.price.replace(/[^0-9]/g, "")) || 0,
        })),
        total: effectiveTotal,
        vatLabel,
        showItemPrices,
        showSignatureBlock,
        notes,
        validityDays,
      });
      setPdfBlob(blob);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsGenerating(false);
    }
  };

  const sendWhatsApp = async () => {
    if (!pdfBlob) {
      await handleGeneratePDF();
    }
    setWhatsappTargetPhone(customerPhone);
    setShowWhatsAppModal(true);
  };

  const handleWhatsAppSend = (phone: string) => {
    const priceLine =
      effectiveTotal > 0
        ? `• Toplam Tutar: ${formatTurkishCurrency(effectiveTotal)} TL ${vatLabel}\n`
        : "";
    const message = `Sayın ${customerName || "Yetkili"},

ATA YAPI olarak hazırladığımız antetli teklif ve uygulama detay formunuz PDF olarak hazırlanmıştır.

${priceLine}• Geçerlilik Süresi: ${validityDays} gün

Sorularınız için bizimle iletişime geçebilirsiniz.

Saygılarımızla,
ATA YAPI Cam Balkon Sistemleri`;

    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("90")
      ? cleanPhone
      : cleanPhone.startsWith("0")
      ? `90${cleanPhone.slice(1)}`
      : `90${cleanPhone}`;

    window.open(
      `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setShowWhatsAppModal(false);
  };

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl p-8 max-w-sm w-full text-center border border-slate-800 shadow-2xl">
          <div className="w-14 h-14 bg-red-600/15 text-red-500 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-1.5">
            Ata Yapı Teklif Sistemi
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            Devam etmek için yetkili PIN kodunu girin
          </p>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              maxLength={8}
              className={`w-full px-4 py-3 text-center text-2xl tracking-widest bg-slate-950 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                pinError ? "border-red-500" : "border-slate-800"
              }`}
              autoFocus
            />
            {pinError && (
              <p className="text-red-400 text-xs mt-2">Hatalı PIN kodu</p>
            )}
            <button
              type="submit"
              className="w-full mt-4 px-4 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer"
            >
              Giriş Yap
            </button>
          </form>
          <Link
            href="/"
            className="block mt-5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const previewItems = items.filter((i) => i.description.trim().length > 0);
  const previewHasItemPrices =
    showItemPrices &&
    previewItems.some((i) => (parseFloat(i.price.replace(/[^0-9]/g, "")) || 0) > 0);

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10">
      {/* Local @font-face so Live A4 Preview matches embedded PDF font 1:1 */}
      <style>{`
        @font-face {
          font-family: 'AtaQuoteSerif';
          src: url('/fonts/Tinos-Regular.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'AtaQuoteSerif';
          src: url('/fonts/Tinos-Bold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: 'AtaQuoteSerif';
          src: url('/fonts/Tinos-Italic.ttf') format('truetype');
          font-weight: 400;
          font-style: italic;
        }
        @font-face {
          font-family: 'AtaQuoteHeader';
          src: url('/fonts/Montserrat-ExtraBold.ttf') format('truetype');
          font-weight: 800;
          font-style: normal;
        }
      `}</style>

      <div className="container max-w-7xl">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <Link
              href="/admin"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-[var(--primary)] mb-1 inline-block"
            >
              ← Yönetim Paneline Dön
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Antetli Resmi Teklif & Uygulama Formu (PDF)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Orijinal Ata Yapı logosu, sayfa ortası filigranı ve klasik resmi Times
              tipografisiyle yüksek çözünürlüklü Türkçe PDF.
            </p>
          </div>
          {saveSuccess && (
            <span className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              Teklif Arşive Kaydedildi & İndirildi ✓
            </span>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-7 items-start">
          {/* LEFT: Editor Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
            {/* Antet Header & Date */}
            <div className="space-y-3 pb-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Antet Üst Başlığı & Tarih
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setDateText(
                      dateText === "... / ... / ..."
                        ? formatLetterheadDate()
                        : "... / ... / ..."
                    )
                  }
                  className="text-[11px] font-semibold text-[var(--primary)] hover:underline cursor-pointer"
                >
                  {dateText === "... / ... / ..."
                    ? "Bugünün Tarihini Yaz"
                    : "Tarihi Boş (.../.../...) Yap"}
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={headerTitle}
                    onChange={(e) => setHeaderTitle(e.target.value)}
                    placeholder="CAM BALKON SİSTEMLERİ"
                    className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={dateText}
                    onChange={(e) => setDateText(e.target.value)}
                    placeholder="02 / 11 / 2026"
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none text-center"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {HEADER_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setHeaderTitle(preset)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      headerTitle === preset
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Müşteri / Firma Adı *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Örn: AYDIN"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Telefon Numarası (Opsiyonel)
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0532 XXX XX XX"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Uygulama Adresi (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={projectAddress}
                  onChange={(e) => setProjectAddress(e.target.value)}
                  placeholder="Örn: Maltepe / İstanbul"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Liste Başlığı
                </label>
                <input
                  type="text"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Üst Açıklama Metni (Opsiyonel)
              </label>
              <textarea
                value={introText}
                onChange={(e) => setIntroText(e.target.value)}
                placeholder="Boş bırakırsanız doğrudan 'YAPILACAK İŞLER VE UYGULAMA DETAYLARI;' başlığı ile başlar..."
                rows={2}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* Work Scope Line Items */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Yapılacak İşler & Uygulama Maddeleri
                </label>
                <button
                  type="button"
                  onClick={() => addItem("")}
                  className="px-3 py-1 rounded-lg bg-red-50 text-[var(--primary)] text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer"
                >
                  + Yeni Madde Ekle
                </button>
              </div>

              {/* Quick Snippets */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {QUICK_ITEM_SNIPPETS.map((snippet, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addItem(snippet)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 font-medium transition-colors cursor-pointer text-left"
                    title="Tıklayarak maddelere ekle"
                  >
                    + {snippet.slice(0, 34)}...
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/90"
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-xs font-serif font-bold text-slate-600 pt-2.5 w-5">
                        {index + 1}.
                      </span>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        placeholder="Örn: 3 adet camlı giyotin sistem imalatı ve montajı."
                        className="flex-1 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none resize-none"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 pl-7 sm:pl-0 sm:self-start">
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", e.target.value)}
                        placeholder="Fiyat (Ops.)"
                        className="flex-1 sm:w-28 px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-30 cursor-pointer"
                        disabled={items.length === 1}
                        aria-label="Maddeyi sil"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Document Options */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Paket / Genel Toplam (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={manualPackageTotal}
                    onChange={(e) => setManualPackageTotal(e.target.value)}
                    placeholder={
                      itemsSum > 0
                        ? `Otomatik: ${formatTurkishCurrency(itemsSum)} TL`
                        : "Fiyatsız iş formu için boş bırakın"
                    }
                    className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    KDV Gösterimi
                  </label>
                  <select
                    value={vatLabel}
                    onChange={(e) =>
                      setVatLabel(e.target.value as "+ KDV" | "KDV Dahil" | "")
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                  >
                    <option value="+ KDV">+ KDV</option>
                    <option value="KDV Dahil">KDV Dahil</option>
                    <option value="">KDV Belirtme</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs font-medium text-slate-700">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showItemPrices}
                    onChange={(e) => setShowItemPrices(e.target.checked)}
                    className="rounded accent-[var(--primary)]"
                  />
                  <span>Satır fiyatlarını göster</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSignatureBlock}
                    onChange={(e) => setShowSignatureBlock(e.target.checked)}
                    className="rounded accent-[var(--primary)]"
                  />
                  <span>Alt imza & onay alanı ekle</span>
                </label>
              </div>
            </div>

            {/* Notes & Validity */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Alt Not (Boş bırakılabilir)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Geçerlilik (Gün)
                </label>
                <input
                  type="number"
                  value={validityDays}
                  onChange={(e) => setValidityDays(parseInt(e.target.value) || 10)}
                  min={1}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="btn-press flex-1 px-6 py-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>
                  {isGenerating
                    ? "Antetli PDF Hazırlanıyor..."
                    : "⬇ Antetli PDF İndir & Kaydet"}
                </span>
              </button>
              <button
                type="button"
                onClick={sendWhatsApp}
                disabled={isGenerating}
                className="btn-press flex-1 px-6 py-4 bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp ile Gönder</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Live A4 Paper Letterhead Preview */}
          <div className="lg:col-span-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Canlı A4 Antetli Kağıt Önizlemesi
              </span>
              <span className="text-xs font-mono text-slate-500">
                210 × 297 mm • Times / Tinos Türkçe Font
              </span>
            </div>

            <div className="bg-white rounded-xl shadow-xl border border-slate-300/90 aspect-[210/297] w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden select-none">
              {/* Center Translucent Ata Yapı Watermark (Filigran) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt=""
                  className="w-[70%] max-w-[390px] object-contain opacity-[0.13]"
                />
              </div>

              {/* Top Section: Header + Body */}
              <div className="relative z-10">
                {/* Antet Header */}
                <div className="pb-3 mb-6 border-b border-slate-200 relative">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex items-end gap-3 sm:gap-4 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/logo.png"
                        alt="Ata Yapı Logo"
                        className="w-24 sm:w-32 h-auto object-contain shrink-0"
                      />
                      <div
                        className="text-xs sm:text-[15px] font-extrabold text-slate-900 tracking-tight leading-none pb-0.5 truncate"
                        style={{ fontFamily: "'AtaQuoteHeader', sans-serif" }}
                      >
                        {(headerTitle || "CAM BALKON SİSTEMLERİ").toLocaleUpperCase(
                          "tr-TR"
                        )}
                      </div>
                    </div>

                    <div
                      className="text-[11px] sm:text-xs font-extrabold text-slate-900 whitespace-nowrap pb-0.5"
                      style={{ fontFamily: "'AtaQuoteHeader', sans-serif" }}
                    >
                      {dateText || formatLetterheadDate()}
                    </div>
                  </div>
                  <span className="absolute left-0 -bottom-[1.5px] w-24 h-[2.5px] bg-[#dc2626]" />
                </div>

                {/* Document Body in Classic Times / Tinos Serif */}
                <div
                  className="text-slate-900 space-y-4 text-[13px] sm:text-[14.5px] leading-relaxed"
                  style={{
                    fontFamily: "'AtaQuoteSerif', 'Times New Roman', Times, serif",
                  }}
                >
                  <div className="space-y-1">
                    <div>
                      <span className="font-bold">MÜŞTERİ ADI: </span>
                      <span>
                        {(customerName || "AYDIN").toLocaleUpperCase("tr-TR")}
                      </span>
                    </div>
                    {customerPhone.trim() && (
                      <div className="text-[12px] sm:text-[13px] text-slate-800">
                        <span className="font-bold">İLETİŞİM: </span>
                        <span>{customerPhone}</span>
                      </div>
                    )}
                    {projectAddress.trim() && (
                      <div className="text-[12px] sm:text-[13px] text-slate-800">
                        <span className="font-bold">UYGULAMA ADRESİ: </span>
                        <span>{projectAddress}</span>
                      </div>
                    )}
                  </div>

                  {introText.trim() && (
                    <p className="text-[12.5px] sm:text-[13.5px] text-slate-800">
                      {introText}
                    </p>
                  )}

                  <div className="pt-1">
                    <div className="font-bold mb-2.5">
                      {sectionTitle || "YAPILACAK İŞLER VE UYGULAMA DETAYLARI;"}
                    </div>

                    <ol className="space-y-2 pl-3 sm:pl-4">
                      {(previewItems.length > 0
                        ? previewItems
                        : [
                            {
                              id: "sample-1",
                              description: "1 adet pergule tente imalatı ve montajı.",
                              price: "",
                            },
                            {
                              id: "sample-2",
                              description:
                                "3 adet camlı giyotin sistem imalatı ve montajı.",
                              price: "",
                            },
                          ]
                      ).map((item, idx) => {
                        const numPrice =
                          parseFloat(item.price.replace(/[^0-9]/g, "")) || 0;
                        const isPlaceholder = previewItems.length === 0;
                        return (
                          <li
                            key={item.id}
                            className={`flex items-start justify-between gap-3 ${
                              isPlaceholder ? "text-slate-400 italic" : "text-slate-900"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="shrink-0 w-4">{idx + 1}.</span>
                              <span>{item.description}</span>
                            </div>
                            {previewHasItemPrices && numPrice > 0 && (
                              <span className="font-bold whitespace-nowrap">
                                {formatTurkishCurrency(numPrice)} TL
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {effectiveTotal > 0 && (
                    <div className="pt-3 mt-4 border-y border-slate-300 py-2 flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        TOPLAM TEKLİF BEDELİ:
                      </span>
                      <span className="font-bold text-[#c81e1e] text-sm sm:text-base">
                        {formatTurkishCurrency(effectiveTotal)} TL{" "}
                        {vatLabel ? vatLabel : ""}
                      </span>
                    </div>
                  )}

                  {notes.trim() && (
                    <p className="italic text-slate-600 text-[11.5px] sm:text-xs pt-1 whitespace-pre-line">
                      {notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Signature + Official Antet Footer */}
              <div
                className="relative z-10 pt-4 space-y-5"
                style={{
                  fontFamily: "'AtaQuoteSerif', 'Times New Roman', Times, serif",
                }}
              >
                {showSignatureBlock && (
                  <div className="flex items-start justify-between px-2 text-[11px] sm:text-xs text-slate-800">
                    <div>
                      <div className="font-bold">MÜŞTERİ ONAYI</div>
                      <div className="italic text-slate-500 text-[10px]">
                        Ad Soyad / İmza
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">ATA YAPI CAM BALKON SİSTEMLERİ</div>
                      <div className="italic text-slate-500 text-[10px]">
                        Yetkili Kaşe & İmza
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 relative flex items-center justify-between gap-2 text-[9.5px] sm:text-[10.5px] text-slate-600">
                  <span className="absolute left-0 -top-[1px] w-14 h-[2px] bg-[#dc2626]" />
                  <span className="truncate">
                    Girne Mah. Meriç Sk. No:13 Maltepe / İSTANBUL • Tel:{" "}
                    {SITE_CONTACT.phoneDisplay}
                  </span>
                  <span className="font-bold text-slate-900 shrink-0">
                    {SITE_CONTACT.siteDisplayDomain}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              WhatsApp ile Teklif Özeti Gönder
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              İndirilen antetli PDF dosyasını müşteriye iletmek için telefon
              numarasını doğrulayın:
            </p>
            <input
              type="tel"
              value={whatsappTargetPhone}
              onChange={(e) => setWhatsappTargetPhone(e.target.value)}
              placeholder="0532 XXX XX XX"
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowWhatsAppModal(false)}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold hover:bg-slate-50 cursor-pointer"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => handleWhatsAppSend(whatsappTargetPhone)}
                className="flex-1 px-4 py-3 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-sm font-semibold cursor-pointer"
              >
                WhatsApp Aç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
