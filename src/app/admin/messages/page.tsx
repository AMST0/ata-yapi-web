"use client";

import { useState, useEffect } from "react";

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

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await fetch('/api/messages');
                if (!res.ok) throw new Error('Failed to fetch messages');
                const data = await res.json();
                setMessages(data.messages || []);
                setUnreadCount(data.unreadCount || 0);
            } catch (err) {
                setError('Mesajlar yüklenirken hata oluştu');
            } finally {
                setIsLoading(false);
            }
        }

        fetchMessages();
    }, []);

    const markAsRead = async (id: number) => {
        try {
            await fetch('/api/messages', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, read: true } : m))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (err) {
            // Failed to mark as read
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Mesajlar yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                    <p className="text-red-400">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                        Tekrar Dene
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Mesajlar</h1>
                {unreadCount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        {unreadCount} okunmamış
                    </span>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Message List */}
                <div className="lg:col-span-2 space-y-3">
                    {messages.length === 0 ? (
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center text-gray-500">
                            Henüz mesaj yok
                        </div>
                    ) : (
                        messages
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((message) => (
                                <div
                                    key={message.id}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        if (!message.read) markAsRead(message.id);
                                    }}
                                    className={`p-4 rounded-xl border cursor-pointer transition-colors ${selectedMessage?.id === message.id
                                        ? "bg-gray-700 border-[var(--primary)]"
                                        : message.read
                                            ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                                            : "bg-gray-800 border-gray-700 hover:border-gray-600"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {!message.read && (
                                                <span className="w-2 h-2 bg-[var(--primary)] rounded-full" />
                                            )}
                                            <span className="font-medium text-white">{message.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {new Date(message.createdAt).toLocaleDateString("tr-TR")}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-400 mb-2">{message.service || 'Genel'}</div>
                                    <p className="text-gray-300 text-sm line-clamp-2">{message.message || '-'}</p>
                                </div>
                            ))
                    )}
                </div>

                {/* Message Detail */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    {selectedMessage ? (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white">{selectedMessage.name}</h2>
                                <span className={`px-2 py-1 rounded text-xs ${selectedMessage.read ? "bg-gray-700 text-gray-400" : "bg-green-500/20 text-green-400"
                                    }`}>
                                    {selectedMessage.read ? "Okundu" : "Yeni"}
                                </span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Telefon</span>
                                    <a href={`tel:${selectedMessage.phone}`} className="text-[var(--primary)] text-sm">
                                        {selectedMessage.phone}
                                    </a>
                                </div>
                                {selectedMessage.email && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-sm">E-posta</span>
                                        <a href={`mailto:${selectedMessage.email}`} className="text-[var(--primary)] text-sm">
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Hizmet</span>
                                    <span className="text-white text-sm">{selectedMessage.service || 'Genel'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Tarih</span>
                                    <span className="text-white text-sm">
                                        {new Date(selectedMessage.createdAt).toLocaleString("tr-TR")}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                                <div className="text-sm text-gray-400 mb-2">Mesaj</div>
                                <p className="text-white">{selectedMessage.message || '-'}</p>
                            </div>

                            <div className="flex gap-3">
                                <a
                                    href={`tel:${selectedMessage.phone}`}
                                    className="flex-1 bg-[var(--primary)] text-white py-2 rounded-lg text-center font-medium hover:bg-[var(--primary-dark)] transition-colors"
                                >
                                    Ara
                                </a>
                                <a
                                    href={`https://wa.me/90${selectedMessage.phone.replace(/\D/g, "").slice(-10)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-[var(--accent)] text-white py-2 rounded-lg text-center font-medium hover:bg-[var(--accent-dark)] transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Detayları görmek için bir mesaj seçin
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
