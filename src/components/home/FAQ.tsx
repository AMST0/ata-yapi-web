"use client";

import { useState } from "react";

const faqItems = [
    {
        question: "Cam balkon fiyatları nasıl belirleniyor?",
        answer:
            "Cam balkon fiyatları; balkon ölçüleri, tercih edilen sistem (katlanır veya sürme), cam tipi, aksesuar seçenekleri ve montaj koşullarına göre belirlenir. Yerinde ücretsiz keşif sonrası size özel fiyat teklifi sunuyoruz.",
    },
    {
        question: "Cam balkon montajı ne kadar sürer?",
        answer:
            "Standart bir cam balkon montajı genellikle 1 iş günü içinde tamamlanır. Ancak balkon boyutu ve sistem karmaşıklığına göre bu süre değişebilir.",
    },
    {
        question: "Cam balkon garantisi ne kadar?",
        answer:
            "Tüm cam balkon sistemlerimiz 2 yıl üretici garantisi kapsamındadır. Ayrıca montaj sonrası teknik destek hizmetimiz devam eder.",
    },
    {
        question: "Sineklik sistemlerinde hangi modeller var?",
        answer:
            "Plise (akordiyon) sineklik, menteşeli kapı sineliği, sürme sineklik ve stor sineklik modellerimiz mevcuttur. Her pencere ve kapı tipine uygun çözümler sunuyoruz.",
    },
    {
        question: "Tente sistemleri motorlu mu?",
        answer:
            "Hem manuel hem de motorlu tente sistemleri sunuyoruz. Motorlu sistemler uzaktan kumanda ile kontrol edilebilir ve opsiyonel olarak güneş/rüzgar sensörü eklenebilir.",
    },
    {
        question: "Ücretsiz keşif nasıl talep edebilirim?",
        answer:
            "Web sitemizden form doldurarak, WhatsApp'tan mesaj atarak veya direkt telefonla arayarak ücretsiz keşif randevusu alabilirsiniz. Uzman ekibimiz size uygun zamanda adresinize gelir.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="container">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
                            SSS
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                            Sıkça Sorulan Sorular
                        </h2>
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900">
                                        {item.question}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                                        }`}
                                >
                                    <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
