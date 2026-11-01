"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { CheckIcon, ArrowRightIcon } from "@/components/icons/ArchitecturalIcons";

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
      company_website: formData.get("company_website"),
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setErrorMessage(t.contact.form_error);
    }
  }

  if (status === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
        <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{t.contact.form_success}</h3>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm text-[var(--primary)] font-semibold hover:underline mt-3 inline-block"
        >
          {t.common.back}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Hidden Honeypot Anti-Spam Trap */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          {t.contact.form_name} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={120}
          className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition"
          placeholder={t.contact.form_name}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            {t.contact.form_phone} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            maxLength={40}
            className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition"
            placeholder="+90 / +49 ..."
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            {t.contact.form_email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength={160}
            className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition"
            placeholder="info@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          {t.contact.form_service}
        </label>
        <div className="relative">
          <select
            id="service"
            name="service"
            className="w-full px-4 py-3 pr-10 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition appearance-none"
          >
            <option value="">{t.contact.form_service_select}</option>
            <option value="giyotin-cam">{t.nav.giyotin_cam}</option>
            <option value="cam-balkon">{t.nav.cam_balkon}</option>
            <option value="sineklik">{t.nav.sineklik}</option>
            <option value="tente">{t.nav.tente}</option>
            <option value="pimapen-tamir">{t.nav.pimapen_tamir}</option>
            <option value="bayi-b2b">{t.nav.bayi_kurumsal}</option>
          </select>
          <svg
            className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          {t.contact.form_message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2500}
          className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition resize-none"
          placeholder={t.contact.form_message}
        />
      </div>

      {status === "error" && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-press w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3.5 px-6 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
      >
        {status === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{t.contact.form_submitting}</span>
          </>
        ) : (
          <>
            <span>{t.contact.form_submit}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
