import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileSticky from "@/components/MobileSticky";
import FloatingCTA from "@/components/FloatingCTA";

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
  openGraph: {
    title: "Ata Yapı | Maltepe Cam Balkon, Sineklik & Tente Sistemleri",
    description:
      "Ata Yapı Maltepe'de cam balkon, sineklik ve tente sistemlerinde ölçüye özel üretim ve ücretsiz keşif sunar.",
    locale: "tr_TR",
    type: "website",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileSticky />
        <FloatingCTA />
      </body>
    </html>
  );
}
