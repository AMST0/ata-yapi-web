"use client";

export default function JsonLd() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Ata Yapı",
        "description": "Motorlu giyotin cam sistemleri, ısıcamlı cam balkon, plise sineklik, kasetli tente ve PVC doğrama çözümlerinde ölçüye özel üretim, profesyonel montaj ve B2B ihracat tedariği.",
        "image": "https://www.xn--atayap-u9a.site/giyotin-cam-hero.jpg",
        "@id": "https://www.xn--atayap-u9a.site",
        "url": "https://www.xn--atayap-u9a.site",
        "telephone": "+905314002959",
        "email": "atayapicambalkon@gmail.com",
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
            "latitude": 40.9465,
            "longitude": 29.1384
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:30",
                "closes": "19:00"
            }
        ],
        "sameAs": [
            "https://wa.me/905314002959"
        ],
        "areaServed": [
            { "@type": "City", "name": "Maltepe, İstanbul" },
            { "@type": "City", "name": "Kartal, İstanbul" },
            { "@type": "City", "name": "Pendik, İstanbul" },
            { "@type": "City", "name": "Kadıköy, İstanbul" },
            { "@type": "City", "name": "Ataşehir, İstanbul" },
            { "@type": "City", "name": "Balıkesir" },
            { "@type": "City", "name": "Edremit, Balıkesir" },
            { "@type": "City", "name": "Altınoluk, Balıkesir" },
            { "@type": "City", "name": "Akçay, Balıkesir" },
            { "@type": "City", "name": "İzmir" },
            { "@type": "City", "name": "Çanakkale" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Mimari Cam ve Alüminyum Sistemleri",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Giyotin Cam Sistemleri",
                        "description": "Motorlu giyotin cam balkon, dikey sürgülü küpeşte cam, teras ve restoran cephe kapatma sistemleri."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Cam Balkon Sistemleri",
                        "description": "Isıcamlı cam balkon, katlanır cam balkon ve eşiksiz sürme cam balkon sistemleri."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Sineklik Sistemleri",
                        "description": "Pileli (plise) sineklik, menteşeli sineklik ve çelik tüllü kedi sinekliği imalatı."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Tente ve Gölgelendirme Sistemleri",
                        "description": "Tam kasetli tente, mafsallı tente ve sensörlü motorlu tente sistemleri."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "PVC Doğrama & Pimapen Tamiri",
                        "description": "PVC pencere ve kapı mekanizma onarımı, fitil ve çift açılım dönüşümü."
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
            "email": "atayapicambalkon@gmail.com",
            "contactType": "customer service",
            "areaServed": ["TR", "DE", "BE", "NL", "AT", "CH"],
            "availableLanguage": ["Turkish", "English", "German"]
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ata Yapı",
        "url": "https://www.xn--atayap-u9a.site",
        "inLanguage": ["tr", "en", "de"]
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
