import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://atayapi.com';
const LOGO_URL = `${APP_URL}/logo.png`;
const BRAND_COLOR = '#E31E24';

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
        console.warn('RESEND_API_KEY is not set. Email notification skipped.');
        return { success: false, error: 'API Key missing' };
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'atabe@windowslive.com';

    const baseStyle = `
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #eee;
        border-radius: 12px;
        overflow: hidden;
    `;

    const headerStyle = `
        background-color: ${BRAND_COLOR};
        padding: 30px;
        text-align: center;
    `;

    const contentStyle = `
        padding: 40px;
        background-color: #ffffff;
    `;

    const footerStyle = `
        padding: 20px;
        background-color: #f9f9f9;
        text-align: center;
        font-size: 12px;
        color: #888;
    `;

    const buttonStyle = `
        display: inline-block;
        padding: 12px 24px;
        background-color: ${BRAND_COLOR};
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 20px;
    `;

    let html = '';

    if (type === 'message') {
        html = `
            <div style="${baseStyle}">
                <div style="${headerStyle}">
                    <img src="${LOGO_URL}" alt="Ata Yapı" style="height: 50px; width: auto;" />
                </div>
                <div style="${contentStyle}">
                    <h2 style="margin-top: 0; color: ${BRAND_COLOR};">Yeni Mesaj Alındı</h2>
                    <p>Web siteniz üzerinden yeni bir iletişim formu dolduruldu.</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Ad Soyad:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Hizmet:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.service || 'Belirtilmedi'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Mesaj:</td>
                            <td style="padding: 10px 0;">${data.message || '-'}</td>
                        </tr>
                    </table>
                    <a href="${APP_URL}/admin/messages" style="${buttonStyle}">Tüm Mesajları Gör</a>
                </div>
                <div style="${footerStyle}">
                    © ${new Date().getFullYear()} Ata Yapı Maltepe. Tüm hakları saklıdır.
                </div>
            </div>
        `;
    } else if (type === 'quote') {
        html = `
            <div style="${baseStyle}">
                <div style="${headerStyle}">
                    <img src="${LOGO_URL}" alt="Ata Yapı" style="height: 50px; width: auto;" />
                </div>
                <div style="${contentStyle}">
                    <h2 style="margin-top: 0; color: ${BRAND_COLOR};">Yeni Teklif Oluşturuldu</h2>
                    <p>Teklif oluşturma sistemi üzerinden yeni bir teklif hazırlandı.</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Teklif No:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.quoteNumber}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Müşteri:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.customerName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.customerPhone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold;">Toplam Tutar:</td>
                            <td style="padding: 10px 0;">${data.total} TL + KDV</td>
                        </tr>
                    </table>
                    <a href="${APP_URL}/admin/quotes" style="${buttonStyle}">Teklif Detayına Git</a>
                </div>
                <div style="${footerStyle}">
                    © ${new Date().getFullYear()} Ata Yapı Maltepe. Tüm hakları saklıdır.
                </div>
            </div>
        `;
    }

    try {
        await resend.emails.send({
            from: 'Ata Yapı <bildirim@atayapimaltepe.com>', // Preferred sender if domain authenticated
            to: adminEmail,
            subject: type === 'message' ? `Yeni İletişim Formu: ${data.name}` : `Yeni Teklif: ${data.quoteNumber}`,
            html: html,
        });

        return { success: true };
    } catch (error) {
        console.error('Resend email error:', error);
        // Fallback for onboarding domain if domain not verified
        try {
            await resend.emails.send({
                from: 'Ata Yapı <onboarding@resend.dev>',
                to: adminEmail,
                subject: type === 'message' ? `Yeni İletişim Formu: ${data.name}` : `Yeni Teklif: ${data.quoteNumber}`,
                html: html,
            });
            return { success: true };
        } catch (innerError) {
            return { success: false, error: innerError };
        }
    }
}
