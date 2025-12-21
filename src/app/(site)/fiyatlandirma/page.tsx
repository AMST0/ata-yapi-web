import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Fiyatlandırma | Ata Yapı Maltepe",
    description: "Cam balkon, sineklik ve tente fiyatları. Ölçüye özel üretim ile projenize uygun fiyat teklifi alın.",
};

const factors = [
    { title: "Ölçüler", description: "Genişlik, yükseklik ve toplam alan fiyatı etkiler." },
    { title: "Sistem Tipi", description: "Katlanır, sürme veya özel sistemler farklı fiyattadır." },
    { title: "Cam Kalınlığı", description: "8mm, 10mm veya özel cam seçenekleri." },
    { title: "Aksesuar", description: "Kilit, kol, sürgü gibi ek maliyetler." },
    { title: "Montaj", description: "Kat yüksekliği ve zorluk fiyatı etkiler." },
    { title: "Profil Rengi", description: "Özel renk seçenekleri ek maliyet olabilir." },
];

export default function FiyatlandirmaPage() {
    return (
        <>
            <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-2xl">
                        <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3 block">Fiyatlandırma</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Şeffaf <span className="text-[var(--primary)]">Fiyatlandırma</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8">
                            Her proje benzersizdir. Size özel ölçülendirme sonrası net fiyat teklifi sunuyoruz.
                        </p>
                        <Link href="/iletisim" className="btn-press bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-semibold">
                            Ücretsiz Teklif Alın
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Neden Sabit Fiyat Listesi Yok?</h2>
                        <p className="text-gray-600">
                            Cam balkon, sineklik ve tente sistemleri <strong>ölçüye özel üretilir</strong>. Her balkon farklı boyut ve özelliklere sahiptir.
                            Bu nedenle doğru fiyat için mutlaka yerinde ölçüm gereklidir.
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-8 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">📏 Ücretsiz Keşif Hizmeti</h3>
                        <p className="text-gray-600 mb-6">Ekibimiz adresinize gelir, ölçüm yapar ve size özel net fiyat teklifi sunar. <strong>Tamamen ücretsiz.</strong></p>
                        <Link href="/iletisim" className="btn-press bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-medium">Keşif Talep Et</Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center" style={{ fontFamily: 'var(--font-heading)' }}>Fiyatı Etkileyen Faktörler</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {factors.map((f, i) => (
                            <div key={i} className="card-hover p-6 bg-white rounded-2xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-gray-600 text-sm">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-[var(--primary)]">
                <div className="container text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Projeniz İçin Fiyat Almak İster misiniz?</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/iletisim" className="btn-press bg-white text-[var(--primary)] px-8 py-4 rounded-xl font-semibold">İletişim Formu</Link>
                        <a href="https://wa.me/905XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="btn-press bg-[var(--accent)] text-white px-8 py-4 rounded-xl font-semibold">WhatsApp</a>
                    </div>
                </div>
            </section>
        </>
    );
}
