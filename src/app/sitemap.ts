import { MetadataRoute } from 'next';
import { districtPages } from '@/data/districts';

const baseUrl = 'https://www.xn--atayap-u9a.site';

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/giyotin-cam`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/teleskopik-garaj`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cam-balkon`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sineklik`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/tente`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/pimapen-tamir`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/bayi-kurumsal`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/fiyatlandirma`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // Giyotin cam sub-pages
    const giyotinSubPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/giyotin-cam/motorlu`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/giyotin-cam/uygulamalar`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/giyotin-cam/imalat`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
    ];

    // Cam Balkon sub-service pages
    const camBalkonSubPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/cam-balkon/isi-camli`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cam-balkon/surme`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cam-balkon/katlanir`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // Sineklik sub-service pages
    const sineklikSubPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/sineklik/pileli`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sineklik/kedi-sineklik`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sineklik/menteseli`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // Tente sub-service pages
    const tenteSubPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/tente/kasetli`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tente/mafsalli`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tente/motorlu`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // District/Location pages
    const districtSitemapPages: MetadataRoute.Sitemap = districtPages.map((page) => ({
        url: `${baseUrl}/bolge/${page.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        ...staticPages,
        ...giyotinSubPages,
        ...camBalkonSubPages,
        ...sineklikSubPages,
        ...tenteSubPages,
        ...districtSitemapPages,
    ];
}
