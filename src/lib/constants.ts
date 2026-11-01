export const SITE_CONTACT = {
  companyName: "Ata Yapı",
  fullCompanyName: "Ata Yapı Cam & Alüminyum Sistemleri",
  phoneRaw: "+905314002959",
  phoneLocal: "0531 400 29 59",
  phoneDisplay: "+90 531 400 29 59",
  whatsappNumber: "905314002959",
  email: "atayapicambalkon@gmail.com",
  addressTr: "Girne, Meriç Sk. No:13, 34852 Maltepe/İstanbul",
  siteUrl: "https://www.xn--atayap-u9a.site",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Girne,+Meri%C3%A7+Sk.+No:13,+34852+Maltepe/%C4%B0stanbul&t=&z=16&ie=UTF8&iwloc=&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Girne+Meri%C3%A7+Sk.+No:13+34852+Maltepe+%C4%B0stanbul",
} as const;

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${SITE_CONTACT.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

