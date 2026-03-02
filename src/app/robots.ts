import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/teklif/'],
            },
        ],
        sitemap: 'https://www.xn--atayap-u9a.site/sitemap.xml',
    };
}
