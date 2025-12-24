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
    "Ata Yapı Maltepe'de cam balkon, sineklik ve tente sistemlerinde ölçüye özel üretim ve ücretsiz keşif sunar.",
  keywords: [
    "cam balkon",
    "sineklik",
    "tente",
    "Maltepe",
    "İstanbul",
    "cam balkon sistemleri",
    "katlanır cam balkon",
    "sürme cam balkon",
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

