// Outreach email templates for European B2B and Diaspora outreach
// Both Turkish and English versions available for all target companies

export interface TemplateContact {
    id: number;
    name: string;
    email: string;
    country: string;
    group: 'business' | 'alevi';
    category?: string;
}

export interface EmailRenderOptions {
    /** Defaults to "/logo-email.png" for browser preview; pass "cid:atayapi-logo" when sending via SMTP */
    logoSrc?: string;
}

export const OUTREACH_CONFIG = {
    senderName: "Ata Yapı Cam Balkon & Sineklik",
    senderEmail: "atayapicambalkon@gmail.com",
    whatsappPhone: "+90 531 400 29 59",
    whatsappLinkTr: "https://wa.me/905314002959?text=Merhaba%2C%20Ata%20Yap%C4%B1%20toptan%20tedarik%20ve%20%C3%BCr%C3%BCnler%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyoruz.",
    whatsappLinkEn: "https://wa.me/905314002959?text=Hello%2C%20we%20received%20your%20email%20and%20would%20like%20to%20discuss%20wholesale%20supply.",
    whatsappLinkAlevi: "https://wa.me/905314002959?text=Merhaba%2C%20Ata%20Yap%C4%B1%20ile%20ticari%20dayan%C4%B1%C5%9Fma%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyoruz.",
    website: "https://www.atayapı.site",
    websiteHref: "https://www.xn--atayap-u9a.site",
};

