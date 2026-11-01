"use client";

export default function JsonLd() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Ata Yapı",
        "description": "Giyotin cam sistemleri, teleskopik garaj, cam balkon, sineklik, tente ve pimapen çözümlerinde ölçüye özel üretim, profesyonel montaj ve ücretsiz keşif. Balıkesir, İzmir, Çanakkale ve İstanbul genelinde hizmet. Bayi ve kurumsal satış.",
        "image": "https://www.xn--atayap-u9a.site/logo.png",
        "@id": "https://www.xn--atayap-u9a.site",
        "url": "https://www.xn--atayap-u9a.site",
        "telephone": "+905314002959",
        "priceRange": "₺₺",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Girne, Meriç Sk. No:13",
            "addressLocality": "Maltepe",
            "addressRegion": "İstanbul",
            "postalCode": "34852",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.93,
            "longitude": 29.13
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:00",
                "closes": "19:00"
            }
        ],
        "sameAs": [
            "https://wa.me/905314002959"
        ],
        "areaServed": [
            {
                "@type": "City",
                "name": "Balıkesir"
            },
            {
                "@type": "City",
                "name": "Edremit, Balıkesir"
            },
            {
                "@type": "City",
                "name": "Altınoluk, Balıkesir"
            },
            {
                "@type": "City",
                "name": "Akçay, Balıkesir"
            },
            {
                "@type": "City",
                "name": "İzmir"
            },
            {
                "@type": "City",
                "name": "Çanakkale"
            },
            {
                "@type": "City",
                "name": "Maltepe, İstanbul"
            },
            {
                "@type": "City",
                "name": "Kartal, İstanbul"
            },
            {
                "@type": "City",
                "name": "Pendik, İstanbul"
            },
            {
                "@type": "City",
                "name": "Kadıköy, İstanbul"
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Hizmetlerimiz",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Giyotin Cam Sistemleri",
                        "description": "Giyotin cam balkon, motorlu giyotin sistem, dikey sürgülü cam, giyotin cam teras ve kış bahçesi çözümleri. Ticari ve konut tipi uygulamalar."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Teleskopik Garaj Sistemleri",
                        "description": "Teleskopik açılır kapanır garaj, katlanır garaj sistemi, araç koruma çözümleri. Projeye özel malzeme ve sistem seçenekleri."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Cam Balkon Sistemleri",
                        "description": "Katlanır cam balkon, sürme cam balkon, ısı camlı cam balkon sistemleri"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Sineklik Sistemleri",
                        "description": "Pileli sineklik, menteşeli sineklik ve kedi sineklik sistemleri"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Tente Sistemleri",
                        "description": "Mafsallı tente, kasetli tente ve motorlu tente sistemleri"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Pimapen Tamir",
                        "description": "PVC pencere ve pimapen tamir, bakım ve onarım hizmetleri"
                    }
                }
            ]
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ata Yapı",
        "url": "https://www.xn--atayap-u9a.site",
        "logo": "https://www.xn--atayap-u9a.site/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-531-400-2959",
            "contactType": "customer service",
            "areaServed": "TR",
            "availableLanguage": "Turkish"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ata Yapı",
        "url": "https://www.xn--atayap-u9a.site",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.xn--atayap-u9a.site/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
