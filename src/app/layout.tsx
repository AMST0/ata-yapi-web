import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  title: "Ata Yapı | Giyotin Cam Sistemleri, Teleskopik Garaj & Cam Balkon",
  description:
    "Ata Yapı — giyotin cam sistemleri, motorlu giyotin, teleskopik garaj, cam balkon, sineklik ve tente çözümleri. Balıkesir, Edremit, Altınoluk, İzmir, Çanakkale ve İstanbul'da ölçüye özel üretim, profesyonel montaj, ücretsiz keşif. Bayi ve kurumsal satış.",
  keywords: [
    "giyotin cam",
    "giyotin cam sistemi",
    "giyotin cam balkon",
    "motorlu giyotin sistem",
    "giyotin cam fiyatları",
    "giyotin sistem imalatı",
    "giyotin sistem montajı",
    "teleskopik garaj",
    "katlanır garaj",
    "açılır kapanır garaj",
    "teleskopik garaj sistemi",
    "cam balkon",
    "cam balkon sistemleri",
    "katlanır cam balkon",
    "sürme cam balkon",
    "sineklik",
    "tente",
    "pimapen tamir",
    "giyotin cam balıkesir",
    "giyotin cam edremit",
    "giyotin cam altınoluk",
    "giyotin cam izmir",
    "giyotin cam çanakkale",
    "cam balkon maltepe",
    "Balıkesir",
    "Edremit",
    "Altınoluk",
    "Akçay",
    "İzmir",
    "Çanakkale",
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
    title: "Ata Yapı | Giyotin Cam Sistemleri, Teleskopik Garaj & Cam Balkon",
    description:
      "Giyotin cam sistemleri, teleskopik garaj, cam balkon, sineklik ve tente çözümlerinde ölçüye özel üretim. Balıkesir, İzmir, Çanakkale, İstanbul.",
    locale: "tr_TR",
    type: "website",
    url: "https://www.xn--atayap-u9a.site",
    siteName: "Ata Yapı",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Ata Yapı Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ata Yapı | Giyotin Cam Sistemleri, Teleskopik Garaj & Cam Balkon",
    description:
      "Giyotin cam sistemleri, teleskopik garaj ve cam balkon çözümlerinde ölçüye özel üretim. Ücretsiz keşif.",
    images: ["/logo.png"],
  },
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
        {children}
      </body>
    </html>
  );
}

