"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) {
            setError("Lütfen yönetici şifresini giriniz.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.replace("/admin");
                router.refresh();
            } else {
                setError(data.error || "Girdiğiniz şifre hatalı.");
            }
        } catch (err) {
            console.error("Login request error:", err);
            setError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0f19] arch-grid-dark flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[320px] bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-slate-900/85 backdrop-blur-2xl border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/70">
                    {/* Brand Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0b0f19] border border-slate-800 shadow-inner mb-4">
                            <Image
                                src="/logo.png"
                                alt="Ata Yapı"
                                width={34}
                                height={34}
                                className="brightness-0 invert object-contain"
                            />
                        </div>
                        <h1
                            className="text-2xl font-bold text-white tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            ATA YAPI
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Kurumsal Yönetim &amp; İhracat Portalı
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Şifreli Oturum Koruması (HMAC)
                        </div>
                    </div>

                    {/* Error Notice */}
                    {error && (
                        <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                            <svg
                                className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <p className="text-sm text-red-300 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="admin-password"
                                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                            >
                                Yönetici Şifresi
                            </label>
                            <div className="relative">
                                <input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    autoFocus
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3.5 pr-12 rounded-xl bg-[#0b0f19] border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all font-mono text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1 cursor-pointer"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] active:scale-[0.99] text-white font-semibold shadow-lg shadow-red-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Doğrulanıyor...</span>
                                </>
                            ) : (
                                <>
                                    <span>Yönetim Paneline Giriş</span>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
                        <p className="text-xs text-slate-500">
                            Yetkisiz erişime karşı sunucu taraflı oturum doğrulaması aktiftir.
                        </p>
                    </div>
                </div>

                {/* Back to site */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span>Ana Sayfaya Dön</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
