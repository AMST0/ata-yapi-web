"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import Link from "next/link";

interface QuoteItem {
    id: string;
    description: string;
    price: string;
}

const ACCESS_PIN = "1234"; // Simple PIN protection

export default function TeklifPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

    // Initialize auth state from sessionStorage
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    if (!isAuthChecked && typeof window !== 'undefined') {
        const saved = sessionStorage.getItem("quote_auth");
        if (saved === "true") {
            setIsAuthenticated(true);
        }
        setIsAuthChecked(true);
    }

    // Handle PIN submit
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

    // Calculate total
    const total = items.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9]/g, "")) || 0;
        return acc + price;
    }, 0);

    // Add new item
    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), description: "", price: "" }]);
    };

    // Remove item
    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id));
        }
    };

    // Update item
    const updateItem = (id: string, field: "description" | "price", value: string) => {
        setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("tr-TR").format(amount);
    };

    // Normalize text for PDF (convert Turkish chars to ASCII equivalents for PDF compatibility)
    const normalizeTurkish = (text: string): string => {
        const turkishMap: { [key: string]: string } = {
            'ğ': 'g', 'Ğ': 'G',
            'ü': 'u', 'Ü': 'U',
            'ş': 's', 'Ş': 'S',
            'ı': 'i', 'İ': 'I',
            'ö': 'o', 'Ö': 'O',
            'ç': 'c', 'Ç': 'C'
        };
        return text.replace(/[ğĞüÜşŞıİöÖçÇ]/g, (char) => turkishMap[char] || char);
    };

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = 25;

        // ========== HEADER ==========
        // Logo - "ata" in red
        doc.setFontSize(32);
        doc.setTextColor(227, 30, 36); // Primary red
        doc.setFont("helvetica", "bold");
        doc.text("ata", margin, yPos);

        // "YAPI" in gray below logo
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "normal");
        doc.text("YAPI", margin + 24, yPos);

        // Title: "CAM BALKON SISTEMLERI" and date
        doc.setFontSize(15);
        doc.setTextColor(227, 30, 36);
        doc.setFont("helvetica", "bold");
        doc.text("CAM BALKON SISTEMLERI", margin + 45, yPos - 5);

        const today = new Date();
        const dateStr = today.toLocaleDateString("tr-TR");
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "normal");
        doc.text(dateStr, pageWidth - margin, yPos - 5, { align: "right" });

        // Header divider line
        yPos += 12;
        doc.setDrawColor(227, 30, 36);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);

        yPos += 20;

        // ========== GREETING ==========
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        const greeting = normalizeTurkish(`Sayin ${customerName || "Yetkili"},`);
        doc.text(greeting, margin, yPos);
        yPos += 15;

        // Project address if provided
        if (projectAddress) {
            doc.setFontSize(10);
            doc.text(normalizeTurkish(`Proje Adresi: ${projectAddress}`), margin, yPos);
            yPos += 10;
        }

        // ========== INTRO TEXT ==========
        if (introText) {
            doc.setFontSize(10);
            const introLines = doc.splitTextToSize(normalizeTurkish(introText), pageWidth - margin * 2);
            doc.text(introLines, margin, yPos);
            yPos += introLines.length * 5 + 15;
        }

        // ========== ITEMS SECTION ==========
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(normalizeTurkish("Teklif Kapsaminda Yapilacak Isler:"), margin, yPos);
        yPos += 12;

        // Items list
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        items.forEach((item, index) => {
            if (item.description) {
                // Check if we need a new page
                if (yPos > pageHeight - 60) {
                    doc.addPage();
                    yPos = 30;
                }

                const itemText = normalizeTurkish(`${index + 1}. ${item.description}`);
                const lines = doc.splitTextToSize(itemText, pageWidth - margin * 2 - 40);
                doc.text(lines, margin + 5, yPos);

                if (item.price) {
                    const price = parseFloat(item.price.replace(/[^0-9]/g, "")) || 0;
                    const priceText = `${formatCurrency(price)} TL`;
                    doc.text(priceText, pageWidth - margin, yPos, { align: "right" });
                }

                yPos += lines.length * 6 + 4;
            }
        });

        yPos += 10;

        // ========== TOTAL SECTION ==========
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 12;

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(227, 30, 36);
        const totalText = normalizeTurkish(`Toplam Teklif Bedeli: ${formatCurrency(total)} TL + KDV`);
        doc.text(totalText, margin, yPos);
        yPos += 20;

        // ========== NOTES ==========
        if (notes) {
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(100, 100, 100);
            const notesLines = doc.splitTextToSize(normalizeTurkish(notes), pageWidth - margin * 2);
            doc.text(notesLines, margin, yPos);
        }

        // ========== FOOTER ==========
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(normalizeTurkish(`*Teklifin gecerlilik suresi ${validityDays} gundur.`), margin, pageHeight - 15);
        doc.text("Iletisim: 0531 400 29 59", pageWidth - margin, pageHeight - 15, { align: "right" });

        // Save PDF blob for sharing
        const blob = doc.output("blob");
        setPdfBlob(blob);

        // Download
        const fileName = normalizeTurkish(`${customerName || "Musteri"}_Teklif_${dateStr.replace(/\./g, "-")}.pdf`);
        doc.save(fileName);

        return fileName;
    };

    // Send via WhatsApp
    const sendWhatsApp = () => {
        if (!pdfBlob) {
            generatePDF();
        }
        setShowWhatsAppModal(true);
    };

    // Handle WhatsApp send
    const handleWhatsAppSend = (phone: string) => {
        const message = `Sayın ${customerName || "Yetkili"},

ATA YAPI olarak hazırladığımız teklifiniz ekteki PDF dosyasında yer almaktadır.

📋 Teklif Özeti:
• Toplam Tutar: ${formatCurrency(total)} ₺ + KDV
• Geçerlilik: ${validityDays} gün

Sorularınız için bize ulaşabilirsiniz.

Saygılarımızla,
ATA YAPI`;

        const encodedMessage = encodeURIComponent(message);
        const cleanPhone = phone.replace(/\D/g, "");
        const formattedPhone = cleanPhone.startsWith("90") ? cleanPhone : `90${cleanPhone}`;

        window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, "_blank");
        setShowWhatsAppModal(false);
    };

    // PIN Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full text-center border border-gray-700">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Teklif Sistemi
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Devam etmek için PIN kodunuzu girin
                    </p>
                    <form onSubmit={handlePinSubmit}>
                        <input
                            type="password"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            placeholder="PIN"
                            maxLength={4}
                            className={`w-full px-4 py-3 text-center text-2xl tracking-widest bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${pinError ? "border-red-500" : "border-gray-600"
                                }`}
                            autoFocus
                        />
                        {pinError && (
                            <p className="text-red-400 text-sm mt-2">Yanlış PIN kodu</p>
                        )}
                        <button
                            type="submit"
                            className="w-full mt-4 px-4 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors"
                        >
                            Giriş
                        </button>
                    </form>
                    <Link href="/" className="block mt-4 text-sm text-gray-500 hover:text-white">
                        ← Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/" className="text-sm text-gray-500 hover:text-[var(--primary)] mb-2 block">
                            ← Ana Sayfa
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                            Teklif Oluştur
                        </h1>
                    </div>
                    <Link
                        href="/admin"
                        className="text-sm text-gray-500 hover:text-[var(--primary)]"
                    >
                        Admin Panel →
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    {/* Customer Info */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Müşteri Adı *
                            </label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Örn: Ahmet Yılmaz"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Telefon
                            </label>
                            <input
                                type="tel"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                placeholder="0532 XXX XX XX"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Proje Adresi
                        </label>
                        <input
                            type="text"
                            value={projectAddress}
                            onChange={(e) => setProjectAddress(e.target.value)}
                            placeholder="Örn: Maltepe, İstanbul"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Açıklama / Giriş Metni
                        </label>
                        <textarea
                            value={introText}
                            onChange={(e) => setIntroText(e.target.value)}
                            placeholder="Tarafınıza, talep etmiş olduğunuz doğrama ve sistem uygulamalarına ilişkin fiyat teklifimiz aşağıda bilgilerinize sunulmuştur:"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Items */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-medium text-gray-700">
                                Yapılacak İşler
                            </label>
                            <button
                                onClick={addItem}
                                className="text-sm text-[var(--primary)] hover:underline"
                            >
                                + Yeni Satır Ekle
                            </button>
                        </div>

                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div key={item.id} className="flex gap-3 items-start">
                                    <span className="text-gray-400 pt-3 w-6">{index + 1}.</span>
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                        placeholder="İş açıklaması..."
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, "price", e.target.value)}
                                        placeholder="Fiyat (opsiyonel)"
                                        className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                                    />
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                                        disabled={items.length === 1}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-medium text-gray-700">Toplam Tutar:</span>
                            <span className="text-2xl font-bold text-gray-900">
                                {formatCurrency(total)} ₺ + KDV
                            </span>
                        </div>
                    </div>

                    {/* Notes & Validity */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Notlar
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Geçerlilik Süresi (Gün)
                            </label>
                            <input
                                type="number"
                                value={validityDays}
                                onChange={(e) => setValidityDays(parseInt(e.target.value) || 10)}
                                min={1}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={generatePDF}
                            className="flex-1 px-6 py-4 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                        >
                            📄 PDF İndir
                        </button>
                        <button
                            onClick={sendWhatsApp}
                            className="flex-1 px-6 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors flex items-center justify-center gap-2"
                        >
                            📱 WhatsApp ile Gönder
                        </button>
                    </div>
                </div>
            </div>

            {/* WhatsApp Modal */}
            {showWhatsAppModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">WhatsApp ile Gönder</h3>
                        <p className="text-gray-600 mb-4">
                            Teklifi göndermek istediğiniz numarayı girin:
                        </p>
                        <input
                            type="tel"
                            defaultValue={customerPhone}
                            placeholder="0532 XXX XX XX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                            id="whatsapp-phone"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowWhatsAppModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                İptal
                            </button>
                            <button
                                onClick={() => {
                                    const phone = (document.getElementById("whatsapp-phone") as HTMLInputElement).value;
                                    handleWhatsAppSend(phone);
                                }}
                                className="flex-1 px-4 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-dark)]"
                            >
                                Gönder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
