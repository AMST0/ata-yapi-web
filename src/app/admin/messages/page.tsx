"use client";

import { useState, useMemo } from "react";
import { generateMockMessages, Message } from "@/lib/visitor-store";

export default function MessagesPage() {
    const initialMessages = useMemo(() => generateMockMessages(), []);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const markAsRead = (id: string) => {
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, read: true } : m))
        );
    };

    const unreadCount = messages.filter((m) => !m.read).length;

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
                                    <div className="text-sm text-gray-400 mb-2">{message.service}</div>
                                    <p className="text-gray-300 text-sm line-clamp-2">{message.message}</p>
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
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Hizmet</span>
                                    <span className="text-white text-sm">{selectedMessage.service}</span>
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
                                <p className="text-white">{selectedMessage.message}</p>
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
