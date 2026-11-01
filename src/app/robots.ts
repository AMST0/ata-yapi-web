import { MetadataRoute } from "next";
import { SITE_CONTACT } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const disallowedPrivateRoutes = ["/admin/", "/api/", "/teklif/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/feed/products.xml", "/llms.txt"],
        disallow: disallowedPrivateRoutes,
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Storebot-Google",
          "AdsBot-Google",
          "Bingbot",
          "facebookexternalhit",
          "Meta-ExternalAgent",
          "GPTBot",
          "OAI-SearchBot",
          "Google-Extended",
          "PerplexityBot",
        ],
        allow: ["/", "/feed/products.xml", "/llms.txt"],
        disallow: disallowedPrivateRoutes,
      },
    ],
    host: SITE_CONTACT.siteUrl,
    sitemap: `${SITE_CONTACT.siteUrl}/sitemap.xml`,
  };
}
