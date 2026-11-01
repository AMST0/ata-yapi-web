import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { LanguageProvider } from "@/lib/i18n";
import VisitorTracker from "@/components/VisitorTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xn--atayap-u9a.site"),
  title: "Ata Yapı | Giyotin Cam Sistemleri, Cam Balkon & Mimari Cephe",
  description:
    "Ata Yapı — motorlu giyotin cam sistemleri, ısıcamlı cam balkon, plise sineklik ve kasetli tente çözümlerinde ölçüye özel üretim, profesyonel montaj ve Avrupa toptan ihracat tedariği.",
  keywords: [
    "giyotin cam",
    "giyotin cam sistemi",
    "giyotin cam balkon",
    "motorlu giyotin sistem",
    "giyotin cam fiyatları",
    "giyotin sistem imalatı",
    "cam balkon",
    "cam balkon sistemleri",
    "ısıcamlı cam balkon",
    "katlanır cam balkon",
    "sürme cam balkon",
    "pileli sineklik",
    "kedi sinekliği",
    "kasetli tente",
    "motorlu tente",
    "pimapen tamir",
    "cam balkon maltepe",
    "giyotin cam balıkesir",
    "giyotin cam edremit",
    "giyotin cam altınoluk",
    "giyotin cam izmir",
    "giyotin cam çanakkale",
    "İstanbul",
  ],
  authors: [{ name: "Ata Yapı" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Ata Yapı | Giyotin Cam Sistemleri, Cam Balkon & Mimari Cephe",
    description:
      "Motorlu giyotin cam sistemleri, cam balkon, sineklik ve tente çözümlerinde ölçüye özel üretim, profesyonel montaj ve ihracat tedariği.",
    locale: "tr_TR",
    type: "website",
    url: "https://www.xn--atayap-u9a.site",
    siteName: "Ata Yapı",
    images: [
      {
        url: "/giyotin-cam-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Ata Yapı Mimari Cam ve Alüminyum Sistemleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ata Yapı | Giyotin Cam Sistemleri, Cam Balkon & Mimari Cephe",
    description:
      "Motorlu giyotin cam sistemleri ve cam balkon çözümlerinde ölçüye özel üretim. Ücretsiz keşif.",
    images: ["/giyotin-cam-hero.jpg"],
  },
  alternates: {
    canonical: "https://www.xn--atayap-u9a.site",
    types: {
      "application/rss+xml": "https://www.xn--atayap-u9a.site/feed/products.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
  },
  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col">
        <GoogleAnalytics />
        <VisitorTracker />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
