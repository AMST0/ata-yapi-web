"use client";

export default function JsonLd() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Ata Yapı Maltepe",
        "description": "Maltepe'de cam balkon, sineklik, tente, pimapen montajı ve tamiri, giyotin cam balkon ve silinebilir cam sistemlerinde ölçüye özel üretim ve ücretsiz keşif sunar.",
        "image": "https://www.atayapi.site/logo.png",
        "@id": "https://www.atayapi.site",
        "url": "https://www.atayapi.site",
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
                        "name": "Cam Balkon Sistemleri",
                        "description": "Katlanır cam balkon, sürme cam balkon, giyotin cam balkon, silinebilir cam balkon ve ısı camlı cam balkon sistemleri"
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
        "url": "https://www.atayapi.site",
        "logo": "https://www.atayapi.site/logo.png",
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
        "url": "https://www.atayapi.site",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.atayapi.site/?q={search_term_string}",
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