export function getEmailSubject(contact: TemplateContact, lang: 'tr' | 'en'): string {
    if (contact.group === 'alevi') {
        return lang === 'tr'
            ? "Ata Yapı | Avrupa'daki Alevi esnafıyla ticari dayanışma ve tanışma"
            : "Ata Yapı | Business Cooperation & Community Solidarity from Türkiye";
    }

    return lang === 'tr'
        ? "Türkiye'den Toptan Tedarik ve İhracat İş Ortaklığı | Ata Yapı"
        : "Wholesale Supply Partnership from Türkiye | Ata Yapı";
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function buildCenteredLogoHeaderHtml(subtitleHtml: string, logoSrc: string): string {
    return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 18px;">
      <tr>
        <td align="center" style="text-align: center;">
          <a href="${OUTREACH_CONFIG.websiteHref}" target="_blank" style="display: inline-block; text-decoration: none; border: 0;">
            <img
              src="${logoSrc}"
              alt="Ata Yapı"
              width="180"
              height="95"
              style="display: block; margin: 0 auto 12px auto; width: 180px; max-width: 180px; height: auto; border: 0; outline: none; text-decoration: none;"
            />
          </a>
          <div style="font-size: 10.5px; font-weight: 700; color: #444444; letter-spacing: 1.5px; text-transform: uppercase; text-align: center; line-height: 1.55;">
            ${subtitleHtml}
          </div>
        </td>
      </tr>
    </table>
    <hr style="border: none; border-top: 2px solid #111111; margin: 0 0 24px 0;" />`;
}

function buildCenteredCtaButtonsHtml(websiteLabel: string, whatsappLabel: string, whatsappHref: string): string {
    return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0 26px 0;">
      <tr>
        <td align="center" style="text-align: center;">
          <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
            <tr>
              <td align="center" style="padding: 6px;">
                <a href="${OUTREACH_CONFIG.websiteHref}" target="_blank" style="display: inline-block; background-color: #111111; color: #ffffff; padding: 13px 22px; font-size: 11.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; text-decoration: none; border-radius: 4px;">
                  ${websiteLabel}
                </a>
              </td>
              <td align="center" style="padding: 6px;">
                <a href="${whatsappHref}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 13px 22px; font-size: 11.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; text-decoration: none; border-radius: 4px;">
                  💬 ${whatsappLabel}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
}

function buildCenteredFooterHtml(lang: 'tr' | 'en', optOutText?: string): string {
    const phoneLabel = lang === 'tr' ? 'TELEFON / WHATSAPP:' : 'PHONE / WHATSAPP:';
    const emailLabel = lang === 'tr' ? 'E-POSTA:' : 'EMAIL:';
    const locationLabel = lang === 'tr' ? 'MERKEZ:' : 'LOCATION:';
    const locationValue = lang === 'tr' ? 'İstanbul &amp; Balıkesir / Türkiye' : 'Istanbul &amp; Balikesir / T&uuml;rkiye';
    const websiteLabel = lang === 'tr' ? 'WEB SİTESİ:' : 'WEBSITE:';

    return `
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 26px 0 18px 0;" />
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="text-align: center;">
          <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto; font-size: 11px; font-weight: 600; color: #666666; line-height: 1.85; letter-spacing: 0.4px; text-align: left;">
            <tr>
              <td style="padding-right: 12px; color: #333333;">${phoneLabel}</td>
              <td><a href="https://wa.me/905314002959" style="color: #0066cc; text-decoration: none; font-weight: bold;">${OUTREACH_CONFIG.whatsappPhone}</a></td>
            </tr>
            <tr>
              <td style="padding-right: 12px; color: #333333;">${emailLabel}</td>
              <td><a href="mailto:${OUTREACH_CONFIG.senderEmail}" style="color: #444444; text-decoration: none;">${OUTREACH_CONFIG.senderEmail}</a></td>
            </tr>
            <tr>
              <td style="padding-right: 12px; color: #333333;">${locationLabel}</td>
              <td>${locationValue}</td>
            </tr>
            <tr>
              <td style="padding-right: 12px; color: #333333;">${websiteLabel}</td>
              <td><a href="${OUTREACH_CONFIG.websiteHref}" style="color: #0066cc; text-decoration: none;">${OUTREACH_CONFIG.website}</a></td>
            </tr>
          </table>
          ${
              optOutText
                  ? `<p style="margin: 16px auto 0 auto; max-width: 480px; font-size: 10px; color: #999999; font-style: italic; text-align: center; line-height: 1.5;">${optOutText}</p>`
                  : ''
          }
        </td>
      </tr>
    </table>`;
}

export function getEmailHtml(
    contact: TemplateContact,
    lang: 'tr' | 'en',
    options?: EmailRenderOptions
): string {
    const isAlevi = contact.group === 'alevi';
    const name = escapeHtml(contact.name.trim());
    const logoSrc = options?.logoSrc || '/logo-email.png';

    if (isAlevi && lang === 'tr') {
        return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 24px 10px; background-color: #f5f5f5; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 2px solid #111111; border-radius: 4px; padding: 34px 32px; box-sizing: border-box; text-align: left;">
          ${buildCenteredLogoHeaderHtml(
              'CAM BALKON &bull; SİNEKLİK &bull; DIŞ MEKAN KAPATMA &bull; TİCARİ DAYANIŞMA',
              logoSrc
          )}
          <div style="font-size: 13.5px; line-height: 1.65; color: #222222;">
            <p style="margin: 0 0 16px 0;">Sayın <strong>${name}</strong> Yetkilileri,</p>
            <p style="margin: 0 0 16px 0;">
              Ben Ata Yapı adına iletişime geçiyorum. Alevi kimliğine mensup bir üretici ve iş insanı olarak, Avrupa'daki Alevi toplumuyla bağlarımızı güçlendirmeyi ve topluluğumuz içindeki esnaf ve girişimcilerle tanışmayı önemsiyorum.
            </p>
            <p style="margin: 0 0 16px 0;">
              Ata Yapı olarak Türkiye'deki tesislerimizden Avrupa'ya toptan ürün tedariki için uzun vadeli iş ortaklıkları kurmak istiyoruz.
            </p>
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #111111;">Üretim ve toptan ürün gruplarımız:</p>
            <ul style="margin: 0 0 18px 0; padding-left: 20px; line-height: 1.75;">
              <li><strong>Sineklik Sistemleri:</strong> Plise (pileli), menteşeli, sabit, stor ve sürme sineklikler ile pileli kapı sineklikleri.</li>
              <li><strong>Cam Sistemleri:</strong> Motorlu giyotin cam, katlanır ve sürme cam balkon sistemleri.</li>
              <li><strong>Dış Mekan &amp; Tente:</strong> Pergola, motorlu kasetli/mafsallı tente ve pileli perde sistemleri.</li>
            </ul>
            <p style="margin: 0 0 16px 0;">
              Federasyonunuza veya bağlı derneklerinize mensup camcı, PVC doğramacı, sineklik montajcısı, tente/pergola ustası ya da yapı ürünleri toptancısı işletme sahipleri bulunuyorsa, uygun göreceğiniz kişilerle tanışmamıza aracılık edebilir misiniz?
            </p>
            <p style="margin: 0 0 22px 0;">
              Amacımız, karşılıklı güvene dayalı, uzun vadeli ve gerçek bir ticari dayanışma ağı oluşturmaktır. İlginiz ve yönlendirmeniz için şimdiden çok teşekkür ederiz.
            </p>
          </div>
          ${buildCenteredCtaButtonsHtml('WEB SİTEMİZİ İNCELEYİN', 'WHATSAPP İLE YAZIŞIN', OUTREACH_CONFIG.whatsappLinkAlevi)}
          ${buildCenteredFooterHtml('tr')}
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
    }

    if (isAlevi && lang === 'en') {
        return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 24px 10px; background-color: #f5f5f5; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 2px solid #111111; border-radius: 4px; padding: 34px 32px; box-sizing: border-box; text-align: left;">
          ${buildCenteredLogoHeaderHtml(
              'GLASS BALCONY &bull; INSECT SCREENS &bull; OUTDOOR SYSTEMS &bull; COMMUNITY SOLIDARITY',
              logoSrc
          )}
          <div style="font-size: 13.5px; line-height: 1.65; color: #222222;">
            <p style="margin: 0 0 16px 0;">Dear <strong>${name}</strong> Representatives,</p>
            <p style="margin: 0 0 16px 0;">
              We are reaching out on behalf of <strong>Ata Yapı</strong>. As a Türkiye-based manufacturer and member of the Alevi community, we deeply value strengthening ties with our community across Europe and connecting with fellow tradespeople and entrepreneurs.
            </p>
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #111111;">Our factory-direct wholesale product lines include:</p>
            <ul style="margin: 0 0 18px 0; padding-left: 20px; line-height: 1.75;">
              <li><strong>Insect Screen Systems:</strong> Pleated screens (plisse), hinged, fixed, roller, sliding screens, and pleated screen doors.</li>
              <li><strong>Glass Systems:</strong> Motorized guillotine glass, folding and sliding glass balconies.</li>
              <li><strong>Outdoor Living:</strong> Pergola, motorized cassette/retractable awnings, and pleated blinds.</li>
            </ul>
            <p style="margin: 0 0 22px 0;">
              If there are glaziers, PVC/aluminum window makers, insect-screen installers, or building material wholesalers within your federation and affiliated associations, we would be grateful if you could help introduce us so we can build a trusted, long-term commercial solidarity network.
            </p>
          </div>
          ${buildCenteredCtaButtonsHtml('VISIT WEBSITE', 'CHAT ON WHATSAPP', OUTREACH_CONFIG.whatsappLinkAlevi)}
          ${buildCenteredFooterHtml('en')}
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
    }

    if (lang === 'tr') {
        return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 24px 10px; background-color: #f5f5f5; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 2px solid #111111; border-radius: 4px; padding: 34px 32px; box-sizing: border-box; text-align: left;">
          ${buildCenteredLogoHeaderHtml(
              "ALÜMİNYUM &amp; CAM SİSTEMLERİ &bull; SİNEKLİK &bull; TÜRKİYE'DEN TOPTAN İHRACAT",
              logoSrc
          )}
          <div style="font-size: 13.5px; line-height: 1.65; color: #222222;">
            <p style="margin: 0 0 16px 0;">Sayın <strong>${name}</strong> Yetkilileri,</p>
            <p style="margin: 0 0 16px 0;">
              <strong>Ata Yapı</strong> adına sizinle iletişime geçiyoruz. Türkiye merkezli üretici firma olarak, Avrupa genelindeki sektör profesyonelleriyle uzun vadeli toptan tedarik ve ihracat iş ortaklıkları geliştirmek istiyoruz.
            </p>
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #111111;">Toptan üretim ve ihracat ürün gruplarımız:</p>
            <ul style="margin: 0 0 18px 0; padding-left: 20px; line-height: 1.75;">
              <li><strong>Sineklik Sistemleri:</strong> Plise (pileli) sineklik, menteşeli, sabit, stor, sürme sineklikler ve pileli kapı sineklikleri.</li>
              <li><strong>Cam Sistemleri:</strong> Motorlu giyotin cam, katlanır ve sürme cam balkon sistemleri.</li>
              <li><strong>Dış Mekan &amp; Gölgelendirme:</strong> Pergola ve motorlu tente sistemleri, pileli perde çözümleri.</li>
            </ul>
            <p style="margin: 0 0 16px 0;">
              Pencere ve kapı uzmanları, PVC doğrama imalatçıları, camcılar, sineklik montajcıları ve yapı toptancılarıyla doğrudan çalışıyoruz. Ürünlerimiz Türkiye'deki fabrikalarımızda yüksek kalite standartlarında, projelerinize özel ölçülerle üretilmekte ve rekabetçi toptan ihracat koşullarıyla teslim edilmektedir.
            </p>
            <p style="margin: 0 0 22px 0;">
              Firmanızda satın alma veya tedarik ortaklığı için doğru yetkili siz misiniz? İlgilendiğiniz ürün gruplarını belirtmeniz halinde, ürün kataloğumuzu, toptan fiyat listemizi ve sevkiyat seçeneklerimizi paylaşmaktan memnuniyet duyarız.
            </p>
          </div>
          ${buildCenteredCtaButtonsHtml('SİTEMİZİ ZİYARET EDİN', 'WHATSAPP İLE YAZIŞIN', OUTREACH_CONFIG.whatsappLinkTr)}
          ${buildCenteredFooterHtml(
              'tr',
              'Bu ticari iş birliği talebi firmanızla ilgili değilse, lütfen "İletişim istemiyorum" şeklinde yanıtlayınız; talebinize derhal saygı gösterilecektir.'
          )}
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
    }

    // English B2B wholesale proposal
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 24px 10px; background-color: #f5f5f5; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 2px solid #111111; border-radius: 4px; padding: 34px 32px; box-sizing: border-box; text-align: left;">
          ${buildCenteredLogoHeaderHtml(
              'ALUMINUM &amp; GLASS SYSTEMS &bull; INSECT SCREENS &bull; WHOLESALE SUPPLY FROM T&Uuml;RK&#304;YE',
              logoSrc
          )}
          <div style="font-size: 13.5px; line-height: 1.65; color: #222222;">
            <p style="margin: 0 0 16px 0;">Dear <strong>${name}</strong> Team,</p>
            <p style="margin: 0 0 16px 0;">
              We are contacting you directly from <strong>Ata Yapı</strong>, a Türkiye-based manufacturer seeking to develop long-term wholesale supply partnerships across Europe.
            </p>
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #111111;">Our specialized wholesale product lines include:</p>
            <ul style="margin: 0 0 18px 0; padding-left: 20px; line-height: 1.75;">
              <li><strong>Insect Screen Systems:</strong> Pleated screens (plisse), hinged, fixed, roller, sliding screens, and pleated screen doors.</li>
              <li><strong>Glass Systems:</strong> Motorized guillotine glass, folding and sliding glass balconies.</li>
              <li><strong>Outdoor Living:</strong> Pergola and motorized awning systems, pleated blinds.</li>
            </ul>
            <p style="margin: 0 0 16px 0;">
              We work closely with window and door specialists, PVC joinery manufacturers, glazing businesses, insect-screen installers, wholesalers, and distributors. Products are manufactured to custom dimensions in Türkiye with rigorous quality standards and supplied under competitive wholesale terms.
            </p>
            <p style="margin: 0 0 22px 0;">
              Would you be the right contact for purchasing or supplier partnerships? If relevant, please reply with the product categories you are interested in. We would be delighted to share our product catalogue, wholesale price lists, and shipping options.
            </p>
          </div>
          ${buildCenteredCtaButtonsHtml('VISIT WEBSITE', 'CHAT ON WHATSAPP', OUTREACH_CONFIG.whatsappLinkEn)}
          ${buildCenteredFooterHtml(
              'en',
              'If this business enquiry is not relevant to your company, simply reply with "No further contact" and we will respect your request immediately.'
          )}
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getEmailPlainText(contact: TemplateContact, lang: 'tr' | 'en'): string {
    const isAlevi = contact.group === 'alevi';
    const name = contact.name.trim();

    if (isAlevi && lang === 'tr') {
        return `Sayın ${name} Yetkilileri,

Ben Ata Yapı adına iletişime geçiyorum. Alevi kimliğine mensup bir üretici ve iş insanı olarak, Avrupa'daki Alevi toplumuyla bağlarımızı güçlendirmeyi ve topluluğumuz içindeki esnaf ve girişimcilerle tanışmayı önemsiyorum.

Ata Yapı olarak Türkiye'deki tesislerimizden Avrupa'ya toptan ürün tedariki için uzun vadeli iş ortaklıkları kurmak istiyoruz.

Ürün Gruplarımız:
• Sineklik Sistemleri: Plise, menteşeli, sabit, stor, sürme sineklikler ve pileli kapı sineklikleri.
• Cam Sistemleri: Motorlu giyotin cam, katlanır ve sürme cam balkon sistemleri.
• Dış Mekan & Tente: Pergola, motorlu tente ve pileli perde sistemleri.

Federasyonunuza veya bağlı derneklerinize mensup camcı, PVC doğramacı, sineklik montajcısı, tente ustası ya da yapı ürünleri toptancısı işletme sahipleri bulunuyorsa, tanışmamıza aracılık edebilir misiniz?

İletişim / WhatsApp: ${OUTREACH_CONFIG.whatsappPhone}
E-posta: ${OUTREACH_CONFIG.senderEmail}
Web: ${OUTREACH_CONFIG.website}`;
    }

    if (lang === 'tr') {
        return `Sayın ${name} Yetkilileri,

Ata Yapı adına sizinle iletişime geçiyoruz. Türkiye merkezli üretici firma olarak, Avrupa genelindeki sektör profesyonelleriyle uzun vadeli toptan tedarik ve ihracat iş ortaklıkları geliştirmek istiyoruz.

Ürün Gruplarımız:
• Sineklik Sistemleri: Plise (pileli), menteşeli, sabit, stor, sürme sineklikler ve pileli kapı sineklikleri.
• Cam Sistemleri: Motorlu giyotin cam, katlanır ve sürme cam balkon sistemleri.
• Dış Mekan & Gölgelendirme: Pergola ve motorlu tente sistemleri.

Pencere ve kapı uzmanları, PVC doğrama imalatçıları, camcılar ve yapı toptancılarıyla doğrudan çalışıyoruz. Özel ölçülerle üretim ve rekabetçi ihracat şartları sunmaktayız.

İletişim / WhatsApp: ${OUTREACH_CONFIG.whatsappPhone}
E-posta: ${OUTREACH_CONFIG.senderEmail}
Web: ${OUTREACH_CONFIG.website}`;
    }

    return `Dear ${name} Team,

We are contacting you directly from Ata Yapı, a Türkiye-based manufacturer seeking to develop long-term wholesale supply partnerships across Europe.

Our specialized wholesale product lines:
• Insect Screen Systems: Pleated screens (plisse), hinged, fixed, roller, sliding screens, and screen doors.
• Glass Systems: Motorized guillotine glass, folding & sliding glass balconies.
• Outdoor Living: Pergola & motorized awning systems.

We supply directly from our factories in Türkiye with custom dimensions and competitive export terms.

Phone / WhatsApp: ${OUTREACH_CONFIG.whatsappPhone}
Email: ${OUTREACH_CONFIG.senderEmail}
Website: ${OUTREACH_CONFIG.website}`;
}
