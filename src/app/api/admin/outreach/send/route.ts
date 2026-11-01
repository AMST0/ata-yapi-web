import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
    OUTREACH_CONFIG,
    getEmailSubject,
    getEmailHtml,
    getEmailPlainText,
    TemplateContact
} from '@/lib/outreach-templates';

// Contacts definition
const ALL_CONTACTS: TemplateContact[] = [
    { id: 1, name: "FenSon GmbH", email: "info@fenson.de", country: "Germany", group: "business", category: "Pencere, Kapı & Sineklik Sistemleri" },
    { id: 2, name: "ATRO Element GmbH - Arno Endress", email: "aendress@atro-element.de", country: "Germany", group: "business", category: "Cephe & Yapı Elemanları" },
    { id: 3, name: "SaMa Flyscreen GbR", email: "info@sama-flyscreen.de", country: "Germany", group: "business", category: "Sineklik & Böcek Koruma Sistemleri" },
    { id: 4, name: "Görmar und Sohn GmbH", email: "info@goermar.de", country: "Germany", group: "business", category: "Pencere, Güneşlik & Stor Sistemleri" },
    { id: 5, name: "De Raamfabriek", email: "info@deraamfabriek.be", country: "Belgium", group: "business", category: "PVC & Alüminyum Doğrama Fabrikası" },
    { id: 6, name: "Ramen Willems", email: "info@ramenwillems.be", country: "Belgium", group: "business", category: "Kış Bahçesi, Veranda & Cam Balkon" },
    { id: 7, name: "Kozijnenfabriek Nederland", email: "info@kozijnenfabrieknederland.nl", country: "Netherlands", group: "business", category: "Doğrama & Pencere İmalatı" },
    { id: 8, name: "Vliegenraam.com", email: "info@vliegenraam.com", country: "Belgium", group: "business", category: "Özel Plise & Stor Sineklik Üreticisi" },
    { id: 9, name: "GZ Montage", email: "office@gz-montage.at", country: "Austria", group: "business", category: "Pencere, Kapı & Cam Montaj Firması" },
    { id: 10, name: "Immosan Fenster Türen Sonnenschutz GmbH", email: "office@immosan-fts.at", country: "Austria", group: "business", category: "Güneşlik, Tente, Kapı & Pencere" },
    { id: 11, name: "Seiler Storen AG", email: "info@seilerstoren.ch", country: "Switzerland", group: "business", category: "Güneş Kırıcı, Panjur & Stor" },
    { id: 12, name: "Fischer Storen GmbH", email: "info@fischerstoren.ch", country: "Switzerland", group: "business", category: "Tente, Gölgelendirme & Panjur" },
    { id: 13, name: "Filtoldos", email: "geral@filtoldos.com", country: "Portugal", group: "business", category: "Tente & Dış Mekan Kapatma" },
    { id: 14, name: "Glavas Aluminum & PVC Systems", email: "info@glavas-systems.gr", country: "Greece", group: "business", category: "Alüminyum & PVC Profil İmalatı" },
    { id: 15, name: "Alevitische Gemeinde Deutschland (AABF)", email: "info@aabf.de", country: "Germany", group: "alevi", category: "Almanya Alevi Birlikleri Federasyonu" },
    { id: 16, name: "Alevilerin Sesi - Editorial / Ads", email: "alevilerinsesi@alevi.com", country: "Germany", group: "alevi", category: "Avrupa Alevi Yayın ve Basın Organı" }
];

declare global {
    var __ataYapiOutreachSentLog: Record<number, { lastSentAt: string; status: 'delivered'; language: 'tr' | 'en' }> | undefined;
}

if (!global.__ataYapiOutreachSentLog) {
    global.__ataYapiOutreachSentLog = {};
}

function getTransporter() {
    const user = process.env.SMTP_USER || 'atayapicambalkon@gmail.com';
    const pass = process.env.SMTP_PASSWORD || 'jdyn pfds zxcu agnb';

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // TLS on 587
        auth: {
            user,
            pass,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            contactId,
            contactIds,
            sendAll,
            lang = 'tr',
            customSubject,
            isTest = false,
            testEmail = 'atayapicambalkon@gmail.com'
        } = body;

        const transporter = getTransporter();

        // 1. Determine target list
        let targets: TemplateContact[] = [];

        if (sendAll) {
            targets = ALL_CONTACTS;
        } else if (Array.isArray(contactIds) && contactIds.length > 0) {
            targets = ALL_CONTACTS.filter(c => contactIds.includes(c.id));
        } else if (contactId) {
            const single = ALL_CONTACTS.find(c => c.id === contactId);
            if (!single) {
                return NextResponse.json({ success: false, error: 'Firma bulunamadı.' }, { status: 404 });
            }
            targets = [single];
        } else {
            return NextResponse.json({ success: false, error: 'Gönderilecek hedef firma belirtilmedi.' }, { status: 400 });
        }

        const results: { id: number; name: string; email: string; success: boolean; error?: string }[] = [];

        for (const target of targets) {
            const recipient = isTest ? testEmail : target.email;
            const subject = customSubject || getEmailSubject(target, lang as 'tr' | 'en');
            const html = getEmailHtml(target, lang as 'tr' | 'en');
            const text = getEmailPlainText(target, lang as 'tr' | 'en');

            try {
                await transporter.sendMail({
                    from: `"${OUTREACH_CONFIG.senderName}" <${OUTREACH_CONFIG.senderEmail}>`,
                    to: recipient,
                    replyTo: OUTREACH_CONFIG.senderEmail,
                    subject: isTest ? `[TEST MAİLİ] ${subject}` : subject,
                    text,
                    html,
                });

                if (!isTest) {
                    global.__ataYapiOutreachSentLog![target.id] = {
                        lastSentAt: new Date().toISOString(),
                        status: 'delivered',
                        language: lang as 'tr' | 'en'
                    };
                }

                results.push({
                    id: target.id,
                    name: target.name,
                    email: recipient,
                    success: true,
                });

                // Small pause between multiple emails to prevent SMTP throttle
                if (targets.length > 1) {
                    await new Promise(res => setTimeout(res, 600));
                }
            } catch (err: any) {
                console.error(`Error sending email to ${recipient}:`, err);
                results.push({
                    id: target.id,
                    name: target.name,
                    email: recipient,
                    success: false,
                    error: err?.message || 'E-posta gönderimi başarısız oldu.',
                });
            }
        }

        const successfulCount = results.filter(r => r.success).length;
        const failedCount = results.filter(r => !r.success).length;

        return NextResponse.json({
            success: successfulCount > 0,
            totalRequested: targets.length,
            successfulCount,
            failedCount,
            isTest,
            results,
            message: isTest
                ? `Test maili başarıyla ${testEmail} adresine iletildi!`
                : `${successfulCount} firmaya e-posta başarıyla gönderildi.`
        });
    } catch (error: any) {
        console.error('Outreach send error:', error);
        return NextResponse.json({
            success: false,
            error: error?.message || 'E-posta gönderim servisi sırasında bir hata oluştu.'
        }, { status: 500 });
    }
}
