import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "İletişim | Ata Yapı Maltepe",
    description: "Ata Yapı ile iletişime geçin. Ücretsiz keşif randevusu alın.",
};

export default function IletisimPage() {
    return (
        <>
            <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="container">
                    <div className="max-w-2xl">
                        <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3 block">İletişim</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Bizimle <span className="text-[var(--primary)]">İletişime Geçin</span>
                        </h1>
                        <p className="text-lg text-gray-300">
                            Ücretsiz keşif randevusu almak veya sorularınız için bize ulaşın.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>İletişim Formu</h2>
                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition" placeholder="Adınız Soyadınız" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                                    <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition" placeholder="0532 XXX XX XX" />
                                </div>
                                <div>
                                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Hizmet</label>
                                    <select id="service" name="service" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition">
                                        <option value="">Seçiniz</option>
                                        <option value="cam-balkon">Cam Balkon</option>
                                        <option value="sineklik">Sineklik</option>
                                        <option value="tente">Tente</option>
                                        <option value="diger">Diğer</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
                                    <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition resize-none" placeholder="Mesajınız..." />
                                </div>
                                <button type="submit" className="btn-press w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-4 rounded-xl font-semibold transition-colors">
                                    Gönder
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>İletişim Bilgileri</h2>
                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Adres</div>
                                        <div className="text-gray-600">Girne, Meriç Sk. No:13, 34852 Maltepe/İstanbul</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Telefon</div>
                                        <a href="tel:+905314002959" className="text-gray-600 hover:text-[var(--primary)]">0531 400 29 59</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Çalışma Saatleri</div>
                                        <div className="text-gray-600">Pzt - Cmt: 09:00 - 19:00</div>
                                    </div>
                                </div>
                            </div>

                            <a href="https://wa.me/905314002959?text=Merhaba, bilgi almak istiyorum." target="_blank" rel="noopener noreferrer" className="btn-press flex items-center justify-center gap-2 w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white py-4 rounded-xl font-semibold transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                WhatsApp ile Ulaşın
                            </a>

                            {/* Map */}
                            <div className="mt-8 rounded-2xl overflow-hidden h-64">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.5!2d29.13!3d40.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGirne%2C%20Meri%C3%A7%20Sk.%20No%3A13%2C%2034852%20Maltepe%2F%C4%B0stanbul!5e0!3m2!1str!2str"
                                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Ata Yapı Konum - Girne, Meriç Sk. No:13, Maltepe"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
