"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export default function ContactForm() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
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
        } catch {
            setStatus("error");
            setErrorMessage(t.contact.form_error);
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.contact.form_success}</h3>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-[var(--primary)] font-semibold hover:underline mt-4 inline-block"
                >
                    {t.common.back}
                </button>
            </div>
        );
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.form_name} *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition"
                    placeholder={t.contact.form_name}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.contact.form_phone} *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition"
                        placeholder="+90 / +49 ..."
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.contact.form_email}
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition"
                        placeholder="info@example.com"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.form_service}
                </label>
                <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition appearance-none bg-white"
                >
                    <option value="">{t.contact.form_service_select}</option>
                    <option value="giyotin-cam">{t.nav.giyotin_cam}</option>
                    <option value="cam-balkon">{t.nav.cam_balkon}</option>
                    <option value="sineklik">{t.nav.sineklik}</option>
                    <option value="tente">{t.nav.tente}</option>
                    <option value="bayi-b2b">{t.nav.bayi_kurumsal}</option>
                </select>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.form_message}
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition resize-none"
                    placeholder={t.contact.form_message}
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
                        {t.contact.form_submitting}
                    </>
                ) : (
                    t.contact.form_submit
                )}
            </button>
        </form>
    );
}
