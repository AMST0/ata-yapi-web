"use client";

import { useEffect, useState } from "react";
import { OutreachContact } from "@/app/api/admin/outreach/route";
import {
    getEmailSubject,
    getEmailHtml,
} from "@/lib/outreach-templates";

interface SenderInfo {
    email: string;
    name: string;
    whatsapp: string;
    website: string;
    smtpServer: string;
}

const COUNTRY_OPTIONS = [
    { code: "DE", label: "Almanya (DE)" },
    { code: "BE", label: "Belçika (BE)" },
    { code: "NL", label: "Hollanda (NL)" },
    { code: "AT", label: "Avusturya (AT)" },
    { code: "CH", label: "İsviçre (CH)" },
    { code: "FR", label: "Fransa (FR)" },
    { code: "GB", label: "Birleşik Krallık (GB)" },
    { code: "PT", label: "Portekiz (PT)" },
    { code: "GR", label: "Yunanistan (GR)" },
    { code: "TR", label: "Türkiye (TR)" },
    { code: "OTHER", label: "Diğer Avrupa (EU)" },
];

export default function AdminOutreachPage() {
    const [contacts, setContacts] = useState<OutreachContact[]>([]);
    const [sender, setSender] = useState<SenderInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("ALL");

    // Single Preview & Send Modal state
    const [previewContact, setPreviewContact] = useState<OutreachContact | null>(null);
    const [previewLang, setPreviewLang] = useState<"tr" | "en">("tr");
    const [customSubject, setCustomSubject] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
    const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null);
    const [isTestMode, setIsTestMode] = useState(false);

    // Add New Contact Modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCompany, setNewCompany] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newCountryCode, setNewCountryCode] = useState("DE");
    const [newCategory, setNewCategory] = useState("Pencere, Cam Balkon & Sineklik Sistemleri");
    const [newGroup, setNewGroup] = useState<"business" | "alevi">("business");
    const [addError, setAddError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Multi-selection & Bulk Send state
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [bulkLang, setBulkLang] = useState<"tr" | "en">("tr");
    const [bulkIsTest, setBulkIsTest] = useState(false);
    const [bulkSending, setBulkSending] = useState(false);
    const [bulkProgress, setBulkProgress] = useState<{ total: number; sent: number; current: string } | null>(null);
    const [bulkResult, setBulkResult] = useState<{ successful: number; failed: number } | null>(null);

    // Copy notifications
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);

    async function fetchOutreach() {
        try {
            const res = await fetch("/api/admin/outreach", { cache: "no-store" });
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
        { key: "DE", label: "Almanya (DE)", count: contacts.filter((c) => c.countryCode === "DE").length },
        { key: "BE", label: "Belçika (BE)", count: contacts.filter((c) => c.countryCode === "BE").length },
        { key: "DACH", label: "Avusturya & İsviçre", count: contacts.filter((c) => c.countryCode === "AT" || c.countryCode === "CH").length },
        { key: "NL", label: "Hollanda (NL)", count: contacts.filter((c) => c.countryCode === "NL").length },
        { key: "MED", label: "Portekiz & Yunanistan", count: contacts.filter((c) => c.countryCode === "PT" || c.countryCode === "GR").length },
        { key: "ALEVI", label: "Kurum & Topluluk", count: contacts.filter((c) => c.group === "alevi").length },
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
            return (
                c.name.toLowerCase().includes(query) ||
                c.email.toLowerCase().includes(query) ||
                c.country.toLowerCase().includes(query) ||
                (c.category || "").toLowerCase().includes(query)
            );
        }

        return true;
    });

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredContacts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredContacts.map((c) => c.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
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
        const rows = filteredContacts
            .map((c) => `"${c.name}","${c.email}","${c.group}","${c.country}","${c.category}","${c.language}","${c.status}"`)
            .join("\n");
        const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ata_yapi_ihracat_mailler_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const openPreviewModal = (contact: OutreachContact) => {
        const initialLang: "tr" | "en" =
            contact.countryCode === "TR" || contact.group === "alevi" ? "tr" : "tr";
        setPreviewContact(contact);
        setPreviewLang(initialLang);
        setCustomSubject(getEmailSubject(contact, initialLang));
        setSendSuccessMessage(null);
        setSendErrorMessage(null);
    };

    const handlePreviewLangChange = (lang: "tr" | "en") => {
        setPreviewLang(lang);
        if (previewContact) {
            setCustomSubject(getEmailSubject(previewContact, lang));
        }
    };

    const handleAddContact = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddError(null);
        setIsAdding(true);

        try {
            const res = await fetch("/api/admin/outreach", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newCompany,
                    email: newEmail,
                    countryCode: newCountryCode,
                    category: newCategory,
                    group: newGroup,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setNewCompany("");
                setNewEmail("");
                setIsAddModalOpen(false);
                await fetchOutreach();
                window.dispatchEvent(new Event("admin-counts-updated"));
            } else {
                setAddError(data.error || "Firma eklenemedi.");
            }
        } catch {
            setAddError("Sunucu bağlantı hatası oluştu.");
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteCustomContact = async (contact: OutreachContact) => {
        if (!contact.isCustom) return;
        const confirmed = window.confirm(`${contact.name} (${contact.email}) kaydını listeden silmek istiyor musunuz?`);
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/admin/outreach?id=${contact.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setSelectedIds((prev) => prev.filter((id) => id !== contact.id));
                await fetchOutreach();
                window.dispatchEvent(new Event("admin-counts-updated"));
            }
        } catch (err) {
            console.error("Delete outreach contact error:", err);
        }
    };

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
                    customSubject: customSubject.trim() || undefined,
                    isTest: isTestMode,
                    testEmail: sender?.email || "atayapicambalkon@gmail.com",
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSendSuccessMessage(
                    isTestMode
                        ? `Test maili başarıyla ${sender?.email} adresinize gönderildi.`
                        : `E-posta başarıyla ${previewContact.name} (${previewContact.email}) adresine iletildi.`
                );
                fetchOutreach();
            } else {
                setSendErrorMessage(data.error || "E-posta gönderilirken bir hata oluştu.");
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Sunucuya bağlanılamadı.";
            setSendErrorMessage(msg);
        } finally {
            setIsSending(false);
        }
    };

    const handleStartBulkSend = async () => {
        const targetIds = selectedIds.length > 0 ? selectedIds : contacts.map((c) => c.id);
        if (targetIds.length === 0) return;

        setBulkSending(true);
        setBulkResult(null);
        setBulkProgress({ total: targetIds.length, sent: 0, current: "Başlatılıyor..." });

        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < targetIds.length; i++) {
            const currentId = targetIds[i];
            const currentContact = contacts.find((c) => c.id === currentId);
            setBulkProgress({
                total: targetIds.length,
                sent: i,
                current: `${currentContact?.name || "Firma"} (${i + 1}/${targetIds.length})`,
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
            current: "Tamamlandı",
        });

        setBulkResult({ successful: successCount, failed: failCount });
        setBulkSending(false);
        fetchOutreach();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">İhracat e-posta listesi yükleniyor...</p>
                </div>
            </div>
        );
    }

    const uniqueCountriesCount = new Set(contacts.map((c) => c.countryCode)).size;

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h1
                            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Avrupa &amp; B2B E-Posta Yönetimi
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                            {contacts.length} Kayıtlı Firma
                        </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">
                        Toptan pencere, cam balkon ve sineklik alıcılarına Türkçe veya İngilizce kurumsal ihracat maili gönderin.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setAddError(null);
                            setIsAddModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Yeni Firma Ekle</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setSelectedIds(contacts.map((c) => c.id));
                            setBulkResult(null);
                            setBulkProgress(null);
                            setIsBulkModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                        <span>Tümüne Otomatik Mail ({contacts.length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={copyAllEmails}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors border border-slate-800 cursor-pointer"
                    >
                        {copiedAll ? (
                            <span className="text-emerald-400">E-Postalar Kopyalandı</span>
                        ) : (
                            <span>Mailleri Kopyala</span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={downloadCsv}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors border border-slate-800 cursor-pointer"
                    >
                        <span>CSV İndir</span>
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Kayıtlı Alıcılar
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                        {contacts.length}
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                        B2B İthalatçı &amp; Kurumsal Liste
                    </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Hedef Ülke Sayısı
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                        {uniqueCountriesCount}
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                        DE • BE • NL • AT • CH • PT • GR
                    </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Gönderici SMTP
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white truncate font-mono mt-1">
                        {sender?.email || "atayapicambalkon@gmail.com"}
                    </div>
                    <p className="text-xs text-emerald-400 mt-1.5">Gmail SMTP Bağlantısı Hazır</p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Hazır Şablon Dilleri
                    </div>
                    <div className="text-base sm:text-lg font-bold text-blue-400 flex items-center gap-2 mt-1">
                        <span>TR Türkçe</span>
                        <span className="text-slate-600">/</span>
                        <span>EN English</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">Tek tıkla çift dilde önizleme</p>
                </div>
            </div>

            {/* Selection Bar */}
            {selectedIds.length > 0 && (
                <div className="bg-blue-950/50 border border-blue-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-blue-500/25 border border-blue-500/40 flex items-center justify-center text-sm font-bold text-blue-300">
                            {selectedIds.length}
                        </span>
                        <div>
                            <div className="text-sm font-bold text-white">
                                {selectedIds.length} firma seçildi
                            </div>
                            <div className="text-xs text-slate-300">
                                Seçili firmalara toplu Türkçe veya İngilizce mail gönderebilirsiniz.
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setBulkResult(null);
                                setBulkProgress(null);
                                setIsBulkModalOpen(true);
                            }}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                            Seçilenlere Gönder ({selectedIds.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors cursor-pointer"
                        >
                            Temizle
                        </button>
                    </div>
                </div>
            )}

            {/* Filter Tabs & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                    {filterCountryOptions.map((opt) => (
                        <button
                            type="button"
                            key={opt.key}
                            onClick={() => setSelectedCountryFilter(opt.key)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                selectedCountryFilter === opt.key
                                    ? "bg-[var(--primary)] text-white"
                                    : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                            }`}
                        >
                            {opt.label} ({opt.count})
                        </button>
                    ))}
                </div>

                <div className="relative w-full lg:w-72">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Firma, e-posta veya sektör ara..."
                        className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                    />
                    <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-4 w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === filteredContacts.length && filteredContacts.length > 0}
                                        onChange={toggleSelectAll}
                                        className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                    />
                                </th>
                                <th className="py-3.5 px-4">Hedef Firma &amp; Sektör</th>
                                <th className="py-3.5 px-4">Ülke</th>
                                <th className="py-3.5 px-4">E-Posta Adresi</th>
                                <th className="py-3.5 px-4">Durum</th>
                                <th className="py-3.5 px-5 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/70 text-sm text-slate-300">
                            {filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-500">
                                        Aramanıza uygun kayıtlı firma bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="py-3.5 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(contact.id)}
                                                onChange={() => toggleSelect(contact.id)}
                                                className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                            />
                                        </td>

                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-white">{contact.name}</span>
                                                {contact.isCustom && (
                                                    <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[10px] font-semibold">
                                                        Özel Eklenen
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-400 mt-0.5">
                                                {contact.category}
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200">
                                                <span className="font-mono font-bold text-blue-400">
                                                    {contact.countryCode}
                                                </span>
                                                <span>{contact.country}</span>
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={`mailto:${contact.email}`}
                                                    className="font-mono text-xs text-blue-400 hover:underline"
                                                >
                                                    {contact.email}
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(contact.email)}
                                                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                                    title="E-postayı Kopyala"
                                                >
                                                    {copiedEmail === contact.email ? (
                                                        <span className="text-[10px] text-emerald-400 font-sans font-semibold">
                                                            Kopyalandı
                                                        </span>
                                                    ) : (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    contact.lastSentAt || contact.status === "delivered"
                                                        ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-300"
                                                        : "bg-slate-800 border border-slate-700 text-slate-300"
                                                }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        contact.lastSentAt || contact.status === "delivered"
                                                            ? "bg-emerald-400"
                                                            : "bg-slate-400"
                                                    }`}
                                                />
                                                {contact.lastSentAt
                                                    ? "Gönderildi"
                                                    : contact.status === "delivered"
                                                    ? "İletildi"
                                                    : "Gönderime Hazır"}
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openPreviewModal(contact)}
                                                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                                                >
                                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <line x1="22" y1="2" x2="11" y2="13" />
                                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                    </svg>
                                                    <span>Önizle &amp; Gönder</span>
                                                </button>

                                                {contact.isCustom && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteCustomContact(contact)}
                                                        className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/25 text-xs font-semibold transition-colors cursor-pointer"
                                                        title="Kaydı Sil"
                                                    >
                                                        Sil
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add New Contact Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                            <div>
                                <h3 className="text-lg font-bold text-white">Yeni Firma / Alıcı Ekle</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Eklediğiniz firmaya anında Türkçe veya İngilizce şablonla mail atabilirsiniz.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {addError && (
                            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium">
                                {addError}
                            </div>
                        )}

                        <form onSubmit={handleAddContact} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    Firma veya Kurum Adı *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newCompany}
                                    onChange={(e) => setNewCompany(e.target.value)}
                                    placeholder="Örn: Müller Fensterbau GmbH"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    E-Posta Adresi *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="info@firma.de"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Ülke
                                    </label>
                                    <select
                                        value={newCountryCode}
                                        onChange={(e) => setNewCountryCode(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-[var(--primary)]"
                                    >
                                        {COUNTRY_OPTIONS.map((c) => (
                                            <option key={c.code} value={c.code}>
                                                {c.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                        Şablon Tipi
                                    </label>
                                    <select
                                        value={newGroup}
                                        onChange={(e) => setNewGroup(e.target.value as "business" | "alevi")}
                                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-[var(--primary)]"
                                    >
                                        <option value="business">B2B Ticari İhracat</option>
                                        <option value="alevi">Kurum / Topluluk</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    Sektör / Kategori
                                </label>
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isAdding}
                                    className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                                >
                                    {isAdding ? "Ekleniyor..." : "Listeye Ekle"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Single Email Preview & Send Modal */}
            {previewContact && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                            <div>
                                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                                    Otomatik SMTP E-Posta Gönderimi
                                </div>
                                <h3 className="text-lg font-bold text-white mt-0.5">
                                    {previewContact.name} ({previewContact.countryCode})
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreviewContact(null)}
                                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Language & Test Controls */}
                        <div className="px-5 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-400">Şablon Dili:</span>
                                <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800">
                                    <button
                                        type="button"
                                        onClick={() => handlePreviewLangChange("tr")}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            previewLang === "tr"
                                                ? "bg-emerald-600 text-white"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        TR Türkçe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePreviewLangChange("en")}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            previewLang === "en"
                                                ? "bg-blue-600 text-white"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        EN English
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isTestMode}
                                    onChange={(e) => setIsTestMode(e.target.checked)}
                                    className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                />
                                <span className="text-amber-300 font-medium">Test Modu (Kendi Mailime Gönder)</span>
                            </label>
                        </div>

                        {/* Meta & Editable Subject */}
                        <div className="px-5 py-3 bg-slate-950/40 border-b border-slate-800 text-xs text-slate-400 space-y-2">
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                <span>
                                    <strong className="text-slate-300">Alıcı:</strong>{" "}
                                    <span className="font-mono text-blue-400">
                                        {isTestMode ? `${sender?.email} (TEST)` : previewContact.email}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-slate-300 font-semibold shrink-0">Konu:</label>
                                <input
                                    type="text"
                                    value={customSubject}
                                    onChange={(e) => setCustomSubject(e.target.value)}
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>
                        </div>

                        {sendSuccessMessage && (
                            <div className="mx-5 mt-4 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                                ✓ {sendSuccessMessage}
                            </div>
                        )}

                        {sendErrorMessage && (
                            <div className="mx-5 mt-4 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold">
                                Hata: {sendErrorMessage}
                            </div>
                        )}

                        {/* Rendered HTML Preview */}
                        <div className="p-5 overflow-y-auto bg-slate-950/30 flex-1">
                            <div
                                className="bg-white text-slate-900 rounded-xl p-6 border border-slate-200 max-w-xl mx-auto font-sans shadow-lg"
                                dangerouslySetInnerHTML={{
                                    __html: getEmailHtml(previewContact, previewLang),
                                }}
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="text-xs text-slate-400">
                                Dil:{" "}
                                <strong className="text-white">
                                    {previewLang === "tr" ? "Türkçe" : "İngilizce"}
                                </strong>
                            </div>

                            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={() => setPreviewContact(null)}
                                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                                >
                                    Kapat
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSendSingleEmail}
                                    disabled={isSending}
                                    className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial cursor-pointer disabled:opacity-50 ${
                                        isTestMode
                                            ? "bg-amber-600 hover:bg-amber-500"
                                            : "bg-emerald-600 hover:bg-emerald-500"
                                    }`}
                                >
                                    {isSending ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Gönderiliyor...</span>
                                        </>
                                    ) : (
                                        <span>
                                            {isTestMode
                                                ? "Test Maili Gönder"
                                                : `${previewLang === "tr" ? "Türkçe" : "İngilizce"} Mail Gönder`}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Send Modal */}
            {isBulkModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Toplu Otomatik E-Posta Gönderimi</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Seçili {selectedIds.length} firmaya Gmail SMTP üzerinden sıralı gönderim
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!bulkSending) setIsBulkModalOpen(false);
                                }}
                                disabled={bulkSending}
                                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                    Gönderim Dili
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setBulkLang("tr")}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                                            bulkLang === "tr"
                                                ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                                                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        TR Türkçe İhracat Şablonu
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setBulkLang("en")}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                                            bulkLang === "en"
                                                ? "bg-blue-600/20 border-blue-500 text-blue-300"
                                                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        EN English Wholesale Template
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={bulkIsTest}
                                    onChange={(e) => setBulkIsTest(e.target.checked)}
                                    className="rounded border-slate-700 cursor-pointer w-4 h-4"
                                />
                                <div>
                                    <div className="font-semibold text-amber-300">Güvenli Test Modu</div>
                                    <div className="text-[11px] text-slate-400">
                                        Mailler alıcılara değil, kendi adresinize ({sender?.email}) gönderilir.
                                    </div>
                                </div>
                            </label>
                        </div>

                        {bulkProgress && (
                            <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400">{bulkProgress.current}</span>
                                    <span className="text-white font-bold">
                                        {bulkProgress.sent} / {bulkProgress.total}
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-300"
                                        style={{ width: `${(bulkProgress.sent / bulkProgress.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {bulkResult && (
                            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                                ✓ Gönderim tamamlandı: {bulkResult.successful} başarılı, {bulkResult.failed} başarısız.
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsBulkModalOpen(false)}
                                disabled={bulkSending}
                                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                            >
                                {bulkResult ? "Kapat" : "İptal"}
                            </button>

                            {!bulkResult && (
                                <button
                                    type="button"
                                    onClick={handleStartBulkSend}
                                    disabled={bulkSending || selectedIds.length === 0}
                                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {bulkSending ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Gönderiliyor...</span>
                                        </>
                                    ) : (
                                        <span>Gönderimi Başlat ({selectedIds.length} Firma)</span>
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
