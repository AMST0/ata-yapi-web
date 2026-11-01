"use client";

import { SITE_CONTACT } from "@/lib/constants";
import { SEO_PRODUCT_CATALOG, buildProductJsonLd } from "@/lib/seo-catalog";

export default function JsonLd() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "name": SITE_CONTACT.companyName,
        "alternateName": SITE_CONTACT.fullCompanyName,
        "description": "Motorlu giyotin cam sistemleri, ısıcamlı cam balkon, plise sineklik, kasetli tente ve PVC doğrama çözümlerinde ölçüye özel üretim, profesyonel montaj ve B2B ihracat tedariği.",
        "image": `${SITE_CONTACT.siteUrl}/giyotin-cam-hero.jpg`,
        "@id": `${SITE_CONTACT.siteUrl}/#localbusiness`,
        "url": SITE_CONTACT.siteUrl,
        "telephone": SITE_CONTACT.phoneRaw,
        "email": SITE_CONTACT.email,
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
        "hasMap": SITE_CONTACT.mapDirectionsUrl,
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:30",
                "closes": "19:00"
            }
        ],
        "sameAs": [
            SITE_CONTACT.instagramUrl,
            `https://wa.me/${SITE_CONTACT.whatsappNumber}`
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
                        "url": `${SITE_CONTACT.siteUrl}/giyotin-cam`,
                        "description": "Motorlu giyotin cam balkon, dikey sürgülü küpeşte cam, teras ve restoran cephe kapatma sistemleri."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Cam Balkon Sistemleri",
                        "url": `${SITE_CONTACT.siteUrl}/cam-balkon`,
                        "description": "Isıcamlı cam balkon, katlanır cam balkon ve eşiksiz sürme cam balkon sistemleri."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Sineklik Sistemleri",
                        "url": `${SITE_CONTACT.siteUrl}/sineklik`,
                        "description": "Pileli (plise) sineklik, menteşeli sineklik ve çelik tüllü kedi sinekliği imalatı."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Tente ve Gölgelendirme Sistemleri",
                        "url": `${SITE_CONTACT.siteUrl}/tente`,
                        "description": "Tam kasetli tente, mafsallı tente ve sensörlü motorlu tente sistemleri."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "PVC Doğrama & Pimapen Tamiri",
                        "url": `${SITE_CONTACT.siteUrl}/pimapen-tamir`,
                        "description": "PVC pencere ve kapı mekanizma onarımı, fitil ve çift açılım dönüşümü."
                    }
                }
            ]
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SITE_CONTACT.companyName,
        "url": SITE_CONTACT.siteUrl,
        "logo": `${SITE_CONTACT.siteUrl}/logo.png`,
        "sameAs": [
            SITE_CONTACT.instagramUrl,
            `https://wa.me/${SITE_CONTACT.whatsappNumber}`
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-531-400-2959",
            "email": SITE_CONTACT.email,
            "contactType": "customer service",
            "areaServed": ["TR", "DE", "BE", "NL", "AT", "CH"],
            "availableLanguage": ["Turkish", "English", "German"]
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE_CONTACT.companyName,
        "url": SITE_CONTACT.siteUrl,
        "inLanguage": ["tr", "en", "de"]
    };

    const productCatalogSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Ata Yapı Ürün ve Sistem Kataloğu",
        "numberOfItems": SEO_PRODUCT_CATALOG.length,
        "itemListElement": SEO_PRODUCT_CATALOG.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${SITE_CONTACT.siteUrl}${product.path}`,
            "item": buildProductJsonLd(product),
        })),
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productCatalogSchema) }}
            />
        </>
    );
}
