import { jsPDF } from "jspdf";
import { SITE_CONTACT } from "@/lib/constants";

export interface PdfQuoteLineItem {
  description: string;
  price?: number;
}

export interface PdfQuotePayload {
  quoteNumber?: string;
  headerTitle?: string;
  dateText?: string;
  customerName: string;
  customerPhone?: string;
  projectAddress?: string;
  introText?: string;
  sectionTitle?: string;
  items: PdfQuoteLineItem[];
  total: number;
  vatLabel?: "+ KDV" | "KDV Dahil" | "";
  showItemPrices?: boolean;
  showSignatureBlock?: boolean;
  notes?: string;
  validityDays?: number;
}

interface CachedAssets {
  tinosRegularB64: string;
  tinosBoldB64: string;
  tinosItalicB64: string;
  montserratExtraBoldB64: string;
  logoDataUrl: string;
  watermarkDataUrl: string;
  logoAspect: number;
}

let cachedAssetsPromise: Promise<CachedAssets> | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return window.btoa(binary);
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function buildLogoAssets(img: HTMLImageElement): {
  logoDataUrl: string;
  watermarkDataUrl: string;
  logoAspect: number;
} {
  const w = img.naturalWidth || 1200;
  const h = img.naturalHeight || 627;
  const logoAspect = w / h;

  // High-resolution crisp header logo on white background (avoids PDF viewer alpha artifacts)
  const logoCanvas = document.createElement("canvas");
  logoCanvas.width = w;
  logoCanvas.height = h;
  const logoCtx = logoCanvas.getContext("2d");
  if (logoCtx) {
    logoCtx.fillStyle = "#ffffff";
    logoCtx.fillRect(0, 0, w, h);
    logoCtx.drawImage(img, 0, 0, w, h);
  }

  // Soft pastel translucent center-page watermark pre-blended onto pure white
  const wmCanvas = document.createElement("canvas");
  wmCanvas.width = w;
  wmCanvas.height = h;
  const wmCtx = wmCanvas.getContext("2d");
  if (wmCtx) {
    wmCtx.fillStyle = "#ffffff";
    wmCtx.fillRect(0, 0, w, h);
    wmCtx.globalAlpha = 0.13;
    wmCtx.drawImage(img, 0, 0, w, h);
  }

  return {
    logoDataUrl: logoCanvas.toDataURL("image/png"),
    watermarkDataUrl: wmCanvas.toDataURL("image/jpeg", 0.92),
    logoAspect,
  };
}

async function loadPdfAssets(): Promise<CachedAssets> {
  if (!cachedAssetsPromise) {
    cachedAssetsPromise = (async () => {
      const [regBuf, boldBuf, italicBuf, montBuf, logoImg] = await Promise.all([
        fetch("/fonts/Tinos-Regular.ttf").then((r) => r.arrayBuffer()),
        fetch("/fonts/Tinos-Bold.ttf").then((r) => r.arrayBuffer()),
        fetch("/fonts/Tinos-Italic.ttf").then((r) => r.arrayBuffer()),
        fetch("/fonts/Montserrat-ExtraBold.ttf").then((r) => r.arrayBuffer()),
        loadImageElement("/logo.png"),
      ]);

      const { logoDataUrl, watermarkDataUrl, logoAspect } = buildLogoAssets(logoImg);

      return {
        tinosRegularB64: arrayBufferToBase64(regBuf),
        tinosBoldB64: arrayBufferToBase64(boldBuf),
        tinosItalicB64: arrayBufferToBase64(italicBuf),
        montserratExtraBoldB64: arrayBufferToBase64(montBuf),
        logoDataUrl,
        watermarkDataUrl,
        logoAspect,
      };
    })().catch((err) => {
      cachedAssetsPromise = null;
      throw err;
    });
  }
  return cachedAssetsPromise;
}

export function formatTurkishCurrency(amount: number): string {
  return new Intl.NumberFormat("tr-TR").format(amount);
}

