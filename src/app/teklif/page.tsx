"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/ArchitecturalIcons";

interface QuoteItem {
  id: string;
  description: string;
  price: string;
}

const ACCESS_PIN = process.env.NEXT_PUBLIC_QUOTE_PIN || "1234";

export default function TeklifPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [introText, setIntroText] = useState("");
  const [items, setItems] = useState<QuoteItem[]>([
    { id: "1", description: "", price: "" },
  ]);
  const [notes, setNotes] = useState("*Teklifin geçerlilik süresi 10 gündür.");
  const [validityDays, setValidityDays] = useState(10);
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

  const total = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9]/g, "")) || 0;
    return acc + price;
  }, 0);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "", price: "" }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: "description" | "price", value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR").format(amount);
  };

  const normalizeTurkish = (text: string): string => {
    const turkishMap: Record<string, string> = {
      ğ: "g",
      Ğ: "G",
      ü: "u",
      Ü: "U",
      ş: "s",
      Ş: "S",
      ı: "i",
      İ: "I",
      ö: "o",
      Ö: "O",
      ç: "c",
      Ç: "C",
    };
    return text.replace(/[ğĞüÜşŞıİöÖçÇ]/g, (char) => turkishMap[char] || char);
  };

  const saveToDatabase = async () => {
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-quote-pin": pinInput || ACCESS_PIN,
        },
        body: JSON.stringify({
          customerName,
          customerPhone,
          projectAddress,
          items: items.map((i) => ({
            description: i.description,
            price: parseFloat(i.price.replace(/[^0-9]/g, "")) || 0,
          })),
          total,
          validityDays,
          notes,
          status: "draft",
        }),
      });

      if (!res.ok) throw new Error("Failed to save quote");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      return await res.json();
    } catch (err) {
      console.error("Error saving quote:", err);
      return null;
    }
  };

  const generatePDF = async () => {
    await saveToDatabase();

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = 25;

    // Header
    doc.setFontSize(30);
    doc.setTextColor(220, 38, 38);
    doc.setFont("helvetica", "bold");
    doc.text("ATA", margin, yPos);

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("YAPI", margin + 25, yPos);

    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text("MIMARI CAM & ALUMINYUM SISTEMLERI", margin + 44, yPos - 4);

    const today = new Date();
    const dateStr = today.toLocaleDateString("tr-TR");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.text(`Tarih: ${dateStr}`, pageWidth - margin, yPos, { align: "right" });

    yPos += 10;
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.6);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    yPos += 18;

    // Greeting
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(normalizeTurkish(`Sayin ${customerName || "Yetkili"},`), margin, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    if (projectAddress) {
      doc.setFontSize(10);
      doc.text(normalizeTurkish(`Proje Adresi: ${projectAddress}`), margin, yPos);
      yPos += 10;
    }

    if (introText) {
      doc.setFontSize(10);
      const introLines = doc.splitTextToSize(
        normalizeTurkish(introText),
        pageWidth - margin * 2
      );
      doc.text(introLines, margin, yPos);
      yPos += introLines.length * 5 + 12;
    } else {
      yPos += 4;
    }

    // Items Section
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(normalizeTurkish("Teklif Kapsaminda Yapilacak Isler:"), margin, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    items.forEach((item, index) => {
      if (item.description) {
        if (yPos > pageHeight - 60) {
          doc.addPage();
          yPos = 30;
        }

        const itemText = normalizeTurkish(`${index + 1}. ${item.description}`);
        const lines = doc.splitTextToSize(itemText, pageWidth - margin * 2 - 42);
        doc.text(lines, margin + 3, yPos);

        if (item.price) {
          const price = parseFloat(item.price.replace(/[^0-9]/g, "")) || 0;
          doc.text(`${formatCurrency(price)} TL`, pageWidth - margin, yPos, {
            align: "right",
          });
        }

        yPos += lines.length * 6 + 4;
      }
    });

    yPos += 8;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 12;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38);
    doc.text(
      normalizeTurkish(`Toplam Teklif Bedeli: ${formatCurrency(total)} TL + KDV`),
      margin,
      yPos
    );
    yPos += 16;

    if (notes) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 116, 139);
      const notesLines = doc.splitTextToSize(
        normalizeTurkish(notes),
        pageWidth - margin * 2
      );
      doc.text(notesLines, margin, yPos);
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(
      normalizeTurkish(
        `Girne, Meric Sk. No:13 Maltepe/Istanbul  |  Gecerlilik: ${validityDays} gun`
      ),
      margin,
      pageHeight - 14
    );
    doc.text("Tel: +90 531 400 29 59", pageWidth - margin, pageHeight - 14, {
      align: "right",
    });

    const blob = doc.output("blob");
    setPdfBlob(blob);

    const fileName = normalizeTurkish(
      `${customerName || "Musteri"}_Teklif_${dateStr.replace(/\./g, "-")}.pdf`
    );
    doc.save(fileName);
    return fileName;
  };

  const sendWhatsApp = async () => {
    if (!pdfBlob) {
      await generatePDF();
    }
    setWhatsappTargetPhone(customerPhone);
    setShowWhatsAppModal(true);
  };

  const handleWhatsAppSend = (phone: string) => {
    const message = `Sayın ${customerName || "Yetkili"},

ATA YAPI olarak hazırladığımız fiyat teklifiniz ekteki PDF dosyasında yer almaktadır.

Teklif Özeti:
• Toplam Tutar: ${formatCurrency(total)} TL + KDV
• Geçerlilik Süresi: ${validityDays} gün

Sorularınız için bizimle iletişime geçebilirsiniz.

Saygılarımızla,
ATA YAPI Cam & Alüminyum`;

    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("90") ? cleanPhone : `90${cleanPhone}`;

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
          <h1 className="text-xl font-bold text-white mb-1.5">Ata Yapı Teklif Sistemi</h1>
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
            {pinError && <p className="text-red-400 text-xs mt-2">Hatalı PIN kodu</p>}
            <button
              type="submit"
              className="w-full mt-4 px-4 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl font-semibold text-sm transition-colors"
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

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/admin"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-[var(--primary)] mb-1 inline-block"
            >
              ← Yönetim Paneline Dön
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Resmi Fiyat Teklifi Oluştur (PDF)
            </h1>
          </div>
          {saveSuccess && (
            <span className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              Teklif Kaydedildi ✓
            </span>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Müşteri / Firma Adı *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Telefon Numarası
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0532 XXX XX XX"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Proje / Montaj Adresi
            </label>
            <input
              type="text"
              value={projectAddress}
              onChange={(e) => setProjectAddress(e.target.value)}
              placeholder="Örn: Maltepe, İstanbul"
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Üst Açıklama Metni (Opsiyonel)
            </label>
            <textarea
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              placeholder="Talep etmiş olduğunuz mimari cam ve alüminyum sistem uygulamalarına ilişkin fiyat teklifimiz aşağıda bilgilerinize sunulmuştur:"
              rows={2}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Teklif Kalemleri
              </label>
              <button
                type="button"
                onClick={addItem}
                className="text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                + Yeni Kalem Ekle
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-2.5 p-3 sm:p-0 bg-slate-50 sm:bg-transparent rounded-xl border sm:border-0 border-slate-200"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs font-mono font-bold text-slate-400 w-5">
                      {index + 1}.
                    </span>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="İş / Sistem açıklaması (Örn: Somfy Motorlu Isıcamlı Giyotin Cam)"
                      className="flex-1 px-4 py-3 text-sm bg-white sm:bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 pl-7 sm:pl-0">
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, "price", e.target.value)}
                      placeholder="Tutar (TL)"
                      className="flex-1 sm:w-36 px-4 py-3 text-sm font-mono bg-white sm:bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-30"
                      disabled={items.length === 1}
                      aria-label="Kalemi sil"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Box */}
          <div className="bg-[#0b0f19] text-white rounded-xl p-5 sm:p-6 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-300">Toplam Teklif Bedeli:</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-white">
              {formatCurrency(total)} TL <span className="text-xs text-slate-400">+ KDV</span>
            </span>
          </div>

          {/* Notes & Validity */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Teklif Notları
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Geçerlilik Süresi (Gün)
              </label>
              <input
                type="number"
                value={validityDays}
                onChange={(e) => setValidityDays(parseInt(e.target.value) || 10)}
                min={1}
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
            <button
              type="button"
              onClick={generatePDF}
              className="btn-press flex-1 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>PDF İndir & Kaydet</span>
            </button>
            <button
              type="button"
              onClick={sendWhatsApp}
              className="btn-press flex-1 px-6 py-4 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>WhatsApp ile Gönder</span>
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">WhatsApp ile Teklif Özeti Gönder</h3>
            <p className="text-slate-600 text-sm mb-4">
              Teklif özetinin gönderileceği müşteri telefon numarasını doğrulayın:
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
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold hover:bg-slate-50"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => handleWhatsAppSend(whatsappTargetPhone)}
                className="flex-1 px-4 py-3 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-sm font-semibold"
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
