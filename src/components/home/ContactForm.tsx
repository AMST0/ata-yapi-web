"use client";

import { useState } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            service: formData.get("service"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Mesaj gönderilemedi");

            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMessage("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
    }

    if (status === "success") {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mesajınız Alındı!</h3>
                <p className="text-gray-600 mb-6">En kısa sürede size geri dönüş yapacağız.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-[var(--primary)] font-semibold hover:underline"
                >
                    Yeni Mesaj Gönder
                </button>
            </div>
        );
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition"
                    placeholder="Adınız Soyadınız"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition"
                    placeholder="0532 XXX XX XX"
                />
            </div>
            <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Hizmet</label>
                <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition appearance-none bg-white"
                >
                    <option value="">Seçiniz</option>
                    <option value="cam-balkon">Cam Balkon</option>
                    <option value="sineklik">Sineklik</option>
                    <option value="tente">Tente</option>
                    <option value="diger">Diğer</option>
                </select>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition resize-none"
                    placeholder="Mesajınız..."
                />
            </div>

            {status === "error" && (
                <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="btn-press w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-4 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {status === "loading" ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Gönderiliyor...
                    </>
                ) : "Gönder"}
            </button>
        </form>
    );
}