export function formatLetterheadDate(date = new Date()): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd} / ${mm} / ${yyyy}`;
}

function sanitizeFileName(raw: string): string {
  const turkishMap: Record<string, string> = {
    ğ: "g",
    Ğ: "G",
    ü: "u",
    Ü: "U",
    ş: "s",
    Ş: "S",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ç: "c",
    Ç: "C",
  };
  return raw
    .replace(/[ğĞüÜşŞıİöÖçÇ]/g, (c) => turkishMap[c] || c)
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export async function generateAtaYapiQuotePdf(
  payload: PdfQuotePayload
): Promise<{ blob: Blob; fileName: string }> {
  const assets = await loadPdfAssets();

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  // Register Unicode Turkish TrueType Fonts (Times New Roman / Tinos & Montserrat)
  doc.addFileToVFS("Tinos-Regular.ttf", assets.tinosRegularB64);
  doc.addFont("Tinos-Regular.ttf", "Tinos", "normal");

  doc.addFileToVFS("Tinos-Bold.ttf", assets.tinosBoldB64);
  doc.addFont("Tinos-Bold.ttf", "Tinos", "bold");

  doc.addFileToVFS("Tinos-Italic.ttf", assets.tinosItalicB64);
  doc.addFont("Tinos-Italic.ttf", "Tinos", "italic");

  doc.addFileToVFS("Montserrat-ExtraBold.ttf", assets.montserratExtraBoldB64);
  doc.addFont("Montserrat-ExtraBold.ttf", "Montserrat", "bold");

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const marginX = 18;
  const contentWidth = pageWidth - marginX * 2; // 174mm

  const headerTitle = (payload.headerTitle || "CAM BALKON SİSTEMLERİ").toLocaleUpperCase(
    "tr-TR"
  );
  const dateDisplay = payload.dateText?.trim() || formatLetterheadDate();
  const sectionHeading =
    payload.sectionTitle?.trim() || "YAPILACAK İŞLER VE UYGULAMA DETAYLARI;";

  const drawPageStationery = (isFirstPage: boolean) => {
    // 1. Center Watermark (Filigran) — drawn FIRST so all typography sits sharp above it
    const wmWidth = 144;
    const wmHeight = wmWidth / assets.logoAspect;
    const wmX = (pageWidth - wmWidth) / 2;
    const wmY = (pageHeight - wmHeight) / 2 - 4;
    doc.addImage(assets.watermarkDataUrl, "JPEG", wmX, wmY, wmWidth, wmHeight);

    // 2. Top-Left Official Ata Yapı Logo
    const logoWidth = isFirstPage ? 44 : 32;
    const logoHeight = logoWidth / assets.logoAspect;
    const logoY = isFirstPage ? 14 : 12;
    doc.addImage(assets.logoDataUrl, "PNG", marginX, logoY, logoWidth, logoHeight);

    // 3. Antet Header Title & Date aligned to logo baseline
    const baselineY = logoY + logoHeight - 1.5;

    doc.setFont("Montserrat", "bold");
    doc.setFontSize(isFirstPage ? 14.5 : 11.5);
    doc.setTextColor(15, 23, 42);
    doc.text(headerTitle, marginX + logoWidth + 5, baselineY);

    // Date on right
    doc.setFont("Montserrat", "bold");
    doc.setFontSize(isFirstPage ? 11 : 9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(dateDisplay, pageWidth - marginX, baselineY, { align: "right" });

    if (payload.quoteNumber) {
      doc.setFont("Tinos", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Teklif No: ${payload.quoteNumber}`, pageWidth - marginX, logoY + 5, {
        align: "right",
      });
    }

    // 4. Subtle Architectural Divider Line
    const dividerY = logoY + logoHeight + 4.5;
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.65);
    doc.line(marginX, dividerY, marginX + 44, dividerY);

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.25);
    doc.line(marginX + 44, dividerY, pageWidth - marginX, dividerY);

    // 5. Official Bottom Antet Footer
    const footerLineY = pageHeight - 17;
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(marginX, footerLineY, marginX + 22, footerLineY);

    doc.setDrawColor(215, 222, 232);
    doc.setLineWidth(0.25);
    doc.line(marginX + 22, footerLineY, pageWidth - marginX, footerLineY);

    doc.setFont("Tinos", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(
      `Girne Mah. Meriç Sk. No:13 Maltepe / İSTANBUL   •   Tel & WhatsApp: ${SITE_CONTACT.phoneDisplay}`,
      marginX,
      pageHeight - 11.5
    );

    doc.setFont("Tinos", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(SITE_CONTACT.siteDisplayDomain, pageWidth - marginX, pageHeight - 11.5, {
      align: "right",
    });

    return dividerY;
  };

  let yPos = drawPageStationery(true) + 15;

  const ensureSpace = (neededMm: number) => {
    if (yPos + neededMm > pageHeight - 28) {
      doc.addPage();
      yPos = drawPageStationery(false) + 14;
    }
  };

  // --- CUSTOMER METADATA BLOCK (Classic Editorial Times/Tinos Serif) ---
  const displayCustomer = (payload.customerName || "SAYIN YETKİLİ").trim();

  doc.setFont("Tinos", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(17, 24, 39);
  const customerLabel = "MÜŞTERİ ADI: ";
  doc.text(customerLabel, marginX, yPos);
  const labelWidth = doc.getTextWidth(customerLabel);

  doc.setFont("Tinos", "normal");
  doc.text(displayCustomer.toLocaleUpperCase("tr-TR"), marginX + labelWidth, yPos);
  yPos += 7;

  if (payload.customerPhone?.trim()) {
    doc.setFont("Tinos", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    const phoneLabel = "İLETİŞİM: ";
    doc.text(phoneLabel, marginX, yPos);
    doc.setFont("Tinos", "normal");
    doc.text(payload.customerPhone.trim(), marginX + doc.getTextWidth(phoneLabel), yPos);
    yPos += 6.5;
  }

  if (payload.projectAddress?.trim()) {
    doc.setFont("Tinos", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    const addrLabel = "UYGULAMA ADRESİ: ";
    doc.text(addrLabel, marginX, yPos);
    const addrOffset = doc.getTextWidth(addrLabel);
    doc.setFont("Tinos", "normal");
    const addrLines: string[] = doc.splitTextToSize(
      payload.projectAddress.trim(),
      contentWidth - addrOffset
    );
    doc.text(addrLines, marginX + addrOffset, yPos);
    yPos += addrLines.length * 5.8 + 1;
  }

  yPos += 6;

  // Optional Intro Paragraph
  if (payload.introText?.trim()) {
    doc.setFont("Tinos", "normal");
    doc.setFontSize(11.5);
    doc.setTextColor(30, 41, 59);
    const introLines: string[] = doc.splitTextToSize(
      payload.introText.trim(),
      contentWidth
    );
    ensureSpace(introLines.length * 6 + 6);
    doc.text(introLines, marginX, yPos);
    yPos += introLines.length * 6 + 6;
  }

  // --- WORK ITEMS SECTION ("YAPILACAK İŞLER VE UYGULAMA DETAYLARI;") ---
  ensureSpace(16);
  doc.setFont("Tinos", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(17, 24, 39);
  doc.text(sectionHeading, marginX, yPos);
  yPos += 9.5;

  const validItems = payload.items.filter((i) => i.description.trim().length > 0);
  const hasAnyItemPrice =
    payload.showItemPrices !== false &&
    validItems.some((i) => (Number(i.price) || 0) > 0);

  const numColX = marginX + 5;
  const textColX = marginX + 12.5;
  const priceReserveWidth = hasAnyItemPrice ? 38 : 0;
  const maxItemTextWidth = pageWidth - marginX - textColX - priceReserveWidth;

  validItems.forEach((item, index) => {
    doc.setFont("Tinos", "normal");
    doc.setFontSize(12);
    doc.setTextColor(17, 24, 39);

    const descLines: string[] = doc.splitTextToSize(
      item.description.trim(),
      maxItemTextWidth
    );
    const blockHeight = descLines.length * 6.2 + 3.8;
    ensureSpace(blockHeight + 2);

    // Item Number ("1.", "2.", ...)
    doc.setFont("Tinos", "normal");
    doc.text(`${index + 1}.`, numColX, yPos);

    // Hanging-indented Item Description
    doc.text(descLines, textColX, yPos);

    // Optional Right-Aligned Item Price
    const numericPrice = Number(item.price) || 0;
    if (hasAnyItemPrice && numericPrice > 0) {
      doc.setFont("Tinos", "bold");
      doc.setFontSize(11.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${formatTurkishCurrency(numericPrice)} TL`, pageWidth - marginX, yPos, {
        align: "right",
      });
    }

    yPos += blockHeight;
  });

  // --- TOTAL SUMMARY BLOCK (Only shown when total > 0) ---
  const finalTotal = Number(payload.total) || 0;
  if (finalTotal > 0) {
    ensureSpace(24);
    yPos += 5;

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(marginX, yPos, pageWidth - marginX, yPos);
    yPos += 8.5;

    const vatSuffix =
      payload.vatLabel !== undefined ? (payload.vatLabel ? ` ${payload.vatLabel}` : "") : " + KDV";

    doc.setFont("Tinos", "bold");
    doc.setFontSize(12.5);
    doc.setTextColor(15, 23, 42);
    doc.text("TOPLAM TEKLİF BEDELİ:", marginX, yPos);

    doc.setFont("Tinos", "bold");
    doc.setFontSize(13.5);
    doc.setTextColor(200, 30, 30);
    doc.text(
      `${formatTurkishCurrency(finalTotal)} TL${vatSuffix}`,
      pageWidth - marginX,
      yPos,
      { align: "right" }
    );

    yPos += 5.5;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(marginX, yPos, pageWidth - marginX, yPos);
    yPos += 9;
  } else {
    yPos += 8;
  }

  // --- NOTES & VALIDITY ---
  const notesText = payload.notes?.trim() || "";
  if (notesText) {
    doc.setFont("Tinos", "italic");
    doc.setFontSize(10.5);
    doc.setTextColor(71, 85, 105);
    const noteLines: string[] = doc.splitTextToSize(notesText, contentWidth);
    ensureSpace(noteLines.length * 5.4 + 8);
    doc.text(noteLines, marginX, yPos);
    yPos += noteLines.length * 5.4 + 6;
  }

  // --- SIGNATURE / APPROVAL BLOCK (Optional, clean & executive) ---
  if (payload.showSignatureBlock !== false) {
    ensureSpace(34);
    yPos = Math.max(yPos + 8, pageHeight - 54);
    if (yPos > pageHeight - 44) {
      doc.addPage();
      yPos = drawPageStationery(false) + 22;
    }

    doc.setFont("Tinos", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text("MÜŞTERİ ONAYI", marginX + 6, yPos);
    doc.text("ATA YAPI CAM BALKON SİSTEMLERİ", pageWidth - marginX - 6, yPos, {
      align: "right",
    });

    doc.setFont("Tinos", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text("Ad Soyad / İmza", marginX + 6, yPos + 5.5);
    doc.text("Yetkili Kaşe & İmza", pageWidth - marginX - 6, yPos + 5.5, {
      align: "right",
    });
  }

  const blob = doc.output("blob");
  const cleanCustomer = sanitizeFileName(payload.customerName || "Musteri");
  const cleanDate = dateDisplay.replace(/\s+/g, "").replace(/\//g, "-");
  const fileName = `Ata_Yapi_Teklif_${cleanCustomer}_${cleanDate}.pdf`;

  doc.save(fileName);
  return { blob, fileName };
}

