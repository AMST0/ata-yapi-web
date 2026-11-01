"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Message {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    service: string | null;
    message: string | null;
    read: boolean;
    createdAt: string;
}

function formatWhatsAppPhone(phone: string): string {
    const raw = phone.replace(/\D/g, "");
    if (raw.startsWith("00")) return raw.slice(2);
    if (raw.startsWith("0")) return "90" + raw.slice(1);
    if (raw.length === 10) return "90" + raw;
    return raw;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [filterTab, setFilterTab] = useState<"all" | "unread">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await fetch("/api/messages", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch messages");
                const data = await res.json();
                const list: Message[] = data.messages || [];
                setMessages(list);
                setUnreadCount(Number(data.unreadCount) || 0);
            } catch {
                setError("Mesajlar yüklenirken hata oluştu.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchMessages();
    }, []);

    const markAsRead = async (id: number) => {
        try {
            const res = await fetch("/api/messages", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) return;
            setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, read: true } : m))
            );
            setSelectedMessage((prev) => (prev && prev.id === id ? { ...prev, read: true } : prev));
            setUnreadCount((prev) => Math.max(0, prev - 1));
            window.dispatchEvent(new Event("admin-counts-updated"));
        } catch {
            // Silent ignore
        }
    };

    const handleDeleteMessage = async (msg: Message) => {
        const confirmed = window.confirm(
            `${msg.name} adlı müşteriye ait mesajı kalıcı olarak silmek istediğinize emin misiniz?`
        );
        if (!confirmed) return;

        setDeletingId(msg.id);
        try {
            const res = await fetch(`/api/messages?id=${msg.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                if (!msg.read) {
                    setUnreadCount((prev) => Math.max(0, prev - 1));
                }
                if (selectedMessage?.id === msg.id) {
                    setSelectedMessage(null);
                }
                window.dispatchEvent(new Event("admin-counts-updated"));
            }
        } catch (err) {
            console.error("Delete message error:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const filteredMessages = useMemo(() => {
        return [...messages]
            .filter((m) => {
                if (filterTab === "unread" && m.read) return false;
                if (searchQuery.trim()) {
                    const q = searchQuery.toLowerCase();
                    return (
                        m.name.toLowerCase().includes(q) ||
                        m.phone.toLowerCase().includes(q) ||
                        (m.email?.toLowerCase() || "").includes(q) ||
                        (m.service?.toLowerCase() || "").includes(q) ||
                        (m.message?.toLowerCase() || "").includes(q)
                    );
                }
                return true;
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [messages, filterTab, searchQuery]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Mesajlar yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                    <p className="text-red-400 text-sm">{error}</p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Tekrar Dene
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1
                            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Müşteri Mesajları
                        </h1>
                        {unreadCount > 0 && (
                            <span className="bg-[var(--primary)] text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                                {unreadCount} yeni
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-400 mt-1">
                        Web sitesi iletişim ve keşif formlarından gelen müşteri talepleri.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setFilterTab("all")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            filterTab === "all"
                                ? "bg-[var(--primary)] text-white"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        Tümü ({messages.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilterTab("unread")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            filterTab === "unread"
                                ? "bg-[var(--primary)] text-white"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        Okunmamış ({unreadCount})
                    </button>
                </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="İsim, telefon, hizmet veya mesaj içeriği ara..."
                    className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)]"
                />
                <svg
                    className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
                {/* Message List */}
                <div className="lg:col-span-7 space-y-2.5">
                    {filteredMessages.length === 0 ? (
                        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-10 text-center text-slate-500 text-sm">
                            {messages.length === 0
                                ? "Henüz gelen mesaj bulunmuyor."
                                : "Arama veya filtre kriterlerine uygun mesaj bulunamadı."}
                        </div>
                    ) : (
                        filteredMessages.map((message) => {
                            const isSelected = selectedMessage?.id === message.id;
                            return (
                                <div
                                    key={message.id}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        if (!message.read) markAsRead(message.id);
                                    }}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                        isSelected
                                            ? "bg-slate-800/90 border-[var(--primary)] shadow-lg"
                                            : !message.read
                                            ? "bg-slate-900 border-slate-700 hover:border-slate-600"
                                            : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-1.5">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {!message.read && (
                                                <span className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full shrink-0" />
                                            )}
                                            <span className="font-semibold text-white truncate">
                                                {message.name}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium shrink-0">
                                                {message.service || "Genel"}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-500 shrink-0">
                                            {new Date(message.createdAt).toLocaleDateString("tr-TR")}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-400 font-mono mb-1.5">
                                        {message.phone} {message.email ? `• ${message.email}` : ""}
                                    </div>
                                    <p className="text-slate-300 text-sm line-clamp-2">
                                        {message.message || "Mesaj notu belirtilmedi."}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Message Detail Card */}
                <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 lg:sticky lg:top-24">
                    {selectedMessage ? (
                        <div>
                            <div className="flex items-start justify-between gap-3 pb-4 mb-5 border-b border-slate-800">
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {selectedMessage.name}
                                    </h2>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {new Date(selectedMessage.createdAt).toLocaleString("tr-TR")}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteMessage(selectedMessage)}
                                    disabled={deletingId === selectedMessage.id}
                                    className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-300 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    {deletingId === selectedMessage.id ? "Siliniyor..." : "Mesajı Sil"}
                                </button>
                            </div>

                            <div className="space-y-3 mb-5 text-sm">
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                                    <span className="text-slate-400">Telefon</span>
                                    <a
                                        href={`tel:${selectedMessage.phone}`}
                                        className="text-white font-mono font-semibold hover:text-[var(--primary)]"
                                    >
                                        {selectedMessage.phone}
                                    </a>
                                </div>
                                {selectedMessage.email && (
                                    <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60 gap-3">
                                        <span className="text-slate-400 shrink-0">E-posta</span>
                                        <a
                                            href={`mailto:${selectedMessage.email}`}
                                            className="text-blue-400 font-mono text-xs truncate hover:underline"
                                        >
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                                    <span className="text-slate-400">İlgilendiği Sistem</span>
                                    <span className="text-white font-medium">
                                        {selectedMessage.service || "Genel Danışma"}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 mb-6">
                                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                    Müşteri Notu
                                </div>
                                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                                    {selectedMessage.message || "Müşteri ek mesaj bırakmadı."}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <a
                                    href={`tel:${selectedMessage.phone}`}
                                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm font-semibold transition-colors"
                                >
                                    Telefonla Ara
                                </a>
                                <a
                                    href={`https://wa.me/${formatWhatsAppPhone(
                                        selectedMessage.phone
                                    )}?text=${encodeURIComponent(
                                        `Merhaba ${selectedMessage.name}, Ata Yapı'ya ilettiğiniz ${
                                            selectedMessage.service || "keşif ve fiyat"
                                        } talebiniz için dönüş yapıyoruz.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-dark)] text-white py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm font-semibold transition-colors"
                                >
                                    WhatsApp Yanıtla
                                </a>
                            </div>

                            <Link
                                href="/teklif"
                                target="_blank"
                                className="block w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-center text-xs font-semibold transition-colors"
                            >
                                Bu Müşteri İçin PDF Teklif Hazırla →
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 py-12 text-sm">
                            Detayları görüntülemek ve yanıtlamak için soldaki listeden bir mesaj seçin.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
