import { Resend } from 'resend';

const getResendClient = () => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return null;
    return new Resend(apiKey);
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.xn--atayap-u9a.site';
const LOGO_URL = `${APP_URL}/logo.png`;
const BRAND_COLOR = '#E31E24';

function escapeHtml(value: unknown): string {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

interface NotificationData {
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
    message?: string;
    quoteNumber?: string;
    customerName?: string;
    customerPhone?: string;
    total?: number | string;
}

export async function sendAdminNotification(type: 'message' | 'quote', data: NotificationData) {
    if (!process.env.RESEND_API_KEY) {
        return { success: false, error: 'API Key missing' };
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'atabe@windowslive.com';

    const baseStyle = `
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #1e293b;
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
    `;

    const headerStyle = `
        background-color: #0f172a;
        border-bottom: 3px solid ${BRAND_COLOR};
        padding: 28px;
        text-align: center;
    `;

    const contentStyle = `
        padding: 36px;
        background-color: #ffffff;
    `;

    const footerStyle = `
        padding: 18px;
        background-color: #f8fafc;
        text-align: center;
        font-size: 12px;
        color: #64748b;
    `;

    const buttonStyle = `
        display: inline-block;
        padding: 12px 24px;
        background-color: ${BRAND_COLOR};
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        margin-top: 20px;
    `;

    let html = '';

    if (type === 'message') {
        html = `
            <div style="${baseStyle}">
                <div style="${headerStyle}">
                    <img src="${LOGO_URL}" alt="Ata Yapı" style="height: 44px; width: auto;" />
                </div>
                <div style="${contentStyle}">
                    <h2 style="margin-top: 0; color: #0f172a;">Yeni Müşteri Talebi</h2>
                    <p>Web siteniz üzerinden yeni bir iletişim / teklif formu dolduruldu.</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 120px;">Ad Soyad:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(data.name)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Telefon:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(data.phone)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">E-posta:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(data.email || '-')}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Hizmet:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(data.service || 'Belirtilmedi')}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Mesaj:</td>
                            <td style="padding: 10px 0;">${escapeHtml(data.message || '-')}</td>
                        </tr>
                    </table>
                    <a href="${APP_URL}/admin/messages" style="${buttonStyle}">Yönetim Panelinde Gör</a>
                </div>
                <div style="${footerStyle}">
                    © ${new Date().getFullYear()} Ata Yapı Cam &amp; Alüminyum Sistemleri
                </div>
            </div>
        `;
    } else if (type === 'quote') {
        html = `
            <div style="${baseStyle}">
                <div style="${headerStyle}">
                    <img src="${LOGO_URL}" alt="Ata Yapı" style="height: 44px; width: auto;" />
                </div>
                <div style="${contentStyle}">
                    <h2 style="margin-top: 0; color: #0f172a;">Yeni Teklif Oluşturuldu</h2>
                    <p>Teklif oluşturma sistemi üzerinden yeni bir teklif hazırlandı.</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 120px;">Teklif No:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(data.quoteNumber)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Müşteri:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(data.customerName)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Telefon:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${escapeHtml(data.customerPhone)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold;">Toplam Tutar:</td>
                            <td style="padding: 10px 0;">${escapeHtml(data.total)} TL + KDV</td>
                        </tr>
                    </table>
                    <a href="${APP_URL}/admin/quotes" style="${buttonStyle}">Teklif Detayına Git</a>
                </div>
                <div style="${footerStyle}">
                    © ${new Date().getFullYear()} Ata Yapı Cam &amp; Alüminyum Sistemleri
                </div>
            </div>
        `;
    }

    const resend = getResendClient();
    if (!resend) {
        return { success: false, error: 'API Key missing' };
    }

    const safeSubjectName = String(data.name || 'Müşteri').replace(/[\r\n]/g, ' ').slice(0, 80);
    const safeQuoteNo = String(data.quoteNumber || '').replace(/[\r\n]/g, ' ').slice(0, 40);

    try {
        await resend.emails.send({
            from: 'Ata Yapı <bildirim@atayapimaltepe.com>',
            to: adminEmail,
            subject: type === 'message' ? `Yeni İletişim Formu: ${safeSubjectName}` : `Yeni Teklif: ${safeQuoteNo}`,
            html,
        });

        return { success: true };
    } catch {
        try {
            await resend.emails.send({
                from: 'Ata Yapı <onboarding@resend.dev>',
                to: adminEmail,
                subject: type === 'message' ? `Yeni İletişim Formu: ${safeSubjectName}` : `Yeni Teklif: ${safeQuoteNo}`,
                html,
            });
            return { success: true };
        } catch (innerError) {
            return { success: false, error: innerError };
        }
    }
}
