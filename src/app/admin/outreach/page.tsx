"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OutreachContact } from "@/app/api/admin/outreach/route";
import {
    getEmailSubject,
    getEmailHtml,
    getEmailPlainText,
    OUTREACH_CONFIG
} from "@/lib/outreach-templates";

interface SenderInfo {
    email: string;
    name: string;
    whatsapp: string;
    website: string;
    smtpServer: string;
}

export default function AdminOutreachPage() {
    const [contacts, setContacts] = useState<OutreachContact[]>([]);
    const [sender, setSender] = useState<SenderInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("ALL");

    // Modal & Sending state
    const [previewContact, setPreviewContact] = useState<OutreachContact | null>(null);
    const [previewLang, setPreviewLang] = useState<"tr" | "en">("tr");
    const [isSending, setIsSending] = useState(false);
    const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
    const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null);
    const [isTestMode, setIsTestMode] = useState(false);

    // Multi-selection & Bulk Send state
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [bulkLang, setBulkLang] = useState<"tr" | "en">("tr");
    const [bulkIsTest, setBulkIsTest] = useState(false);
    const [bulkSending, setBulkSending] = useState(false);
    const [bulkProgress, setBulkProgress] = useState<{ total: number; sent: number; current: string } | null>(null);
    const [bulkResult, setBulkResult] = useState<{ successful: number; failed: number } | null>(null);

    // Copy notification
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);

    async function fetchOutreach() {
        try {
            const res = await fetch("/api/admin/outreach");
            if (res.ok) {
                const data = await res.json();
                setContacts(data.contacts || []);
                setSender(data.sender || null);
            }
        } catch (err) {
            console.error("Error fetching outreach:", err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchOutreach();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedEmail(text);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    const filterCountryOptions = [
        { key: "ALL", label: "Tümü", count: contacts.length },
        { key: "DE", label: "Almanya 🇩🇪", count: contacts.filter(c => c.countryCode === "DE").length },
        { key: "BE", label: "Belçika 🇧🇪", count: contacts.filter(c => c.countryCode === "BE").length },
        { key: "DACH", label: "Avusturya & İsviçre 🇦🇹🇨🇭", count: contacts.filter(c => c.countryCode === "AT" || c.countryCode === "CH").length },
        { key: "NL", label: "Hollanda 🇳🇱", count: contacts.filter(c => c.countryCode === "NL").length },
        { key: "MED", label: "Portekiz & Yunanistan 🇵🇹🇬🇷", count: contacts.filter(c => c.countryCode === "PT" || c.countryCode === "GR").length },
        { key: "ALEVI", label: "Alevi Kurumları 🕊️", count: contacts.filter(c => c.group === "alevi").length },
    ];

    const filteredContacts = contacts.filter((c) => {
        if (selectedCountryFilter === "DE" && c.countryCode !== "DE") return false;
        if (selectedCountryFilter === "BE" && c.countryCode !== "BE") return false;
        if (selectedCountryFilter === "DACH" && c.countryCode !== "AT" && c.countryCode !== "CH") return false;
        if (selectedCountryFilter === "NL" && c.countryCode !== "NL") return false;
        if (selectedCountryFilter === "MED" && c.countryCode !== "PT" && c.countryCode !== "GR") return false;
        if (selectedCountryFilter === "ALEVI" && c.group !== "alevi") return false;

        if (searchTerm.trim() !== "") {
            const query = searchTerm.toLowerCase();
            const matchName = c.name.toLowerCase().includes(query);
            const matchEmail = c.email.toLowerCase().includes(query);
            const matchCountry = c.country.toLowerCase().includes(query);
            const matchCategory = c.category.toLowerCase().includes(query);
            return matchName || matchEmail || matchCountry || matchCategory;
        }

        return true;
    });

    // Selection handlers
    const toggleSelectAll = () => {
        if (selectedIds.length === filteredContacts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredContacts.map(c => c.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const copyAllEmails = () => {
        const emails = filteredContacts.map((c) => c.email).join(", ");
        navigator.clipboard.writeText(emails);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2500);
    };

    const downloadCsv = () => {
        const header = "Firma,E-posta,Grup,Ulke,Kategori,Dil,Durum\n";
        const rows = filteredContacts.map((c) => `"${c.name}","${c.email}","${c.group}","${c.country}","${c.category}","${c.language}","${c.status}"`).join("\n");
        const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ata_yapi_avrupa_mailler_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Single send email handler
    const handleSendSingleEmail = async () => {
        if (!previewContact) return;

        setIsSending(true);
        setSendSuccessMessage(null);
        setSendErrorMessage(null);

        try {
            const res = await fetch("/api/admin/outreach/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contactId: previewContact.id,
                    lang: previewLang,
                    isTest: isTestMode,
                    testEmail: sender?.email || "atayapicambalkon@gmail.com",
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSendSuccessMessage(
                    isTestMode
                        ? `✓ Test maili başarıyla ${sender?.email} adresinize gönderildi!`
                        : `✓ E-posta başarıyla ${previewContact.name} (${previewContact.email}) adresine iletildi!`
                );
                // Refresh list to update status
                fetchOutreach();
            } else {
                setSendErrorMessage(data.error || "E-posta gönderilirken bir hata oluştu.");
            }
        } catch (err: any) {
            console.error("Mail send error:", err);
            setSendErrorMessage(err?.message || "Sunucuya bağlanılamadı.");
        } finally {
            setIsSending(false);
        }
    };

    // Bulk send handler
    const handleStartBulkSend = async () => {
        const targetIds = selectedIds.length > 0 ? selectedIds : contacts.map(c => c.id);
        if (targetIds.length === 0) return;

        setBulkSending(true);
        setBulkResult(null);
        setBulkProgress({ total: targetIds.length, sent: 0, current: "Başlatılıyor..." });

        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < targetIds.length; i++) {
            const currentId = targetIds[i];
            const currentContact = contacts.find(c => c.id === currentId);
            setBulkProgress({
                total: targetIds.length,
                sent: i,
                current: `${currentContact?.name || 'Firma'} (${i + 1}/${targetIds.length})`
            });

            try {
                const res = await fetch("/api/admin/outreach/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contactId: currentId,
                        lang: bulkLang,
                        isTest: bulkIsTest,
                        testEmail: sender?.email || "atayapicambalkon@gmail.com",
                    }),
                });

                const data = await res.json();
                if (res.ok && data.success) {
                    successCount++;
                } else {
                    failCount++;
                }
            } catch {
                failCount++;
            }
        }

        setBulkProgress({
            total: targetIds.length,
            sent: targetIds.length,
            current: "Tamamlandı"
        });

        setBulkResult({ successful: successCount, failed: failCount });
        setBulkSending(false);
        fetchOutreach();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Avrupa e-posta listesi yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Avrupa E-Posta &amp; İhracat Takibi
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            16 Hedef Şirket
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                        Avrupa&apos;daki toptan alıcı pencere/kapı, cam balkon ve sineklik firmalarına otomatik Türkçe &amp; İngilizce ihracat mailleri gönderin
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        onClick={() => {
                            setSelectedIds(contacts.map(c => c.id));
                            setIsBulkModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <span>🚀 Tümüne Otomatik Mail Gönder (16)</span>
                    </button>

                    <button
                        onClick={copyAllEmails}
                        className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-gray-700"
                    >
                        {copiedAll ? (
                            <span className="text-emerald-400">✓ 16 E-Posta Kopyalandı!</span>
                        ) : (
                            <span>📋 Tüm Mailleri Kopyala</span>
                        )}
                    </button>

                    <button
                        onClick={downloadCsv}
                        className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-gray-700"
                    >
                        <span>📥 CSV İndir</span>
                    </button>

                    <a
                        href="https://wa.me/905314002959"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                        <span>💬 WhatsApp</span>
                    </a>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Hedef Şirketler
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {contacts.length} <span className="text-sm font-normal text-gray-500">Firma</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">14 B2B İthalatçı + 2 Topluluk</p>
                </div>

                <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Kapsanan Ülkeler
                    </div>
                    <div className="text-3xl font-bold text-emerald-400">
                        7 <span className="text-sm font-normal text-gray-500">Ülke</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">🇩🇪 🇧🇪 🇳🇱 🇦🇹 🇨🇭 🇵🇹 🇬🇷</p>
                </div>

                <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Gönderici Hesabı
                    </div>
                    <div className="text-base font-bold text-white truncate font-mono">
                        {sender?.email || "atayapicambalkon@gmail.com"}
                    </div>
                    <p className="text-xs text-emerald-400 mt-2">✓ Gmail SMTP Canlı Bağlı</p>
                </div>

                <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Dil Desteği
                    </div>
                    <div className="text-xl font-bold text-blue-400 flex items-center gap-2 mt-1">
                        <span>🇹🇷 Türkçe</span>
                        <span className="text-gray-500">|</span>
                        <span>🇬🇧 English</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Tüm firmalara çift dilde gönderim</p>
                </div>
            </div>

            {/* Selection Bar (Appears when items are checked) */}
            {selectedIds.length > 0 && (
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-500/30 border border-blue-500/40 flex items-center justify-center text-sm font-bold text-blue-300">
                            {selectedIds.length}
                        </span>
                        <div>
                            <div className="text-sm font-bold text-white">
                                {selectedIds.length} firma seçildi
                            </div>
                            <div className="text-xs text-gray-300">
                                Seçilen firmalara toplu e-posta gönderimi yapabilirsiniz
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsBulkModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md flex items-center gap-1.5"
                        >
                            <span>🚀 Seçilenlere Mail Gönder ({selectedIds.length})</span>
                        </button>
                        <button
                            onClick={() => setSelectedIds([])}
                            className="px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition-colors"
                        >
                            Seçimi Temizle
                        </button>
                    </div>
                </div>
            )}

            {/* Filter Tabs & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
                    {filterCountryOptions.map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setSelectedCountryFilter(opt.key)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                selectedCountryFilter === opt.key
                                    ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/30"
                                    : "bg-gray-900/50 hover:bg-gray-800/70 text-gray-400 hover:text-white border border-gray-800"
                            }`}
                        >
                            {opt.label} ({opt.count})
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full lg:w-72">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Firma, e-posta veya sektör ara..."
                        className="w-full px-4 py-2.5 pl-10 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                    <svg className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-900/50 border border-gray-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800/80 bg-gray-950/40 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                <th className="py-4 px-4 w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === filteredContacts.length && filteredContacts.length > 0}
                                        onChange={toggleSelectAll}
                                        className="rounded border-gray-700 text-blue-600 focus:ring-0 cursor-pointer w-4 h-4"
                                    />
                                </th>
                                <th className="py-4 px-4">Hedef Firma &amp; Sektör</th>
                                <th className="py-4 px-4">Ülke</th>
                                <th className="py-4 px-4">E-posta Adresi</th>
                                <th className="py-4 px-4">Diller</th>
                                <th className="py-4 px-4">Durum</th>
                                <th className="py-4 px-6 text-right">Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/40 text-sm text-gray-300">
                            {filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-500">
                                        Aramanıza uygun firma bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-800/30 transition-colors">
                                        {/* Checkbox */}
                                        <td className="py-4 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(contact.id)}
                                                onChange={() => toggleSelect(contact.id)}
                                                className="rounded border-gray-700 text-blue-600 focus:ring-0 cursor-pointer w-4 h-4"
                                            />
                                        </td>

                                        {/* Company */}
                                        <td className="py-4 px-4">
                                            <div className="font-semibold text-white">
                                                {contact.name}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5">
                                                {contact.category}
                                            </div>
                                        </td>

                                        {/* Country */}
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-800/60 border border-gray-700/40 text-xs font-medium text-gray-200">
                                                <span>{contact.flag}</span>
                                                <span>{contact.country}</span>
                                            </span>
                                        </td>

                                        {/* Email */}
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={`mailto:${contact.email}`}
                                                    className="font-mono text-xs text-blue-400 hover:underline"
                                                >
                                                    {contact.email}
                                                </a>
                                                <button
                                                    onClick={() => copyToClipboard(contact.email)}
                                                    className="p-1 rounded hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                                                    title="E-postayı Kopyala"
                                                >
                                                    {copiedEmail === contact.email ? (
                                                        <span className="text-[10px] text-emerald-400 font-sans font-medium">Kopyalandı!</span>
                                                    ) : (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>

                                        {/* Languages available */}
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                                                    🇹🇷 TR
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
                                                    🇬🇧 EN
                                                </span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                {contact.lastSentAt ? "Yeni İletildi" : "Kayıtlı / Hazır"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Single Send / Preview Button */}
                                                <button
                                                    onClick={() => {
                                                        setPreviewContact(contact);
                                                        setPreviewLang("tr"); // Default to Turkish per user request
                                                        setSendSuccessMessage(null);
                                                        setSendErrorMessage(null);
                                                    }}
                                                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                                                >
                                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <line x1="22" y1="2" x2="11" y2="13" />
                                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                    </svg>
                                                    <span>Mail Gönder / Önizle</span>
                                                </button>

                                                <a
                                                    href={contact.whatsappUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors flex items-center gap-1.5"
                                                    title="WhatsApp ile Mesaj Gönder"
                                                >
                                                    <span>💬 WA</span>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Single Email Preview & Send Modal */}
            {previewContact && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                            <div>
                                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                                    Otomatik E-Posta Gönderim Paneli
                                </div>
                                <h3 className="text-lg font-bold text-white mt-0.5">
                                    {previewContact.name} ({previewContact.country} {previewContact.flag})
                                </h3>
                            </div>
                            <button
                                onClick={() => setPreviewContact(null)}
                                className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Language Selector Tabs */}
                        <div className="px-6 py-3 bg-gray-950/80 border-b border-gray-800/80 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-400">Şablon Dili:</span>
                                <div className="flex items-center rounded-xl bg-gray-900 p-1 border border-gray-800">
                                    <button
                                        onClick={() => setPreviewLang("tr")}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                            previewLang === "tr"
                                                ? "bg-emerald-600 text-white shadow-sm"
                                                : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        🇹🇷 Türkçe
                                    </button>
                                    <button
                                        onClick={() => setPreviewLang("en")}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                            previewLang === "en"
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        🇬🇧 English
                                    </button>
                                </div>
                            </div>

                            {/* Test Mode toggle */}
                            <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isTestMode}
                                    onChange={(e) => setIsTestMode(e.target.checked)}
                                    className="rounded border-gray-700 text-purple-600 focus:ring-0 cursor-pointer w-4 h-4"
                                />
                                <span className="text-purple-300 font-medium">🧪 Test (Kendime Gönder)</span>
                            </label>
                        </div>

                        {/* Modal Meta info */}
                        <div className="px-6 py-3 bg-gray-950/40 border-b border-gray-800/80 text-xs text-gray-400 space-y-1 font-mono">
                            <div><strong className="text-gray-300 font-sans">Gönderici:</strong> Ata Yapı Cam Balkon &amp; Sineklik &lt;atayapicambalkon@gmail.com&gt;</div>
                            <div>
                                <strong className="text-gray-300 font-sans">Alıcı:</strong>{" "}
                                <span className={isTestMode ? "text-purple-300 font-bold" : "text-blue-400"}>
                                    {isTestMode ? `${sender?.email} (Test Modu Aktif)` : previewContact.email}
                                </span>
                            </div>
                            <div>
                                <strong className="text-gray-300 font-sans">Konu:</strong>{" "}
                                <span className="text-white font-sans font-medium">
                                    {getEmailSubject(previewContact, previewLang)}
                                </span>
                            </div>
                        </div>

                        {/* Status Alert Banner */}
                        {sendSuccessMessage && (
                            <div className="mx-6 mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                                <span>{sendSuccessMessage}</span>
                            </div>
                        )}

                        {sendErrorMessage && (
                            <div className="mx-6 mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
                                <span>❌ {sendErrorMessage}</span>
                            </div>
                        )}

                        {/* Modal Body: Rendered Preview */}
                        <div className="p-6 overflow-y-auto space-y-4 bg-gray-950/30 flex-1">
                            <div
                                className="bg-white text-gray-900 rounded-xl p-6 border-2 border-black max-w-xl mx-auto font-sans shadow-lg"
                                dangerouslySetInnerHTML={{
                                    __html: getEmailHtml(previewContact, previewLang),
                                }}
                            />
                        </div>

                        {/* Modal Footer with Send Actions */}
                        <div className="p-4 border-t border-gray-800 bg-gray-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="text-xs text-gray-400">
                                {isTestMode ? (
                                    <span className="text-purple-400 font-medium">
                                        Test modu: E-posta gerçek alıcıya gitmez, {sender?.email} adresinize iletilir.
                                    </span>
                                ) : (
                                    <span>
                                        Dil: <strong className="text-white">{previewLang === "tr" ? "Türkçe" : "İngilizce"}</strong> &bull; Alıcı: <strong className="text-white">{previewContact.email}</strong>
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                                <button
                                    onClick={() => setPreviewContact(null)}
                                    className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
                                >
                                    Vazgeç
                                </button>

                                <button
                                    onClick={handleSendSingleEmail}
                                    disabled={isSending}
                                    className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 flex-1 sm:flex-initial cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                                        isTestMode
                                            ? "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30"
                                            : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30"
                                    }`}
                                >
                                    {isSending ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Gmail ile Gönderiliyor...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{isTestMode ? "🧪 Test Maili Gönder" : `🚀 ${previewLang === "tr" ? "Türkçe" : "İngilizce"} Mail Gönder`}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Send Modal */}
            {isBulkModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Toplu Otomatik E-Posta Gönderimi</h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Seçili {selectedIds.length} firmaya Gmail SMTP üzerinden otomatik gönderim
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    if (!bulkSending) setIsBulkModalOpen(false);
                                }}
                                disabled={bulkSending}
                                className="w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Options */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-2">
                                    Gönderim Dili
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setBulkLang("tr")}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                                            bulkLang === "tr"
                                                ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                                                : "bg-gray-800/40 border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        🇹🇷 Türkçe İhracat Şablonu
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setBulkLang("en")}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                                            bulkLang === "en"
                                                ? "bg-blue-600/20 border-blue-500 text-blue-300"
                                                : "bg-gray-800/40 border-gray-700 text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        🇬🇧 English Wholesale Template
                                    </button>
                                </div>
                            </div>

                            {/* Test mode checkbox */}
                            <label className="flex items-center gap-2 p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs text-purple-200 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={bulkIsTest}
                                    onChange={(e) => setBulkIsTest(e.target.checked)}
                                    className="rounded border-gray-700 text-purple-600 focus:ring-0 cursor-pointer w-4 h-4"
                                />
                                <div>
                                    <div className="font-semibold">🧪 Güvenli Test Modu</div>
                                    <div className="text-[11px] text-purple-300/70">
                                        Mailler alıcılara değil, kendi adresinize ({sender?.email}) gönderilir
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Progress */}
                        {bulkProgress && (
                            <div className="space-y-2 p-4 rounded-xl bg-gray-950 border border-gray-800">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">İlerleme: {bulkProgress.current}</span>
                                    <span className="text-white font-bold">{bulkProgress.sent} / {bulkProgress.total}</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                                        style={{ width: `${(bulkProgress.sent / bulkProgress.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Results */}
                        {bulkResult && (
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                                ✓ Toplu gönderim tamamlandı! {bulkResult.successful} başarılı, {bulkResult.failed} başarısız.
                            </div>
                        )}

                        {/* Footer buttons */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => setIsBulkModalOpen(false)}
                                disabled={bulkSending}
                                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
                            >
                                {bulkResult ? "Kapat" : "İptal"}
                            </button>

                            {!bulkResult && (
                                <button
                                    onClick={handleStartBulkSend}
                                    disabled={bulkSending || selectedIds.length === 0}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {bulkSending ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Gönderiliyor...</span>
                                        </>
                                    ) : (
                                        <span>🚀 Gönderimi Başlat ({selectedIds.length} Firma)</span>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
