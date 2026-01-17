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
  metadataBase: new URL("https://www.atayapi.site"),
  title: "Ata Yapı | Maltepe Cam Balkon, Sineklik & Tente Sistemleri",
  description:
    "Ata Yapı Maltepe'de cam balkon, sineklik, tente, pimapen, giyotin cam balkon ve silinebilir cam sistemlerinde ölçüye özel üretim ve ücretsiz keşif sunar. Maltepe, Kartal, Pendik, Kadıköy bölgelerinde hizmet.",
  keywords: [
    "cam balkon maltepe",
    "cam balkon pimapen",
    "cam balkon fiyatları",
    "cam balkon sistemleri",
    "katlanır cam balkon",
    "sürme cam balkon",
    "giyotin cam balkon",
    "silinebilir cam balkon",
    "isı camlı cam balkon",
    "sineklik",
    "sineklik maltepe",
    "sineklik fiyatları",
    "pileli sineklik",
    "menteşeli sineklik",
    "kedi sineklik",
    "tente",
    "tente maltepe",
    "tente fiyatları",
    "mafsallı tente",
    "kasetli tente",
    "motorlu tente",
    "pimapen tamir",
    "pimapen tamir maltepe",
    "pimapen",
    "pimapen maltepe",
    "pvc doğrama",
    "pvc pencere tamiri",
    "Maltepe",
    "Kartal",
    "Pendik",
    "Kadıköy",
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
    title: "Ata Yapı | Maltepe Cam Balkon, Sineklik & Tente Sistemleri",
    description:
      "Ata Yapı Maltepe'de cam balkon, sineklik ve tente sistemlerinde ölçüye özel üretim ve ücretsiz keşif sunar.",
    locale: "tr_TR",
    type: "website",
    url: "https://www.atayapi.site",
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

