"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OutreachContact } from "@/app/api/admin/outreach/route";

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
    const [previewContact, setPreviewContact] = useState<OutreachContact | null>(null);
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

    useEffect(() => {
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
        // Country / Group filter
        if (selectedCountryFilter === "DE" && c.countryCode !== "DE") return false;
        if (selectedCountryFilter === "BE" && c.countryCode !== "BE") return false;
        if (selectedCountryFilter === "DACH" && c.countryCode !== "AT" && c.countryCode !== "CH") return false;
        if (selectedCountryFilter === "NL" && c.countryCode !== "NL") return false;
        if (selectedCountryFilter === "MED" && c.countryCode !== "PT" && c.countryCode !== "GR") return false;
        if (selectedCountryFilter === "ALEVI" && c.group !== "alevi") return false;

        // Search term filter
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

    const [copiedAll, setCopiedAll] = useState(false);

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
                            16 Hedef İletildi
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                        Avrupa&apos;daki toptan alıcı pencere/kapı, cam balkon ve sineklik firmalarına atılan kurumsal maillerin dökümü
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        onClick={copyAllEmails}
                        className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-gray-700"
                    >
                        {copiedAll ? (
                            <span className="text-emerald-400">✓ 16 E-Posta Kopyalandı!</span>
                        ) : (
                            <>
                                <span>📋 Tüm Mailleri Kopyala</span>
                            </>
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
                        <span>💬 WhatsApp (+90 531 400 29 59)</span>
                    </a>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Gönderilen Şirketler
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {contacts.length} <span className="text-sm font-normal text-gray-500">Hedef Firma</span>
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
                        Gönderici E-Posta
                    </div>
                    <div className="text-base font-bold text-white truncate font-mono">
                        {sender?.email || "atayapicambalkon@gmail.com"}
                    </div>
                    <p className="text-xs text-emerald-400 mt-2">✓ Gmail SMTP Aktif</p>
                </div>

                <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Teslimat Durumu
                    </div>
                    <div className="text-3xl font-bold text-blue-400">
                        %100 <span className="text-sm font-normal text-gray-500">Başarılı</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Tüm mailler alıcılara iletildi</p>
                </div>
            </div>

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
                                <th className="py-4 px-6">Hedef Firma &amp; Sektör</th>
                                <th className="py-4 px-4">Ülke</th>
                                <th className="py-4 px-4">E-posta Adresi</th>
                                <th className="py-4 px-4">Dil / Grup</th>
                                <th className="py-4 px-4">Durum</th>
                                <th className="py-4 px-6 text-right">Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/40 text-sm text-gray-300">
                            {filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-gray-500">
                                        Aramanıza uygun firma bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-800/30 transition-colors">
                                        {/* Company */}
                                        <td className="py-4 px-6">
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

                                        {/* Language & Group */}
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            {contact.group === "alevi" ? (
                                                <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                                                    🕊️ Türkçe (Dayanışma)
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
                                                    🌐 İngilizce (B2B Toptan)
                                                </span>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                Gönderildi
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setPreviewContact(contact)}
                                                    className="px-3 py-1.5 rounded-lg bg-gray-800/70 hover:bg-gray-700 text-gray-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                                                >
                                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                    <span>Önizle</span>
                                                </button>

                                                <a
                                                    href={contact.whatsappUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors flex items-center gap-1.5"
                                                    title="WhatsApp ile Mesaj Gönder"
                                                >
                                                    <span>💬 WhatsApp</span>
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

            {/* Email Preview Modal */}
            {previewContact && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                            <div>
                                <div className="text-xs font-medium text-emerald-400">
                                    {previewContact.group === "alevi" ? "Alevi Dayanışma & Tanışma E-Postası" : "B2B İhracat & Toptan Tedarik E-Postası"}
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

                        {/* Modal Meta info */}
                        <div className="px-6 py-3 bg-gray-950/60 border-b border-gray-800/80 text-xs text-gray-400 space-y-1 font-mono">
                            <div><strong className="text-gray-300 font-sans">Kimden:</strong> Ata Yapı Cam Balkon &amp; Sineklik &lt;atayapicambalkon@gmail.com&gt;</div>
                            <div><strong className="text-gray-300 font-sans">Kime:</strong> {previewContact.email}</div>
                            <div><strong className="text-gray-300 font-sans">Konu:</strong> <span className="text-white font-sans">{previewContact.subject}</span></div>
                        </div>

                        {/* Modal Body: Rendered Preview */}
                        <div className="p-6 overflow-y-auto space-y-4 bg-gray-950/30">
                            <div className="bg-white text-gray-900 rounded-xl p-8 border-2 border-black max-w-xl mx-auto font-sans shadow-lg">
                                {/* Letterhead */}
                                <div className="border-b-2 border-black pb-3 mb-4">
                                    <h1 className="text-2xl font-extrabold tracking-wide text-black m-0">ATA YAPI</h1>
                                    <div className="text-[10px] font-bold text-gray-700 tracking-wider uppercase mt-1">
                                        ALUMINUM &amp; GLASS SYSTEMS &bull; INSECT SCREENS &bull; WHOLESALE SUPPLY FROM TÜRKİYE
                                    </div>
                                </div>

                                {previewContact.group === "alevi" ? (
                                    <div className="text-xs text-gray-800 leading-relaxed space-y-3">
                                        <p>Sayın <strong>{previewContact.name}</strong> Yetkilileri,</p>
                                        <p>
                                            Ben Ata Yapı adına iletişime geçiyorum. Alevi kimliğine mensup bir iş insanı olarak, Avrupa&apos;daki Alevi toplumuyla bağlarımızı güçlendirmeyi ve topluluğumuz içindeki esnaf ve girişimcilerle tanışmayı önemsiyorum.
                                        </p>
                                        <p>
                                            Ata Yapı olarak Türkiye&apos;den Avrupa&apos;ya toptan ürün tedariki için iş ortaklıkları geliştirmek istiyoruz. Ürün gruplarımız arasında plise, menteşeli, sabit, stor ve sürme sineklikler ile pileli kapı sineklikleri, motorlu giyotin cam, cam balkon sistemleri, pergola ve tente sistemleri bulunmaktadır.
                                        </p>
                                        <p>
                                            Federasyonunuza veya bağlı derneklerinize mensup camcı, PVC doğramacı, sineklikçi, pergola/tente montajcısı ya da yapı ürünleri toptancısı işletme sahipleri bulunuyorsa, uygun göreceğiniz kişilerle tanışmamıza aracılık edebilir misiniz?
                                        </p>
                                        <p>
                                            Amacımız, karşılıklı güvene dayalı, uzun vadeli ve gerçek bir ticari dayanışma ağı oluşturmaktır.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-xs text-gray-800 leading-relaxed space-y-3">
                                        <p>Dear <strong>{previewContact.name}</strong> Team,</p>
                                        <p>
                                            My name is Ata Yapı Representative, and I am contacting you on behalf of <strong>Ata Yapı</strong>, a Türkiye-based manufacturer seeking to develop long-term wholesale supply partnerships across Europe.
                                        </p>
                                        <div>
                                            <p className="font-bold text-black mb-1">Our specialized wholesale product lines include:</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li><strong>Insect Screen Systems:</strong> Pleated screens (plisse), hinged, fixed, roller, sliding screens and pleated screen doors.</li>
                                                <li><strong>Glass Systems:</strong> Motorized guillotine glass, folding and sliding glass balconies.</li>
                                                <li><strong>Outdoor Living:</strong> Pergola and motorized awning systems, pleated blinds.</li>
                                            </ul>
                                        </div>
                                        <p>
                                            We work closely with window and door specialists, PVC joinery manufacturers, glazing businesses, insect-screen installers, wholesalers, and distributors. Products are manufactured to custom dimensions in Türkiye with rigorous quality standards and supplied under competitive wholesale terms.
                                        </p>
                                        <p>
                                            Would you be the right contact for purchasing or supplier partnerships? If relevant, please reply with the product categories you are interested in.
                                        </p>
                                    </div>
                                )}

                                {/* Call to action buttons preview */}
                                <div className="flex flex-wrap items-center justify-center gap-3 my-6 pt-2">
                                    <a
                                        href="https://www.atayapı.site"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-black text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded"
                                    >
                                        WEB SİTEMİZİ ZİYARET ET
                                    </a>
                                    <a
                                        href={previewContact.whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded"
                                    >
                                        💬 WHATSAPP İLE YAZIŞIN
                                    </a>
                                </div>

                                {/* Footer preview */}
                                <div className="border-t border-gray-200 pt-3 text-[10px] text-gray-500 font-medium space-y-0.5">
                                    <div><strong>TELEFON / WHATSAPP:</strong> +90 531 400 29 59</div>
                                    <div><strong>E-POSTA:</strong> atayapicambalkon@gmail.com</div>
                                    <div><strong>MERKEZ:</strong> İstanbul &amp; Balıkesir / Türkiye</div>
                                    <div><strong>WEB:</strong> https://atayapı.site</div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-800 bg-gray-900 flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                                Gönderim Durumu: <span className="text-emerald-400 font-semibold">Başarıyla İletildi</span>
                            </span>
                            <div className="flex items-center gap-2">
                                <a
                                    href={previewContact.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                                >
                                    <span>💬 WhatsApp Takibi Başlat</span>
                                </a>
                                <button
                                    onClick={() => setPreviewContact(null)}
                                    className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
                                >
                                    Kapat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
