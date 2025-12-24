import type { FAQ } from '@/data/districts';

interface FAQSectionProps {
    title: string;
    faqs: FAQ[];
}

/**
 * FAQ Section component with JSON-LD structured data for Google rich results
 */
export default function FAQSection({ title, faqs }: FAQSectionProps) {
    // Generate FAQ JSON-LD schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <section className="py-16 lg:py-20 bg-white">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="container">
                <div className="max-w-3xl mx-auto">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {title}
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-gray-50 rounded-xl overflow-hidden"
                            >
                                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                                    <span>{faq.question}</span>
                                    <svg
                                        className="w-5 h-5 text-gray-500 shrink-0 transition-transform group-open:rotate-180"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
